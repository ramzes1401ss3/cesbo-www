---
layout: frame
lang: en
title: Stream Settings
---

##### Enable

By the default stream enabled.

##### Name

Stream name

##### ID

Unique stream identifier. Generated automatically when creating a new channel, or you can define indentifier self

##### Multi Program Stream

Turn on MPTS mode, to combine all inputs into the single stream

##### Start stream on demand

Run stream only if there are active clients (only for http output)
By the default stream works on demand. Stream works permanently if:

- in the Output uses next protocols: UDP, File, HLS
- in the HTTP Play settings enabled access with HLS
- in General settings the on demand mode is turned off

##### Keep Active

Option available when stream started on demand. Delay before stopping the flow if there are no active connections. Default: 0 (turn off immediately)

---

##### Input List

List of the stream sources.
If Multi Program Stream enabled, then Astra will combine all sources into the single stream - MPTS.
Otherwise will use stream redundancy - for example if first source stop working, then Astra will use second source automatically.

##### New Input

Append source. Source address could be defined in [URL-format](url-format/) or with [configuration dialog](input/).

---

##### Output List

List of the destination addresses.

##### New Output

Append destination. Destination address could be defined in [URL-format](url-format/) or with [configuration dialog](output/).

---

##### Remove

Remove stream permanently

##### Apply

Apply changes immediately and save into configuration file
