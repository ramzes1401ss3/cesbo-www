---
layout: frame
lang: en
title:  LNB
---

#### LNB - LNB parameters (heterodyne frequency)  

Default: **LOF1 - 9750 МГц, LOF2 - 10600 МГц, SLOF - 11700 МГц**  
For circular polarized converters (e.g. 36°E, 56°E), it is necessary to set the value **10750 МГц** in all fields  
**LOF1** - Low sub-band (lower sub-band, MHz)  
**LOF2** - High sub-band (upper sub-band, MHz)  
**SLOF** - v  

**LNB Sharing. Disable LNB voltage supply and tone signal** - disable LNB control. Allows you to connect several DVB-adapters to one converter through a passive divider. On the divider, one adapter must be active, the other DVB adapters must be passive. All adapters on one divider must work in one polarization and in one subband (frequency is greater or less than the value of slof) 

**Force Tone** - send 22 KHz tone signal  

---
#### LNB FAQ: 

**Voltage 13/18 Volts** are not only the supply voltage but also the switching signals of polarization. 13 V is the horizontal h (left L) switching signal in the range of 11-14 Volts, and 18 V is the vertical V (right R) switching signal in the range of 16-20 Volts

The **22 kHz** signal is a sub-band switching signal. When 22 kHz is on, the upper band (High Band) is taken and in the absence of this signal, the lower band (Low Band) is taken respectively. In case of universal Converter this option is not active, the selection is made automatically depending on the selected frequency.
