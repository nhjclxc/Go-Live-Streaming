<template>
  <el-container class="video-container">
    <!-- 上：输入框和按钮 -->
    <el-header class="video-control-area" height="auto">
      <el-input
          v-model="inputUrl"
          placeholder="请输入 FLV 直播流地址"
          clearable
          style="width: 400px"
      >
        <template #append>
          <el-button type="primary" @click="handlePlay">播放</el-button>
        </template>
      </el-input>
    </el-header>

    <!-- 下：视频播放器 -->
    <el-main class="video-player-area" v-loading="loading">
      <video
          class="videosmall"
          ref="videosmallone"
          preload="auto"
          autoplay
          controls
      ></video>
    </el-main>
  </el-container>
</template>

<script>
import flvjs from 'flv.js'

export default {
  name: 'RTMP_HttpFlv_Pull',
  data() {
    return {
      player: null,
      inputUrl: 'http://127.0.0.1:7001/live/movie.flv',
      loading: false,
    }
  },
  methods: {
    handlePlay() {
      const url = this.inputUrl.trim()
      if (!url) return this.$message.error('请输入有效的直播地址')
      console.log("url = ", url)
      this.init(url)
    },
    init(url) {
      this.loading = true
      setTimeout(() => {
        const videoElement = this.$refs.videosmallone
        if (flvjs.isSupported()) {
          if (this.player) {
            this.player.pause()
            this.player.unload()
            this.player.detachMediaElement()
            this.player.destroy()
            this.player = null
          }

          this.player = flvjs.createPlayer(
              {
                type: 'flv',
                url: url,
                isLive: true,
                hasAudio: true,
                hasVideo: true,
                enableStashBuffer: true,
              },
              {
                enableWorker: false,
                enableStashBuffer: false,
                autoCleanupSourceBuffer: true,
                lazyLoad: false,
              }
          )

          this.player.attachMediaElement(videoElement)
          this.player.load()
          this.player.play().catch((e) => {
            console.error('播放失败', e)
            this.$message.error('播放失败，请检查地址')
          })
        }
        this.loading = false
      }, 500)
    },
  },
  beforeUnmount() {
    if (this.player) {
      this.player.pause()
      this.player.unload()
      this.player.detachMediaElement()
      this.player.destroy()
      this.player = null
    }
  },
}
</script>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}


.video-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.video-control-area {
  margin: 0;
  padding: 20px 0;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}


.video-player-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.videosmall {
  width: 100%;
  max-width: 800px;
  height: auto;
}



</style>
