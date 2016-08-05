#!/bin/sh

cat desktop.js > bin.js
cat login.js >> bin.js
cat block.js >> bin.js
cat test.js >> bin.js
cat cuentas.js >> bin.js

yuicompressor.sh bin.js