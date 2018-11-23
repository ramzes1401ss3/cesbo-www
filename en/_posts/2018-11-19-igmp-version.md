---
layout: post
lang: en
title: IGMP Version
tags: [linux,network,tuning]
---

## IGMP Version

<!-- more -->

The IGMP version could be defined in the /etc/sysctl.conf file. For example setup IGMPv2 for eth1 interface:    
`net.ipv4.conf.eth1.force_igmp_version=2`  

To apply changes restart system or launch:    
`sysctl -p`  

You can verify IGMP version with tcpdump. Launch:  
`tcpdump -i eth1 igmp`  

Then try to subscribe to the multicast stream. For example:  
`astra --analyze udp://eth1@239.255.1.1:1234`  
