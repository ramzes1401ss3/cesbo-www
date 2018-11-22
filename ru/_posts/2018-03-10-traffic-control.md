---
layout: post
lang: ru
title: Управление трафиком
tags: [linux, network]
---

Конфигурация планировщика пакетов ядра Linux

<!-- more -->

``` sh
tc qdisc add dev eth0 root handle 1: cbq avpkt 1000 bandwidth 1000mbit
```

Назначить правило для интерфейса 1000 Мбит
``` sh
tc class add dev eth0 parent 1: classid 1:1 cbq rate 52mbit allot 1500 prio 5 bounded isolated
```

Добавить класс с ограниченной пропускной способностью - 52 Мбит  

``` sh
tc filter add dev eth0 parent 1: protocol ip prio 16 u32 match ip dst 239.255.1.1 match ip dport 1234 0xffff flowid 1:1
```

Только пакеты с адресом 239.255.1.1 и с портом 1234 будут попадать в класс 1:1  
