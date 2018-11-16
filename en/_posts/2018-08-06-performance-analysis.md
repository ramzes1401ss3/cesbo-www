---
layout: post
lang: en
title: Performance Analysis
tags: [linux, network, tuning]
---

List of useful command to performance analysis:

<!-- more -->

- `uptime` - system uptime and load averages
- `dmesg | tail` - kernel errors
- `vmstat 1` - overall stats by time
- `mpstat -P ALL 1` - CPU balance
- `pidstat 1` - process usage
- `iostat -xz 1` - disk I/O
- `free -m` - memory usage
- `sar -n DEV 1` - network I/O
- `sar -n TCP,ETCP 1` - TCP stats
- `htop` - check overview
