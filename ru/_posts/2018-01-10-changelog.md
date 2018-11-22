---
layout: post
lang: ru
title: Astra 5.64 Changelog
tags: [changelog]
---

- **RTSP-Input**: отправка запроса `GET_PARAMETER` каждые 30 секунд, чтобы поддерживать активное соединение
- **RTSP-Input**: перезапуск потока при обрыве приема
- **Playlist**: сортировка по алфавиту или по номеру канала
- **Input**: опция `order=PID-list`. arrange PMT table. больше информации: https://cesbo.com/en/input/order/
- **Input**: option `lang.PID=CODE`. setup language code for elementary stream. read more: https://cesbo.com/en/input/lang/
- **EPG Export**: content_descriptor
