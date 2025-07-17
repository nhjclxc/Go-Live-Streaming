# Go-Live-Streaming
Golang实现直播推流



Golang 本身并没有内置专门用于视频直播推流（如 RTMP、RTSP、HLS 等）的库，但你可以基于社区开源项目或结合 FFmpeg 实现 Golang 的直播推流服务。以下是实现 Golang 直播推流的一些常见方案及实践路径。

---


快速启动看[livego](https://github.com/gwuhaolin/livego)实现推流功能




## ✅ 一、直播推流的常见协议

1. **RTMP（Real-Time Messaging Protocol）**：常用于推流。
2. **RTSP（Real-Time Streaming Protocol）**：监控设备常用。
3. **HLS（HTTP Live Streaming）**：用于播放端，适配网页/移动端。
4. **WebRTC**：低延迟方案，适用于实时音视频通话。

---

直播视频资源下载：[sample-videos.com](https://sample-videos.com/index.php)、[filesamples.com](https://filesamples.com/formats/flv)


