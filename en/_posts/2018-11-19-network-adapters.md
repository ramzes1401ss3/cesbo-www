---
layout: post
lang: en
title: Network adapters
tags: [linux,network,tuning]
---

### How to see information about losses
Keywords words: missed, dropped, fifo, error, rx.  
`ip -s -s link show eth1`  

<!-- more -->
You need to look at RX Errors. Some network cards provide more detailed information about the nature of the loss:  
``` sh
ethtool -S eth1
```

Losses can be not only on the network cards of your server. They can also be on the network equipment port. You can learn how to see it from the documentation of the network equipment manufacturer.  

### The size of the buffer of the network card  
```
[root@astra ~]# ethtool -g eth1
Ring parameters for eth1:
Pre-set maximums:
RX:		4096
RX Mini:	0
RX Jumbo:	0
TX:		4096
Current hardware settings:
RX:		4096
RX Mini:	0
RX Jumbo:	0
TX:		256
```
Here we can see the rx-buffer increased by the maximum. Usually it is quite difficult to find the value. The most optimal is some "average" value. With a high-frequency and multi-core processor (>3GHz), you can get closer to the maximum/maximum buffer.   
Example of a command to increase the buffer:  
``` sh
ethtool -G eth1 rx 2048
```  
