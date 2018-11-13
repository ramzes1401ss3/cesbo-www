---
layout: post
lang: en
title: Astra 5.64 Changelog
tags: [astra,changelog]
---

- **dvb_input**: fix stream_id option (multi plp on dvb-t2)
- **simulcrypt**: do not scramble stream while ECMG is not ready
- **simulcrypt**: fix reconnect to ECMG server
- **simulcrypt**: do not update CW and ECM if ECMG is not available
- **analyze**: do not mark stream as scrambled if no PES-errors (some streams have a scrambled bit but actually not scrambled)
- **watchdog**: increase watchdog delay for http_input if buffer_time option used
