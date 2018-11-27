---
layout: post
lang: ru
title: IGMP Version
tags: [linux,network,tuning]
---

## Версия IGMP 

<!-- more -->

Версия IGMP может быть настроена в файле /etc/sysctl.conf. Например, настройка IGMPv2 для интерфейса eth1:
`net.ipv4.conf.eth1.force_igmp_version=2`  

Чтобы применить изменения, перезапустите систему или выполните команду:  
``` sh
sysctl -p
```  

Вы можете проверить версию IGMP с помощью tcpdump выполнив команду:  
``` sh
tcpdump -i eth1 igmp
```  

Затем попробуйте подписаться на мультикаст. Например:  
``` sh
astra --analyze udp://eth1@239.255.1.1:1234
```  
