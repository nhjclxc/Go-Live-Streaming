<template>

  <div class="tunnelvideo" v-loading="loading">
    <video
        class="videosmall"
        ref="videosmallone"
        preload="auto"
        muted
        autoplay
        type="rtmp/flv"
    >
      <source src="" />
    </video>
  </div>

  <div @click="handle">handle FlvVideo.vue</div>
</template>

<script>
import flvjs from 'flv.js';

export default {
  name: 'FlvVideo',
  props: {
    flvUrl: String
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
  },
  methods: {
    handle(){
      console.log('handle FlvVideo.vue')
      let url = 'https://rtmp03open.ys7.com:9188/v3/openlive/C83208482_1_1.flv?expire=1718288852&id=721128583832330240&t=caea9b4cf4e04cf47b9d1d2f7960a24a249a2712228df4050ed84f9e2eb2e5e2&ev=100'
      this.init(url)
    },
    init(val) { //这个val 就是一个地址，例如： http://192.168.2.201:85/live/9311272c49b845baa2b2810ad9bf3f68.flv 这是个服务器返回给我的一个监控视频流地址
      setTimeout(() => { //使用定时器是因为，在mounted声明周期里调用，可能会出现DOM没加载出来的原因
        var videoElement = this.$refs.videosmallone; // 获取到html中的video标签
        if (flvjs.isSupported()) {
          //因为我这个是复用组件，进来先判断 player是否存在，如果存在，销毁掉它，不然会占用TCP名额
          if (this.player !== null) {
            this.player.pause();
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = null;
          }
          this.player = flvjs.createPlayer( //创建直播流，加载到DOM中去
              {
                type: "flv",
                url: val, //你的url地址
                isLive: true, //数据源是否为直播流
                hasAudio: false, //数据源是否包含有音频
                hasVideo: true, //数据源是否包含有视频
                enableStashBuffer: true, //是否启用缓存区
              },
              {
                enableWorker: false, //不启用分离线程
                enableStashBuffer: false, //关闭IO隐藏缓冲区
                autoCleanupSourceBuffer: true, //自动清除缓存
                lazyLoad: false,
              }
          );
          this.player.attachMediaElement(videoElement); //放到dom中去
          this.player.load();//准备完成
          //!!!!!!这里需要注意，有的时候load加载完成不一定可以播放，要是播放不成功，用settimeout 给下面的this.player.play() 延时几百毫秒再播放
          this.player.play();//播放
        }
      }, 1000);
    },
  },
  beforeUnmount() {
    if(this.player){
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player = null;
    }
  }
}
</script>
