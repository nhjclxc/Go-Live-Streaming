<template>
  <div>
    <h2>摄像头推流到 SRS</h2>
    <video ref="previewVideo" autoplay muted playsinline width="480" style="border:1px solid #ccc;"></video>
    <br />
    <input
        v-model="streamUrl"
        placeholder="请输入推流地址，如 webrtc://your-srs-ip/live/stream"
        style="width: 100%; padding: 8px; margin-top: 10px; box-sizing: border-box;"
    />
    <br />
    <button @click="startPush" :disabled="pushing" style="margin-top:10px;">
      {{ pushing ? "正在推流..." : "开始推流" }}
    </button>
    <button @click="stopPush" :disabled="!pushing" style="margin-left:10px;">
      停止推流
    </button>
  </div>
</template>

<script>

import {ref, onBeforeUnmount} from 'vue'
// import {SrsRtcPublisherAsync} from 'srs-sdk'

export default {
  setup() {
    const previewVideo = ref(null);
    const pushing = ref(false);
    const streamUrl = ref(""); // 空字符串，用户输入

    let publisher = null;

    const startPush = async () => {
      if (!streamUrl.value) {
        alert("请输入推流地址");
        return;
      }
      try {
        pushing.value = true;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        previewVideo.value.srcObject = stream;

        // publisher = new SrsRtcPublisherAsync();
        await publisher.publish(streamUrl.value);

        console.log("推流成功", streamUrl.value);
      } catch (err) {
        alert("推流失败：" + err.message);
        pushing.value = false;
      }
    };

    const stopPush = () => {
      if (publisher) {
        publisher.close();
        publisher = null;
      }
      if (previewVideo.value && previewVideo.value.srcObject) {
        previewVideo.value.srcObject.getTracks().forEach((t) => t.stop());
        previewVideo.value.srcObject = null;
      }
      pushing.value = false;
    };

    onBeforeUnmount(() => {
      stopPush();
    });

    return {
      previewVideo,
      pushing,
      streamUrl,
      startPush,
      stopPush,
    };
  },
};
</script>

<style scoped>
video {
  max-height: 400px;
}
</style>
