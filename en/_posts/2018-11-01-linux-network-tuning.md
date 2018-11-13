---
layout: post
lang: en
title: Linux. Network Tuning
tags: [linux,network,tuning]
---

Tuning of the network options prevents data loss and maximum bandwidth.

<!-- more -->

The buffer size options should be defined in the `/etc/sysctl.conf` file.
Recommended to use next values for 1G ethernet adapters:

```
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.udp_mem = 8388608 12582912 16777216
net.ipv4.tcp_rmem = 4096 87380 8388608
net.ipv4.tcp_wmem = 4096 65536 8388608
net.core.wmem_default = 16777216
net.ipv4.tcp_tw_recycle = 0
```

For 10G ethernet adapters:

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

For 40G ethernet adapters:

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

To apply changes restart system or launch:

``` sh
sysctl -p
```

You can verify the current values with next command:

``` sh
sysctl net.core.rmem_default net.core.rmem_max net.core.wmem_default net.core.wmem_max net.ipv4.udp_mem net.ipv4.tcp_wmem
```
