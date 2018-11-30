**Установка и настройка ASTRA и 2 устройства Digital Devices MAX S8 (16 адаптеров) на Debian 9 x86_64:**

_Вводим в терминале следующие команды (из под root):_

Загружаем текущие dddvb драйвера и распаковываем:

``` sh
# cd /usr/src
# wget https://github.com/DigitalDevices/dddvb/archive/0.9.36.tar.gz
# tar -xf 0.9.36.tar.gz
```

Удаляем прошлые драйвера:

``` sh
# rm -rf /lib/modules/$(uname -r)/extra
# rm -rf /lib/modules/$(uname -r)/kernel/drivers/media
# rm -rf /lib/modules/$(uname -r)/kernel/drivers/staging/media
```

Устанавливаем инструмент для сборки драйверов:

``` sh
# apt install build-essential patchutils libproc-processtable-perl linux-headers-`uname –r` git mercurial
```

Переходим в папку с распаковаными драйверами:

``` sh
# cd /usr/src/dddvb-0.9.36
```

Снимаем ограничение на количество адаптеров в системе:

``` sh
# sed -i -e 's/^#if defined(CONFIG_DVB_MAX_ADAPTERS).*$/#if 0/g' dvb-core/dvbdev.h
```

Собираем драйвера:

``` sh
# make
# make install
# mkdir -p /etc/depmod.d
# echo 'search extra updates built-in' | tee /etc/depmod.d/extra.conf
```

Оповещаем систему о новых модулях и зависимостях:

``` sh
# depmod -a
```

Для DigitalDevices Max S8 создаём ddbridge.conf файл:

``` sh
# echo 'options ddbridge fmode=1' | tee /etc/modprobe.d/ddbridge.conf
```

В данном варианте fmode=1 означает, что для всех 8 адаптеров можно подключить один кабель с 85Е в первый вход (дальний от винтов крепления) и он одним кабелем распределится на все другие входа уже по своему внутреннему мультисвитчу, питание LNB в настройках астры не выключаем, оставляем по умолчанию.

Либо заменяем fmode=1 необходимым для ваших нужд номером режима работы карт:

``` sh
Режимы работы Max S8:

fmode=0 - 4 tuner mode ( Internal multiswitch disabled )
fmode=1 - Quad LNB / normal outputs of multiswitches
fmode=2 - Quattro - LNB / cascade outputs of multiswitches
fmode=3 - Unicable LNB or JESS / Unicabel output of the multiswitch
```

Загружаем драйвера:

``` sh
# modprobe ddbridge
```

Перезагружаем сервер. Готово.

Проверяем адаптеры в системе:

``` sh
# ls /dev/dvb
adapter0  adapter1  adapter10  adapter11  adapter12  adapter13  adapter14  adapter15  adapter2  adapter3  adapter4  adapter5  adapter6  adapter7  adapter8  adapter9
```

Примечание: Если у вас есть I2C-Timeouts, то отключаем MSI режим для ddbridge:

``` sh
# echo 'options ddbridge msi=0' | tee /etc/modprobe.d/ddbridge.conf
```

Если файл /etc/modprobe.d/ddbridge.conf уже существует, тогда добавляем в первую строку "msi=0":

``` sh
options ddbridge fmode=x msi=0
```
---
**Отключаем автообновления системы:**

``` sh
# systemctl disable apt-daily.service
# systemctl disable apt-daily.timer
```
---
**Настраиваем сетевые карты /etc/network/interfaces:**

``` sh
# nano /etc/network/interfaces
```
``` sh
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet dhcp

# The secondary local interface
auto eth1
iface eth1 inet static
address 192.168.1.31
netmask 255.255.255.0
```

**Красивое отображение сетевых карт, как eth0, eth1, а не enp7s0 и eno1:**

Добавляем строку в /etc/default/grub
``` sh
GRUB_CMDLINE_LINUX_DEFAULT="net.ifnames=0 biosdevname=0"
```

В /etc/network/interfaces поменять на ethX, сделать update-grub и reboot

**Устанавливаем ifconfig и проверяем изменения:**

``` sh
# apt install net-tools
# ifconfig
```

**Рекомендация для 1GBit сетевых карт - изменяем конфиг /etc/sysctl.conf:**

``` sh
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.udp_mem = 8388608 12582912 16777216
net.ipv4.tcp_rmem = 4096 87380 8388608
net.ipv4.tcp_wmem = 4096 65536 8388608
net.core.wmem_default = 16777216
net.ipv4.tcp_tw_recycle = 0
```

Применяем изменения:

``` sh
# sysctl -p
```
---
**Монтируем папку /tmp в оперативной памяти для сохранения в ней log-файлов, чтобы не дёргать HDD и SSD диски:**

``` sh
# echo "tmpfs /tmp tmpfs rw,nosuid,nodev 0 0" | tee -a /etc/fstab
# reboot
```

Удаляем все файлы из папки /tmp, после монтируем папку:

``` sh
# mount /tmp
```

Проверяем:

``` sh
# mount
```

Видим, что файловая система смонтировалась: 

``` sh
# tmpfs on /tmp type tmpfs (rw,nosuid,nodev,relatime)
```

**Удаляем SWAP:**

Смотрим есть он или нет, если есть, то:

``` sh
# free
# swapoff -a
```
Удаляем строку со swap, сохраняем, перезагружаем сервер:

``` sh
# nano /etc/fstab  
# reboot
```
---
**Выключаем в биосе HyperThreading, чтобы остались настоящие ядра процессора, а "виртуальные" выключились.**

Устанавливаем пакет ```psmisc```, чтобы появилась в системе команда ```killall```:

``` sh
# apt install psmisc
```

**Создаём скрипт следующего содержания для фиксированного распределения dvb-адаптеров по ядрам, чтобы не было фризов и подёргиваний картинки:**

``` sh
# touch /home/andra/dvb-interrupts.sh
# chmod +x /home/andra/dvb-interrupts.sh
```

Сам скрипт:

```bash
#!/bin/bash
killall irqbalance

ncpus=`grep -ciw ^processor /proc/cpuinfo`
test "$ncpus" -gt 1 || exit 1
n=0

for irq in `cat /proc/interrupts | grep 'ddbridge\|eth' | awk '{print $1}' | sed s/\://g` ; do
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
Сохраняем, запускаем. Скрипт будет работать до перезагрузки сервера.

**Устанавливаем астру:**
---
``` sh
# apt install curl
# curl -Lo /usr/bin/astra http://cesbo.com/download/astra/$(uname -m)
# chmod +x /usr/bin/astra
```

**Запуск Астры** 
ASTRA работает по умолчанию на порту 8000: http://ВАШ_IP:8000
admin:admin - логин:пароль по умолчанию.
Если необходимо на каждый спутниковый адаптер использовать отдельный сервис астры, делать лучше именно так, чтобы при необходимости перезапуска сервиса отключались каналы только с одного принимаемого транспондера одного из тюнеров, то нужно сделать так:

``` sh
# astra init 8000 astra0
# astra init 8001 astra1
# astra init 8002 astra2
```
И так далее для всех ваших адаптеров. На данном этапе сервисы эти не запущены и в веб-интерфейсе они не активны. Запускаем пока только одну копию астры. Чтобы активировать сервис нужно:

``` sh
# systemctl start astra0
```
Меняем пароль на свой, возможно создать логин и пароль иной, заходим в ``` Settings -> User -> New User ``` и применяем ``` Type -> Administrator -> Apply ``` ```Settings -> Restart``` Заходим под новым логином и паролем, удаляем прошлую учётную запись ```admin```, введя повторно пароль ```admin```, ставим галку ```Remove user -> Apply```. ```Settings -> Restart```

Теперь можно продублировать данный конфиг на все другие адаптеры, чтобы не повторять процедуру создания учётной записи:
``` sh
# cp /etc/astra/astra0.conf /etc/astra/astra1.conf
# cp /etc/astra/astra0.conf /etc/astra/astra2.conf
# cp /etc/astra/astra0.conf /etc/astra/astra3.conf
```
И так далее для всех адаптеров.

Запускаем ранее не запущенные сервисы:

``` sh
# systemctl start astra1
# systemctl start astra2
# systemctl start astra3
```

Для автоматического запуска сервисов после включения сервера:

``` sh
# systemctl enable astra0
# systemctl enable astra1
# systemctl enable astra2
# systemctl enable astra3
```
Для изменения пути сохранения логов Астры, например в /tmp, введём команды:

``` sh
# sed -i -e 's!/var/log!/tmp!' /lib/systemd/system/astra0.service
# sed -i -e 's!/var/log!/tmp!' /lib/systemd/system/astra1.service
# sed -i -e 's!/var/log!/tmp!' /lib/systemd/system/astra2.service
```

Перезапустим systemctl:

``` sh
# systemctl daemon-reload
```

Перезапустим все сервисы астры:

``` sh
# systemctl restart astra0
# systemctl restart astra1
# systemctl restart astra2
```
Готово!
