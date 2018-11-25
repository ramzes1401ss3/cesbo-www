---
layout: post
lang: ru
title: Astra 5.64 Changelog
tags: [changelog]
---

- **simulcrypt**: option EMM Clone - duplicates EMM packets for all streams with same CAS
- **web**: option to disable/enable servers: Settings -> Servers -> Enable
- **web**: app option --no-web-auth to disable authorisation to the web interface (admin access without password)
- **reserve**: removed option backup_force_return, now enabled by the default. if all inputs inactive (all inputs not work), then astra switch to any active input immediately, without delay
- **pid-mux**: an input option to append any PID into the input. for example append audio stream into the RTSP stream from cameras. the donor stream should be in udp. example usage: `rtsp://192.168.88.8/stream_1#mux=127.0.0.1:10000&mux_pid=304`\\
  where 127.0.0.1:10000 - is UDP stream (same as UDP-input, but without udp:// prefix),\\
  304 - is PID from this UDP stream
