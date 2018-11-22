---
layout: post
lang: en
title: Bind Adapters
tags: [dev]
---

## Bind Adapters

<!-- more -->

When the server boot, DVB adapters can be initialized randomly, which will cause the adapters to swap places. As an example: DVB adapter connected to Eutelsat 36B will be swapped with an adapter connected to ABS 2 at 75.0°E. to prevent this situation, follow these steps:  

create folder `/etc/astra/mod:`

`mkdir /etc/astra/mod`
run command:

`astra --dvbls -o /etc/astra/mod/dvb.lua`
after that - the current adapters will be written to the `/etc/astra/mod/dvb.lua` file and used when initializing astra
