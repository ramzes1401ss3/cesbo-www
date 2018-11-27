---
layout: post
lang: ru
title: Установка драйверов TBS
tags: [dev]
---

### Подготовка системы
Для установки драйверов необходимы права root:  
``` sh
sudo -s
```
---

<!-- more -->

Установка системных утилит для сборки драйвера из исходников::  
``` sh
apt-get install build-essential \
    patchutils \
    libproc-processtable-perl \
    linux-headers-`uname –r` \
    git
```


#### Удалите старые драйвера:  

``` sh
rm -rf /lib/modules/$(uname -r)/extra
rm -rf /lib/modules/$(uname -r)/kernel/drivers/media
rm -rf /lib/modules/$(uname -r)/kernel/drivers/staging/media
```


#### Отключите автоматическое обновление в Ubuntu 14.04  
``` sh
`sed -i.bak -e 's/^\(APT::Periodic::Update-Package-Lists\).*/\1 "0";/g' /etc/apt/apt.conf.d/10periodic`
``` 
#### Отключите автоматическое обновление в Ubuntu 16.04
``` sh
systemctl disable apt-daily.service
systemctl disable apt-daily.timer
```

### Установка

##### Загрузка и билдинг:
``` sh 
cd /usr/src
git clone https://github.com/tbsdtv/media_build.git
git clone --depth=1 https://github.com/tbsdtv/linux_media.git -b latest ./media
cd media_build
make dir DIR=../media
make allyesconfig
make -j4
sudo make install
``` 

Установите  firmware для DVB адаптеров:  
``` sh 
cd /usr/src
wget http://www.tbsdtv.com/download/document/linux/tbs-tuner-firmwares_v1.0.tar.bz2
sudo tar jxvf tbs-tuner-firmwares_v1.0.tar.bz2 -C /lib/firmware/
``` 

Для применения изменений перезагрузите компьютер:  
``` sh
shutdown -r now`  
```
После перезагрузки - проверьте наличие адаптеров в системе:  
``` sh
ls /dev/dvb`  
```
В ответ - должны быть перечислены все адаптеры, установленные в системе:    
```
adapter0 adapter1 adapter2 adapter3 adapter4 adapter5 adapter6 adapter7
```

### Решение проблем

#### Адаптеры DVB отсутствуют

Если команда `ls /dev/dvb` выдает ошибку:  
`ls: cannot access /dev/dvb: No such file or directory`  
С помощью команды `lspci` вы можете проверить, присутствуют ли адаптеры в системе:  
``` sh
lspci | grep Multimedia
``` 

Если адаптеры подключены к PCIe правильно, вы увидите список адаптеров PCIe. Например:  
```
01:00.0 Multimedia controller: TBS Technologies DVB-S2 4 Tuner PCIe Card
01:00.0 Multimedia controller: Digital Devices GmbH Cine V7
```

Проверьте boot.log на наличие ошибок:
``` sh
dmesg | grep -i dvb
```
Этот журнал можно отправить производителю адаптера для поиска решения.

#### Драйверы были установлены и все работало нормально до перезагрузки сервера 
Вероятно, ядро Linux было обновлено. После обновления ядра Linux необходимо переустановить драйвер.

