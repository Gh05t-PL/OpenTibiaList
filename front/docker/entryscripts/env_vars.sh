#!/usr/bin/env sh

sed -i "s|===API_HOST===|$BACKEND_API_HOST|" /usr/share/nginx/html/index.html
nginx -g "daemon off;"
