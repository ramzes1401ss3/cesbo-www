---
layout: post
lang: en
title: Script for automatic distribution of interrupts.
tags: [linux,network,tuning]
---

##### the script will distribute the interrupts automatically.
<!-- more -->
```
#!/bin/bash
killall irqbalance

ncpus=`grep -ciw ^processor /proc/cpuinfo`
test "$ncpus" -gt 1 || exit 1
n=0

for irq in `cat /proc/interrupts | grep 'tbsecp3\|eth\|ddbrige\|eno\|ens' | awk '{print $1}' | sed s/\://g` ; do
    f="/proc/irq/$irq/smp_affinity"
    test -r "$f" || continue
    cpu=$[$ncpus - ($n % $ncpus) - 1]
    if [ $cpu -ge 0 ] ; then
        mask=`printf %x $[2 ** $cpu]`
        echo "Assign SMP affinity: dvb$n, irq $irq, cpu $cpu, mask 0x$mask"
        echo "$mask" > "$f"
        let n+=1
    fi
done
```