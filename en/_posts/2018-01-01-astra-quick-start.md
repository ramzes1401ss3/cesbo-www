---
layout: post
lang: en
title: Astra. Quick Start
tags: [astra]
permalink: /en/astra-quick-start/
---

Installation of the Cesbo Astra is a simple process - enough only one binary file.

<!-- more -->

## Install

Download binary file and set execute permission. On the server you may use next command:

``` sh
curl -Lo /usr/bin/astra http://cesbo.com/download/astra/$(uname -m)
chmod +x /usr/bin/astra
```

After installation, register service in the **systemd** - system service manager in most Linux distributions:

``` sh
astra init
```

Launch Astra:

``` sh
systemctl start astra
```

After start web-interface will be available on: <http://server-address:8000>. Default login and password: `admin`

By the default, for web-interface and control Astra used port **8000**, you may define any port:

``` sh
astra init 4000
```

Enable automatically launch on system startup:

``` sh
systemctl enable astra
```

## Process management

Command to manage process with systemd:

- `systemctl start astra` - start
- `systemctl stop astra` - stop
- `systemctl restart astra` - restart
- `systemctl enable astra` - turn autorun on
- `systemctl disable astra` - turn autorun off

## Check version

After installation or after update you may check installed version:

``` sh
astra -v
```

## Update

Before update create a backup with binary and with configuration files

``` sh
tar -Pzcf ~/astra-backup.tar.gz /usr/bin/astra /etc/astra
```

To extract backup launch next commands:

``` sh
rm -f /usr/bin/astra
tar -Pxf ~/astra-backup.tar.gz
```

Install update:

``` sh
rm -f /usr/bin/astra
curl -Lo /usr/bin/astra http://cesbo.com/download/astra/$(uname -m)
chmod +x /usr/bin/astra
```

Restart Astra after update.

``` sh
systemctl restart astra
```

## Uninstall

Stop service and turn autorun off:

``` sh
systemctl stop astra
systemctl disable astra
```

Remove service from the service manager:

``` sh
astra remove
```

Remove binary file and configuration files:

``` sh
rm -rf /usr/bin/astra /etc/astra
```

## Install archived version

On the web site also available archive: <http://cesbo.com/download/astra/>.
Find requried version, download it, and set execute permission:

``` sh
curl -Lo /usr/bin/astra linu-to-requried-version
chmod +x /usr/bin/astra
```
