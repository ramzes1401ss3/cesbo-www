---
layout: post
lang: ru
title: Astra. Начало Работы
tags: [astra]
permalink: /ru/astra-quick-start/
---

Установка Астры простой процесс - для работы достаточно одного исполняемого файла.

<!-- more -->

## Установка

Для установки загрузите исполняемый файл и установить права на запуск.
На сервере это можно выполнить командой:

``` sh
curl -Lo /usr/bin/astra http://cesbo.com/download/astra/$(uname -m)
chmod +x /usr/bin/astra
```

После установки, добавьте сервис в **systemd** - системный менеджер сервисов:

``` sh
astra init 8000
```

Запустите Астру:

``` sh
systemctl start astra
```

После запуска веб-интерфейс будет доступен по адресу: <http://адрес-сервера:8000>.
В данним примере используется порт **8000**, вы можете указать любой порт.
Логин и пароль по умолчанию: `admin`

Для автоматического запуска при старте системы:

``` sh
systemctl enable astra
```

## Управление процессом

Для управления процессом используется **systemd** - системный менеджер большинства дистрибутивов Linux.
Основные команды:

- `systemctl start astra` - запустить сервис
- `systemctl stop astra` - остановить сервис
- `systemctl restart astra` - перезапуск сервиса
- `systemctl enable astra` - включить автозапуск
- `systemctl disable astra` - отключить автозапуск

## Проверка версии

После установки или после обновления вы можете проверить номер версии:

``` sh
astra -v
```

## Обновление

Перед обновлением создайте резервную копию исполняемого файла и файла конфигурации:

``` sh
tar -Pzcf ~/astra-backup.tar.gz /usr/bin/astra /etc/astra
```

Для извлечения резервной копии необходимо выполнить:

``` sh
rm -f /usr/bin/astra
tar -Pxf ~/astra-backup.tar.gz
```

Установка обновления:

``` sh
rm -f /usr/bin/astra
curl -Lo /usr/bin/astra http://cesbo.com/download/astra/$(uname -m)
chmod +x /usr/bin/astra
```

После обновления перезапустите Астру:

``` sh
systemctl restart astra
```

## Удаление

Перед удалением оставновите сервис и отключите автозапуск:

``` sh
systemctl stop astra
systemctl disable astra
```

Удаление сервиса из менеджера сервисов:

``` sh
astra remove
```

Полное удаление:

``` sh
rm -rf /usr/bin/astra /etc/astra
```

## Установка версий из архива

На сайте также доступен архив версий: <http://cesbo.com/download/astra/>.
Найдите нужную версию, скачайте её и установите права на выполнение:

``` sh
curl -Lo /usr/bin/astra ссылка-на-нужную-версию
chmod +x /usr/bin/astra
```
