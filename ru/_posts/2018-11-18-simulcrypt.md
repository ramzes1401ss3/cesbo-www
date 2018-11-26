---
layout: post
lang: ru
title: Simulcrypt
tags: [astra]
---

## Simulcrypt
Simulcrypt - is a DVB protocol to enable use of multiple Conditional Access Systems in the same channel at the same time.


<!-- more -->

### Definitions

- **CAS (Conditional Access System)** - is a complex of the several systems to protect channels from unauthorised access
- **CSA (Common Scrambling Algorithm)** - is a most popular algorithm in broadcasting networks to protect video and audio content
- **Scrambler** - is a part of the system CAS for scrambling data in the transport stream with CSA. In our case this is Astra
- **ECM (Entitlement Control Message)** - is an encrypted packet with keyword for CSA descrambler
- **ECMG (ECM Generator)** - is a generator of the ECM packets
- **EMM (Entitlement Management Message)**** - is an packet with subscription information for CSA descrambler
- **EMMG (EMM Generator)** - is a generator of the EMM packets


### CAS Configuration
CAS Configuration located in Settings → CAS and has next options:

- **Name** - any name to find CAS in the stream settings
- **Super CAS ID** - identifier of the CAS
- **ECMG Channel ID** -
- **ECMG Address** -
- **ECMG Port** -
- **Crypto Period** - is an interval in seconds to generate new CSA keyword. Usually - 10 seconds
- **EMMG Protocol** - protocol to receive data from EMMG
- **EMMG Port** - local port to accept connection from EMMG
- **EMM PID** - packet identifier for EMM packets. Should be in range 32-8190
- **EMM Private Data** - private data to append into the CAT table
Most of this options provided by the CAS provider

### Stream Configuration

Stream settings → Service → Conditional Access

- **CAS** - CAS Configuration
- **ECM PID - packet** identifier for ECM packets. Should be in range 32-8190
- **ECM Private Data** - private data to append into the PMT table
- **Access Criteria** - this parameter carries the access criteria concerning an ECM stream
