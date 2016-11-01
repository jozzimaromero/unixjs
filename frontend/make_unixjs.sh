#!/bin/sh

#unixjs
cat lib/jsonrpc/build/jsonrpc.min.js > unixjs.js
cat lib/jssha/build/sha.min.js >> unixjs.js
cat lib/paho/build/mqttws31.min.js >> unixjs.js
cat lib/jspdf/build/jspdf.min.js >> unixjs.js
#cat lib/gwt/build/gwt.min.js >> unixjs.js
cat lib/gwt/gwt.js >> unixjs.js
#cat boot/build/boot.min.js >> unixjs.js
cat boot/boot.js >> unixjs.js
#cat bin/build/bin.min.js >> unixjs.js
cat bin/bin.js >> unixjs.js