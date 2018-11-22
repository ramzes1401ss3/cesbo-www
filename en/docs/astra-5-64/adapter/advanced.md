---
layout: frame
lang: en
title:  advanced
---

#### Advanced

**MODULATION**   
**Default: Auto**  
Default now for DVB-S - QPSK, DVB-S2 - PSK8 

---

**FEC - forward error correction** - forward error correction    
**Default: Auto** (by default)    

---

**ROLL-OFF** - spectrum efficiency. used for DVB-S2 only, possible value: Default: 35, 25, 20, AUTO  

**STREAM ID** - PLP stream ID, only for DVB-S2 and DVB-T2:  
- PLS MODE -  possible value:  Root, Gold, Combo  
- PLS CODE -  possible value:  0 - 262143  
- STREAM ID -  possible value:  0 - 255  

---

**TIMEOUT** - delay in seconds to DVR error checking, default 2 seconds  

**DDCI** - bind the adapter to DVB-CI Digital Devices. The value corresponds to the adapter number on the system 

**Budget Mode. Disable hardware PID filtering** - - disable hardware filtering of the data. Astra will get all the stream from the DVB adapter. The parameter is used to transmit the entire transponder or for legacy DVB adapters without hardware filtering (e.g. SkyStar 2). By default, hardware filtering is enabled 

**Signal in dBm** - output signal level in dBm. For adapters TBS, the driver parameter must be set to `esno=1` in the file `/etc/modprobe.d/tbsfe.conf`. DVB adapters with demodulator CXD2820R transmit the value of the signal level in dBm by default   

**Scale DD MaxS8 SNR** - correction of signal level display for DD MaxS8 adapters  

**CA DELAY** - delay, in seconds, before sending channel information to the conditional access module  
