#!/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
PATH_TO_CRONS="/.docker/crons/*.cron"
printenv | cat - $SCRIPTPATH$PATH_TO_CRONS | crontab -
cron -f &
docker-php-entrypoint php-fpm
