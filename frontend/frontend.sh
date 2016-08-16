#!/bin/sh
cd ./server/
make clean
make
cd ../
./server/frontend
