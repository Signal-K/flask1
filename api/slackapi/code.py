python # bash
>>> from slackclient import SlackClient
>>> slack_client = SlackClient('your test token here')
>>> slack_client.api_call("api.test")

# https://www.notion.so/skinetics/Slack-API-5cbe02421423410ca4a1c2f731df56e2
# http://ar.skinetics.tech/stellarios/compass - Python section

"""See slack token in `.env`
https://api.slack.com/apps/A01U0HAUGH3?created=1 with droidology@allianceofdroids.org.au'''

"""
```bash

flask1 on 🌱 + 🚀  main via 👾 pyenv 
➜ cd slackapi

flask1/slackapi on 🌱 + 🚀  main via 👾 pyenv 
➜ source slackenv/bin/activate

flask1/slackapi on 🌱 + 🚀  main via 👾 pyenv (slackenv)
➜ cd ~   

~ via 👾 pyenv (slackenv)
➜ git clone https://github.com/sakshamsharma/zpyi ~/.zpyi
Cloning into '/home/codespace/.zpyi'...
remote: Enumerating objects: 108, done.
remote: Total 108 (delta 0), reused 0 (delta 0), pack-reused 108
Receiving objects: 100% (108/108), 33.60 KiB | 312.00 KiB/s, done.
Resolving deltas: 100% (43/43), done.

~ via 👾 pyenv (slackenv)took 2s 
➜ echo "source ~/.zpyi/zpyi.zsh" >> ~/.zshrc

~ via 👾 pyenv (slackenv)
➜ source ~/.zshrc

~ via 👾 pyenv (slackenv)
➜ cd -
/workspaces/flask1/slackapi

flask1/slackapi on 🌱 + 🚀  main via 👾 pyenv (slackenv)
➜ export SLACK_TOKEN1="wWYHT8n0snlGoFsGlTR1cwc4"

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)
➜ export SLACK_TOKEN="wWYHT8n0snlGoFsGlTR1cwc4"

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)
➜ python app.py
Unable to authenticate.

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)took 2s 
➜ slack_client = SlackClient(wWYHT8n0snlGoFsGlTR1cwc4)
zsh: number expected

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)
❯ python
Python 3.8.6 (default, Nov 18 2020, 04:48:50) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> slack_client = SlackClient(wWYHT8n0snlGoFsGlTR1cwc4)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'SlackClient' is not defined
>>> pip install SlackClient==1.0.0
  File "<stdin>", line 1
    pip install SlackClient==1.0.0
        ^
SyntaxError: invalid syntax
>>> 

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)took 33s 
➜ pip install slackclient==1.0.0
Requirement already satisfied: slackclient==1.0.0 in ./slackenv/lib/python3.8/site-packages (1.0.0)
Requirement already satisfied: requests in ./slackenv/lib/python3.8/site-packages (from slackclient==1.0.0) (2.25.1)
Requirement already satisfied: websocket-client in ./slackenv/lib/python3.8/site-packages (from slackclient==1.0.0) (0.58.0)
Requirement already satisfied: certifi>=2017.4.17 in ./slackenv/lib/python3.8/site-packages (from requests->slackclient==1.0.0) (2020.12.5)
Requirement already satisfied: idna<3,>=2.5 in ./slackenv/lib/python3.8/site-packages (from requests->slackclient==1.0.0) (2.10)
Requirement already satisfied: chardet<5,>=3.0.2 in ./slackenv/lib/python3.8/site-packages (from requests->slackclient==1.0.0) (4.0.0)
Requirement already satisfied: urllib3<1.27,>=1.21.1 in ./slackenv/lib/python3.8/site-packages (from requests->slackclient==1.0.0) (1.26.4)
Requirement already satisfied: six in ./slackenv/lib/python3.8/site-packages (from websocket-client->slackclient==1.0.0) (1.15.0)

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)
➜ from slackclient import SlackClient
from: can't read /var/mail/slackclient

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)
❯ sudo from slackclient import SlackClient
from: can't read /var/mail/slackclient

flask1/slackapi on 🌱 + 🚀  main [!] via 👾 pyenv (slackenv)
❯ python
Python 3.8.6 (default, Nov 18 2020, 04:48:50) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from slackclient import SlackClient
>>> slack_client = SlackClient("wWYHT8n0snlGoFsGlTR1cwc4")
>>> slack_client.api_call("api.test")
{'ok': False, 'error': 'invalid_auth'}
>>> slack_client = SlackClient("585712992336.1952588968581")
>>> slack_client.api_call("api.test")
{'ok': False, 'error': 'invalid_auth'}
>>> slack_client = SlackClient("2598c5c8333bd357a456ec307a902215")
>>> slack_client.api_call("api.test")
{'ok': False, 'error': 'invalid_auth'}
>>> slack_client = SlackClient("xapp-1-A01U0HAUGH3-1988508275648-bd347888019b08c2c1d73704b5cb009f2400421628787c68bef80f375618fa28")
>>> slack_client.api_call("api.test")
{'ok': False, 'error': 'invalid_auth'}
>>> 
```