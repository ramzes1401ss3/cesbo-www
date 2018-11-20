---
layout: post
lang: ru
title: Linux. Настройка сети
tags: [linux,network,tuning]
---

Настройка параметров сети, предотвращает потерю данных и настраивает  сетевой стэк на максимальную полосу пропускания.

<!-- more -->

Параметры размера буфера настраиваются в файле `/etc/sysctl.conf`
Рекомендуется использовать следующие значения для сетевых адаптеров 1G:

```
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.udp_mem = 8388608 12582912 16777216
net.ipv4.tcp_rmem = 4096 87380 8388608
net.ipv4.tcp_wmem = 4096 65536 8388608
net.core.wmem_default = 16777216
net.ipv4.tcp_tw_recycle = 0
```

Для 10G сетевых адаптеров:

```
net.core.rmem_max = 67108864
net.core.wmem_max = 67108864
net.ipv4.udp_mem = 8388608 16777216 33554432
net.ipv4.tcp_rmem = 4096 87380 33554432
net.ipv4.tcp_wmem = 4096 65536 33554432
net.core.wmem_default = 33554432
net.ipv4.tcp_congestion_control=htcp
net.ipv4.tcp_tw_recycle = 0
```

Для 40G сетевых адаптеров:

```
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.ipv4.udp_mem = 8388608 33554432 67108864
net.ipv4.tcp_rmem = 4096 87380 67108864
net.ipv4.tcp_wmem = 4096 65536 67108864
net.core.wmem_default = 67108864
net.ipv4.tcp_congestion_control=htcp
net.ipv4.tcp_tw_recycle = 0
```

Чтобы применить изменения, перезагрузите систему или выполните команду:

``` sh
sysctl -p
```

Вы можете проверить текущие значения с помощью следующей команды:

``` sh
sysctl net.core.rmem_default net.core.rmem_max net.core.wmem_default net.core.wmem_max net.ipv4.udp_mem net.ipv4.tcp_wmem
```
