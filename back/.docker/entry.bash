#!/bin/bash

cat /etc/cron.d/*.cron | crontab -
cron -f &
docker-php-entrypoint php-fpm
