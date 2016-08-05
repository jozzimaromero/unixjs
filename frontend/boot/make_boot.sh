#!/bin/sh

cat init.js > boot.js
yuicompressor.sh boot.js