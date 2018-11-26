---
layout: post
lang: ru
title: Astra 5.64 Changelog
tags: [changelog]
---

- **HbbTV**: drop original AIT stream if "HbbTV URL" defined
- **HTTP Output**: HTTP headers for CORS
<!-- more -->
- **HTTP Output**: fix crash on apply stream changes with disabled sessions
- **HLS Output**: any name for index file
- **HLS Output**: relative full path in the .m3u8 (for example /play/a001/segment.ts instead of segment.ts)
- **HLS Output**: absolute path in the .m3u8 if Hostname defined in the Settings -> HLS
- **UDP Output**: optional multithreading and options in Settings -> General
- **HTTP Input**: default buffer_time=3
- **File Input**: better for large files
- **PID Filter**: fix filter for CAS descriptors (dropped descriptors with duplicated PIDs)
- **Simulcrypt**: fix long ECM packets and muxing of the PSI response into TS packages
- **Simulcrypt**: hack for DGCrypt and CTI (stream_id started from 1)
- **DVB Input**: fix crash on scan with DDCI
- **DDCI**: fix ddci in the input options
- integration with systemd for easy installation
- XMLTV import for middleware

**Built-in HTTP/HLS Authentication**:
- black/white IP lists
- stalker/ministra integration
- user authentication: token, login+password, ip, mac (for middleware)
- user restrictions: date, connections limit, packages

**API**:

- `{ "cmd": "get-user", "id": "login" }` - получить конфигурацию пользователя
- `{ "cmd": "check-stream", "id": "a001", "status": true }` - получить статус потока
- `{ "cmd": "set-license", "license": "xxx" }` - установить лицензию

**Web**:

 - Изменения записываются в config с задержкой
 - Settings -> Groups: сбой при удалении группы
 - Settings -> License: информация о лицензии и установка лицензии
 - Уведомления о окончании срока действия лицензии
 - Перезагрузка при применении изменений в: Settings -> General, Settings -> HTTP Play, Settings -> HLS
 - Dashboard: сортировка потоков по LCN
 - Dashboard: обновление статуса потока (потоки становится неактивным, если никто не смотреть их)
 - Дополнительные опции для MPTS:
    - Байпасс NIT/SDT/EIT/TDT - проброс данных сформированных внешними генераторами (cherryEPG для примера)
    - Версия PAT/NIT/CAT/SDT - custom version for tables
 - Сессии: общее значение в верхней части списка
 - Настройки адаптера: группировка адаптеров в списке: занят/свободен

