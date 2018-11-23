---
layout: post
lang: ru
title: Установка драйверов DigitalDevices
tags: [dev]
---

### Подготовка системы
Для установки драйверов необходимы права root:  
`sudo -s`

<!-- more -->

Установка системных утилит для сборки драйвера из исходников::  
```
apt-get install build-essential \
    patchutils \
    libproc-processtable-perl \
    linux-headers-`uname –r` \
    git
```


#### Удалите старые драйвера:  

```
rm -rf /lib/modules/$(uname -r)/extra
rm -rf /lib/modules/$(uname -r)/kernel/drivers/media
rm -rf /lib/modules/$(uname -r)/kernel/drivers/staging/media
```


#### Отключите автоматическое обновление в Ubuntu 14.04  

`sed -i.bak -e 's/^\(APT::Periodic::Update-Package-Lists\).*/\1 "0";/g' /etc/apt/apt.conf.d/10periodic`

#### Отключите автоматическое обновление в Ubuntu 16.04
```
systemctl disable apt-daily.service
systemctl disable apt-daily.timer
```


### Установка

#### Скачать последнюю версию драйвера из официального репозитория:  
```
git clone --depth=1 https://github.com/DigitalDevices/dddvb -b 0.9.29 /usr/src/dddvb
cd /usr/src/dddvb
```
По умолчанию драйвер имеет ограничение в 8 DVB-адаптеров. Отключим это ограничение перед сборкой:

```
sed -i \
    -e 's/^#if defined(CONFIG_DVB_MAX_ADAPTERS).*$/#if 0/g' \
    dvb-core/dvbdev.h
```    
Если у вас есть более 64 адаптеров (например, 10 MaxS8) необходимо внести изменения в драйвер: 

```
sed -i \
    -e 's/DVB_MAX_ADAPTERS 64/DVB_MAX_ADAPTERS 256/g' \
    dvb-core/dvbdev.h

sed -i \
    -e 's/^\(#define MAX_DVB_MINORS*\).*/\1 512/g' \
    dvb-core/dvbdev.c
 ```
Соберите драйвер и установите его:  
```
make
make install
```
Создание списка зависимостей модулей:  
```
mkdir -p /etc/depmod.d
echo 'search extra updates built-in' >/etc/depmod.d/extra.conf
depmod -a
```

Создайте файл конфигурации для адаптеров MaxS8:  
`echo 'options ddbridge fmode=X' >/etc/modprobe.d/ddbridge.conf`  
Замените `X` на номер модели. См. руководство пользователя Max S8.    

Для применения изменений перезагрузите компьютер:  
`shutdown -r now`  

После перезагрузки - проверьте наличие адаптеров в системе:  
`ls /dev/dvb`  

В ответ - должны быть перечислены все адаптеры, установленные в системе:    
```
adapter0 adapter1 adapter2 adapter3 adapter4 adapter5 adapter6 adapter7
```

### Решение проблем


#### Сигнал в порядке, но каналы не работают

Проверьте вывод dmesg на наличие ошибок i2c:    
`dmesg | grep i2c`
если вы видите сообщения вроде i2c_write error, то отключите MSI (Message Signaled Interrupts) в драйвере:  

Откройте `/etc/modprobe.d/ddbridge.conf` в любом текстовом редакторе 
Найдите строку ddbridge …   
После ddbridge добавьте параметр msi=0. Например:**options ddbridge msi=0 fmode=1**  
Если файл не существует, то создайте его и впишите:
`options ddbridge msi=0`  

#### Адаптеры DVB отсутствуют

Если команда `ls /dev/dvb` выдает ошибку:  
`ls: cannot access /dev/dvb: No such file or directory`  
С помощью команды `lspci` вы можете проверить, присутствуют ли адаптеры в системе:  
`lspci | grep Multimedia` 

Если адаптеры подключены к PCIe правильно, вы увидите список адаптеров PCIe. Например:  
```
01:00.0 Multimedia controller: TBS Technologies DVB-S2 4 Tuner PCIe Card
01:00.0 Multimedia controller: Digital Devices GmbH Cine V7
```

Проверьте boot.log на наличие ошибок:
`dmesg | grep -i dvb`
Этот журнал можно отправить производителю адаптера для поиска решения.

#### Драйверы были установлены и все работало нормально до перезагрузки сервера 
Вероятно, ядро Linux было обновлено. После обновления ядра Linux необходимо переустановить драйвер.

