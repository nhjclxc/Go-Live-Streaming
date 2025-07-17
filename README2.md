# Go-Live-Streaming
Golang实现直播推流



Golang 本身并没有内置专门用于视频直播推流（如 RTMP、RTSP、HLS 等）的库，但你可以基于社区开源项目或结合 FFmpeg 实现 Golang 的直播推流服务。以下是实现 Golang 直播推流的一些常见方案及实践路径。

---

## 开源项目

[livego](https://github.com/gwuhaolin/livego)



## ✅ 一、直播推流的常见协议

1. **RTMP（Real-Time Messaging Protocol）**：常用于推流。
2. **RTSP（Real-Time Streaming Protocol）**：监控设备常用。
3. **HLS（HTTP Live Streaming）**：用于播放端，适配网页/移动端。
4. **WebRTC**：低延迟方案，适用于实时音视频通话。

---

https://sample-videos.com/index.php

## ✅ 二、Golang 实现推流的几种方式

### ✅ 方式一：使用现成的 Go 开源库如 [gortsplib](https://github.com/aler9/gortsplib)（用于 RTSP）

适用于 RTSP 服务器和客户端开发。

```go
// 推流示例（RTSP）
package main

import (
    "github.com/aler9/gortsplib"
    "log"
)

func main() {
    // 连接到 RTSP 服务器（如 OBS 推到某 RTSP 服务器）
    conn, err := gortsplib.DialPublish("rtsp://localhost:8554/mystream", gortsplib.Tracks{...})
    if err != nil {
        log.Fatal(err)
    }

    // 发送帧数据（通常是 H264 编码）
    err = conn.WriteFrame(0, gortsplib.StreamTypeRTP, myFrame)
}
```

> 但通常要配合 `ffmpeg` 从文件/摄像头采集数据编码后，再通过 Go 推送出去。

---

### ✅ 方式二：使用 [pion/webrtc](https://github.com/pion/webrtc) 实现 WebRTC 推流（实时低延迟）

适用于低延迟实时互动推流。

```go
peerConnection, _ := webrtc.NewPeerConnection(configuration)
videoTrack, _ := webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: webrtc.MimeTypeH264}, "video", "pion")
peerConnection.AddTrack(videoTrack)
```

但你需要用 FFmpeg 把视频流输入转换成 H264，然后推入 `videoTrack.WriteSample(...)`。

---

### ✅ 方式三：使用 [lalserver](https://github.com/q191201771/lal)（纯 Go 实现 RTMP/HTTP-FLV/HLS/WebRTC）

[LAL](https://github.com/q191201771/lal) 是国人开发的开源音视频流媒体服务器，支持：

* RTMP 推流
* HLS、HTTP-FLV、WebRTC 播放
* API 控制、推拉流统计、集群支持

使用示例：

```bash
git clone https://github.com/q191201771/lal.git
cd lal/cmd/lalserver
go run main.go
```

然后可通过 OBS 向 `rtmp://localhost/live/stream` 推流，播放端支持 HTTP-FLV、WebRTC、HLS 播放。

---

### ✅ 方式四：Go 调用 FFmpeg 实现推流（通过管道）

使用 `os/exec` 执行 ffmpeg 命令将本地文件/摄像头推流至 RTMP 服务器：

```go
package main

import (
	"os/exec"
)

func main() {
	cmd := exec.Command("ffmpeg",
		"-re", "-i", "video.mp4",
		"-c:v", "libx264",
		"-f", "flv", "rtmp://localhost/live/stream",
	)

	err := cmd.Run()
	if err != nil {
		panic(err)
	}
}
```

适用于本地视频文件推流或摄像头采集推流。

---

## ✅ 三、完整直播系统架构（参考）

```text
[采集端（OBS、FFmpeg）]
        |
        v
[Go语言 RTMP Server (lal / rtmp-server)]
        |
   -------------------
   |        |        |
[HLS]   [HTTP-FLV]  [WebRTC]
   |        |        |
[播放端（浏览器、播放器）]
```

---

## ✅ 四、推荐项目

| 项目                                                | 功能            | 协议支持                |
| ------------------------------------------------- | ------------- | ------------------- |
| [lal](https://github.com/q191201771/lal)          | 高性能纯 Go 推流服务器 | RTMP、HLS、WebRTC、FLV |
| [pion/webrtc](https://github.com/pion/webrtc)     | Go 实现 WebRTC  | WebRTC              |
| [gortsplib](https://github.com/aler9/gortsplib)   | RTSP 客户端/服务器  | RTSP                |
| [ffmpeg-go](https://github.com/u2takey/ffmpeg-go) | Go 封装 FFmpeg  | 调用 FFmpeg 管道        |

---

## ✅ 五、总结建议

* 若你只是**将视频文件/摄像头推流**，可用 `Go + FFmpeg` 简单集成；
* 若要搭建**完整的直播服务器**，推荐基于 `lal` 开发；
* 若对**低延迟实时通信**有需求，用 `pion/webrtc`；
* 若偏向**云端分发**，Go 做网关/元数据服务 + FFmpeg 或 nginx-rtmp/hls 组合最稳定。

---

如你提供更具体需求（例如要不要自己实现 RTMP server？是否需要支持回看？是否需弹幕、聊天室？），我可以为你出一份 **完整直播系统方案与代码模板**。需要吗？
