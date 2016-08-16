#!/bin/sh
cd ./frontend/server/
make clean
cd ../../
git add .
git commit -m "$1"
git push origin master
