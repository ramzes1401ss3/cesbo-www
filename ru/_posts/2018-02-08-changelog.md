---
layout: post
lang: ru
title: Astra 5.64 Changelog
tags: [changelog]
---

- **interface**: запрос на изменение пароля при первом запуске
- **interface**: удаление пробелов в input/output
- **interface**: не загружаем архив логов. в логе только новые сообщения
- **make_mpts**: crash on use make_mpts function in lua-script
- **mpts**: automatically increment PAT/CAT/NIT/SDT versions on save changes
- **api**: игнорирование EIT при сканировании
- **hls**: change default segment options: quantity:6 duration:5
- **dvb**: опция для "mxl5xx_snr" - нормализует значение SNR для MaxS8. находится в "Advanced" -> "Scale DD MaxS8 SNR"
