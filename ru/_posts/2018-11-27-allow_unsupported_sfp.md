---
layout: post
lang: ru
title: unsupported SFP+ module. 
tags: [dev,linux]
---

После установки SFP модуля в сетевую карту  Intel Corporation 82599ES 10-Gigabit, может возникнуть проблема в том - что карта не запустит этот модуль, выдавая ошибку:
<!-- more -->


```
ixgbe 0000:02:00.1: failed to load because an unsupported SFP+ module type was detected.
```
Эта ошибка говорит о том, что данный модуль не был протестирован для работы с данной картой и карта работать с ним - не будет.  

Путь решения:

Выгрузим драйвер:

``` sh
modprobe ixgbe -r
```

Загрузим его с опцией allow_unsupported_sfp=1  

``` sh
modprobe ixgbe allow_unsupported_sfp=1
```

Если после данных манипуляций сетевой интерфейс успешно определился можно перезапустить сеть или поднять его вручную и убедиться в корректной работе.  

Если сетевых интерфейсов несколько, то может потребоваться прописать 1 для каждого из них, делается это по количеству и через запятую. Для четырех интерфейсов опция будет выглядеть так: allow_unsupported_sfp=1,1,1,1  

Для обеспечения автоматического применения данной опции следует прописать следующую опцию для ядра через конфиг загрузчика grub:

Откроем файл /etc/default/grub
 и в строку 

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```
допишем:
``` 
ixgbe.allow_unsupported_sfp=1
```

получится примерно так: (отрывок файла)

```
GRUB_DEFAULT=6
#GRUB_HIDDEN_TIMEOUT=0
GRUB_HIDDEN_TIMEOUT_QUIET=true
GRUB_TIMEOUT="2"
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash ixgbe.allow_unsupported_sfp=1"
GRUB_CMDLINE_LINUX=""
 
# Uncomment to disable graphical terminal (grub-pc only)
#GRUB_TERMINAL=console
```

Сохраните файл и примените изменения:

``` sh
sudo update-grub
```

