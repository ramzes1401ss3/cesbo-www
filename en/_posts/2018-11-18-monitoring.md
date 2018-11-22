---
layout: post
lang: en
title: Monitoring
tags: [dev]
---

## Monitoring. Export statistics and events

<!-- more -->

Export of statistics and events allows you to transfer data on the status of incoming streams, DVB adapter via HTTP in JSON format.   
To activate the export of statistics and events, you must specify the address of the monitoring server `http://example.local:port/path`.   
The address of the monitoring server can be specified in the web interface: `Settings → General → Monitoring`.   
If you are configuring with scripts, you can specify the address at the beginning of the script: init_event_request("ADDRESS").   
You can specify additional parameters in the address:  

**interval=30** - statistics transmission interval in seconds. Default, 30 seconds. Example: http://example.local:port/path#interval=60

**total=1** — to summarize the statistics. Example: http://example.local:port/path#interval=60&total=1 every minute, an array with one element is sent to the server - general statistics for one minute of the stream monitoring

### Start stream
Detailed information about the stream. Sent to the monitoring server when the stream starts

- **timestamp** — the start time of the stream
- **hostname** — server hostname
- **channel** — full stream configuration

### Stream analysis
During the stream operation, complete status information is transmitted:

- **timestamp** — time
- **channel_id** — the unique ID of the channel
- **input_id** — The sequence number of the source in the input list. Starts with 1
- **onair** — the value of the parameter "true" if the source is active or "false" if there are errors in the stream
- **bitrate** — input speed in Kbit/s
- **scrambled** — value of the parameter "true" if the stream is encrypted or "false" if the stream is open
- **cc_error** — CC-Error
- **pes_error** — PES-Error
Data is transmitted by an array of several elements each element is data for one second of observations, the number of elements in the array is determined by the frequency of statistics transmission. If statistics aggregation is enabled, then there is only one element in the array, the total number of errors and the average bitrate for the period equal to the statistics transmission frequency.

### Starting the adapter
Detailed information about the adapter. Transmitted to the monitoring server when the adapter is started

- **timestamp** — adapter start time
- **hostname** — server hostname
- **dvb** — full adapter configuration

### Adapter status
During the operation of the adapter, full information about the signal level and errors is transmitted.

- **timestamp** — time
- **dvb_id** — the unique identifier of the adapter
- **status** — signal status
- **signal** — signal level
- **snr** — signal/noise ratio
- **ber** — bit error rate
- **unc** — number of blocks with errors
- **bitrate** — input speed in Kbit/s

Status value-the number of 5 bits which describe the state of the tuner:  

- **SIGNAL** — the signal bit will be set when the tuner captures the signal
- **CARRIER** — steady signal reception
- **FEC** — reception FEC (forward error correction) data
- **SYNC** — received information for synchronization
- **LOCK** — the tuner is set to receive a signal
If the tuner is configured successfully, the status parameter will be set to 31  

The value of the signal and snr is passed as-is to get the result in percentage, you must perform the transformation: (X * 100) / 65535. If raw_signal is enabled, the dBm value and conversion is not required.
