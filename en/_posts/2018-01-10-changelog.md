---
layout: post
lang: en
title: Astra 5.64 Changelog
tags: [astra,changelog]
---

- **RTSP-Input**: send `GET_PARAMETER` request each 30 seconds to keep connection active
- **RTSP-Input**: restart stream on stop receiving
- **Playlist**: sort alphabetically or by the channel number
- **Input**: option `order=PID-list`. arrange PMT table. read more: https://cesbo.com/en/input/order/
- **Input**: option `lang.PID=CODE`. setup language code for elementary stream. read more: https://cesbo.com/en/input/lang/
- **EPG Export**: content_descriptor
