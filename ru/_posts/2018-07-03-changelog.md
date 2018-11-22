---
layout: post
lang: en
title: Astra 5.64 Changelog
tags: [changelog]
---

- **web**: allow access to web interface with remote config `astra -c http://... -p 8000`
- **slave mode**: adapters and channels keep inactive while master process is alive. for example:\\
  `astra -c /etc/astra/astra.conf -p 8000 --slave http://192.168.1.1:8000`
