---
layout: post
lang: ru
title: Анализ производительности
tags: [linux, network, tuning]
---

Список полезных команд для анализа производительности :

<!-- more -->

- `uptime` -  время работы системы и нагрузка
- `dmesg | tail` - ошибки и сообщения ядра
- `vmstat 1` - общая статистика по времени
- `mpstat -P ALL 1` - CPU balance
- `pidstat 1` - использование процессора
- `iostat -xz 1` - disk I/O
- `free -m` - использование памяти
- `sar -n DEV 1` - network I/O
- `sar -n TCP,ETCP 1` - статистика TCP
- `htop` - обзор процессов и нагрузки по ядрам
