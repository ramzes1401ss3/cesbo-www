---
layout: post
lang: ru
title: Astra 5.64 Changelog
tags: [changelog]
---

- **dvb_input**: исправлен параметр stream_id (multi plp на dvb-t2)
- **simulcrypt**: не скремблировать поток, если ECMG не готов
- **simulcrypt**: исправлено повторное подключение к серверу ECMG
- **simulcrypt**: не обновлять CW и ECM, если ECMG недоступен
- **analyze**: не отмечать поток как скремблированный, если нет PES-ошибок (некоторые потоки имеют бит скремблированния, но фактически, не скремблируются)
- **watchdog**: увеличена задержка таймера watchdog для http_input, если используется опция buffer_time
