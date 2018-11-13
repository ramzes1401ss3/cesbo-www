---
layout: page
lang: ru
title: Astra. Быстрый Старт
search: true
description: Документация описывает установку и запуск Cesbo Astra
---

* TOC
{:toc}

## Установка

Для установки последней версии, запустите следующую команду на сервере:

``` sh
sh <(wget -qO- https://cesbo.com/download/astra/scripts/install.sh)
```

После установки сохраните `license.txt` из почтового сообщения в файл `/etc/astra/license.txt` на сервере. Письмо на электронную почту с файлом `license.txt` вы получите после покупки или запроса пробной версии.
Для запуска astra после установки выполните:

``` sh
service astra start
```

После запуска веб-интерфейс будет доступен на порту **8000**. Логин и пароль по умолчанию: **admin**

Другие версии доступны в [download folder](https://cesbo.com/download/astra/)

## Обновление

``` sh
sh <(wget -qO- https://cesbo.com/download/astra/scripts/update.sh)
```

Скрипт автоматически создаст резервную копию в `~/astra-backup.tar.gz`
После обновления, перезапустите Astra:

``` sh
service astra restart
```

## Удаление

``` sh
sh <(wget -qO- https://cesbo.com/download/astra/scripts/uninstall.sh)
```

## Проверка версии

``` sh
astra -v
```

## Анализатор потоков

``` sh
astra --analyze "stream-address"
```

MPEG-TS Анализатор поддерживает следующие протоколы: UDP, HTTP, RTSP, DVB.
