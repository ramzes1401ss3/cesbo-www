---
layout: post
lang: ru
title: Мониторинг
tags: [dev]
---

## Мониторинг. Экспорт статистики и событий

<!-- more -->

Экспорт статистики и событий позволяет передавать данные о состоянии DVB адаптеров и каналов через HTTP в формате JSON.   
Для активации экспорта статистики и событий необходимо указать адрес сервера мониторинга  ```http://example.local:port/path```.   
Адрес сервера мониторинга можно указать в веб-интерфейсе: `Settings → General → Monitoring`.   
Если вы настраиваете Астру скриптом, вы можете указать адрес в начале скрипта: ```init_event_request ("http://example.local:port/path")```.   
В адресе можно указать дополнительные параметры:

**interval=30** - интервал передачи статистики в секундах. По умолчанию, 30 секунд. Пример: ```http://example.local:port/path#interval=60```

**total=1** — Суммировать статистику. Пример: ```http://example.local:port/path#interval=60&total=1``` каждую минуту на сервер отправляется массив с одним элементом: общая статистика за одну минуту наблюдения.

### Запус потока
Подробная информация о потоке. Отправляется на сервер мониторинга при запуске потока

- **timestamp** — время запуска потока
- **hostname** — имя сервера
- **channel** — полная конфигурация потока

### Анализ потока
Во время работы потока передается полная информация о состоянии:

- **timestamp** — время
- **channel_id** — уникальный ID потока
- **input_id** — Порядковый номер источника во входном списке. Начинается с 1
- **onair** — значение параметра "true", если источник активен, или "false", если в потоке есть ошибки
- **bitrate** — входящая скорость потока в Kbit/s
- **scrambled** — значение параметра "true", если поток зашифрован или "false", если поток открыт
- **cc_error** — CC-Error
- **pes_error** — PES-Error
Данные передаются массивом из нескольких элементов, каждый элемент данных за одну секунду наблюдений, количество элементов в массиве определяется частотой передачи статистики. Если включена агрегация статистики, то в массиве есть только один элемент: общее количество ошибок и средний битрейт за период равный частоте передачи статистики.

### Запуск адаптера
Подробная информация об адаптере. Передается на сервер мониторинга при запуске адаптера

- **timestamp** — время запуска адаптера
- **hostname** — имя сервера
- **dvb** — полная конфигурация адаптера. 

### Статус адаптера
Во время работы адаптера передается полная информация об уровне сигнала и ошибках.

- **timestamp** — время
- **dvb_id** — уникальный идентификатор адаптера
- **status** — статус сигнала
- **signal** — уровень сигнала
- **snr** — отношение сигнал/шум
- **ber** — частота ошибок
- **unc** — количество блоков с ошибками
- **bitrate** — скорость входящего потока в Kbit/s

Status value-the number of 5 bits which describe the state of the tuner:  

- **SIGNAL** — the signal bit will be set when the tuner captures the signal
- **CARRIER** — steady signal reception
- **FEC** — reception FEC (forward error correction) data
- **SYNC** — received information for synchronization
- **LOCK** — the tuner is set to receive a signal
If the tuner is configured successfully, the status parameter will be set to 31  

The value of the signal and snr is passed as-is to get the result in percentage, you must perform the transformation: (X * 100) / 65535. If raw_signal is enabled, the dBm value and conversion is not required.
