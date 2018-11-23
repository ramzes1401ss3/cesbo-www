---
layout: post
lang: en
title: TBS Driver Installation
tags: [dev]
---

### Prepare system
To install drivers needed root privileges:  

<!-- more -->

`sudo -s`


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

#### Install

##### Downloading and building:
``` 
cd /usr/src
git clone https://github.com/tbsdtv/media_build.git
git clone --depth=1 https://github.com/tbsdtv/linux_media.git -b latest ./media
cd media_build
make dir DIR=../media
make allyesconfig
make -j4
sudo make install
``` 

Install firmware for DVB adapters
``` 
cd /usr/src
wget http://www.tbsdtv.com/download/document/linux/tbs-tuner-firmwares_v1.0.tar.bz2
sudo tar jxvf tbs-tuner-firmwares_v1.0.tar.bz2 -C /lib/firmware/
``` 

To launch installed drivers restart your system:  
`shutdown -r now`  

After reboot check adapters:  
`ls /dev/dvb`  

Should be listed all adapters installed in the system:  
```
adapter0 adapter1 adapter2 adapter3 adapter4 adapter5 adapter6 adapter7
```

### Troubleshooting

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
