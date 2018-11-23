---
layout: post
lang: en
title: Reset Password
tags: [dev]
---

This method works with any Astra version

<!-- more -->
Connect to your server and launch in console:

`sh <(wget -qO- https://cesbo.com/download/astra/scripts/pass.sh)`  
Confirm password reset. If you have several processes, script asks confirmation for each. 
Restart Astra and login to the web interface with default login and password: admin  

This script looking running processes with name astra. If you use different process name (eg. renamed binary file), then append process name to the end of the command line. Example:

`sh <(wget -qO- https://cesbo.com/download/astra/scripts/pass.sh) a561`
