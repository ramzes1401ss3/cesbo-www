---
layout: post
lang: en
title: Service
tags: [dev]
css:
  - /assets/css/icons.css
---

#### Service

<!-- more -->

**SERVICE TYPE** - type of service, possible values:  
 - **Default**. Original service type - by default, the original service type  
 - **Video** - video service  
 - **Radio** - radio service  
 - **Teletext** - teletext  

**SERVICE PROVIDER **- the name of the service provider  
**SERVICE NAME** - service name  
**CODEPAGE** - code page, possible values:  
- Default: Latin (ISO 6937) (by default)
- West European (ISO 8859-1)
- East European (ISO 8859-2)
- South European (ISO 8859-3)
- North European (ISO 8859-4)
- Cyrillic (ISO 8859-5)
- Arabic (ISO 8859-6)
- Greek (ISO 8859-7)
- Hebrew (ISO 8859-8)
- Turkish (ISO 8859-9)
- Nordic (ISO 8859-10)
- Thai (ISO 8859-11)
- Baltic (ISO 8859-13)
- West European (ISO 8859-15)
- UTF-8

**HBBTV URL** - address page hbbtv  
**CONDITIONAL ACCESS** - conditional access  
**NEW CAS** - add conditional access system  
CAS #1 - field select a previously created CAS in Settings > CAS, by default: NONE
To add a new CAS, go to Settings > CAS  

---

#### New CAS - new conditional access system  
 - **NAME** - CAS name  
 - **SUPER CAS ID (HEX)** - eight-digit value  
 - **ECMG CHANNEL ID** - the channel identifier generator coded messages  
 - **ECMG ADDRESS** - address of the coded message generator  
 - **ECMG PORT** - coded message generator port  
 - **CRYPTO PERIOD** - a cryptographic period  
 - EMMG PROTOCOL** - the Protocol used to generate encoded messages to the card to check for compliance with some   criterion, by default, TCP  
 - EMMG PORT** - the port used to generate coded messages to the map to check for compliance with some criterion  
 - EMM PID** - PID (Entitlement Management Message) - coded message to the card for verification of compliance with some criterion. EMM contains authorization data, i.e. the rights themselves: the status of the subscription, what channels, dates, and more. Transmitted along with the ECM  
 - EMM PRIVATE DATA (HEX)** - coded message to confidential data card  
**Apply** - apply  

---

**ECM PID** - a unique identifier for the ECM packets.    
**ECM PRIVATE DATA (HEX)** - the conditional access system data is added to the ECM stream description in the PMT table  
**ACCESS CRITERIA (HEX)** - data of the conditional access system are transferred to the conditional access server when forming ECM packages  
**REMOVE CAS** - remove conditional access system  
