FROM php:7.4-apache-buster

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer

RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis

RUN apt update \
    && apt install -y libzip-dev libxml2-dev libcurl4-openssl-dev pkg-config libssl-dev openssl libcurl4-openssl-dev

RUN pecl install -o -f mongodb \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable mongodb

RUN curl -O http://www.xmailserver.org/libxdiff-0.23.tar.gz \
    && tar -xzf libxdiff-0.23.tar.gz \
    && cd libxdiff-0.23/ \
    && ./configure \
    && make \
    && make install

RUN pecl install -o -f xdiff-2.0.1 \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable xdiff

RUN docker-php-ext-install \
    bcmath \
    sockets \
    zip \
    pdo \
    xml \
    ctype

RUN apt install librabbitmq-dev -y \
    && pecl install amqp \
    && docker-php-ext-enable amqp

RUN a2enmod headers
