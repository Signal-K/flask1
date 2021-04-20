#!/bin/bash

panic(){ echo -e "$@"; echo "Exiting."; exit 2; }
spacer(){ echo -e "\n - - - - - - - - - "; }
info(){ echo -e "\e[0;32m$@\e[0m"; }

[[ "root" == $(whoami) ]] || panic "Must run as root."

## PACKAGES MANAGEMENT 

packageList=()
packageList+=("certbot")
packageList+=("nginx")
packageList+=("pwgen")
packageList+=("python-pip")
packageList+=("python3-minimal")
packageList+=("python3-distutils")
packageList+=("sqlite3")
packageList+=("virtualenv")

info "Updating packages informations"
apt-get update >/dev/null
info "Installing packages ${packageList[@]}"
apt-get install --no-install-recommends -y ${packageList[@]} >/dev/null

## CONFIG MANAGEMENT 

info "OK, time for some questions."
default_pass=$(pwgen -s 16 1)

[[ -f ./config ]] && source ./config

spacer

[[ -z "$domain" ]] && read -p "Which domain will be used to connect to your bot (ex: maubot.example.com)? " domain
[[ -z "$domain" ]] && panic "You must provide a domain"

spacer

[[ -z "$home_server" ]] && read -e -i "matrix.com" -p "Which domain is the matrix 'Home Server' you register your bots on? " home_server
[[ -z "$home_server" ]] && panic "You must provide a matrix server" 

spacer

[[ -z "$maubot_user" ]] && read -e -i "maubot" -p "What will be your user name in the maubot interface? " maubot_user
[[ -z "$maubot_user" ]] && panic "You must give a valid username" 

spacer

[[ -z "$maubot_pass" ]] && read -e -i $default_pass -p "What will be the pass for user '$maubot_user' in the maubot interface? " maubot_pass
[[ -z "$maubot_pass" ]] && panic "You must give a valid password" 

spacer

[[ -z "$ssl" ]] && read -e -i "y" -n 1 -p "Do you want to enable SSL via letsencrypt [Y/n]? " ssl
ssl=${ssl:-y}

spacer

[[ -z "$synapse_shared_registration_secret" ]] && read -p "If the 'Home Server' is yours, what is the registration secret (ignore if you don't know what this is)? " synapse_shared_registration_secret 
synapse_shared_registration_secret=${synapse_shared_registration_secret:-synapse_shared_registration_secret}

spacer

[[ -z "$install_dir" ]] && read -e -i "/opt/maubot" -p "Which install dir to use (Default: /opt/maubot)? " install_dir
install_dir=${install_dir:-/opt/maubot}

spacer

[[ -z "$unix_user" ]] && read -e -i "www-data" -p "Which unix user will own and execute the maubot code? " unix_user
unix_user=${unix_user:-www-data}


spacer


## NGINX DEPLOYEMENT 

info "Deploying nginx"

cat << HEREDOC > /etc/nginx/sites-available/maubot.conf

server {
    listen      80;
    server_name $domain;
    location ^~ /.well-known/acme-challenge/ {
	default_type "text/plain";
	root  /var/www/letsencrypt;
    }
    location /_matrix/maubot/v1/logs {
	proxy_pass http://localhost:29316;
	proxy_http_version 1.1;
	proxy_set_header Upgrade \$http_upgrade;
	proxy_set_header Connection "Upgrade";
	proxy_set_header X-Forwarded-For \$remote_addr;
    }

    location /_matrix/maubot {
	proxy_pass http://localhost:29316;
	proxy_set_header X-Forwarded-For \$remote_addr;
    }
    location / {
	rewrite     ^(.*)   http://\$server_name/_matrix/maubot/ permanent;
    }

}
HEREDOC

ln -s /etc/nginx/sites-available/maubot.conf /etc/nginx/sites-enabled/

service nginx reload 

if [[ "Y" == ${ssl^^} ]]; then
 
	info "Retrieving letsencrypt certificate"
	mkdir -p /var/www/letsencrypt/.well-known/acme-challenge/
	[[ -f /etc/letsencrypt/live/$domain/fullchain.pem ]] || /usr/bin/letsencrypt certonly --webroot --agree-tos -w /var/www/letsencrypt/ --email "domains@$domain" --expand -d $domain >/dev/null
	[[ -f /etc/letsencrypt/live/$domain/fullchain.pem ]] || panic "Failed to get a certificate for domain $domain."

cat << HEREDOC > /etc/nginx/sites-available/maubot.conf

server {
    listen      80;

    server_name $domain;
			location ^~ /.well-known/acme-challenge/ {
			default_type "text/plain";
			root  /var/www/letsencrypt;
    }
		location / {
			rewrite     ^(.*)   https://\$server_name\$1 permanent;
   }
}
server {
    listen 443 ssl;
    server_name $domain;
    access_log  /var/log/nginx/maubot.access.log;
    error_log   /var/log/nginx/maubot.error.log;

    ssl                  on;
    ssl_certificate              /etc/letsencrypt/live/$domain/fullchain.pem;
    ssl_certificate_key         /etc/letsencrypt/live/$domain/privkey.pem; 
    ssl_session_timeout  5m;
    ssl_protocols TLSv1.1 TLSv1.2;
    ssl_ciphers         EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH;
    ssl_prefer_server_ciphers on;

    location /_matrix/maubot/v1/logs {
			proxy_pass http://localhost:29316;
			proxy_http_version 1.1;
			proxy_set_header Upgrade \$http_upgrade;
			proxy_set_header Connection "Upgrade";
			proxy_set_header X-Forwarded-For \$remote_addr;
    }

    location /_matrix/maubot {
			proxy_pass http://localhost:29316;
			proxy_set_header X-Forwarded-For \$remote_addr;
    }
    location / {
	rewrite     ^(.*)   https://\$server_name/_matrix/maubot/ permanent;
    }

}
HEREDOC

	service nginx reload 
fi

# MAUBOT DEPLOYMENT 

info "Installing maubot"

mkdir -p "$install_dir" 

cd "$install_dir"

virtualenv -p /usr/bin/python3 . >/dev/null

source $install_dir/bin/activate

info "Installing maubot dependencies"
pip install --upgrade maubot >/dev/null

mkdir -p $install_dir/{plugins,trash,logs}

cat << HEREDOC > "$install_dir/config.yaml"
# The full URI to the database. SQLite and Postgres are fully supported.
# Other DBMSes supported by SQLAlchemy may or may not work.
# Format examples:
#   SQLite:   sqlite:///filename.db
#   Postgres: postgres://username:password@hostname/dbname
database: sqlite:///maubot.db

plugin_directories:
    # The directory where uploaded new plugins should be stored.
    upload: ./plugins
    # The directories from which plugins should be loaded.
    # Duplicate plugin IDs will be moved to the trash.
    load:
    - ./plugins
    # The directory where old plugin versions and conflicting plugins should be moved.
    # Set to "delete" to delete files immediately.
    trash: ./trash
    # The directory where plugin databases should be stored.
    db: ./plugins

server:
    # The IP and port to listen to.
    hostname: 0.0.0.0
    port: 29316
    # Public base URL where the server is visible.
    public_url: https://$domain
    # The base management API path.
    base_path: /_matrix/maubot/v1
    # The base path for the UI.
    ui_base_path: /_matrix/maubot
    # The base path for plugin endpoints. The instance ID will be appended directly.
    plugin_base_path: /_matrix/maubot/plugin/
    # Override path from where to load UI resources.
    # Set to false to using pkg_resources to find the path.
    override_resource_path: false
    # The base appservice API path. Use / for legacy appservice API and /_matrix/app/v1 for v1.
    appservice_base_path: /_matrix/app/v1
    # The shared secret to sign API access tokens.
    # Set to "generate" to generate and save a new token at startup.
    unshared_secret: generate

# Shared registration secrets to allow registering new users from the management UI
registration_secrets:
    $home_server:
        # Client-server API URL
        url: https://$home_server
        # registration_shared_secret from synapse config
        secret: $synapse_shared_registration_secret

# List of administrator users. Plaintext passwords will be bcrypted on startup. Set empty password
# to prevent normal login. Root is a special user that can't have a password and will always exist.
admins:
    root: ""
    $maubot_user: "$maubot_pass"

# API feature switches.
api_features:
    login: true
    plugin: true
    plugin_upload: true
    instance: true
    instance_database: true
    client: true
    client_proxy: true
    client_auth: true
    dev_open: true
    log: true

# Python logging configuration.
#
# See section 16.7.2 of the Python documentation for more info:
# https://docs.python.org/3.6/library/logging.config.html#configuration-dictionary-schema
logging:
    version: 1
    formatters:
        colored:
            (): maubot.lib.color_log.ColorFormatter
            format: "[%(asctime)s] [%(levelname)s@%(name)s] %(message)s"
        normal:
            format: "[%(asctime)s] [%(levelname)s@%(name)s] %(message)s"
    handlers:
        file:
            class: logging.handlers.RotatingFileHandler
            formatter: normal
            filename: ./maubot.log
            maxBytes: 10485760
            backupCount: 10
        console:
            class: logging.StreamHandler
            formatter: colored
    loggers:
        maubot:
            level: DEBUG
        mautrix:
            level: DEBUG
        aiohttp:
            level: INFO
    root:
        level: DEBUG
        handlers: [file, console]
HEREDOC

info "Configure database"
alembic -x config=$install_dir/config.yaml upgrade head >/dev/null

# SYSTEMD MANAGEMENT

info "Installing systemd maubot service"
cat << HEREDOC > /etc/systemd/system/maubot.service

[Unit]
Description=Maubot web interface
Documentation=https://github.com/maubot/maubot
Requires=network.target 
After=network.target

[Service]
WorkingDirectory=$install_dir
Type=simple
User=www-data
ExecStart=$install_dir/bin/python3 -m maubot 

[Install]
WantedBy=multi-user.target


HEREDOC


touch "$install_dir/maubot.log"
chown -R "$unix_user" "$install_dir"

systemctl daemon-reload 
systemctl enable maubot
systemctl start maubot

info "Check your service state with 'systemctl status maubot'"

echo -e "\n\nCongratulations, you can now head to http://$domain and use your $maubot_user:$maubot_pass authentication, which of course you should save for future use ;) \n\n"
