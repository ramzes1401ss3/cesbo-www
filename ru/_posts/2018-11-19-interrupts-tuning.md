---
layout: post
lang: ru
title: Interrupts Tuning
tags: [linux,network,tuning]
---

An interrupt request allow to communicate between hardware and operating system. 
<!-- more -->
For CPU load optimization recommended to setup CPU affinity for IRQ also known as IRQ Balancing.   
Information about interrupts available in the **/proc/interrupts**. File format:  

```
           CPU0       CPU1       CPU2       CPU3
...
 45:          0          0          0          0   PCI-MSI-edge      eth0
 46:          0          0          0          0   PCI-MSI-edge      eth0-rx-0
 47:          0          0          0          0   PCI-MSI-edge      eth0-rx-1
 48:          0          0          0          0   PCI-MSI-edge      eth0-rx-2
 49:          0          0          0          0   PCI-MSI-edge      eth0-rx-3
 50:          0          0          0          0   PCI-MSI-edge      eth0-tx-0
 51:          0          0          0          0   PCI-MSI-edge      eth0-tx-1
 52:          0          0          0          0   PCI-MSI-edge      eth0-tx-2
 53:          0          0          0          0   PCI-MSI-edge      eth0-tx-3
```

- First column is an IRQ number
- CPU0 .. CPUx is an interrupt counter
- PCI-MSI-edge is an IRQ type
- Last column is a device name

To change the processor affinity value for a IRQ number **/proc/irq/[IRQ Number]/smp_affinity**:  

```
echo [smp_affinity value] >/proc/irq/[IRQ Number]/smp_affinity
```

SMP Affinity Calculator:  

<html>
<script type="text/javascript">var $smp_affinity_result = null;function smp_affinity_calc(obj) {if(!$smp_affinity_result) $smp_affinity_result = document.getElementById("smp_affinity_result");var val = parseInt(obj.value);if(!isNaN(val) && val >= 0 && val < 256) {var post = "";for(; val >= 32; val -= 32) post = post + ",00000000";val = ((1 << val) >>> 0).toString(16) + post;} else {val = "&nbsp;";}$smp_affinity_result.innerHTML = val;}</script>
<form>
<input type="text" class="form-control" placeholder="CPU Core Number" onkeyup="smp_affinity_calc(this)" /><strong style="margin-left:10px; line-height:20px">SMP Affinity Value: </strong><span style="margin-left:10px; line-height:20px" id="smp_affinity_result">&nbsp;</span>
</form>
</html>

To apply smp_affinity parameters on the system startup need to append in the file **/etc/rc.local** (example):  

```
# CPU0
echo 1 >/proc/irq/45/smp_affinity
echo 1 >/proc/irq/46/smp_affinity
echo 1 >/proc/irq/47/smp_affinity
# CPU1
echo 2 >/proc/irq/48/smp_affinity
echo 2 >/proc/irq/49/smp_affinity
# CPU2
echo 4 >/proc/irq/50/smp_affinity
echo 4 >/proc/irq/51/smp_affinity
# CPU3
echo 8 >/proc/irq/52/smp_affinity
echo 8 >/proc/irq/53/smp_affinity
```
