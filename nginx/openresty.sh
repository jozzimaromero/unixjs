#!/bin/sh

if [ "$1" = "start" ];
then
    sudo ./openresty/bin/openresty -c $(pwd)/unixjs.conf

elif [ "$1" = "stop" ];
then
    sudo pkill openresty
fi
