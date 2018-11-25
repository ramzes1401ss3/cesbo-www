---
layout: post
lang: en
title: Access authorization
tags: [dev]
---

Authorization allows you to control access to channels and allows you to save viewing statistics.

<!-- more -->

#### Enable authorization:

Go to Settings -> HTTP Authentication and check the check box **Enable built-in HTTP/HLS authentication** 

![Image](/assets/post-img/authentication.png){:class="img-fluid"}

After that - click the "Apply & Restart" button after this action - users (in the Settings -> Users section) will have additional authorization types.

### Users

This type of authorization will allow you to use tokens, access by ip, login/password, limiting connections and the ability to set the date on which the user is active.  


Go to Settings -> Users, and in the upper right corner click on the NEW USER button. The add user window will open.  

![Image](/assets/post-img/settings-users.png){:class="img-fluid"}

Description of fields:  

- **LOGIN** - Username. (example "testuser")  
- **PASSWORD** - password (example "87326848") 
- **COMMENT** - comment (example "test user") 
- **TYPE** - user type:  
  - **user** - cannot access the web interface. The account is used only for authorization (for example in VLC)
  - **observer** - adds access rights to the web interface with read-only rights 
  - **administrator** - full access rights.  
- **TOKEN** - token (example "8732684ydbeb8")  
- **IP** - IP address of the user.   
- **STB** - option reserved for middleware  
- **EXPIRATION** - It is possible to set the time for which the account will be active.   
- **LIMIT CONNECTIONS** - limiting connections to client devices.  
- **PACKAGES** - channel packages.   

client authorization examples: 
**stream address?auth=testuser:87326848** (login and password)   
**stream address?token=112277668833743** (token)  

### HTTP Authentication

###### MINISTRA/STALKER AUTORIZATION  
В поле вводится адрес сталкер портала (например "http://testdomain.com/stalker_portal")  
Опция включает поддержку "Temporary URL" для работы с Ministra/Stalker portal  
В настройках Ministra/Stalker portal включите опцию "Temporary URL - Flussonic support"  

###### ALLOW ACCESS WITHOUT AUTHORIZATIONNEW IP

It is possible to add IP addresses / networks whose users will have access to streams without authorization.

###### DENY ACCESSNEW IP

Black list. It is possible to add IP addresses / networks whose users will not have access to streams, even if they have a login / password or a token.

