---
layout: post
lang: en
title: Astra. Quick Start
tags: [astra]
---

Installation of the Cesbo Astra is a simple process - enough only one binary file.

<!-- more -->

## Install

To install latest version launch next command on the server:

``` sh
wget -O /usr/bin/astra http://cesbo.com/download/astra/$(uname -m)
```

On our website available more versions <https://cesbo.com/download/astra/>. To install required version, just find it in the archive, copy link, and launch next command on the server:

``` sh
wget -O /usr/bin/astra link-to-required-version
```

After installation create directory for configuration files:

``` sh
mkdir /etc/astra
```

Save `license.txt` file with serial number from email attachment to `/etc/astra/license.txt` on the server. Email with `license.txt` you will receive immediatelly after purchase or after trial request.

## Check version

After installation or after update you may check installed version:

``` sh
astra -v
```

## Launch

To start astra launch next command:

``` sh
astra -c /etc/astra/astra.conf -p 8000 --log /var/log/astra.log --daemon
```

- `-c /etc/astra/astra.conf` - configuration file, will be created automatically after first launch
- `-p 8000` - port for web interface, you may use any value
- `--log /var/log/astra.log` - log-file
- `--daemon` - launch in background

After the launch web-interface will be available on <http://server-address:8000>. Default login and password is `admin`

**Attention!** To start Astra automatically on system startup needed additional settings in operation system: [Autorun](#autorun)

## Update

Before update create a backup with binary and with configuration files

``` sh
tar -Pzcf /etc/astra/backup.tar.gz /usr/bin/astra /etc/astra/astra.conf
```

To extract backup launch next commands:

``` sh
rm -f /usr/bin/astra
tar -Pxf /etc/astra/backup.tar.gz
```

Install update:

``` sh
rm -f /usr/bin/astra
wget -O /usr/bin/astra http://cesbo.com/download/astra/$(uname -m)
```

Restart Astra after update.

## Uninstall

To uninstall Astra just remove binary file, configuration directory, and log-file:

``` sh
rm -f /usr/bin/astra
rm -rf /etc/astra
rm -f /var/log/astra.log
```

## Autorun
