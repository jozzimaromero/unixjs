#!/bin/sh

#lib
cat lib/jsonrpc/build/jsonrpc.min.js > unixjs.js
cat lib/jssha/build/sha.min.js >> unixjs.js
cat lib/paho/build/mqttws31.min.js >> unixjs.js
cat lib/jspdf/build/jspdf.min.js >> unixjs.js
cat lib/gwt/build/gwt.min.js >> unixjs.js

#bin
cat bin/build/desktop.min.js >> unixjs.js
cat bin/build/login.min.js >> unixjs.js
cat bin/build/block.min.js >> unixjs.js
cat bin/build/test.min.js >> unixjs.js
cat bin/build/cuentas.min.js >> unixjs.js

#boot 
cat boot/build/*.min.js >> unixjs.js