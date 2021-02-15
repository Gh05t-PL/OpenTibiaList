#!/usr/bin/env sh

sed -i "s|===SERVER===|$BACKEND_SERVER|" /usr/share/nginx/html/index.html
