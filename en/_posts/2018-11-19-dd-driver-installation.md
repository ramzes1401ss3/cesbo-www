---
layout: post
lang: en
title: DigitalDevices Driver Installation
tags: [dev]
---

### Prepare system
To install drivers needed root privileges:  
`sudo -s`

<!-- more -->
Install system utilities to build drivers from the source code:  
```
apt-get install build-essential \
    patchutils \
    libproc-processtable-perl \
    linux-headers-`uname –r` \
    git
```


#### Remove old media drivers:  

```
rm -rf /lib/modules/$(uname -r)/extra
rm -rf /lib/modules/$(uname -r)/kernel/drivers/media
rm -rf /lib/modules/$(uname -r)/kernel/drivers/staging/media
```


#### Disable auto update in Ubuntu 14.04  

`sed -i.bak -e 's/^\(APT::Periodic::Update-Package-Lists\).*/\1 "0";/g' /etc/apt/apt.conf.d/10periodic`

#### Disable auto update in Ubuntu 16.04
```
systemctl disable apt-daily.service
systemctl disable apt-daily.timer
```


### Install

#### Download latest driver from the official repository:
```
git clone --depth=1 https://github.com/DigitalDevices/dddvb -b 0.9.29 /usr/src/dddvb
cd /usr/src/dddvb
```
By the default driver has limit only for 8 DVB adapters. Remove this limit before build drivers:

```
sed -i \
    -e 's/^#if defined(CONFIG_DVB_MAX_ADAPTERS).*$/#if 0/g' \
    dvb-core/dvbdev.h
```    
If you have more than 64 adapters (for example 10 MaxS8) need to increase limit in the driver:

```
sed -i \
    -e 's/DVB_MAX_ADAPTERS 64/DVB_MAX_ADAPTERS 256/g' \
    dvb-core/dvbdev.h

sed -i \
    -e 's/^\(#define MAX_DVB_MINORS*\).*/\1 512/g' \
    dvb-core/dvbdev.c
 ```
Build drivers and install it:
```
make
make install
```
Create a list of module dependencies:  
```
mkdir -p /etc/depmod.d
echo 'search extra updates built-in' >/etc/depmod.d/extra.conf
depmod -a
```

Create configuration file for MaxS8 DVB adapters:  
`echo 'options ddbridge fmode=X' >/etc/modprobe.d/ddbridge.conf`  
Replacing X with the mode number. See MaxS8 user manual.  

To launch installed drivers restart your system:  
`shutdown -r now`  

After reboot check adapters:  
`ls /dev/dvb`  

Should be listed all adapters installed in the system:  
```
adapter0 adapter1 adapter2 adapter3 adapter4 adapter5 adapter6 adapter7
```

### Troubleshooting


#### Signal is fine, but channels don't work

Check dmesg output for i2c errors:  
`dmesg | grep i2c`
if you see messages like i2c_write error then turn off MSI (Message Signaled Interrupts) in the driver:  

Open `/etc/modprobe.d/ddbridge.conf` in any text editor  
Find options ddbridge … line  
After the ddbridge append msi=0 option. For example: **options ddbridge msi=0 fmode=1**  
If file does not exists, then create it and write:    
`options ddbridge msi=0`  

#### DVB adapters are not available

If ls /dev/dvb shows error:  
`ls: cannot access /dev/dvb: No such file or directory`  
With lspci you may check is adapters available in the system:  
`lspci | grep Multimedia` 

If adapters connected to the PCIe properly you will see listing of the PCIe adapters. For example:  
```
01:00.0 Multimedia controller: TBS Technologies DVB-S2 4 Tuner PCIe Card
01:00.0 Multimedia controller: Digital Devices GmbH Cine V7
```

Check system boot log for errors:
`dmesg | grep -i dvb`
You may send this log to the adapter vendor to find a solution.

#### Drivers has been installed some time ago and all worked fine before server reboot
Probably Linux kernel has been updated. After Linux kernel update drivers should be reinstalled.
