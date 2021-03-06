function JsonRPC(c,b,d){if(!(this instanceof JsonRPC)){return new JsonRPC(c,b,d)}this.uri=c;if(typeof b!="undefined"){for(var a=0;a<b.length;a++){this.addRPCMethod(b[a],a)}}if(typeof d!="undefined"){for(var a=0;a<d.length;a++){this.addRPCMethod(d[a],null)}}}JsonRPC.prototype.getXHR=function(){var b;if(typeof XMLHttpRequest!="undefined"){b=new XMLHttpRequest()}else{try{b=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{b=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(a){}try{b=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){}throw new Error("No XML HTTP Rewquest support")}return b};JsonRPC.prototype.runXHR=function(e,a,f,d){e.setRequestHeader("Content-Type","application/json");var c={id:f,method:a,params:d};var b=JSON.stringify(c);e.send(b)};JsonRPC.prototype.syncCall=function(b,g,f){var d=this.getXHR();d.open("post",this.uri,false);this.runXHR(d,b,g,f);if(d.status!=200){throw Error("Invalid response:"+d.status)}if(g!=null){var a=null;try{a=JSON.parse(d.responseText)}catch(c){throw Error("Invalid JSON-RPC response")}if(a.error!=null){throw Error(a.error)}return a.result}};JsonRPC.prototype.asyncCall=function(b,f,e,c,a){var d=this.getXHR();d.open("post",this.uri,true);d.onreadystatechange=function(){if(d.readyState!=4){return}if(d.status==200){if(f!=null){var g=null;try{g=JSON.parse(d.responseText)}catch(h){a({type:"protocol",error:"invalid response"});return}if(g.error!=null){a({type:"response",error:g.error})}else{c(g.result)}}else{c()}}else{a({type:"transport",error:d.status})}};this.runXHR(d,b,f,e)};JsonRPC.prototype.addRPCMethod=function(c,b){var a=function(){var d=new Array();for(var e=0;e<arguments.length;e++){d[e]=arguments[e]}if(a.on_result!=null){this.asyncCall(c,b,d,a.on_result,a.on_error)}else{return this.syncCall(c,b,d)}};a.on_error=function(d){throw Error(d.error)};a.on_result=null;this[c]=a};(function(T){function z(a,c,b){var g=0,f=[0],h="",l=null,h=b||"UTF8";if("UTF8"!==h&&"UTF16"!==h)throw"encoding must be UTF8 or UTF16";if("HEX"===c){if(0!==a.length%2)throw"srcString of HEX type must be in byte increments";l=B(a);g=l.binLen;f=l.value}else if("ASCII"===c||"TEXT"===c)l=J(a,h),g=l.binLen,f=l.value;else if("B64"===c)l=K(a),g=l.binLen,f=l.value;else throw"inputFormat must be HEX, TEXT, ASCII, or B64";this.getHash=function(a,c,b,h){var l=null,d=f.slice(),n=g,p;3===arguments.length?"number"!==
typeof b&&(h=b,b=1):2===arguments.length&&(b=1);if(b!==parseInt(b,10)||1>b)throw"numRounds must a integer >= 1";switch(c){case "HEX":l=L;break;case "B64":l=M;break;default:throw"format must be HEX or B64";}if("SHA-1"===a)for(p=0;p<b;p++)d=y(d,n),n=160;else if("SHA-224"===a)for(p=0;p<b;p++)d=v(d,n,a),n=224;else if("SHA-256"===a)for(p=0;p<b;p++)d=v(d,n,a),n=256;else if("SHA-384"===a)for(p=0;p<b;p++)d=v(d,n,a),n=384;else if("SHA-512"===a)for(p=0;p<b;p++)d=v(d,n,a),n=512;else throw"Chosen SHA variant is not supported";
return l(d,N(h))};this.getHMAC=function(a,b,c,l,s){var d,n,p,m,w=[],x=[];d=null;switch(l){case "HEX":l=L;break;case "B64":l=M;break;default:throw"outputFormat must be HEX or B64";}if("SHA-1"===c)n=64,m=160;else if("SHA-224"===c)n=64,m=224;else if("SHA-256"===c)n=64,m=256;else if("SHA-384"===c)n=128,m=384;else if("SHA-512"===c)n=128,m=512;else throw"Chosen SHA variant is not supported";if("HEX"===b)d=B(a),p=d.binLen,d=d.value;else if("ASCII"===b||"TEXT"===b)d=J(a,h),p=d.binLen,d=d.value;else if("B64"===
b)d=K(a),p=d.binLen,d=d.value;else throw"inputFormat must be HEX, TEXT, ASCII, or B64";a=8*n;b=n/4-1;n<p/8?(d="SHA-1"===c?y(d,p):v(d,p,c),d[b]&=4294967040):n>p/8&&(d[b]&=4294967040);for(n=0;n<=b;n+=1)w[n]=d[n]^909522486,x[n]=d[n]^1549556828;c="SHA-1"===c?y(x.concat(y(w.concat(f),a+g)),a+m):v(x.concat(v(w.concat(f),a+g,c)),a+m,c);return l(c,N(s))}}function s(a,c){this.a=a;this.b=c}function J(a,c){var b=[],g,f=[],h=0,l;if("UTF8"===c)for(l=0;l<a.length;l+=1)for(g=a.charCodeAt(l),f=[],2048<g?(f[0]=224|
(g&61440)>>>12,f[1]=128|(g&4032)>>>6,f[2]=128|g&63):128<g?(f[0]=192|(g&1984)>>>6,f[1]=128|g&63):f[0]=g,g=0;g<f.length;g+=1)b[h>>>2]|=f[g]<<24-h%4*8,h+=1;else if("UTF16"===c)for(l=0;l<a.length;l+=1)b[h>>>2]|=a.charCodeAt(l)<<16-h%4*8,h+=2;return{value:b,binLen:8*h}}function B(a){var c=[],b=a.length,g,f;if(0!==b%2)throw"String of HEX type must be in byte increments";for(g=0;g<b;g+=2){f=parseInt(a.substr(g,2),16);if(isNaN(f))throw"String of HEX type contains invalid characters";c[g>>>3]|=f<<24-g%8*4}return{value:c,
binLen:4*b}}function K(a){var c=[],b=0,g,f,h,l,r;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw"Invalid character in base-64 string";g=a.indexOf("=");a=a.replace(/\=/g,"");if(-1!==g&&g<a.length)throw"Invalid '=' found in base-64 string";for(f=0;f<a.length;f+=4){r=a.substr(f,4);for(h=l=0;h<r.length;h+=1)g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(r[h]),l|=g<<18-6*h;for(h=0;h<r.length-1;h+=1)c[b>>2]|=(l>>>16-8*h&255)<<24-b%4*8,b+=1}return{value:c,binLen:8*b}}function L(a,
c){var b="",g=4*a.length,f,h;for(f=0;f<g;f+=1)h=a[f>>>2]>>>8*(3-f%4),b+="0123456789abcdef".charAt(h>>>4&15)+"0123456789abcdef".charAt(h&15);return c.outputUpper?b.toUpperCase():b}function M(a,c){var b="",g=4*a.length,f,h,l;for(f=0;f<g;f+=3)for(l=(a[f>>>2]>>>8*(3-f%4)&255)<<16|(a[f+1>>>2]>>>8*(3-(f+1)%4)&255)<<8|a[f+2>>>2]>>>8*(3-(f+2)%4)&255,h=0;4>h;h+=1)b=8*f+6*h<=32*a.length?b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(l>>>6*(3-h)&63):b+c.b64Pad;return b}function N(a){var c=
{outputUpper:!1,b64Pad:"="};try{a.hasOwnProperty("outputUpper")&&(c.outputUpper=a.outputUpper),a.hasOwnProperty("b64Pad")&&(c.b64Pad=a.b64Pad)}catch(b){}if("boolean"!==typeof c.outputUpper)throw"Invalid outputUpper formatting option";if("string"!==typeof c.b64Pad)throw"Invalid b64Pad formatting option";return c}function U(a,c){return a<<c|a>>>32-c}function u(a,c){return a>>>c|a<<32-c}function t(a,c){var b=null,b=new s(a.a,a.b);return b=32>=c?new s(b.a>>>c|b.b<<32-c&4294967295,b.b>>>c|b.a<<32-c&4294967295):
new s(b.b>>>c-32|b.a<<64-c&4294967295,b.a>>>c-32|b.b<<64-c&4294967295)}function O(a,c){var b=null;return b=32>=c?new s(a.a>>>c,a.b>>>c|a.a<<32-c&4294967295):new s(0,a.a>>>c-32)}function V(a,c,b){return a^c^b}function P(a,c,b){return a&c^~a&b}function W(a,c,b){return new s(a.a&c.a^~a.a&b.a,a.b&c.b^~a.b&b.b)}function Q(a,c,b){return a&c^a&b^c&b}function X(a,c,b){return new s(a.a&c.a^a.a&b.a^c.a&b.a,a.b&c.b^a.b&b.b^c.b&b.b)}function Y(a){return u(a,2)^u(a,13)^u(a,22)}function Z(a){var c=t(a,28),b=t(a,
34);a=t(a,39);return new s(c.a^b.a^a.a,c.b^b.b^a.b)}function $(a){return u(a,6)^u(a,11)^u(a,25)}function aa(a){var c=t(a,14),b=t(a,18);a=t(a,41);return new s(c.a^b.a^a.a,c.b^b.b^a.b)}function ba(a){return u(a,7)^u(a,18)^a>>>3}function ca(a){var c=t(a,1),b=t(a,8);a=O(a,7);return new s(c.a^b.a^a.a,c.b^b.b^a.b)}function da(a){return u(a,17)^u(a,19)^a>>>10}function ea(a){var c=t(a,19),b=t(a,61);a=O(a,6);return new s(c.a^b.a^a.a,c.b^b.b^a.b)}function R(a,c){var b=(a&65535)+(c&65535);return((a>>>16)+(c>>>
16)+(b>>>16)&65535)<<16|b&65535}function fa(a,c,b,g){var f=(a&65535)+(c&65535)+(b&65535)+(g&65535);return((a>>>16)+(c>>>16)+(b>>>16)+(g>>>16)+(f>>>16)&65535)<<16|f&65535}function S(a,c,b,g,f){var h=(a&65535)+(c&65535)+(b&65535)+(g&65535)+(f&65535);return((a>>>16)+(c>>>16)+(b>>>16)+(g>>>16)+(f>>>16)+(h>>>16)&65535)<<16|h&65535}function ga(a,c){var b,g,f;b=(a.b&65535)+(c.b&65535);g=(a.b>>>16)+(c.b>>>16)+(b>>>16);f=(g&65535)<<16|b&65535;b=(a.a&65535)+(c.a&65535)+(g>>>16);g=(a.a>>>16)+(c.a>>>16)+(b>>>
16);return new s((g&65535)<<16|b&65535,f)}function ha(a,c,b,g){var f,h,l;f=(a.b&65535)+(c.b&65535)+(b.b&65535)+(g.b&65535);h=(a.b>>>16)+(c.b>>>16)+(b.b>>>16)+(g.b>>>16)+(f>>>16);l=(h&65535)<<16|f&65535;f=(a.a&65535)+(c.a&65535)+(b.a&65535)+(g.a&65535)+(h>>>16);h=(a.a>>>16)+(c.a>>>16)+(b.a>>>16)+(g.a>>>16)+(f>>>16);return new s((h&65535)<<16|f&65535,l)}function ia(a,c,b,g,f){var h,l,r;h=(a.b&65535)+(c.b&65535)+(b.b&65535)+(g.b&65535)+(f.b&65535);l=(a.b>>>16)+(c.b>>>16)+(b.b>>>16)+(g.b>>>16)+(f.b>>>
16)+(h>>>16);r=(l&65535)<<16|h&65535;h=(a.a&65535)+(c.a&65535)+(b.a&65535)+(g.a&65535)+(f.a&65535)+(l>>>16);l=(a.a>>>16)+(c.a>>>16)+(b.a>>>16)+(g.a>>>16)+(f.a>>>16)+(h>>>16);return new s((l&65535)<<16|h&65535,r)}function y(a,c){var b=[],g,f,h,l,r,s,u=P,t=V,v=Q,d=U,n=R,p,m,w=S,x,q=[1732584193,4023233417,2562383102,271733878,3285377520];a[c>>>5]|=128<<24-c%32;a[(c+65>>>9<<4)+15]=c;x=a.length;for(p=0;p<x;p+=16){g=q[0];f=q[1];h=q[2];l=q[3];r=q[4];for(m=0;80>m;m+=1)b[m]=16>m?a[m+p]:d(b[m-3]^b[m-8]^b[m-
14]^b[m-16],1),s=20>m?w(d(g,5),u(f,h,l),r,1518500249,b[m]):40>m?w(d(g,5),t(f,h,l),r,1859775393,b[m]):60>m?w(d(g,5),v(f,h,l),r,2400959708,b[m]):w(d(g,5),t(f,h,l),r,3395469782,b[m]),r=l,l=h,h=d(f,30),f=g,g=s;q[0]=n(g,q[0]);q[1]=n(f,q[1]);q[2]=n(h,q[2]);q[3]=n(l,q[3]);q[4]=n(r,q[4])}return q}function v(a,c,b){var g,f,h,l,r,t,u,v,z,d,n,p,m,w,x,q,y,C,D,E,F,G,H,I,e,A=[],B,k=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,
1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,
2361852424,2428436474,2756734187,3204031479,3329325298];d=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428];f=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];if("SHA-224"===b||"SHA-256"===b)n=64,g=(c+65>>>9<<4)+15,w=16,x=1,e=Number,q=R,y=fa,C=S,D=ba,E=da,F=Y,G=$,I=Q,H=P,d="SHA-224"===b?d:f;else if("SHA-384"===b||"SHA-512"===b)n=80,g=(c+128>>>10<<5)+31,w=32,x=2,e=s,q=ga,y=ha,C=ia,D=ca,E=ea,F=Z,G=aa,I=X,H=W,k=[new e(k[0],
3609767458),new e(k[1],602891725),new e(k[2],3964484399),new e(k[3],2173295548),new e(k[4],4081628472),new e(k[5],3053834265),new e(k[6],2937671579),new e(k[7],3664609560),new e(k[8],2734883394),new e(k[9],1164996542),new e(k[10],1323610764),new e(k[11],3590304994),new e(k[12],4068182383),new e(k[13],991336113),new e(k[14],633803317),new e(k[15],3479774868),new e(k[16],2666613458),new e(k[17],944711139),new e(k[18],2341262773),new e(k[19],2007800933),new e(k[20],1495990901),new e(k[21],1856431235),
new e(k[22],3175218132),new e(k[23],2198950837),new e(k[24],3999719339),new e(k[25],766784016),new e(k[26],2566594879),new e(k[27],3203337956),new e(k[28],1034457026),new e(k[29],2466948901),new e(k[30],3758326383),new e(k[31],168717936),new e(k[32],1188179964),new e(k[33],1546045734),new e(k[34],1522805485),new e(k[35],2643833823),new e(k[36],2343527390),new e(k[37],1014477480),new e(k[38],1206759142),new e(k[39],344077627),new e(k[40],1290863460),new e(k[41],3158454273),new e(k[42],3505952657),
new e(k[43],106217008),new e(k[44],3606008344),new e(k[45],1432725776),new e(k[46],1467031594),new e(k[47],851169720),new e(k[48],3100823752),new e(k[49],1363258195),new e(k[50],3750685593),new e(k[51],3785050280),new e(k[52],3318307427),new e(k[53],3812723403),new e(k[54],2003034995),new e(k[55],3602036899),new e(k[56],1575990012),new e(k[57],1125592928),new e(k[58],2716904306),new e(k[59],442776044),new e(k[60],593698344),new e(k[61],3733110249),new e(k[62],2999351573),new e(k[63],3815920427),new e(3391569614,
3928383900),new e(3515267271,566280711),new e(3940187606,3454069534),new e(4118630271,4000239992),new e(116418474,1914138554),new e(174292421,2731055270),new e(289380356,3203993006),new e(460393269,320620315),new e(685471733,587496836),new e(852142971,1086792851),new e(1017036298,365543100),new e(1126000580,2618297676),new e(1288033470,3409855158),new e(1501505948,4234509866),new e(1607167915,987167468),new e(1816402316,1246189591)],d="SHA-384"===b?[new e(3418070365,d[0]),new e(1654270250,d[1]),new e(2438529370,
d[2]),new e(355462360,d[3]),new e(1731405415,d[4]),new e(41048885895,d[5]),new e(3675008525,d[6]),new e(1203062813,d[7])]:[new e(f[0],4089235720),new e(f[1],2227873595),new e(f[2],4271175723),new e(f[3],1595750129),new e(f[4],2917565137),new e(f[5],725511199),new e(f[6],4215389547),new e(f[7],327033209)];else throw"Unexpected error in SHA-2 implementation";a[c>>>5]|=128<<24-c%32;a[g]=c;B=a.length;for(p=0;p<B;p+=w){c=d[0];g=d[1];f=d[2];h=d[3];l=d[4];r=d[5];t=d[6];u=d[7];for(m=0;m<n;m+=1)A[m]=16>m?
new e(a[m*x+p],a[m*x+p+1]):y(E(A[m-2]),A[m-7],D(A[m-15]),A[m-16]),v=C(u,G(l),H(l,r,t),k[m],A[m]),z=q(F(c),I(c,g,f)),u=t,t=r,r=l,l=q(h,v),h=f,f=g,g=c,c=q(v,z);d[0]=q(c,d[0]);d[1]=q(g,d[1]);d[2]=q(f,d[2]);d[3]=q(h,d[3]);d[4]=q(l,d[4]);d[5]=q(r,d[5]);d[6]=q(t,d[6]);d[7]=q(u,d[7])}if("SHA-224"===b)a=[d[0],d[1],d[2],d[3],d[4],d[5],d[6]];else if("SHA-256"===b)a=d;else if("SHA-384"===b)a=[d[0].a,d[0].b,d[1].a,d[1].b,d[2].a,d[2].b,d[3].a,d[3].b,d[4].a,d[4].b,d[5].a,d[5].b];else if("SHA-512"===b)a=[d[0].a,
d[0].b,d[1].a,d[1].b,d[2].a,d[2].b,d[3].a,d[3].b,d[4].a,d[4].b,d[5].a,d[5].b,d[6].a,d[6].b,d[7].a,d[7].b];else throw"Unexpected error in SHA-2 implementation";return a}"function"===typeof define&&typeof define.amd?define(function(){return z}):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=z:exports=z:T.jsSHA=z})(this);
if(typeof Paho==="undefined"){Paho={}}Paho.MQTT=(function(r){var h="@VERSION@";var k="@BUILDLEVEL@";var o={CONNECT:1,CONNACK:2,PUBLISH:3,PUBACK:4,PUBREC:5,PUBREL:6,PUBCOMP:7,SUBSCRIBE:8,SUBACK:9,UNSUBSCRIBE:10,UNSUBACK:11,PINGREQ:12,PINGRESP:13,DISCONNECT:14};var m=function(C,B){for(var z in C){if(C.hasOwnProperty(z)){if(B.hasOwnProperty(z)){if(typeof C[z]!==B[z]){throw new Error(u(j.INVALID_TYPE,[typeof C[z],z]))}}else{var A="Unknown property, "+z+". Valid properties are:";for(var z in B){if(B.hasOwnProperty(z)){A=A+" "+z}}throw new Error(A)}}}};var b=function(A,z){return function(){return A.apply(z,arguments)}};var j={OK:{code:0,text:"AMQJSC0000I OK."},CONNECT_TIMEOUT:{code:1,text:"AMQJSC0001E Connect timed out."},SUBSCRIBE_TIMEOUT:{code:2,text:"AMQJS0002E Subscribe timed out."},UNSUBSCRIBE_TIMEOUT:{code:3,text:"AMQJS0003E Unsubscribe timed out."},PING_TIMEOUT:{code:4,text:"AMQJS0004E Ping timed out."},INTERNAL_ERROR:{code:5,text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},CONNACK_RETURNCODE:{code:6,text:"AMQJS0006E Bad Connack return code:{0} {1}."},SOCKET_ERROR:{code:7,text:"AMQJS0007E Socket error:{0}."},SOCKET_CLOSE:{code:8,text:"AMQJS0008I Socket closed."},MALFORMED_UTF:{code:9,text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},UNSUPPORTED:{code:10,text:"AMQJS0010E {0} is not supported by this browser."},INVALID_STATE:{code:11,text:"AMQJS0011E Invalid state {0}."},INVALID_TYPE:{code:12,text:"AMQJS0012E Invalid type {0} for {1}."},INVALID_ARGUMENT:{code:13,text:"AMQJS0013E Invalid argument {0} for {1}."},UNSUPPORTED_OPERATION:{code:14,text:"AMQJS0014E Unsupported operation."},INVALID_STORED_DATA:{code:15,text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},INVALID_MQTT_MESSAGE_TYPE:{code:16,text:"AMQJS0016E Invalid MQTT message type {0}."},MALFORMED_UNICODE:{code:17,text:"AMQJS0017E Malformed Unicode string:{0} {1}."}};var f={0:"Connection Accepted",1:"Connection Refused: unacceptable protocol version",2:"Connection Refused: identifier rejected",3:"Connection Refused: server unavailable",4:"Connection Refused: bad user name or password",5:"Connection Refused: not authorized"};var u=function(z,B){var F=z.text;if(B){var E,G;for(var A=0;A<B.length;A++){E="{"+A+"}";G=F.indexOf(E);if(G>0){var D=F.substring(0,G);var C=F.substring(G+E.length);F=D+B[A]+C}}}return F};var e=[0,6,77,81,73,115,100,112,3];var d=[0,4,77,81,84,84,4];var q=function(B,A){this.type=B;for(var z in A){if(A.hasOwnProperty(z)){this[z]=A[z]}}};q.prototype.encode=function(){var H=((this.type&15)<<4);var K=0;var A=new Array();var D=0;if(this.messageIdentifier!=undefined){K+=2}switch(this.type){case o.CONNECT:switch(this.mqttVersion){case 3:K+=e.length+3;break;case 4:K+=d.length+3;break}K+=c(this.clientId)+2;if(this.willMessage!=undefined){K+=c(this.willMessage.destinationName)+2;var C=this.willMessage.payloadBytes;if(!(C instanceof Uint8Array)){C=new Uint8Array(F)}K+=C.byteLength+2}if(this.userName!=undefined){K+=c(this.userName)+2}if(this.password!=undefined){K+=c(this.password)+2}break;case o.SUBSCRIBE:H|=2;for(var G=0;G<this.topics.length;G++){A[G]=c(this.topics[G]);K+=A[G]+2}K+=this.requestedQos.length;break;case o.UNSUBSCRIBE:H|=2;for(var G=0;G<this.topics.length;G++){A[G]=c(this.topics[G]);K+=A[G]+2}break;case o.PUBREL:H|=2;break;case o.PUBLISH:if(this.payloadMessage.duplicate){H|=8}H=H|=(this.payloadMessage.qos<<1);if(this.payloadMessage.retained){H|=1}D=c(this.payloadMessage.destinationName);K+=D+2;var F=this.payloadMessage.payloadBytes;K+=F.byteLength;if(F instanceof ArrayBuffer){F=new Uint8Array(F)}else{if(!(F instanceof Uint8Array)){F=new Uint8Array(F.buffer)}}break;case o.DISCONNECT:break;default:}var z=x(K);var J=z.length+1;var B=new ArrayBuffer(K+J);var I=new Uint8Array(B);I[0]=H;I.set(z,1);if(this.type==o.PUBLISH){J=t(this.payloadMessage.destinationName,D,I,J)}else{if(this.type==o.CONNECT){switch(this.mqttVersion){case 3:I.set(e,J);J+=e.length;break;case 4:I.set(d,J);J+=d.length;break}var E=0;if(this.cleanSession){E=2}if(this.willMessage!=undefined){E|=4;E|=(this.willMessage.qos<<3);if(this.willMessage.retained){E|=32}}if(this.userName!=undefined){E|=128}if(this.password!=undefined){E|=64}I[J++]=E;J=y(this.keepAliveInterval,I,J)}}if(this.messageIdentifier!=undefined){J=y(this.messageIdentifier,I,J)}switch(this.type){case o.CONNECT:J=t(this.clientId,c(this.clientId),I,J);if(this.willMessage!=undefined){J=t(this.willMessage.destinationName,c(this.willMessage.destinationName),I,J);J=y(C.byteLength,I,J);I.set(C,J);J+=C.byteLength}if(this.userName!=undefined){J=t(this.userName,c(this.userName),I,J)}if(this.password!=undefined){J=t(this.password,c(this.password),I,J)}break;case o.PUBLISH:I.set(F,J);break;case o.SUBSCRIBE:for(var G=0;G<this.topics.length;G++){J=t(this.topics[G],A[G],I,J);I[J++]=this.requestedQos[G]}break;case o.UNSUBSCRIBE:for(var G=0;G<this.topics.length;G++){J=t(this.topics[G],A[G],I,J)}break;default:}return B};function g(K,H){var F=H;var D=K[H];var G=D>>4;var z=D&=15;H+=1;var I;var J=0;var N=1;do{if(H==K.length){return[null,F]}I=K[H++];J+=((I&127)*N);N*=128}while((I&128)!=0);var B=H+J;if(B>K.length){return[null,F]}var L=new q(G);switch(G){case o.CONNACK:var C=K[H++];if(C&1){L.sessionPresent=true}L.returnCode=K[H++];break;case o.PUBLISH:var M=(z>>1)&3;var E=l(K,H);H+=2;var A=n(K,H,E);H+=E;if(M>0){L.messageIdentifier=l(K,H);H+=2}var O=new Paho.MQTT.Message(K.subarray(H,B));if((z&1)==1){O.retained=true}if((z&8)==8){O.duplicate=true}O.qos=M;O.destinationName=A;L.payloadMessage=O;break;case o.PUBACK:case o.PUBREC:case o.PUBREL:case o.PUBCOMP:case o.UNSUBACK:L.messageIdentifier=l(K,H);break;case o.SUBACK:L.messageIdentifier=l(K,H);H+=2;L.returnCode=K.subarray(H,B);break;default:}return[L,B]}function y(A,z,B){z[B++]=A>>8;z[B++]=A%256;return B}function t(A,B,z,C){C=y(B,z,C);i(A,z,C);return C+B}function l(z,A){return 256*z[A]+z[A+1]}function x(B){var z=new Array(1);var A=0;do{var C=B%128;B=B>>7;if(B>0){C|=128}z[A++]=C}while((B>0)&&(A<4));return z}function c(B){var A=0;for(var C=0;C<B.length;C++){var z=B.charCodeAt(C);if(z>2047){if(55296<=z&&z<=56319){C++;A++}A+=3}else{if(z>127){A+=2}else{A++}}}return A}function i(B,A,F){var E=F;for(var C=0;C<B.length;C++){var z=B.charCodeAt(C);if(55296<=z&&z<=56319){var D=B.charCodeAt(++C);if(isNaN(D)){throw new Error(u(j.MALFORMED_UNICODE,[z,D]))}z=((z-55296)<<10)+(D-56320)+65536}if(z<=127){A[E++]=z}else{if(z<=2047){A[E++]=z>>6&31|192;A[E++]=z&63|128}else{if(z<=65535){A[E++]=z>>12&15|224;A[E++]=z>>6&63|128;A[E++]=z&63|128}else{A[E++]=z>>18&7|240;A[E++]=z>>12&63|128;A[E++]=z>>6&63|128;A[E++]=z&63|128}}}}return A}function n(G,C,z){var A="";var B;var E=C;while(E<C+z){var I=G[E++];if(I<128){B=I}else{var H=G[E++]-128;if(H<0){throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),""]))}if(I<224){B=64*(I-192)+H}else{var F=G[E++]-128;if(F<0){throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),F.toString(16)]))}if(I<240){B=4096*(I-224)+64*H+F}else{var D=G[E++]-128;if(D<0){throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),F.toString(16),D.toString(16)]))}if(I<248){B=262144*(I-240)+4096*H+64*F+D}else{throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),F.toString(16),D.toString(16)]))}}}}if(B>65535){B-=65536;A+=String.fromCharCode(55296+(B>>10));B=56320+(B&1023)}A+=String.fromCharCode(B)}return A}var s=function(z,E,D){this._client=z;this._window=E;this._keepAliveInterval=D*1000;this.isReset=false;var C=new q(o.PINGREQ).encode();var B=function(F){return function(){return A.apply(F)}};var A=function(){if(!this.isReset){this._client._trace("Pinger.doPing","Timed out");this._client._disconnected(j.PING_TIMEOUT.code,u(j.PING_TIMEOUT))}else{this.isReset=false;this._client._trace("Pinger.doPing","send PINGREQ");this._client.socket.send(C);this.timeout=this._window.setTimeout(B(this),this._keepAliveInterval)}};this.reset=function(){this.isReset=true;this._window.clearTimeout(this.timeout);if(this._keepAliveInterval>0){this.timeout=setTimeout(B(this),this._keepAliveInterval)}};this.cancel=function(){this._window.clearTimeout(this.timeout)}};var w=function(z,D,B,E,A){this._window=D;if(!B){B=30}var C=function(H,F,G){return function(){return H.apply(F,G)}};this.timeout=setTimeout(C(E,z,A),B*1000);this.cancel=function(){this._window.clearTimeout(this.timeout)}};var v=function(D,C,A,E,z){if(!("WebSocket" in r&&r.WebSocket!==null)){throw new Error(u(j.UNSUPPORTED,["WebSocket"]))}if(!("localStorage" in r&&r.localStorage!==null)){throw new Error(u(j.UNSUPPORTED,["localStorage"]))}if(!("ArrayBuffer" in r&&r.ArrayBuffer!==null)){throw new Error(u(j.UNSUPPORTED,["ArrayBuffer"]))}this._trace("Paho.MQTT.Client",D,C,A,E,z);this.host=C;this.port=A;this.path=E;this.uri=D;this.clientId=z;this._localKey=C+":"+A+(E!="/mqtt"?":"+E:"")+":"+z+":";this._msg_queue=[];this._sentMessages={};this._receivedMessages={};this._notify_msg_sent={};this._message_identifier=1;this._sequence=0;for(var B in localStorage){if(B.indexOf("Sent:"+this._localKey)==0||B.indexOf("Received:"+this._localKey)==0){this.restore(B)}}};v.prototype.host;v.prototype.port;v.prototype.path;v.prototype.uri;v.prototype.clientId;v.prototype.socket;v.prototype.connected=false;v.prototype.maxMessageIdentifier=65536;v.prototype.connectOptions;v.prototype.hostIndex;v.prototype.onConnectionLost;v.prototype.onMessageDelivered;v.prototype.onMessageArrived;v.prototype.traceFunction;v.prototype._msg_queue=null;v.prototype._connectTimeout;v.prototype.sendPinger=null;v.prototype.receivePinger=null;v.prototype.receiveBuffer=null;v.prototype._traceBuffer=null;v.prototype._MAX_TRACE_ENTRIES=100;v.prototype.connect=function(A){var z=this._traceMask(A,"password");this._trace("Client.connect",z,this.socket,this.connected);if(this.connected){throw new Error(u(j.INVALID_STATE,["already connected"]))}if(this.socket){throw new Error(u(j.INVALID_STATE,["already connected"]))}this.connectOptions=A;if(A.uris){this.hostIndex=0;this._doConnect(A.uris[0])}else{this._doConnect(this.uri)}};v.prototype.subscribe=function(A,z){this._trace("Client.subscribe",A,z);if(!this.connected){throw new Error(u(j.INVALID_STATE,["not connected"]))}var B=new q(o.SUBSCRIBE);B.topics=[A];if(z.qos!=undefined){B.requestedQos=[z.qos]}else{B.requestedQos=[0]}if(z.onSuccess){B.onSuccess=function(C){z.onSuccess({invocationContext:z.invocationContext,grantedQos:C})}}if(z.onFailure){B.onFailure=function(C){z.onFailure({invocationContext:z.invocationContext,errorCode:C})}}if(z.timeout){B.timeOut=new w(this,window,z.timeout,z.onFailure,[{invocationContext:z.invocationContext,errorCode:j.SUBSCRIBE_TIMEOUT.code,errorMessage:u(j.SUBSCRIBE_TIMEOUT)}])}this._requires_ack(B);this._schedule_message(B)};v.prototype.unsubscribe=function(A,z){this._trace("Client.unsubscribe",A,z);if(!this.connected){throw new Error(u(j.INVALID_STATE,["not connected"]))}var B=new q(o.UNSUBSCRIBE);B.topics=[A];if(z.onSuccess){B.callback=function(){z.onSuccess({invocationContext:z.invocationContext})}}if(z.timeout){B.timeOut=new w(this,window,z.timeout,z.onFailure,[{invocationContext:z.invocationContext,errorCode:j.UNSUBSCRIBE_TIMEOUT.code,errorMessage:u(j.UNSUBSCRIBE_TIMEOUT)}])}this._requires_ack(B);this._schedule_message(B)};v.prototype.send=function(z){this._trace("Client.send",z);if(!this.connected){throw new Error(u(j.INVALID_STATE,["not connected"]))}wireMessage=new q(o.PUBLISH);wireMessage.payloadMessage=z;if(z.qos>0){this._requires_ack(wireMessage)}else{if(this.onMessageDelivered){this._notify_msg_sent[wireMessage]=this.onMessageDelivered(wireMessage.payloadMessage)}}this._schedule_message(wireMessage)};v.prototype.disconnect=function(){this._trace("Client.disconnect");if(!this.socket){throw new Error(u(j.INVALID_STATE,["not connecting or connected"]))}wireMessage=new q(o.DISCONNECT);this._notify_msg_sent[wireMessage]=b(this._disconnected,this);this._schedule_message(wireMessage)};v.prototype.getTraceLog=function(){if(this._traceBuffer!==null){this._trace("Client.getTraceLog",new Date());this._trace("Client.getTraceLog in flight messages",this._sentMessages.length);for(var z in this._sentMessages){this._trace("_sentMessages ",z,this._sentMessages[z])}for(var z in this._receivedMessages){this._trace("_receivedMessages ",z,this._receivedMessages[z])}return this._traceBuffer}};v.prototype.startTrace=function(){if(this._traceBuffer===null){this._traceBuffer=[]}this._trace("Client.startTrace",new Date(),h)};v.prototype.stopTrace=function(){delete this._traceBuffer};v.prototype._doConnect=function(A){if(this.connectOptions.useSSL){var z=A.split(":");z[0]="wss";A=z.join(":")}this.connected=false;if(this.connectOptions.mqttVersion<4){this.socket=new WebSocket(A,["mqttv3.1"])}else{this.socket=new WebSocket(A,["mqtt"])}this.socket.binaryType="arraybuffer";this.socket.onopen=b(this._on_socket_open,this);this.socket.onmessage=b(this._on_socket_message,this);this.socket.onerror=b(this._on_socket_error,this);this.socket.onclose=b(this._on_socket_close,this);this.sendPinger=new s(this,window,this.connectOptions.keepAliveInterval);this.receivePinger=new s(this,window,this.connectOptions.keepAliveInterval);this._connectTimeout=new w(this,window,this.connectOptions.timeout,this._disconnected,[j.CONNECT_TIMEOUT.code,u(j.CONNECT_TIMEOUT)])};v.prototype._schedule_message=function(z){this._msg_queue.push(z);if(this.connected){this._process_queue()}};v.prototype.store=function(E,D){var A={type:D.type,messageIdentifier:D.messageIdentifier,version:1};switch(D.type){case o.PUBLISH:if(D.pubRecReceived){A.pubRecReceived=true}A.payloadMessage={};var C="";var B=D.payloadMessage.payloadBytes;for(var z=0;z<B.length;z++){if(B[z]<=15){C=C+"0"+B[z].toString(16)}else{C=C+B[z].toString(16)}}A.payloadMessage.payloadHex=C;A.payloadMessage.qos=D.payloadMessage.qos;A.payloadMessage.destinationName=D.payloadMessage.destinationName;if(D.payloadMessage.duplicate){A.payloadMessage.duplicate=true}if(D.payloadMessage.retained){A.payloadMessage.retained=true}if(E.indexOf("Sent:")==0){if(D.sequence===undefined){D.sequence=++this._sequence}A.sequence=D.sequence}break;default:throw Error(u(j.INVALID_STORED_DATA,[key,A]))}localStorage.setItem(E+this._localKey+D.messageIdentifier,JSON.stringify(A))};v.prototype.restore=function(H){var G=localStorage.getItem(H);var F=JSON.parse(G);var I=new q(F.type,F);switch(F.type){case o.PUBLISH:var z=F.payloadMessage.payloadHex;var A=new ArrayBuffer((z.length)/2);var D=new Uint8Array(A);var B=0;while(z.length>=2){var E=parseInt(z.substring(0,2),16);z=z.substring(2,z.length);D[B++]=E}var C=new Paho.MQTT.Message(D);C.qos=F.payloadMessage.qos;C.destinationName=F.payloadMessage.destinationName;if(F.payloadMessage.duplicate){C.duplicate=true}if(F.payloadMessage.retained){C.retained=true}I.payloadMessage=C;break;default:throw Error(u(j.INVALID_STORED_DATA,[H,G]))}if(H.indexOf("Sent:"+this._localKey)==0){I.payloadMessage.duplicate=true;this._sentMessages[I.messageIdentifier]=I}else{if(H.indexOf("Received:"+this._localKey)==0){this._receivedMessages[I.messageIdentifier]=I}}};v.prototype._process_queue=function(){var A=null;var z=this._msg_queue.reverse();while((A=z.pop())){this._socket_send(A);if(this._notify_msg_sent[A]){this._notify_msg_sent[A]();delete this._notify_msg_sent[A]}}};v.prototype._requires_ack=function(A){var z=Object.keys(this._sentMessages).length;if(z>this.maxMessageIdentifier){throw Error("Too many messages:"+z)}while(this._sentMessages[this._message_identifier]!==undefined){this._message_identifier++}A.messageIdentifier=this._message_identifier;this._sentMessages[A.messageIdentifier]=A;if(A.type===o.PUBLISH){this.store("Sent:",A)}if(this._message_identifier===this.maxMessageIdentifier){this._message_identifier=1}};v.prototype._on_socket_open=function(){var z=new q(o.CONNECT,this.connectOptions);z.clientId=this.clientId;this._socket_send(z)};v.prototype._on_socket_message=function(B){this._trace("Client._on_socket_message",B.data);this.receivePinger.reset();var A=this._deframeMessages(B.data);for(var z=0;z<A.length;z+=1){this._handleMessage(A[z])}};v.prototype._deframeMessages=function(F){var A=new Uint8Array(F);if(this.receiveBuffer){var C=new Uint8Array(this.receiveBuffer.length+A.length);C.set(this.receiveBuffer);C.set(A,this.receiveBuffer.length);A=C;delete this.receiveBuffer}try{var G=0;var D=[];while(G<A.length){var z=g(A,G);var E=z[0];G=z[1];if(E!==null){D.push(E)}else{break}}if(G<A.length){this.receiveBuffer=A.subarray(G)}}catch(B){this._disconnected(j.INTERNAL_ERROR.code,u(j.INTERNAL_ERROR,[B.message,B.stack.toString()]));return}return D};v.prototype._handleMessage=function(I){this._trace("Client._handleMessage",I);try{switch(I.type){case o.CONNACK:this._connectTimeout.cancel();if(this.connectOptions.cleanSession){for(var H in this._sentMessages){var G=this._sentMessages[H];localStorage.removeItem("Sent:"+this._localKey+G.messageIdentifier)}this._sentMessages={};for(var H in this._receivedMessages){var z=this._receivedMessages[H];localStorage.removeItem("Received:"+this._localKey+z.messageIdentifier)}this._receivedMessages={}}if(I.returnCode===0){this.connected=true;if(this.connectOptions.uris){this.hostIndex=this.connectOptions.uris.length}}else{this._disconnected(j.CONNACK_RETURNCODE.code,u(j.CONNACK_RETURNCODE,[I.returnCode,f[I.returnCode]]));break}var E=new Array();for(var A in this._sentMessages){if(this._sentMessages.hasOwnProperty(A)){E.push(this._sentMessages[A])}}var E=E.sort(function(L,K){return L.sequence-K.sequence});for(var C=0,D=E.length;C<D;C++){var G=E[C];if(G.type==o.PUBLISH&&G.pubRecReceived){var B=new q(o.PUBREL,{messageIdentifier:G.messageIdentifier});this._schedule_message(B)}else{this._schedule_message(G)}}if(this.connectOptions.onSuccess){this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext})}this._process_queue();break;case o.PUBLISH:this._receivePublish(I);break;case o.PUBACK:var G=this._sentMessages[I.messageIdentifier];if(G){delete this._sentMessages[I.messageIdentifier];localStorage.removeItem("Sent:"+this._localKey+I.messageIdentifier);if(this.onMessageDelivered){this.onMessageDelivered(G.payloadMessage)}}break;case o.PUBREC:var G=this._sentMessages[I.messageIdentifier];if(G){G.pubRecReceived=true;var B=new q(o.PUBREL,{messageIdentifier:I.messageIdentifier});this.store("Sent:",G);this._schedule_message(B)}break;case o.PUBREL:var z=this._receivedMessages[I.messageIdentifier];localStorage.removeItem("Received:"+this._localKey+I.messageIdentifier);if(z){this._receiveMessage(z);delete this._receivedMessages[I.messageIdentifier]}var J=new q(o.PUBCOMP,{messageIdentifier:I.messageIdentifier});this._schedule_message(J);break;case o.PUBCOMP:var G=this._sentMessages[I.messageIdentifier];delete this._sentMessages[I.messageIdentifier];localStorage.removeItem("Sent:"+this._localKey+I.messageIdentifier);if(this.onMessageDelivered){this.onMessageDelivered(G.payloadMessage)}break;case o.SUBACK:var G=this._sentMessages[I.messageIdentifier];if(G){if(G.timeOut){G.timeOut.cancel()}I.returnCode.indexOf=Array.prototype.indexOf;if(I.returnCode.indexOf(128)!==-1){if(G.onFailure){G.onFailure(I.returnCode)}}else{if(G.onSuccess){G.onSuccess(I.returnCode)}}delete this._sentMessages[I.messageIdentifier]}break;case o.UNSUBACK:var G=this._sentMessages[I.messageIdentifier];if(G){if(G.timeOut){G.timeOut.cancel()}if(G.callback){G.callback()}delete this._sentMessages[I.messageIdentifier]}break;case o.PINGRESP:this.sendPinger.reset();break;case o.DISCONNECT:this._disconnected(j.INVALID_MQTT_MESSAGE_TYPE.code,u(j.INVALID_MQTT_MESSAGE_TYPE,[I.type]));break;default:this._disconnected(j.INVALID_MQTT_MESSAGE_TYPE.code,u(j.INVALID_MQTT_MESSAGE_TYPE,[I.type]))}}catch(F){this._disconnected(j.INTERNAL_ERROR.code,u(j.INTERNAL_ERROR,[F.message,F.stack.toString()]));return}};v.prototype._on_socket_error=function(z){this._disconnected(j.SOCKET_ERROR.code,u(j.SOCKET_ERROR,[z.data]))};v.prototype._on_socket_close=function(){this._disconnected(j.SOCKET_CLOSE.code,u(j.SOCKET_CLOSE))};v.prototype._socket_send=function(A){if(A.type==1){var z=this._traceMask(A,"password");this._trace("Client._socket_send",z)}else{this._trace("Client._socket_send",A)}this.socket.send(A.encode());this.sendPinger.reset()};v.prototype._receivePublish=function(B){switch(B.payloadMessage.qos){case"undefined":case 0:this._receiveMessage(B);break;case 1:var z=new q(o.PUBACK,{messageIdentifier:B.messageIdentifier});this._schedule_message(z);this._receiveMessage(B);break;case 2:this._receivedMessages[B.messageIdentifier]=B;this.store("Received:",B);var A=new q(o.PUBREC,{messageIdentifier:B.messageIdentifier});this._schedule_message(A);break;default:throw Error("Invaild qos="+wireMmessage.payloadMessage.qos)}};v.prototype._receiveMessage=function(z){if(this.onMessageArrived){this.onMessageArrived(z.payloadMessage)}};v.prototype._disconnected=function(A,z){this._trace("Client._disconnected",A,z);this.sendPinger.cancel();this.receivePinger.cancel();if(this._connectTimeout){this._connectTimeout.cancel()}this._msg_queue=[];this._notify_msg_sent={};if(this.socket){this.socket.onopen=null;this.socket.onmessage=null;this.socket.onerror=null;this.socket.onclose=null;if(this.socket.readyState===1){this.socket.close()}delete this.socket}if(this.connectOptions.uris&&this.hostIndex<this.connectOptions.uris.length-1){this.hostIndex++;this._doConnect(this.connectOptions.uris[this.hostIndex])}else{if(A===undefined){A=j.OK.code;z=u(j.OK)}if(this.connected){this.connected=false;if(this.onConnectionLost){this.onConnectionLost({errorCode:A,errorMessage:z})}}else{if(this.connectOptions.mqttVersion===4&&this.connectOptions.mqttVersionExplicit===false){this._trace("Failed to connect V4, dropping back to V3");this.connectOptions.mqttVersion=3;if(this.connectOptions.uris){this.hostIndex=0;this._doConnect(this.connectOptions.uris[0])}else{this._doConnect(this.uri)}}else{if(this.connectOptions.onFailure){this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext,errorCode:A,errorMessage:z})}}}}};v.prototype._trace=function(){if(this.traceFunction){for(var B in arguments){if(typeof arguments[B]!=="undefined"){arguments[B]=JSON.stringify(arguments[B])}}var A=Array.prototype.slice.call(arguments).join("");this.traceFunction({severity:"Debug",message:A})}if(this._traceBuffer!==null){for(var B=0,z=arguments.length;B<z;B++){if(this._traceBuffer.length==this._MAX_TRACE_ENTRIES){this._traceBuffer.shift()}if(B===0){this._traceBuffer.push(arguments[B])}else{if(typeof arguments[B]==="undefined"){this._traceBuffer.push(arguments[B])}else{this._traceBuffer.push("  "+JSON.stringify(arguments[B]))}}}}};v.prototype._traceMask=function(B,A){var C={};for(var z in B){if(B.hasOwnProperty(z)){if(z==A){C[z]="******"}else{C[z]=B[z]}}}return C};var p=function(I,C,J,z){var B;if(typeof I!=="string"){throw new Error(u(j.INVALID_TYPE,[typeof I,"host"]))}if(arguments.length==2){z=C;B=I;var F=B.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);if(F){I=F[4]||F[2];C=parseInt(F[7]);J=F[8]}else{throw new Error(u(j.INVALID_ARGUMENT,[I,"host"]))}}else{if(arguments.length==3){z=J;J="/mqtt"}if(typeof C!=="number"||C<0){throw new Error(u(j.INVALID_TYPE,[typeof C,"port"]))}if(typeof J!=="string"){throw new Error(u(j.INVALID_TYPE,[typeof J,"path"]))}var A=(I.indexOf(":")!=-1&&I.slice(0,1)!="["&&I.slice(-1)!="]");B="ws://"+(A?"["+I+"]":I)+":"+C+J}var G=0;for(var E=0;E<z.length;E++){var H=z.charCodeAt(E);if(55296<=H&&H<=56319){E++}G++}if(typeof z!=="string"||G>65535){throw new Error(u(j.INVALID_ARGUMENT,[z,"clientId"]))}var D=new v(B,I,C,J,z);this._getHost=function(){return I};this._setHost=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getPort=function(){return C};this._setPort=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getPath=function(){return J};this._setPath=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getURI=function(){return B};this._setURI=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getClientId=function(){return D.clientId};this._setClientId=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getOnConnectionLost=function(){return D.onConnectionLost};this._setOnConnectionLost=function(K){if(typeof K==="function"){D.onConnectionLost=K}else{throw new Error(u(j.INVALID_TYPE,[typeof K,"onConnectionLost"]))}};this._getOnMessageDelivered=function(){return D.onMessageDelivered};this._setOnMessageDelivered=function(K){if(typeof K==="function"){D.onMessageDelivered=K}else{throw new Error(u(j.INVALID_TYPE,[typeof K,"onMessageDelivered"]))}};this._getOnMessageArrived=function(){return D.onMessageArrived};this._setOnMessageArrived=function(K){if(typeof K==="function"){D.onMessageArrived=K}else{throw new Error(u(j.INVALID_TYPE,[typeof K,"onMessageArrived"]))}};this._getTrace=function(){return D.traceFunction};this._setTrace=function(K){if(typeof K==="function"){D.traceFunction=K}else{throw new Error(u(j.INVALID_TYPE,[typeof K,"onTrace"]))}};this.connect=function(N){N=N||{};m(N,{timeout:"number",userName:"string",password:"string",willMessage:"object",keepAliveInterval:"number",cleanSession:"boolean",useSSL:"boolean",invocationContext:"object",onSuccess:"function",onFailure:"function",hosts:"object",ports:"object",mqttVersion:"number"});if(N.keepAliveInterval===undefined){N.keepAliveInterval=60}if(N.mqttVersion>4||N.mqttVersion<3){throw new Error(u(j.INVALID_ARGUMENT,[N.mqttVersion,"connectOptions.mqttVersion"]))}if(N.mqttVersion===undefined){N.mqttVersionExplicit=false;N.mqttVersion=4}else{N.mqttVersionExplicit=true}if(N.password===undefined&&N.userName!==undefined){throw new Error(u(j.INVALID_ARGUMENT,[N.password,"connectOptions.password"]))}if(N.willMessage){if(!(N.willMessage instanceof a)){throw new Error(u(j.INVALID_TYPE,[N.willMessage,"connectOptions.willMessage"]))}N.willMessage.stringPayload;if(typeof N.willMessage.destinationName==="undefined"){throw new Error(u(j.INVALID_TYPE,[typeof N.willMessage.destinationName,"connectOptions.willMessage.destinationName"]))}}if(typeof N.cleanSession==="undefined"){N.cleanSession=true}if(N.hosts){if(!(N.hosts instanceof Array)){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts,"connectOptions.hosts"]))}if(N.hosts.length<1){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts,"connectOptions.hosts"]))}var P=false;for(var M=0;M<N.hosts.length;M++){if(typeof N.hosts[M]!=="string"){throw new Error(u(j.INVALID_TYPE,[typeof N.hosts[M],"connectOptions.hosts["+M+"]"]))}if(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(N.hosts[M])){if(M==0){P=true}else{if(!P){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts[M],"connectOptions.hosts["+M+"]"]))}}}else{if(P){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts[M],"connectOptions.hosts["+M+"]"]))}}}if(!P){if(!N.ports){throw new Error(u(j.INVALID_ARGUMENT,[N.ports,"connectOptions.ports"]))}if(!(N.ports instanceof Array)){throw new Error(u(j.INVALID_ARGUMENT,[N.ports,"connectOptions.ports"]))}if(N.hosts.length!=N.ports.length){throw new Error(u(j.INVALID_ARGUMENT,[N.ports,"connectOptions.ports"]))}N.uris=[];for(var M=0;M<N.hosts.length;M++){if(typeof N.ports[M]!=="number"||N.ports[M]<0){throw new Error(u(j.INVALID_TYPE,[typeof N.ports[M],"connectOptions.ports["+M+"]"]))}var O=N.hosts[M];var L=N.ports[M];var K=(O.indexOf(":")!=-1);B="ws://"+(K?"["+O+"]":O)+":"+L+J;N.uris.push(B)}}else{N.uris=N.hosts}}D.connect(N)};this.subscribe=function(L,K){if(typeof L!=="string"){throw new Error("Invalid argument:"+L)}K=K||{};m(K,{qos:"number",invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"});if(K.timeout&&!K.onFailure){throw new Error("subscribeOptions.timeout specified with no onFailure callback.")}if(typeof K.qos!=="undefined"&&!(K.qos===0||K.qos===1||K.qos===2)){throw new Error(u(j.INVALID_ARGUMENT,[K.qos,"subscribeOptions.qos"]))}D.subscribe(L,K)};this.unsubscribe=function(L,K){if(typeof L!=="string"){throw new Error("Invalid argument:"+L)}K=K||{};m(K,{invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"});if(K.timeout&&!K.onFailure){throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.")}D.unsubscribe(L,K)};this.send=function(L,O,N,K){var M;if(arguments.length==0){throw new Error("Invalid argument.length")}else{if(arguments.length==1){if(!(L instanceof a)&&(typeof L!=="string")){throw new Error("Invalid argument:"+typeof L)}M=L;if(typeof M.destinationName==="undefined"){throw new Error(u(j.INVALID_ARGUMENT,[M.destinationName,"Message.destinationName"]))}D.send(M)}else{M=new a(O);M.destinationName=L;if(arguments.length>=3){M.qos=N}if(arguments.length>=4){M.retained=K}D.send(M)}}};this.disconnect=function(){D.disconnect()};this.getTraceLog=function(){return D.getTraceLog()};this.startTrace=function(){D.startTrace()};this.stopTrace=function(){D.stopTrace()};this.isConnected=function(){return D.connected}};p.prototype={get host(){return this._getHost()},set host(z){this._setHost(z)},get port(){return this._getPort()},set port(z){this._setPort(z)},get path(){return this._getPath()},set path(z){this._setPath(z)},get clientId(){return this._getClientId()},set clientId(z){this._setClientId(z)},get onConnectionLost(){return this._getOnConnectionLost()},set onConnectionLost(z){this._setOnConnectionLost(z)},get onMessageDelivered(){return this._getOnMessageDelivered()},set onMessageDelivered(z){this._setOnMessageDelivered(z)},get onMessageArrived(){return this._getOnMessageArrived()},set onMessageArrived(z){this._setOnMessageArrived(z)},get trace(){return this._getTrace()},set trace(z){this._setTrace(z)}};var a=function(A){var D;if(typeof A==="string"||A instanceof ArrayBuffer||A instanceof Int8Array||A instanceof Uint8Array||A instanceof Int16Array||A instanceof Uint16Array||A instanceof Int32Array||A instanceof Uint32Array||A instanceof Float32Array||A instanceof Float64Array){D=A}else{throw (u(j.INVALID_ARGUMENT,[A,"newPayload"]))}this._getPayloadString=function(){if(typeof D==="string"){return D}else{return n(D,0,D.length)}};this._getPayloadBytes=function(){if(typeof D==="string"){var F=new ArrayBuffer(c(D));var G=new Uint8Array(F);i(D,G,0);return G}else{return D}};var E=undefined;this._getDestinationName=function(){return E};this._setDestinationName=function(F){if(typeof F==="string"){E=F}else{throw new Error(u(j.INVALID_ARGUMENT,[F,"newDestinationName"]))}};var B=0;this._getQos=function(){return B};this._setQos=function(F){if(F===0||F===1||F===2){B=F}else{throw new Error("Invalid argument:"+F)}};var z=false;this._getRetained=function(){return z};this._setRetained=function(F){if(typeof F==="boolean"){z=F}else{throw new Error(u(j.INVALID_ARGUMENT,[F,"newRetained"]))}};var C=false;this._getDuplicate=function(){return C};this._setDuplicate=function(F){C=F}};a.prototype={get payloadString(){return this._getPayloadString()},get payloadBytes(){return this._getPayloadBytes()},get destinationName(){return this._getDestinationName()},set destinationName(z){this._setDestinationName(z)},get qos(){return this._getQos()},set qos(z){this._setQos(z)},get retained(){return this._getRetained()},set retained(z){this._setRetained(z)},get duplicate(){return this._getDuplicate()},set duplicate(z){this._setDuplicate(z)}};return{Client:p,Message:a}})(window);var jsPDF=(function(e){var d="1.3",b={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};function a(f){var g={};this.subscribe=function(h,k,i){if(typeof k!=="function"){return false}if(!g.hasOwnProperty(h)){g[h]={}}var j=Math.random().toString(35);g[h][j]=[k,!!i];return j};this.unsubscribe=function(i){for(var h in g){if(g[h][i]){delete g[h][i];return true}}return false};this.publish=function(i){if(g.hasOwnProperty(i)){var h=Array.prototype.slice.call(arguments,1),l=[];for(var m in g[i]){var k=g[i][m];try{k[0].apply(f,h)}catch(j){if(e.console){console.error("jsPDF PubSub Error",j.message,j)}}if(k[1]){l.push(m)}}if(l.length){l.forEach(this.unsubscribe)}}}}function c(J,aj,S,aa){var L={};if(typeof J==="object"){L=J;J=L.orientation;aj=L.unit||aj;S=L.format||S;aa=L.compress||L.compressPdf||aa}aj=aj||"mm";S=S||"a4";J=(""+(J||"P")).toLowerCase();var at=(""+S).toLowerCase(),aw=!!aa&&typeof Uint8Array==="function",ai=L.textColor||"0 g",N=L.drawColor||"0 G",an=L.fontSize||16,n=L.lineHeight||1.15,E=L.lineWidth||0.200025,p=2,y=!1,I=[],am={},W={},f,ap,ak,j=0,v,i=[],X={},w=[],Y=0,Z=0,K=0,H,G,U,C,s,T={title:"",subject:"",author:"",keywords:"",creator:""},V={},M=new a(V),r=function(k){return k.toFixed(2)},q=function(k){return k.toFixed(3)},F=function(k){return("0"+parseInt(k)).slice(-2)},ag=function(k){if(y){i[v].push(k)}else{K+=k.length+1;w.push(k)}},z=function(){p++;I[p]=K;ag(p+" 0 obj");return p},Q=function(k){ag("stream");ag(k);ag("endstream")},af=function(){var ay,ax,aB,aA,aC,az,aE,aF,aD;aE=e.adler32cs||c.adler32cs;if(aw&&typeof aE==="undefined"){aw=false}for(ay=1;ay<=j;ay++){z();aF=(H=X[ay].width)*ap;aD=(G=X[ay].height)*ap;ag("<</Type /Page");ag("/Parent 1 0 R");ag("/Resources 2 0 R");ag("/MediaBox [0 0 "+r(aF)+" "+r(aD)+"]");ag("/Contents "+(p+1)+" 0 R>>");ag("endobj");ax=i[ay].join("\n");z();if(aw){aB=[];aA=ax.length;while(aA--){aB[aA]=ax.charCodeAt(aA)}az=aE.from(ax);aC=new Deflater(6);aC.append(new Uint8Array(aB));ax=aC.flush();aB=new Uint8Array(ax.length+6);aB.set(new Uint8Array([120,156])),aB.set(ax,2);aB.set(new Uint8Array([az&255,(az>>8)&255,(az>>16)&255,(az>>24)&255]),ax.length+2);ax=String.fromCharCode.apply(null,aB);ag("<</Length "+ax.length+" /Filter [/FlateDecode]>>")}else{ag("<</Length "+ax.length+">>")}Q(ax);ag("endobj")}I[1]=K;ag("1 0 obj");ag("<</Type /Pages");var k="/Kids [";for(aA=0;aA<j;aA++){k+=(3+2*aA)+" 0 R "}ag(k+"]");ag("/Count "+j);ag(">>");ag("endobj")},ac=function(k){k.objectNumber=z();ag("<</BaseFont/"+k.PostScriptName+"/Type/Font");if(typeof k.encoding==="string"){ag("/Encoding/"+k.encoding)}ag("/Subtype/Type1>>");ag("endobj")},P=function(){for(var k in am){if(am.hasOwnProperty(k)){ac(am[k])}}},R=function(){M.publish("putXobjectDict")},B=function(){ag("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]");ag("/Font <<");for(var k in am){if(am.hasOwnProperty(k)){ag("/"+k+" "+am[k].objectNumber+" 0 R")}}ag(">>");ag("/XObject <<");R();ag(">>")},l=function(){P();M.publish("putResources");I[2]=K;ag("2 0 obj");ag("<<");B();ag(">>");ag("endobj");M.publish("postPutResources")},o=function(ax,k,ay){if(!W.hasOwnProperty(k)){W[k]={}}W[k][ay]=ax},x=function(k,az,aB,ay){var aA="F"+(Object.keys(am).length+1).toString(10),ax=am[aA]={id:aA,PostScriptName:k,fontName:az,fontStyle:aB,encoding:ay,metadata:{}};o(aA,az,aB);M.publish("addFont",ax);return aA},h=function(){var k="helvetica",aG="times",aI="courier",aF="normal",aE="bold",aD="italic",aH="bolditalic",ax="StandardEncoding",aA=[["Helvetica",k,aF],["Helvetica-Bold",k,aE],["Helvetica-Oblique",k,aD],["Helvetica-BoldOblique",k,aH],["Courier",aI,aF],["Courier-Bold",aI,aE],["Courier-Oblique",aI,aD],["Courier-BoldOblique",aI,aH],["Times-Roman",aG,aF],["Times-Bold",aG,aE],["Times-Italic",aG,aD],["Times-BoldItalic",aG,aH]];for(var aC=0,ay=aA.length;aC<ay;aC++){var aB=x(aA[aC][0],aA[aC][1],aA[aC][2],ax);var az=aA[aC][0].split("-");o(aB,az[0],az[1]||"")}M.publish("addFonts",{fonts:am,dictionary:W})},av=function A(ax){ax.foo=function k(){try{return ax.apply(this,arguments)}catch(aA){var az=aA.stack||"";if(~az.indexOf(" at ")){az=az.split(" at ")[1]}var ay="Error in function "+az.split("\n")[0].split("<")[0]+": "+aA.message;if(e.console){e.console.error(ay,aA);if(e.alert){alert(ay)}}else{throw new Error(ay)}}};ax.foo.bar=ax;return ax.foo},u=function(aG,ay){var aC,aA,az,aE,aD,ax,aF,k,aB;ay=ay||{};az=ay.sourceEncoding||"Unicode";aD=ay.outputEncoding;if((ay.autoencode||aD)&&am[f].metadata&&am[f].metadata[az]&&am[f].metadata[az].encoding){aE=am[f].metadata[az].encoding;if(!aD&&am[f].encoding){aD=am[f].encoding}if(!aD&&aE.codePages){aD=aE.codePages[0]}if(typeof aD==="string"){aD=aE[aD]}if(aD){aF=false;ax=[];for(aC=0,aA=aG.length;aC<aA;aC++){k=aD[aG.charCodeAt(aC)];if(k){ax.push(String.fromCharCode(k))}else{ax.push(aG[aC])}if(ax[aC].charCodeAt(0)>>8){aF=true}}aG=ax.join("")}}aC=aG.length;while(aF===undefined&&aC!==0){if(aG.charCodeAt(aC-1)>>8){aF=true}aC--}if(!aF){return aG}ax=ay.noBOM?[]:[254,255];for(aC=0,aA=aG.length;aC<aA;aC++){k=aG.charCodeAt(aC);aB=k>>8;if(aB>>8){throw new Error("Character at position "+aC+" of string '"+aG+"' exceeds 16bits. Cannot be encoded into UCS-2 BE")}ax.push(aB);ax.push(k-(aB<<8))}return String.fromCharCode.apply(undefined,ax)},ae=function(ax,k){return u(ax,k).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},ad=function(){ag("/Producer (jsPDF "+c.version+")");for(var aA in T){if(T.hasOwnProperty(aA)&&T[aA]){ag("/"+aA.substr(0,1).toUpperCase()+aA.substr(1)+" ("+ae(T[aA])+")")}}var aC=new Date(),ay=aC.getTimezoneOffset(),ax=ay<0?"+":"-",k=Math.floor(Math.abs(ay/60)),az=Math.abs(ay%60),aB=[ax,F(k),"'",F(az),"'"].join("");ag(["/CreationDate (D:",aC.getFullYear(),F(aC.getMonth()+1),F(aC.getDate()),F(aC.getHours()),F(aC.getMinutes()),F(aC.getSeconds()),aB,")"].join(""))},ab=function(){ag("/Type /Catalog");ag("/Pages 1 0 R");if(!C){C="fullwidth"}switch(C){case"fullwidth":ag("/OpenAction [3 0 R /FitH null]");break;case"fullheight":ag("/OpenAction [3 0 R /FitV null]");break;case"fullpage":ag("/OpenAction [3 0 R /Fit]");break;case"original":ag("/OpenAction [3 0 R /XYZ null null 1]");break;default:var k=""+C;if(k.substr(k.length-1)==="%"){C=parseInt(C)/100}if(typeof C==="number"){ag("/OpenAction [3 0 R /XYZ null null "+r(C)+"]")}}if(!s){s="continuous"}switch(s){case"continuous":ag("/PageLayout /OneColumn");break;case"single":ag("/PageLayout /SinglePage");break;case"two":case"twoleft":ag("/PageLayout /TwoColumnLeft");break;case"tworight":ag("/PageLayout /TwoColumnRight");break}if(U){ag("/PageMode /"+U)}M.publish("putCatalog")},m=function(){ag("/Size "+(p+1));ag("/Root "+p+" 0 R");ag("/Info "+(p-1)+" 0 R")},ar=function(ay,k){var ax=typeof k==="string"&&k.toLowerCase();if(typeof ay==="string"){var az=ay.toLowerCase();if(b.hasOwnProperty(az)){ay=b[az][0]/ap;k=b[az][1]/ap}}if(Array.isArray(ay)){k=ay[1];ay=ay[0]}if(ax){switch(ax.substr(0,1)){case"l":if(k>ay){ax="s"}break;case"p":if(ay>k){ax="s"}break}if(ax==="s"){ak=ay;ay=k;k=ak}}y=true;i[++j]=[];X[j]={width:Number(ay)||H,height:Number(k)||G};g(j)},al=function(){ar.apply(this,arguments);ag(r(E*ap)+" w");ag(N);if(Y!==0){ag(Y+" J")}if(Z!==0){ag(Z+" j")}M.publish("addPage",{pageNumber:j})},g=function(k){if(k>0&&k<=j){v=k;H=X[k].width;G=X[k].height}},D=function(ax,az){var k;ax=ax!==undefined?ax:am[f].fontName;az=az!==undefined?az:am[f].fontStyle;try{k=W[ax][az]}catch(ay){}if(!k){throw new Error("Unable to look up font label for font '"+ax+"', '"+az+"'. Refer to getFontList() for available fonts.")}return k},t=function(){y=false;p=2;w=[];I=[];ag("%PDF-"+d);af();l();z();ag("<<");ad();ag(">>");ag("endobj");z();ag("<<");ab();ag(">>");ag("endobj");var ay=K,k,ax="0000000000";ag("xref");ag("0 "+(p+1));ag(ax+" 65535 f ");for(k=1;k<=p;k++){ag((ax+I[k]).slice(-10)+" 00000 n ")}ag("trailer");ag("<<");m();ag(">>");ag("startxref");ag(ay);ag("%%EOF");y=true;return w.join("\n")},ah=function(k){var ax="S";if(k==="F"){ax="f"}else{if(k==="FD"||k==="DF"){ax="B"}else{if(k==="f"||k==="f*"||k==="B"||k==="B*"){ax=k}}}return ax},ao=function(){var az=t(),k=az.length,ay=new ArrayBuffer(k),ax=new Uint8Array(ay);while(k--){ax[k]=az.charCodeAt(k)}return ay},au=function(){return new Blob([ao()],{type:"application/pdf"})},O=av(function(az,ax){var ay=(""+az).substr(0,6)==="dataur"?"data:application/pdf;base64,"+btoa(t()):0;switch(az){case undefined:return t();case"save":if(navigator.getUserMedia){if(e.URL===undefined||e.URL.createObjectURL===undefined){return V.output("dataurlnewwindow")}}saveAs(au(),ax);if(typeof saveAs.unload==="function"){if(e.setTimeout){setTimeout(saveAs.unload,911)}}break;case"arraybuffer":return ao();case"blob":return au();case"bloburi":case"bloburl":return e.URL&&e.URL.createObjectURL(au())||void 0;case"datauristring":case"dataurlstring":return ay;case"dataurlnewwindow":var k=e.open(ay);if(k||typeof safari==="undefined"){return k}case"datauri":case"dataurl":return e.document.location.href=ay;default:throw new Error('Output type "'+az+'" is not supported.')}});switch(aj){case"pt":ap=1;break;case"mm":ap=72/25.4;break;case"cm":ap=72/2.54;break;case"in":ap=72;break;case"px":ap=96/72;break;case"pc":ap=12;break;case"em":ap=12;break;case"ex":ap=6;break;default:throw ("Invalid unit: "+aj)}V.internal={pdfEscape:ae,getStyle:ah,getFont:function(){return am[D.apply(V,arguments)]},getFontSize:function(){return an},getLineHeight:function(){return an*n},write:function(k){ag(arguments.length===1?k:Array.prototype.join.call(arguments," "))},getCoordinateString:function(k){return r(k*ap)},getVerticalCoordinateString:function(k){return r((G-k)*ap)},collections:{},newObject:z,putStream:Q,events:M,scaleFactor:ap,pageSize:{get width(){return H},get height(){return G}},output:function(ax,k){return O(ax,k)},getNumberOfPages:function(){return i.length-1},pages:i};V.addPage=function(){al.apply(this,arguments);return this};V.setPage=function(){g.apply(this,arguments);return this};V.setDisplayMode=function(ax,k,ay){C=ax;s=k;U=ay;return this},V.text=function(aI,aH,aF,az,aB){function ay(aL){aL=aL.split("\t").join(Array(L.TabLen||9).join(" "));return ae(aL,az)}if(typeof aI==="number"){ak=aF;aF=aH;aH=aI;aI=ak}if(typeof aI==="string"&&aI.match(/[\n\r]/)){aI=aI.split(/\r\n|\r|\n/g)}if(typeof az==="number"){aB=az;az=null}var k="",aC="Td",aA;if(aB){aB*=(Math.PI/180);var aE=Math.cos(aB),aK=Math.sin(aB);k=[r(aE),r(aK),r(aK*-1),r(aE),""].join(" ");aC="Tm"}az=az||{};if(!("noBOM" in az)){az.noBOM=true}if(!("autoencode" in az)){az.autoencode=true}if(typeof aI==="string"){aI=ay(aI)}else{if(aI instanceof Array){var aG=aI.concat(),aJ=[],aD=aG.length;while(aD--){aJ.push(ay(aG.shift()))}var ax=Math.ceil((G-aF)*ap/(an*n));if(0<=ax&&ax<aJ.length+1){aA=aJ.splice(ax-1)}aI=aJ.join(") Tj\nT* (")}else{throw new Error('Type of text must be string or Array. "'+aI+'" is not recognized.')}}ag("BT\n/"+f+" "+an+" Tf\n"+(an*n)+" TL\n"+ai+"\n"+k+r(aH*ap)+" "+r((G-aF)*ap)+" "+aC+"\n("+aI+") Tj\nET");if(aA){this.addPage();this.text(aA,aH,an*1.7/ap)}return this};V.lstext=function(az,ax,aB,aA){for(var ay=0,k=az.length;ay<k;ay++,ax+=aA){this.text(az[ay],ax,aB)}};V.line=function(ax,az,k,ay){return this.lines([[k-ax,ay-az]],ax,az)};V.clip=function(){ag("W");ag("S")};V.lines=function(aM,aJ,aI,aA,ay,aE){var aD,aC,aB,az,aK,ax,aH,k,aG,aL,aF;if(typeof aM==="number"){ak=aI;aI=aJ;aJ=aM;aM=ak}aA=aA||[1,1];ag(q(aJ*ap)+" "+q((G-aI)*ap)+" m ");aD=aA[0];aC=aA[1];az=aM.length;aL=aJ;aF=aI;for(aB=0;aB<az;aB++){aK=aM[aB];if(aK.length===2){aL=aK[0]*aD+aL;aF=aK[1]*aC+aF;ag(q(aL*ap)+" "+q((G-aF)*ap)+" l")}else{ax=aK[0]*aD+aL;aH=aK[1]*aC+aF;k=aK[2]*aD+aL;aG=aK[3]*aC+aF;aL=aK[4]*aD+aL;aF=aK[5]*aC+aF;ag(q(ax*ap)+" "+q((G-aH)*ap)+" "+q(k*ap)+" "+q((G-aG)*ap)+" "+q(aL*ap)+" "+q((G-aF)*ap)+" c")}}if(aE){ag(" h")}if(ay!==null){ag(ah(ay))}return this};V.rect=function(k,aB,ax,az,ay){var aA=ah(ay);ag([r(k*ap),r((G-aB)*ap),r(ax*ap),r(-az*ap),"re"].join(" "));if(ay!==null){ag(ah(ay))}return this};V.triangle=function(az,aC,ax,aA,k,ay,aB){this.lines([[ax-az,aA-aC],[k-ax,ay-aA],[az-k,aC-ay]],az,aC,[1,1],aB,true);return this};V.roundedRect=function(ax,aD,ay,aA,aC,aB,az){var k=4/3*(Math.SQRT2-1);this.lines([[(ay-2*aC),0],[(aC*k),0,aC,aB-(aB*k),aC,aB],[0,(aA-2*aB)],[0,(aB*k),-(aC*k),aB,-aC,aB],[(-ay+2*aC),0],[-(aC*k),0,-aC,-(aB*k),-aC,-aB],[0,(-aA+2*aB)],[0,-(aB*k),(aC*k),-aB,aC,-aB]],ax+aC,aD,[1,1],az);return this};V.ellipse=function(k,aC,aB,aA,ax){var az=4/3*(Math.SQRT2-1)*aB,ay=4/3*(Math.SQRT2-1)*aA;ag([r((k+aB)*ap),r((G-aC)*ap),"m",r((k+aB)*ap),r((G-(aC-ay))*ap),r((k+az)*ap),r((G-(aC-aA))*ap),r(k*ap),r((G-(aC-aA))*ap),"c"].join(" "));ag([r((k-az)*ap),r((G-(aC-aA))*ap),r((k-aB)*ap),r((G-(aC-ay))*ap),r((k-aB)*ap),r((G-aC)*ap),"c"].join(" "));ag([r((k-aB)*ap),r((G-(aC+ay))*ap),r((k-az)*ap),r((G-(aC+aA))*ap),r(k*ap),r((G-(aC+aA))*ap),"c"].join(" "));ag([r((k+az)*ap),r((G-(aC+aA))*ap),r((k+aB)*ap),r((G-(aC+ay))*ap),r((k+aB)*ap),r((G-aC)*ap),"c"].join(" "));if(ax!==null){ag(ah(ax))}return this};V.circle=function(k,az,ay,ax){return this.ellipse(k,az,ay,ay,ax)};V.setProperties=function(k){for(var ax in T){if(T.hasOwnProperty(ax)&&k[ax]){T[ax]=k[ax]}}return this};V.setFontSize=function(k){an=k;return this};V.setFont=function(k,ax){f=D(k,ax);return this};V.setFontStyle=V.setFontType=function(k){f=D(undefined,k);return this};V.getFontList=function(){var ay={},ax,az,k;for(ax in W){if(W.hasOwnProperty(ax)){ay[ax]=k=[];for(az in W[ax]){if(W[ax].hasOwnProperty(az)){k.push(az)}}}}return ay};V.setLineWidth=function(k){ag((k*ap).toFixed(2)+" w");return this};V.setDrawColor=function(aA,az,ay,k){var ax;if(az===undefined||(k===undefined&&aA===az===ay)){if(typeof aA==="string"){ax=aA+" G"}else{ax=r(aA/255)+" G"}}else{if(k===undefined){if(typeof aA==="string"){ax=[aA,az,ay,"RG"].join(" ")}else{ax=[r(aA/255),r(az/255),r(ay/255),"RG"].join(" ")}}else{if(typeof aA==="string"){ax=[aA,az,ay,k,"K"].join(" ")}else{ax=[r(aA),r(az),r(ay),r(k),"K"].join(" ")}}}ag(ax);return this};V.setFillColor=function(aA,az,ay,k){var ax;if(az===undefined||(k===undefined&&aA===az===ay)){if(typeof aA==="string"){ax=aA+" g"}else{ax=r(aA/255)+" g"}}else{if(k===undefined){if(typeof aA==="string"){ax=[aA,az,ay,"rg"].join(" ")}else{ax=[r(aA/255),r(az/255),r(ay/255),"rg"].join(" ")}}else{if(typeof aA==="string"){ax=[aA,az,ay,k,"k"].join(" ")}else{ax=[r(aA),r(az),r(ay),r(k),"k"].join(" ")}}}ag(ax);return this};V.setTextColor=function(az,ay,k){if((typeof az==="string")&&/^#[0-9A-Fa-f]{6}$/.test(az)){var ax=parseInt(az.substr(1),16);az=(ax>>16)&255;ay=(ax>>8)&255;k=(ax&255)}if((az===0&&ay===0&&k===0)||(typeof ay==="undefined")){ai=q(az/255)+" g"}else{ai=[q(az/255),q(ay/255),q(k/255),"rg"].join(" ")}return this};V.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2};V.setLineCap=function(k){var ax=this.CapJoinStyles[k];if(ax===undefined){throw new Error("Line cap style of '"+k+"' is not recognized. See or extend .CapJoinStyles property for valid styles")}Y=ax;ag(ax+" J");return this};V.setLineJoin=function(k){var ax=this.CapJoinStyles[k];if(ax===undefined){throw new Error("Line join style of '"+k+"' is not recognized. See or extend .CapJoinStyles property for valid styles")}Z=ax;ag(ax+" j");return this};V.output=O;V.save=function(k){V.output("save",k)};for(var aq in c.API){if(c.API.hasOwnProperty(aq)){if(aq==="events"&&c.API.events.length){(function(ay,aA){var az,ax,k;for(k=aA.length-1;k!==-1;k--){az=aA[k][0];ax=aA[k][1];ay.subscribe.apply(ay,[az].concat(typeof ax==="function"?[ax]:ax))}}(M,c.API.events))}else{V[aq]=c.API[aq]}}}h();f="F1";al(S,J);M.publish("initialized");return V}c.API={events:[]};c.version="1.0.272-debug 2014-09-29T15:09:diegocr";if(typeof define==="function"&&define.amd){define("jsPDF",function(){return c})}else{e.jsPDF=c}return c}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this));(function(a){a.addHTML=function(c,g,e,k,j){if(typeof html2canvas==="undefined"&&typeof rasterizeHTML==="undefined"){throw new Error("You need either https://github.com/niklasvh/html2canvas or https://github.com/cburgmer/rasterizeHTML.js")}if(typeof g!=="number"){k=g;j=e}if(typeof k==="function"){j=k;k=null}var h=this.internal,f=h.scaleFactor,b=h.pageSize.width,i=h.pageSize.height;k=k||{};k.onrendered=function(l){g=parseInt(g)||0;e=parseInt(e)||0;var n=k.dim||{};var o=n.h||0;var t=n.w||Math.min(b,l.width/f)-g;var s="JPEG";if(k.format){s=k.format}if(l.height>i&&k.pagesplit){var p=function(){var x=0;while(1){var w=document.createElement("canvas");w.width=Math.min(b*f,l.width);w.height=Math.min(i*f,l.height-x);var u=w.getContext("2d");u.drawImage(l,0,x,l.width,w.height,0,0,w.width,w.height);var v=[w,g,x?0:e,w.width/f,w.height/f,s,null,"SLOW"];this.addImage.apply(this,v);x+=w.height;if(x>=l.height){break}this.addPage()}j(t,x,null,v)}.bind(this);if(l.nodeName==="CANVAS"){var m=new Image();m.onload=p;m.src=l.toDataURL("image/png");l=m}else{p()}}else{var q=Math.random().toString(35);var r=[l,g,e,t,o,s,q,"SLOW"];this.addImage.apply(this,r);j(t,o,q,r)}}.bind(this);if(typeof html2canvas!=="undefined"&&!k.rstz){return html2canvas(c,k)}if(typeof rasterizeHTML!=="undefined"){var d="drawDocument";if(typeof c==="string"){d=/^http/.test(c)?"drawURL":"drawHTML"}k.width=k.width||(b*f);return rasterizeHTML[d](c,void 0,k).then(function(l){k.onrendered(l.image)},function(l){j(null,l)})}return null}})(jsPDF.API);(function(p){var j="addImage_",b=["jpeg","jpg","png"];var t=function(A){var B=this.internal.newObject(),y=this.internal.write,x=this.internal.putStream;A.n=B;y("<</Type /XObject");y("/Subtype /Image");y("/Width "+A.w);y("/Height "+A.h);if(A.cs===this.color_spaces.INDEXED){y("/ColorSpace [/Indexed /DeviceRGB "+(A.pal.length/3-1)+" "+("smask" in A?B+2:B+1)+" 0 R]")}else{y("/ColorSpace /"+A.cs);if(A.cs===this.color_spaces.DEVICE_CMYK){y("/Decode [1 0 1 0 1 0 1 0]")}}y("/BitsPerComponent "+A.bpc);if("f" in A){y("/Filter /"+A.f)}if("dp" in A){y("/DecodeParms <<"+A.dp+">>")}if("trns" in A&&A.trns.constructor==Array){var v="",z=0,C=A.trns.length;for(;z<C;z++){v+=(A.trns[z]+" "+A.trns[z]+" ")}y("/Mask ["+v+"]")}if("smask" in A){y("/SMask "+(B+1)+" 0 R")}y("/Length "+A.data.length+">>");x(A.data);y("endobj");if("smask" in A){var w="/Predictor 15 /Colors 1 /BitsPerComponent "+A.bpc+" /Columns "+A.w;var D={w:A.w,h:A.h,cs:"DeviceGray",bpc:A.bpc,dp:w,data:A.smask};if("f" in A){D.f=A.f}t.call(this,D)}if(A.cs===this.color_spaces.INDEXED){this.internal.newObject();y("<< /Length "+A.pal.length+">>");x(this.arrayBufferToBinaryString(new Uint8Array(A.pal)));y("endobj")}},c=function(){var v=this.internal.collections[j+"images"];for(var w in v){t.call(this,v[w])}},f=function(){var v=this.internal.collections[j+"images"],w=this.internal.write,y;for(var x in v){y=v[x];w("/I"+y.i,y.n,"0","R")}},r=function(v){if(v&&typeof v==="string"){v=v.toUpperCase()}return v in p.image_compression?v:p.image_compression.NONE},g=function(){var v=this.internal.collections[j+"images"];if(!v){this.internal.collections[j+"images"]=v={};this.internal.events.subscribe("putResources",c);this.internal.events.subscribe("putXobjectDict",f)}return v},e=function(w){var v=0;if(w){v=Object.keys?Object.keys(w).length:(function(z){var x=0;for(var y in z){if(z.hasOwnProperty(y)){x++}}return x})(w)}return v},s=function(v){return typeof v==="undefined"||v===null},o=function(v){return typeof v==="string"&&p.sHashCode(v)},a=function(v){return b.indexOf(v)===-1},i=function(v){return typeof p["process"+v.toUpperCase()]!=="function"},k=function(v){return typeof v==="object"&&v.nodeType===1},u=function(B,J,A){if(B.nodeName==="IMG"&&B.hasAttribute("src")){var v=""+B.getAttribute("src");if(!A&&v.indexOf("data:image/")===0){return v}if(!J&&/\.png(?:[?#].*)?$/i.test(v)){J="png"}}if(B.nodeName==="CANVAS"){var z=B}else{var z=document.createElement("canvas");z.width=B.clientWidth||B.width;z.height=B.clientHeight||B.height;var L=z.getContext("2d");if(!L){throw ("addImage requires canvas to be supported by browser.")}if(A){var H,F,E,D,M,I,C,K=Math.PI/180,G;if(typeof A==="object"){H=A.x;F=A.y;E=A.bg;A=A.angle}G=A*K;D=Math.abs(Math.cos(G));M=Math.abs(Math.sin(G));I=z.width;C=z.height;z.width=C*M+I*D;z.height=C*D+I*M;if(isNaN(H)){H=z.width/2}if(isNaN(F)){F=z.height/2}L.clearRect(0,0,z.width,z.height);L.fillStyle=E||"white";L.fillRect(0,0,z.width,z.height);L.save();L.translate(H,F);L.rotate(G);L.drawImage(B,-(I/2),-(C/2));L.rotate(-G);L.translate(-H,-F);L.restore()}else{L.drawImage(B,0,0,z.width,z.height)}}return z.toDataURL((""+J).toLowerCase()=="png"?"image/png":"image/jpeg")},m=function(x,w){var v;if(w){for(var y in w){if(x===w[y].alias){v=w[y];break}}}return v},n=function(v,x,y){if(!v&&!x){v=-96;x=-96}if(v<0){v=(-1)*y.w*72/v/this.internal.scaleFactor}if(x<0){x=(-1)*y.h*72/x/this.internal.scaleFactor}if(v===0){v=x*y.w/y.h}if(x===0){x=v*y.h/y.w}return[v,x]},d=function(F,E,H,z,v,B,C){var G=n.call(this,H,z,v),A=this.internal.getCoordinateString,D=this.internal.getVerticalCoordinateString;H=G[0];z=G[1];C[B]=v;this.internal.write("q",A(H),"0 0",A(z),A(F),D(E+z),"cm /I"+v.i,"Do Q")};p.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPERATION:"Seperation",DEVICE_N:"DeviceN"};p.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"};p.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"};p.sHashCode=function(v){return Array.prototype.reduce&&v.split("").reduce(function(x,w){x=((x<<5)-x)+w.charCodeAt(0);return x&x},0)};p.isString=function(v){return typeof v==="string"};p.extractInfoFromBase64DataURI=function(v){return/^data:([\w]+?\/([\w]+?));base64,(.+?)$/g.exec(v)};p.supportsArrayBuffer=function(){return typeof ArrayBuffer!=="undefined"&&typeof Uint8Array!=="undefined"};p.isArrayBuffer=function(v){if(!this.supportsArrayBuffer()){return false}return v instanceof ArrayBuffer};p.isArrayBufferView=function(v){if(!this.supportsArrayBuffer()){return false}if(typeof Uint32Array==="undefined"){return false}return(v instanceof Int8Array||v instanceof Uint8Array||(typeof Uint8ClampedArray!=="undefined"&&v instanceof Uint8ClampedArray)||v instanceof Int16Array||v instanceof Uint16Array||v instanceof Int32Array||v instanceof Uint32Array||v instanceof Float32Array||v instanceof Float64Array)};p.binaryStringToUint8Array=function(x){var v=x.length;var w=new Uint8Array(v);for(var y=0;y<v;y++){w[y]=x.charCodeAt(y)}return w};p.arrayBufferToBinaryString=function(w){if(this.isArrayBuffer(w)){w=new Uint8Array(w)}var x="";var v=w.byteLength;for(var y=0;y<v;y++){x+=String.fromCharCode(w[y])}return x};p.arrayBufferToBase64=function(y){var x="";var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var H=new Uint8Array(y);var F=H.byteLength;var w=F%3;var G=F-w;var E,C,B,z;var D;for(var v=0;v<G;v=v+3){D=(H[v]<<16)|(H[v+1]<<8)|H[v+2];E=(D&16515072)>>18;C=(D&258048)>>12;B=(D&4032)>>6;z=D&63;x+=A[E]+A[C]+A[B]+A[z]}if(w==1){D=H[G];E=(D&252)>>2;C=(D&3)<<4;x+=A[E]+A[C]+"=="}else{if(w==2){D=(H[G]<<8)|H[G+1];E=(D&64512)>>10;C=(D&1008)>>4;B=(D&15)<<2;x+=A[E]+A[C]+A[B]+"="}}return x};p.createImageInfo=function(B,z,F,E,v,D,w,C,A,y,G,H){var x={alias:C,w:z,h:F,cs:E,bpc:v,i:w,data:B};if(D){x.f=D}if(A){x.dp=A}if(y){x.trns=y}if(G){x.pal=G}if(H){x.smask=H}return x};p.addImage=function(v,G,F,E,H,B,C,K,J){if(typeof G!=="string"){var A=B;B=H;H=E;E=F;F=G;G=A}if(typeof v==="object"&&!k(v)&&"imageData" in v){var M=v;v=M.imageData;G=M.format||G;F=M.x||F||0;E=M.y||E||0;H=M.w||H;B=M.h||B;C=M.alias||C;K=M.compression||K;J=M.rotation||M.angle||J}if(isNaN(F)||isNaN(E)){console.error("jsPDF.addImage: Invalid coordinates",arguments);throw new Error("Invalid coordinates passed to jsPDF.addImage")}var D=g.call(this),z;if(!(z=m(v,D))){var I;if(k(v)){v=u(v,G,J)}if(s(C)){C=o(v)}if(!(z=m(C,D))){if(this.isString(v)){var L=this.extractInfoFromBase64DataURI(v);if(L){G=L[2];v=atob(L[3])}else{if(v.charCodeAt(0)===137&&v.charCodeAt(1)===80&&v.charCodeAt(2)===78&&v.charCodeAt(3)===71){G="png"}}}G=(G||"JPEG").toLowerCase();if(a(G)){throw new Error("addImage currently only supports formats "+b+", not '"+G+"'")}if(i(G)){throw new Error("please ensure that the plugin for '"+G+"' support is added")}if(this.supportsArrayBuffer()){I=v;v=this.binaryStringToUint8Array(v)}z=this["process"+G.toUpperCase()](v,e(D),C,r(K),I);if(!z){throw new Error("An unkwown error occurred whilst processing the image")}}}d.call(this,F,E,H,B,z,z.i,D);return this};var h=function(B){var z,w,A;if(!B.charCodeAt(0)===255||!B.charCodeAt(1)===216||!B.charCodeAt(2)===255||!B.charCodeAt(3)===224||!B.charCodeAt(6)==="J".charCodeAt(0)||!B.charCodeAt(7)==="F".charCodeAt(0)||!B.charCodeAt(8)==="I".charCodeAt(0)||!B.charCodeAt(9)==="F".charCodeAt(0)||!B.charCodeAt(10)===0){throw new Error("getJpegSize requires a binary string jpeg file")}var x=B.charCodeAt(4)*256+B.charCodeAt(5);var y=4,v=B.length;while(y<v){y+=x;if(B.charCodeAt(y)!==255){throw new Error("getJpegSize could not find the size of the image")}if(B.charCodeAt(y+1)===192||B.charCodeAt(y+1)===193||B.charCodeAt(y+1)===194||B.charCodeAt(y+1)===195||B.charCodeAt(y+1)===196||B.charCodeAt(y+1)===197||B.charCodeAt(y+1)===198||B.charCodeAt(y+1)===199){w=B.charCodeAt(y+5)*256+B.charCodeAt(y+6);z=B.charCodeAt(y+7)*256+B.charCodeAt(y+8);A=B.charCodeAt(y+9);return[z,w,A]}else{y+=2;x=B.charCodeAt(y)*256+B.charCodeAt(y+1)}}},q=function(y){var B=(y[0]<<8)|y[1];if(B!==65496){throw new Error("Supplied data is not a JPEG")}var z=y.length,x=(y[4]<<8)+y[5],A=4,D,v,C,w;while(A<z){A+=x;D=l(y,A);x=(D[2]<<8)+D[3];if((D[1]===192||D[1]===194)&&D[0]===255&&x>7){D=l(y,A+5);v=(D[2]<<8)+D[3];C=(D[0]<<8)+D[1];w=D[4];return{width:v,height:C,numcomponents:w}}A+=2}throw new Error("getJpegSizeFromBytes could not find the size of the image")},l=function(v,w){return v.subarray(w,w+5)};p.processJPEG=function(y,A,z,D,C){var x=this.color_spaces.DEVICE_RGB,w=this.decode.DCT_DECODE,v=8,B;if(this.isString(y)){B=h(y);return this.createImageInfo(y,B[0],B[1],B[3]==1?this.color_spaces.DEVICE_GRAY:x,v,w,A,z)}if(this.isArrayBuffer(y)){y=new Uint8Array(y)}if(this.isArrayBufferView(y)){B=q(y);y=C||this.arrayBufferToBinaryString(y);return this.createImageInfo(y,B.width,B.height,B.numcomponents==1?this.color_spaces.DEVICE_GRAY:x,v,w,A,z)}return null};p.processJPG=function(){return this.processJPEG.apply(this,arguments)}})(jsPDF.API);(function(a){a.autoPrint=function(){var b;this.internal.events.subscribe("postPutResources",function(){b=this.internal.newObject();this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj")});this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+b+" 0 R")});return this}})(jsPDF.API);(function(j){var a,l,g,k=3,e=13,h,b={x:undefined,y:undefined,w:undefined,h:undefined,ln:undefined},d=1,c=function(m,q,n,o,p){b={x:m,y:q,w:n,h:o,ln:p}},i=function(){return b},f={left:0,top:0,bottom:0};j.setHeaderFunction=function(m){h=m};j.getTextDimensions=function(m){a=this.internal.getFont().fontName;l=this.table_font_size||this.internal.getFontSize();g=this.internal.getFont().fontStyle;var p=0.264583*72/25.4,n,o;o=document.createElement("font");o.id="jsPDFCell";o.style.fontStyle=g;o.style.fontName=a;o.style.fontSize=l+"pt";o.textContent=m;document.body.appendChild(o);n={w:(o.offsetWidth+1)*p,h:(o.offsetHeight+1)*p};document.body.removeChild(o);return n};j.cellAddPage=function(){var m=this.margins||f;this.addPage();c(m.left,m.top,undefined,undefined);d+=1};j.cellInitialize=function(){b={x:undefined,y:undefined,w:undefined,h:undefined,ln:undefined};d=1};j.cell=function(u,t,v,p,o,r,q){var A=i();if(A.ln!==undefined){if(A.ln===r){u=A.x+A.w;t=A.y}else{var s=this.margins||f;if((A.y+A.h+p+e)>=this.internal.pageSize.height-s.bottom){this.cellAddPage();if(this.printHeaders&&this.tableHeaderRow){this.printHeaderRow(r,true)}}t=(i().y+i().h)}}if(o[0]!==undefined){if(this.printingHeaderRow){this.rect(u,t,v,p,"FD")}else{this.rect(u,t,v,p)}if(q==="right"){if(o instanceof Array){for(var n=0;n<o.length;n++){var z=o[n];var m=this.getStringUnitWidth(z)*this.internal.getFontSize();this.text(z,u+v-m-k,t+this.internal.getLineHeight()*(n+1))}}}else{this.text(o,u+k,t+this.internal.getLineHeight())}}c(u,t,v,p,r);return this};j.arrayMax=function(r,q){var m=r[0],n,p,o;for(n=0,p=r.length;n<p;n+=1){o=r[n];if(q){if(q(m,o)===-1){m=o}}else{if(o>m){m=o}}}return m};j.table=function(D,B,O,p,N){if(!O){throw"No data for PDF table"}var w=[],m=[],I,J,C,v,L={},G={},u,s,M=[],H,K=[],t,o,z,E=false,F=true,r=12,n=f;n.width=this.internal.pageSize.width;if(N){if(N.autoSize===true){E=true}if(N.printHeaders===false){F=false}if(N.fontSize){r=N.fontSize}if(N.margins){n=N.margins}}this.lnMod=0;b={x:undefined,y:undefined,w:undefined,h:undefined,ln:undefined},d=1;this.printHeaders=F;this.margins=n;this.setFontSize(r);this.table_font_size=r;if(p===undefined||(p===null)){w=Object.keys(O[0])}else{if(p[0]&&(typeof p[0]!=="string")){var A=0.264583*72/25.4;for(J=0,C=p.length;J<C;J+=1){I=p[J];w.push(I.name);m.push(I.prompt);G[I.name]=I.width*A}}else{w=p}}if(E){z=function(x){return x[I]};for(J=0,C=w.length;J<C;J+=1){I=w[J];L[I]=O.map(z);M.push(this.getTextDimensions(m[J]||I).w);s=L[I];for(H=0,v=s.length;H<v;H+=1){u=s[H];M.push(this.getTextDimensions(u).w)}G[I]=j.arrayMax(M)}}if(F){var q=this.calculateLineHeight(w,G,m.length?m:w);for(J=0,C=w.length;J<C;J+=1){I=w[J];K.push([D,B,G[I],q,String(m.length?m[J]:I)])}this.setTableHeaderRow(K);this.printHeaderRow(1,false)}for(J=0,C=O.length;J<C;J+=1){var q;t=O[J];q=this.calculateLineHeight(w,G,t);for(H=0,o=w.length;H<o;H+=1){I=w[H];this.cell(D,B,G[I],q,t[I],J+2,I.align)}}this.lastCellPos=b;this.table_x=D;this.table_y=B;return this};j.calculateLineHeight=function(r,o,n){var s,q=0;for(var m=0;m<r.length;m++){s=r[m];n[s]=this.splitTextToSize(String(n[s]),o[s]-k);var p=this.internal.getLineHeight()*n[s].length+k;if(p>q){q=p}}return q};j.setTableHeaderRow=function(m){this.tableHeaderRow=m};j.printHeaderRow=function(o,n){if(!this.tableHeaderRow){throw"Property tableHeaderRow does not exist."}var q,s,r,t;this.printingHeaderRow=true;if(h!==undefined){var m=h(this,d);c(m[0],m[1],m[2],m[3],-1)}this.setFontStyle("bold");var p=[];for(r=0,t=this.tableHeaderRow.length;r<t;r+=1){this.setFillColor(200,200,200);q=this.tableHeaderRow[r];if(n){q[1]=this.margins&&this.margins.top||0;p.push(q)}s=[].concat(q);this.cell.apply(this,s.concat(o))}if(p.length>0){this.setTableHeaderRow(p)}this.setFontStyle("normal");this.printingHeaderRow=false}})(jsPDF.API);(function(m){var r,q,i,a,p,g,t,c,e,l,o,u,v,n,f,j,b,h,k;r=(function(){return function(x){w.prototype=x;return new w()};function w(){}})();e=function(D){var x,y,w,C,A,z,B;y=0;w=D.length;x=void 0;C=false;z=false;while(!C&&y!==w){x=D[y]=D[y].trimLeft();if(x){C=true}y++}y=w-1;while(w&&!z&&y!==-1){x=D[y]=D[y].trimRight();if(x){z=true}y--}A=/\s+$/g;B=true;y=0;while(y!==w){x=D[y].replace(/\s+/g," ");if(B){x=x.trimLeft()}if(x){B=A.test(x)}D[y]=x;y++}return D};l=function(z,w,B,A){this.pdf=z;this.x=w;this.y=B;this.settings=A;this.watchFunctions=[];this.init();return this};o=function(w){var y,x,z;y=void 0;z=w.split(",");x=z.shift();while(!y&&x){y=i[x.trim().toLowerCase()];x=z.shift()}return y};u=function(w){w=w==="auto"?"0px":w;if(w.indexOf("em")>-1&&!isNaN(Number(w.replace("em","")))){w=Number(w.replace("em",""))*18.719+"px"}if(w.indexOf("pt")>-1&&!isNaN(Number(w.replace("pt","")))){w=Number(w.replace("pt",""))*1.333+"px"}var z,x,y;x=void 0;z=16;y=v[w];if(y){return y}y={"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0}[{css_line_height_string:w}];if(y!==x){return v[w]=y/z}if(y=parseFloat(w)){return v[w]=y/z}y=w.match(/([\d\.]+)(px)/);if(y.length===3){return v[w]=parseFloat(y[1])/z}return v[w]=1};c=function(z){var y,x,w;w=(function(A){var B;B=(function(C){if(document.defaultView&&document.defaultView.getComputedStyle){return document.defaultView.getComputedStyle(C,null)}else{if(C.currentStyle){return C.currentStyle}else{return C.style}}})(A);return function(C){C=C.replace(/-\D/g,function(D){return D.charAt(1).toUpperCase()});return B[C]}})(z);y={};x=void 0;y["font-family"]=o(w("font-family"))||"times";y["font-style"]=a[w("font-style")]||"normal";y["text-align"]=TextAlignMap[w("text-align")]||"left";x=p[w("font-weight")]||"normal";if(x==="bold"){if(y["font-style"]==="normal"){y["font-style"]=x}else{y["font-style"]=x+y["font-style"]}}y["font-size"]=u(w("font-size"))||1;y["line-height"]=u(w("line-height"))||1;y.display=(w("display")==="inline"?"inline":"block");x=(y.display==="block");y["margin-top"]=x&&u(w("margin-top"))||0;y["margin-bottom"]=x&&u(w("margin-bottom"))||0;y["padding-top"]=x&&u(w("padding-top"))||0;y["padding-bottom"]=x&&u(w("padding-bottom"))||0;y["margin-left"]=x&&u(w("margin-left"))||0;y["margin-right"]=x&&u(w("margin-right"))||0;y["padding-left"]=x&&u(w("padding-left"))||0;y["padding-right"]=x&&u(w("padding-right"))||0;y["float"]=g[w("cssFloat")]||"none";y.clear=t[w("clear")]||"none";return y};n=function(B,C,D){var x,A,z,w,y;z=false;A=void 0;w=void 0;y=void 0;x=D["#"+B.id];if(x){if(typeof x==="function"){z=x(B,C)}else{A=0;w=x.length;while(!z&&A!==w){z=x[A](B,C);A++}}}x=D[B.nodeName];if(!z&&x){if(typeof x==="function"){z=x(B,C)}else{A=0;w=x.length;while(!z&&A!==w){z=x[A](B,C);A++}}}return z};k=function(H,F){var D,y,E,C,B,x,w,A,G,z;D=[];y=[];E=0;z=H.rows[0].cells.length;A=H.clientWidth;while(E<z){G=H.rows[0].cells[E];y[E]={name:G.textContent.toLowerCase().replace(/\s+/g,""),prompt:G.textContent.replace(/\r?\n/g,""),width:(G.clientWidth/A)*F.pdf.internal.pageSize.width};E++}E=1;while(E<H.rows.length){x=H.rows[E];B={};C=0;while(C<x.cells.length){B[y[C].name]=x.cells[C].textContent.replace(/\r?\n/g,"");C++}D.push(B);E++}return w={rows:D,headers:y}};var s={SCRIPT:1,STYLE:1,NOSCRIPT:1,OBJECT:1,EMBED:1,SELECT:1};var d=1;q=function(x,L,y){var F,R,T,Q,H,M,E,J,I;R=x.childNodes;F=void 0;T=c(x);H=T.display==="block";if(H){L.setBlockBoundary();L.setBlockStyle(T)}E=0.264583*72/25.4;Q=0;M=R.length;while(Q<M){F=R[Q];if(typeof F==="object"){L.executeWatchFunctions(F);if(F.nodeType===1&&F.nodeName==="HEADER"){var P=F;var V=L.pdf.margins_doc.top;L.pdf.internal.events.subscribe("addPage",function(X){L.y=V;q(P,L,y);L.pdf.margins_doc.top=L.y+10;L.y+=10},false)}if(F.nodeType===8&&F.nodeName==="#comment"){if(~F.textContent.indexOf("ADD_PAGE")){L.pdf.addPage();L.y=L.pdf.margins_doc.top}}else{if(F.nodeType===1&&!s[F.nodeName]){var G;if(F.nodeName==="IMG"){var B=F.getAttribute("src");G=f[L.pdf.sHashCode(B)||B]}if(G){if((L.pdf.internal.pageSize.height-L.pdf.margins_doc.bottom<L.y+F.height)&&(L.y>L.pdf.margins_doc.top)){L.pdf.addPage();L.y=L.pdf.margins_doc.top;L.executeWatchFunctions(F)}var D=c(F);var w=L.x;var N=12/L.pdf.internal.scaleFactor;var O=(D["margin-left"]+D["padding-left"])*N;var C=(D["margin-right"]+D["padding-right"])*N;var W=(D["margin-top"]+D["padding-top"])*N;var U=(D["margin-bottom"]+D["padding-bottom"])*N;if(D["float"]!==undefined&&D["float"]==="right"){w+=L.settings.width-F.width-C}else{w+=O}L.pdf.addImage(G,w,L.y+W,F.width,F.height);G=undefined;if(D["float"]==="right"||D["float"]==="left"){L.watchFunctions.push((function(Z,X,Y,aa){if(L.y>=X){L.x+=Z;L.settings.width+=Y;return true}else{if(aa&&aa.nodeType===1&&!s[aa.nodeName]&&L.x+aa.width>(L.pdf.margins_doc.left+L.pdf.margins_doc.width)){L.x+=Z;L.y=X;L.settings.width+=Y;return true}else{return false}}}).bind(this,(D["float"]==="left")?-F.width-O-C:0,L.y+F.height+W+U,F.width));L.watchFunctions.push((function(Z,X,Y){if(L.y<Z&&X===L.pdf.internal.getNumberOfPages()){if(Y.nodeType===1&&c(Y).clear==="both"){L.y=Z;return true}else{return false}}else{return true}}).bind(this,L.y+F.height,L.pdf.internal.getNumberOfPages()));L.settings.width-=F.width+O+C;if(D["float"]==="left"){L.x+=F.width+O+C}}else{L.y+=F.height+U}}else{if(F.nodeName==="TABLE"){J=k(F,L);L.y+=10;L.pdf.table(L.x,L.y,J.rows,J.headers,{autoSize:false,printHeaders:true,margins:L.pdf.margins_doc});L.y=L.pdf.lastCellPos.y+L.pdf.lastCellPos.h+20}else{if(F.nodeName==="OL"||F.nodeName==="UL"){d=1;if(!n(F,L,y)){q(F,L,y)}L.y+=10}else{if(F.nodeName==="LI"){var S=L.x;L.x+=F.parentNode.nodeName==="UL"?22:10;L.y+=3;if(!n(F,L,y)){q(F,L,y)}L.x=S}else{if(F.nodeName==="BR"){L.y+=T["font-size"]*L.pdf.internal.scaleFactor}else{if(!n(F,L,y)){q(F,L,y)}}}}}}}else{if(F.nodeType===3){var K=F.nodeValue;if(F.nodeValue&&F.parentNode.nodeName==="LI"){if(F.parentNode.parentNode.nodeName==="OL"){K=d+++". "+K}else{var z=T["font-size"]*16;var A=2;if(z>20){A=3}I=function(X,Y){this.pdf.circle(X,Y,A,"FD")}}}L.addText(K,T)}else{if(typeof F==="string"){L.addText(F,T)}}}}}Q++}if(H){return L.setBlockBoundary(I)}};f={};j=function(D,F,w,B){var E=D.getElementsByTagName("img"),A=E.length,y,G=0;function C(){F.pdf.internal.events.publish("imagesLoaded");B(y)}function z(I,J,x){if(!I){return}var H=new Image();y=++G;H.crossOrigin="";H.onerror=H.onload=function(){if(H.complete){if(H.src.indexOf("data:image/")===0){H.width=J||H.width||0;H.height=x||H.height||0}if(H.width+H.height){var K=F.pdf.sHashCode(I)||I;f[K]=f[K]||H}}if(!--G){C()}};H.src=I}while(A--){z(E[A].getAttribute("src"),E[A].width,E[A].height)}return G||C()};b=function(x,A,w){var D=x.getElementsByTagName("footer");if(D.length>0){D=D[0];var F=A.pdf.internal.write;var E=A.y;A.pdf.internal.write=function(){};q(D,A,w);var C=Math.ceil(A.y-E)+5;A.y=E;A.pdf.internal.write=F;A.pdf.margins_doc.bottom+=C;var B=function(K){var G=K!==undefined?K.pageNumber:1;var J=A.y;A.y=A.pdf.internal.pageSize.height-A.pdf.margins_doc.bottom;A.pdf.margins_doc.bottom-=C;var I=D.getElementsByTagName("span");for(var H=0;H<I.length;++H){if((" "+I[H].className+" ").replace(/[\n\t]/g," ").indexOf(" pageCounter ")>-1){I[H].innerHTML=G}if((" "+I[H].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1){I[H].innerHTML="###jsPDFVarTotalPages###"}}q(D,A,w);A.pdf.margins_doc.bottom+=C;A.y=J};var z=D.getElementsByTagName("span");for(var y=0;y<z.length;++y){if((" "+z[y].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1){A.pdf.internal.events.subscribe("htmlRenderingFinished",A.pdf.putTotalPages.bind(A.pdf,"###jsPDFVarTotalPages###"),true)}}A.pdf.internal.events.subscribe("addPage",B,false);B();s.FOOTER=1}};h=function(z,B,w,F,C,E){if(!B){return false}if(typeof B!=="string"&&!B.parentNode){B=""+B.innerHTML}if(typeof B==="string"){B=(function(G){var I,H,y,x;y="jsPDFhtmlText"+Date.now().toString()+(Math.random()*1000).toFixed(0);x="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;";H=document.createElement("div");H.style.cssText=x;H.innerHTML='<iframe style="height:1px;width:1px" name="'+y+'" />';document.body.appendChild(H);I=window.frames[y];I.document.body.innerHTML=G;return I.document.body})(B.replace(/<\/?script[^>]*?>/gi,""))}var D=new l(z,w,F,C),A;j.call(this,B,D,C.elementHandlers,function(x){b(B,D,C.elementHandlers);q(B,D,C.elementHandlers);D.pdf.internal.events.publish("htmlRenderingFinished");A=D.dispose();if(typeof E==="function"){E(A)}else{if(x){console.error("jsPDF Warning: rendering issues? provide a callback to fromHTML!")}}});return A||{x:D.x,y:D.y}};l.prototype.init=function(){this.paragraph={text:[],style:[]};return this.pdf.internal.write("q")};l.prototype.dispose=function(){this.pdf.internal.write("Q");return{x:this.x,y:this.y,ready:true}};l.prototype.executeWatchFunctions=function(z){var x=false;var w=[];if(this.watchFunctions.length>0){for(var y=0;y<this.watchFunctions.length;++y){if(this.watchFunctions[y](z)===true){x=true}else{w.push(this.watchFunctions[y])}}this.watchFunctions=w}return x};l.prototype.splitFragmentsIntoLines=function(Q,H){var N,G,J,C,w,y,P,E,x,F,K,I,A,B,M;G=12;K=this.pdf.internal.scaleFactor;w={};J=void 0;F=void 0;C=void 0;y=void 0;M=void 0;x=void 0;E=void 0;P=void 0;I=[];A=[I];N=0;B=this.settings.width;while(Q.length){y=Q.shift();M=H.shift();if(y){J=M["font-family"];F=M["font-style"];C=w[J+F];if(!C){C=this.pdf.internal.getFont(J,F).metadata.Unicode;w[J+F]=C}x={widths:C.widths,kerning:C.kerning,fontSize:M["font-size"]*G,textIndent:N};E=this.pdf.getStringUnitWidth(y,x)*x.fontSize/K;if(N+E>B){P=this.pdf.splitTextToSize(y,B,x);I.push([P.shift(),M]);while(P.length){I=[[P.shift(),M]];A.push(I)}N=this.pdf.getStringUnitWidth(I[0][0],x)*x.fontSize/K}else{I.push([y,M]);N+=E}}}if(M["text-align"]!==undefined&&(M["text-align"]==="center"||M["text-align"]==="right"||M["text-align"]==="justify")){for(var L=0;L<A.length;++L){var D=this.pdf.getStringUnitWidth(A[L][0][0],x)*x.fontSize/K;if(L>0){A[L][0][1]=r(A[L][0][1])}var O=(B-D);if(M["text-align"]==="right"){A[L][0][1]["margin-left"]=O}else{if(M["text-align"]==="center"){A[L][0][1]["margin-left"]=O/2}else{if(M["text-align"]==="justify"){var z=A[L][0][0].split(" ").length-1;A[L][0][1]["word-spacing"]=O/z;if(L===(A.length-1)){A[L][0][1]["word-spacing"]=0}}}}}}return A};l.prototype.RenderTextFragment=function(A,y){var z,w,x;x=0;z=12;if(this.pdf.internal.pageSize.height-this.pdf.margins_doc.bottom<this.y+this.pdf.internal.getFontSize()){this.pdf.internal.write("ET","Q");this.pdf.addPage();this.y=this.pdf.margins_doc.top;this.pdf.internal.write("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");x=Math.max(x,y["line-height"],y["font-size"]);this.pdf.internal.write(0,(-1*z*x).toFixed(2),"Td")}w=this.pdf.internal.getFont(y["font-family"],y["font-style"]);if(y["word-spacing"]!==undefined&&y["word-spacing"]>0){this.pdf.internal.write(y["word-spacing"].toFixed(2),"Tw")}this.pdf.internal.write("/"+w.id,(z*y["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(A)+") Tj");if(y["word-spacing"]!==undefined){this.pdf.internal.write(0,"Tw")}};l.prototype.renderParagraph=function(G){var O,B,K,P,L,I,D,x,E,M,y,H,F,C,A;P=e(this.paragraph.text);C=this.paragraph.style;O=this.paragraph.blockstyle;F=this.paragraph.blockstyle||{};this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:O};if(!P.join("").trim()){return}x=this.splitFragmentsIntoLines(P,C);D=void 0;E=void 0;B=12;K=B/this.pdf.internal.scaleFactor;H=(Math.max((O["margin-top"]||0)-(F["margin-bottom"]||0),0)+(O["padding-top"]||0))*K;y=((O["margin-bottom"]||0)+(O["padding-bottom"]||0))*K;M=this.pdf.internal.write;L=void 0;I=void 0;this.y+=H;M("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");var w=0;while(x.length){D=x.shift();E=0;L=0;I=D.length;while(L!==I){if(D[L][0].trim()){E=Math.max(E,D[L][1]["line-height"],D[L][1]["font-size"]);A=D[L][1]["font-size"]*7}L++}var J=0;if(D[0][1]["margin-left"]!==undefined&&D[0][1]["margin-left"]>0){wantedIndent=this.pdf.internal.getCoordinateString(D[0][1]["margin-left"]);J=wantedIndent-w;w=wantedIndent}M(J,(-1*B*E).toFixed(2),"Td");L=0;I=D.length;while(L!==I){if(D[L][0]){this.RenderTextFragment(D[L][0],D[L][1])}L++}this.y+=E*K;if(this.executeWatchFunctions(D[0][1])&&x.length>0){var N=[];var z=[];x.forEach(function(Q){var S=0;var R=Q.length;while(S!==R){if(Q[S][0]){N.push(Q[S][0]+" ");z.push(Q[S][1])}++S}});x=this.splitFragmentsIntoLines(e(N),z);M("ET","Q");M("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td")}}if(G&&typeof G==="function"){G.call(this,this.x-9,this.y-A/2)}M("ET","Q");return this.y+=y};l.prototype.setBlockBoundary=function(w){return this.renderParagraph(w)};l.prototype.setBlockStyle=function(w){return this.paragraph.blockstyle=w};l.prototype.addText=function(x,w){this.paragraph.text.push(x);return this.paragraph.style.push(w)};i={helvetica:"helvetica","sans-serif":"helvetica","times new roman":"times",serif:"times",times:"times",monospace:"courier",courier:"courier"};p={100:"normal",200:"normal",300:"normal",400:"normal",500:"bold",600:"bold",700:"bold",800:"bold",900:"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"};a={normal:"normal",italic:"italic",oblique:"italic"};TextAlignMap={left:"left",right:"right",center:"center",justify:"justify"};g={none:"none",right:"right",left:"left"};t={none:"none",both:"both"};v={normal:1};m.fromHTML=function(B,w,D,z,C,A){this.margins_doc=A||{top:0,bottom:0};if(!z){z={}}if(!z.elementHandlers){z.elementHandlers={}}return h(this,B,isNaN(w)?4:w,isNaN(D)?4:D,z,C)}})(jsPDF.API);(function(d){var b,a,c;d.addJS=function(e){c=e;this.internal.events.subscribe("postPutResources",function(f){b=this.internal.newObject();this.internal.write("<< /Names [(EmbeddedJS) "+(b+1)+" 0 R] >>","endobj");a=this.internal.newObject();this.internal.write("<< /S /JavaScript /JS (",c,") >>","endobj")});this.internal.events.subscribe("putCatalog",function(){if(b!==undefined&&a!==undefined){this.internal.write("/Names <</JavaScript "+b+" 0 R>>")}});return this}}(jsPDF.API));(function(k){var g=function(){return typeof PNG!=="function"||typeof FlateStream!=="function"},q=function(s){return s!==k.image_compression.NONE&&p()},p=function(){var s=typeof Deflater==="function";if(!s){throw new Error("requires deflate.js for compression")}return s},d=function(E,u,s,D){var t=5,w=i;switch(D){case k.image_compression.FAST:t=3;w=f;break;case k.image_compression.MEDIUM:t=6;w=a;break;case k.image_compression.SLOW:t=9;w=o;break}E=m(E,u,s,w);var y=new Uint8Array(l(t));var B=r(E);var x=new Deflater(t);var C=x.append(E);var v=x.flush();var A=y.length+C.length+v.length;var z=new Uint8Array(A+4);z.set(y);z.set(C,y.length);z.set(v,y.length+C.length);z[A++]=(B>>>24)&255;z[A++]=(B>>>16)&255;z[A++]=(B>>>8)&255;z[A++]=B&255;return k.arrayBufferToBinaryString(z)},l=function(t,y){var s=8;var v=Math.LOG2E*Math.log(32768)-8;var u=(v<<4)|s;var x=u<<8;var w=Math.min(3,((y-1)&255)>>1);x|=(w<<6);x|=0;x+=31-(x%31);return[u,(x&255)&255]},r=function(z,y){var u=1;var x=u&65535,t=(u>>>16)&65535;var s=z.length;var w;var v=0;while(s>0){w=s>y?y:s;s-=w;do{x+=z[v++];t+=x}while(--w);x%=65521;t%=65521}return((t<<16)|x)>>>0},m=function(E,t,s,v){var F=E.length/t,G=new Uint8Array(E.length+F),w=e(),A=0,D,C,y;for(;A<F;A++){y=A*t;D=E.subarray(y,y+t);if(v){G.set(v(D,s,C),y+A)}else{var x=0,B=w.length,z=[];for(;x<B;x++){z[x]=w[x](D,s,C)}var u=b(z.concat());G.set(z[u],y+A)}C=D}return G},c=function(t,v,u){var s=Array.apply([],t);s.unshift(0);return s},f=function(u,y,w){var t=[],v=0,s=u.length,x;t[0]=1;for(;v<s;v++){x=u[v-y]||0;t[v+1]=(u[v]-x+256)&255}return t},i=function(v,y,x){var u=[],w=0,t=v.length,s;u[0]=2;for(;w<t;w++){s=x&&x[w]||0;u[w+1]=(v[w]-s+256)&255}return u},a=function(v,z,x){var u=[],w=0,t=v.length,y,s;u[0]=3;for(;w<t;w++){y=v[w-z]||0;s=x&&x[w]||0;u[w+1]=(v[w]+256-((y+s)>>>1))&255}return u},o=function(A,t,z){var B=[],v=0,x=A.length,u,w,y,s;B[0]=4;for(;v<x;v++){u=A[v-t]||0;w=z&&z[v]||0;y=z&&z[v-t]||0;s=j(u,w,y);B[v+1]=(A[v]-s+256)&255}return B},j=function(y,s,t){var x=y+s-t,v=Math.abs(x-y),u=Math.abs(x-s),w=Math.abs(x-t);return(v<=u&&v<=w)?y:(u<=w)?s:t},e=function(){return[c,f,i,a,o]},b=function(x){var u=0,s=x.length,v,t,w;while(u<s){v=n(x[u].slice(1));if(v<t||!t){t=v;w=u}u++}return w},n=function(v){var t=0,s=v.length,u=0;while(t<s){u+=Math.abs(v[t++])}return u},h=function(s){console.log("width: "+s.width);console.log("height: "+s.height);console.log("bits: "+s.bits);console.log("colorType: "+s.colorType);console.log("transparency:");console.log(s.transparency);console.log("text:");console.log(s.text);console.log("compressionMethod: "+s.compressionMethod);console.log("filterMethod: "+s.filterMethod);console.log("interlaceMethod: "+s.interlaceMethod);console.log("imgData:");console.log(s.imgData);console.log("palette:");console.log(s.palette);console.log("colors: "+s.colors);console.log("colorSpace: "+s.colorSpace);console.log("pixelBitlength: "+s.pixelBitlength);console.log("hasAlphaChannel: "+s.hasAlphaChannel)};k.processPNG=function(L,t,B,Q,u){var J=this.color_spaces.DEVICE_RGB,A=this.decode.FLATE_DECODE,x=8,S,F,y,z,G,H;if(this.isArrayBuffer(L)){L=new Uint8Array(L)}if(this.isArrayBufferView(L)){if(g()){throw new Error("PNG support requires png.js and zlib.js")}S=new PNG(L);L=S.imgData;x=S.bits;J=S.colorSpace;z=S.colors;if([4,6].indexOf(S.colorType)!==-1){if(S.bits===8){var C=S.pixelBitlength==32?new Uint32Array(S.decodePixels().buffer):S.pixelBitlength==16?new Uint16Array(S.decodePixels().buffer):new Uint8Array(S.decodePixels().buffer),K=C.length,N=new Uint8Array(K*S.colors),E=new Uint8Array(K),M=S.pixelBitlength-S.bits,I=0,D=0,w,s;for(;I<K;I++){w=C[I];s=0;while(s<M){N[D++]=(w>>>s)&255;s=s+S.bits}E[I]=(w>>>s)&255}}if(S.bits===16){var C=new Uint32Array(S.decodePixels().buffer),K=C.length,N=new Uint8Array((K*(32/S.pixelBitlength))*S.colors),E=new Uint8Array(K*(32/S.pixelBitlength)),O=S.colors>1,I=0,D=0,P=0,w;while(I<K){w=C[I++];N[D++]=(w>>>0)&255;if(O){N[D++]=(w>>>16)&255;w=C[I++];N[D++]=(w>>>0)&255}E[P++]=(w>>>16)&255}x=8}if(q(Q)){L=d(N,S.width*S.colors,S.colors,Q);H=d(E,S.width,1,Q)}else{L=N;H=E;A=null}}if(S.colorType===3){J=this.color_spaces.INDEXED;G=S.palette;if(S.transparency.indexed){var v=S.transparency.indexed;var R=0,I=0,K=v.length;for(;I<K;++I){R+=v[I]}R=R/255;if(R===K-1&&v.indexOf(0)!==-1){y=[v.indexOf(0)]}else{if(R!==K){var C=S.decodePixels(),E=new Uint8Array(C.length),I=0,K=C.length;for(;I<K;I++){E[I]=v[C[I]]}H=d(E,S.width,1)}}}}if(A===this.decode.FLATE_DECODE){F="/Predictor 15 /Colors "+z+" /BitsPerComponent "+x+" /Columns "+S.width}else{F="/Colors "+z+" /BitsPerComponent "+x+" /Columns "+S.width}if(this.isArrayBuffer(L)||this.isArrayBufferView(L)){L=this.arrayBufferToBinaryString(L)}if(H&&this.isArrayBuffer(H)||this.isArrayBufferView(H)){H=this.arrayBufferToBinaryString(H)}return this.createImageInfo(L,S.width,S.height,J,x,A,t,B,F,y,G,H)}throw new Error("Unsupported PNG image data, try using JPEG instead.")}})(jsPDF.API);(function(a){a.addSVG=function(c,m,k,n,s){var b;if(m===b||k===b){throw new Error("addSVG needs values for 'x' and 'y'")}function u(l,h){var i=h.createElement("style");i.type="text/css";if(i.styleSheet){i.styleSheet.cssText=l}else{i.appendChild(h.createTextNode(l))}h.getElementsByTagName("head")[0].appendChild(i)}function e(h){var i="childframe",l=h.createElement("iframe");u(".jsPDF_sillysvg_iframe {display:none;position:absolute;}",h);l.name=i;l.setAttribute("width",0);l.setAttribute("height",0);l.setAttribute("frameborder","0");l.setAttribute("scrolling","no");l.setAttribute("seamless","seamless");l.setAttribute("class","jsPDF_sillysvg_iframe");h.body.appendChild(l);return l}function o(h,l){var i=(l.contentWindow||l.contentDocument).document;i.write(h);i.close();return i.getElementsByTagName("svg")[0]}function j(B){var l=parseFloat(B[1]),C=parseFloat(B[2]),w=[],i=3,h=B.length;while(i<h){if(B[i]==="c"){w.push([parseFloat(B[i+1]),parseFloat(B[i+2]),parseFloat(B[i+3]),parseFloat(B[i+4]),parseFloat(B[i+5]),parseFloat(B[i+6])]);i+=7}else{if(B[i]==="l"){w.push([parseFloat(B[i+1]),parseFloat(B[i+2])]);i+=3}else{i+=1}}}return[l,C,w]}var z=e(document),g=o(c,z),A=[1,1],v=parseFloat(g.getAttribute("width")),f=parseFloat(g.getAttribute("height"));if(v&&f){if(n&&s){A=[n/v,s/f]}else{if(n){A=[n/v,n/v]}else{if(s){A=[s/f,s/f]}}}}var r,q,t,d,p=g.childNodes;for(r=0,q=p.length;r<q;r++){t=p[r];if(t.tagName&&t.tagName.toUpperCase()==="PATH"){d=j(t.getAttribute("d").split(" "));d[0]=d[0]*A[0]+m;d[1]=d[1]*A[1]+k;this.lines.call(this,d[2],d[0],d[1],A)}}return this}})(jsPDF.API);(function(c){var b=c.getCharWidthsArray=function(r,t){if(!t){t={}}var h=t.widths?t.widths:this.internal.getFont().metadata.Unicode.widths,q=h.fof?h.fof:1,m=t.kerning?t.kerning:this.internal.getFont().metadata.Unicode.kerning,o=m.fof?m.fof:1;var k,j,n,p=0,s=h[0]||q,g=[];for(k=0,j=r.length;k<j;k++){n=r.charCodeAt(k);g.push((h[n]||s)/q+(m[n]&&m[n][p]||0)/o);p=n}return g};var e=function(j){var h=j.length,g=0;while(h){h--;g+=j[h]}return g};var a=c.getStringUnitWidth=function(h,g){return e(b.call(this,h,g))};var d=function(g,n,h,j){var q=[];var m=0,k=g.length,p=0;while(m!==k&&p+n[m]<h){p+=n[m];m++}q.push(g.slice(0,m));var o=m;p=0;while(m!==k){if(p+n[m]>j){q.push(g.slice(o,m));p=0;o=m}p+=n[m];m++}if(o!==m){q.push(g.slice(o,m))}return q};var f=function(p,z,m){if(!m){m={}}var o=[],h=[o],k=m.textIndent||0,r=0,s=0,x,u,q=p.split(" "),B=b(" ",m)[0],w,t,A,g;if(m.lineIndent===-1){g=q[0].length+2}else{g=m.lineIndent||0}if(g){var y=Array(g).join(" "),n=[];q.map(function(i){i=i.split(/\s*\n/);if(i.length>1){n=n.concat(i.map(function(C,l){return(l&&C.length?"\n":"")+C}))}else{n.push(i[0])}});q=n;g=a(y,m)}for(w=0,t=q.length;w<t;w++){var j=0;x=q[w];if(g&&x[0]=="\n"){x=x.substr(1);j=1}u=b(x,m);s=e(u);if(k+r+s>z||j){if(s>z){A=d(x,u,z-(k+r),z);o.push(A.shift());o=[A.pop()];while(A.length){h.push([A.shift()])}s=e(u.slice(x.length-o[0].length))}else{o=[x]}h.push(o);k=s+g;r=B}else{o.push(x);k+=r+s;r=B}}if(g){var v=function(l,i){return(i?y:"")+l.join(" ")}}else{var v=function(i){return i.join(" ")}}return h.map(v)};c.splitTextToSize=function(q,m,r){if(!r){r={}}var h=r.fontSize||this.internal.getFontSize(),g=(function(l){var t={0:1},i={};if(!l.widths||!l.kerning){var u=this.internal.getFont(l.fontName,l.fontStyle),s="Unicode";if(u.metadata[s]){return{widths:u.metadata[s].widths||t,kerning:u.metadata[s].kerning||i}}}else{return{widths:l.widths,kerning:l.kerning}}return{widths:t,kerning:i}}).call(this,r);var p;if(Array.isArray(q)){p=q}else{p=q.split(/\r?\n/)}var j=1*this.internal.scaleFactor*m/h;g.textIndent=r.textIndent?r.textIndent*1*this.internal.scaleFactor/h:0;g.lineIndent=r.lineIndent;var o,n,k=[];for(o=0,n=p.length;o<n;o++){k=k.concat(f(p[o],j,g))}return k}})(jsPDF.API);(function(a){var e=function(q){var w="0123456789abcdef",o="klmnopqrstuvwxyz",h={};for(var r=0;r<o.length;r++){h[o[r]]=w[r]}var p,m={},n=1,t,k=m,g=[],s,l="",u="",v,j=q.length-1,f;r=1;while(r!=j){f=q[r];r+=1;if(f=="'"){if(t){v=t.join("");t=p}else{t=[]}}else{if(t){t.push(f)}else{if(f=="{"){g.push([k,v]);k={};v=p}else{if(f=="}"){s=g.pop();s[0][s[1]]=k;v=p;k=s[0]}else{if(f=="-"){n=-1}else{if(v===p){if(h.hasOwnProperty(f)){l+=h[f];v=parseInt(l,16)*n;n=+1;l=""}else{l+=f}}else{if(h.hasOwnProperty(f)){u+=h[f];k[v]=parseInt(u,16)*n;n=+1;v=p;u=""}else{u+=f}}}}}}}}return m};var d={codePages:["WinAnsiEncoding"],WinAnsiEncoding:e("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},c={Unicode:{Courier:d,"Courier-Bold":d,"Courier-BoldOblique":d,"Courier-Oblique":d,Helvetica:d,"Helvetica-Bold":d,"Helvetica-BoldOblique":d,"Helvetica-Oblique":d,"Times-Roman":d,"Times-Bold":d,"Times-BoldItalic":d,"Times-Italic":d}},b={Unicode:{"Courier-Oblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":e("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":e("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Helvetica:e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),"Courier-Bold":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":e("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":e("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};a.events.push(["addFonts",function(i){var f,g,h,k,j="Unicode",l;for(g in i.fonts){if(i.fonts.hasOwnProperty(g)){f=i.fonts[g];h=b[j][f.PostScriptName];if(h){if(f.metadata[j]){k=f.metadata[j]}else{k=f.metadata[j]={}}k.widths=h.widths;k.kerning=h.kerning}l=c[j][f.PostScriptName];if(l){if(f.metadata[j]){k=f.metadata[j]}else{k=f.metadata[j]={}}k.encoding=l;if(l.codePages&&l.codePages.length){f.encoding=l.codePages[0]}}}}}])})(jsPDF.API);(function(a){a.putTotalPages=function(b){var d=new RegExp(b,"g");for(var e=1;e<=this.internal.getNumberOfPages();e++){for(var c=0;c<this.internal.pages[e].length;c++){this.internal.pages[e][c]=this.internal.pages[e][c].replace(d,this.internal.getNumberOfPages())}}return this}})(jsPDF.API);
/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
(function(a){a.URL=a.URL||a.webkitURL;if(a.Blob&&a.URL){try{new Blob;return}catch(c){}}var b=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder||(function(o){var f=function(y){return Object.prototype.toString.call(y).match(/^\[object\s(.*)\]$/)[1]},x=function l(){this.data=[]},v=function h(A,y,z){this.data=A;this.size=A.length;this.type=y;this.encoding=z},p=x.prototype,u=v.prototype,r=o.FileReaderSync,d=function(y){this.code=this[this.name=y]},q=("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),t=q.length,k=o.URL||o.webkitURL||o,s=k.createObjectURL,e=k.revokeObjectURL,j=k,n=o.btoa,i=o.atob,g=o.ArrayBuffer,m=o.Uint8Array,w=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;v.fake=u.fake=true;while(t--){d.prototype[q[t]]=t+1}if(!k.createObjectURL){j=o.URL=function(z){var y=document.createElementNS("http://www.w3.org/1999/xhtml","a"),A;y.href=z;if(!("origin" in y)){if(y.protocol.toLowerCase()==="data:"){y.origin=null}else{A=z.match(w);y.origin=A&&A[1]}}return y}}j.createObjectURL=function(z){var A=z.type,y;if(A===null){A="application/octet-stream"}if(z instanceof v){y="data:"+A;if(z.encoding==="base64"){return y+";base64,"+z.data}else{if(z.encoding==="URI"){return y+","+decodeURIComponent(z.data)}}if(n){return y+";base64,"+n(z.data)}else{return y+","+encodeURIComponent(z.data)}}else{if(s){return s.call(k,z)}}};j.revokeObjectURL=function(y){if(y.substring(0,5)!=="data:"&&e){e.call(k,y)}};p.append=function(C){var E=this.data;if(m&&(C instanceof g||C instanceof m)){var D="",z=new m(C),A=0,B=z.length;for(;A<B;A++){D+=String.fromCharCode(z[A])}E.push(D)}else{if(f(C)==="Blob"||f(C)==="File"){if(r){var y=new r;E.push(y.readAsBinaryString(C))}else{throw new d("NOT_READABLE_ERR")}}else{if(C instanceof v){if(C.encoding==="base64"&&i){E.push(i(C.data))}else{if(C.encoding==="URI"){E.push(decodeURIComponent(C.data))}else{if(C.encoding==="raw"){E.push(C.data)}}}}else{if(typeof C!=="string"){C+=""}E.push(unescape(encodeURIComponent(C)))}}}};p.getBlob=function(y){if(!arguments.length){y=null}return new v(this.data.join(""),y,"raw")};p.toString=function(){return"[object BlobBuilder]"};u.slice=function(B,y,A){var z=arguments.length;if(z<3){A=null}return new v(this.data.slice(B,z>1?y:this.data.length),A,this.encoding)};u.toString=function(){return"[object Blob]"};u.close=function(){this.size=0;delete this.data};return x}(a));a.Blob=function(g,f){var j=f?(f.type||""):"";var e=new b();if(g){for(var h=0,d=g.length;h<d;h++){e.append(g[h])}}return e.getBlob(j)}}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content||this));
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
<<<<<<< HEAD
<<<<<<< HEAD
;var saveAs=saveAs||(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(l){if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var m=l.document,i=function(){return l.URL||l.webkitURL||l},p=m.createElementNS("http://www.w3.org/1999/xhtml","a"),d="download" in p,q=function(s){var r=m.createEvent("MouseEvents");r.initMouseEvent("click",true,false,l,0,0,0,0,0,false,false,false,false,0,null);s.dispatchEvent(r)},g=l.webkitRequestFileSystem,n=l.requestFileSystem||g||l.mozRequestFileSystem,e=function(r){(l.setImmediate||l.setTimeout)(function(){throw r},0)},k="application/octet-stream",h=0,c=10,o=function(s){var r=function(){if(typeof s==="string"){i().revokeObjectURL(s)}else{s.remove()}};if(l.chrome){r()}else{setTimeout(r,c)}},j=function(s,r,v){r=[].concat(r);var u=r.length;while(u--){var w=s["on"+r[u]];if(typeof w==="function"){try{w.call(s,v||s)}catch(t){e(t)}}}},b=function(r,s){var t=this,z=r.type,C=false,v,u,y=function(){j(t,"writestart progress write writeend".split(" "))},B=function(){if(C||!v){v=i().createObjectURL(r)}if(u){u.location.href=v}else{var D=l.open(v,"_blank");if(D==undefined&&typeof safari!=="undefined"){l.location.href=v}}t.readyState=t.DONE;y();o(v)},x=function(D){return function(){if(t.readyState!==t.DONE){return D.apply(this,arguments)}}},w={create:true,exclusive:false},A;t.readyState=t.INIT;if(!s){s="download"}if(d){v=i().createObjectURL(r);p.href=v;p.download=s;q(p);t.readyState=t.DONE;y();o(v);return}if(l.chrome&&z&&z!==k){A=r.slice||r.webkitSlice;r=A.call(r,0,r.size,k);C=true}if(g&&s!=="download"){s+=".download"}if(z===k||g){u=l}if(!n){B();return}h+=r.size;n(l.TEMPORARY,h,x(function(D){D.root.getDirectory("saved",w,x(function(E){var F=function(){E.getFile(s,w,x(function(G){G.createWriter(x(function(H){H.onwriteend=function(I){u.location.href=G.toURL();t.readyState=t.DONE;j(t,"writeend",I);o(G)};H.onerror=function(){var I=H.error;if(I.code!==I.ABORT_ERR){B()}};"writestart progress write abort".split(" ").forEach(function(I){H["on"+I]=t["on"+I]});H.write(r);t.abort=function(){H.abort();t.readyState=t.DONE};t.readyState=t.WRITING}),B)}),B)};E.getFile(s,{create:false},x(function(G){G.remove();F()}),x(function(G){if(G.code===G.NOT_FOUND_ERR){F()}else{B()}}))}),B)}),B)},a=b.prototype,f=function(r,s){return new b(r,s)};a.abort=function(){var r=this;r.readyState=r.DONE;j(r,"abort")};a.readyState=a.INIT=0;a.WRITING=1;a.DONE=2;a.error=a.onwritestart=a.onprogress=a.onwrite=a.onabort=a.onerror=a.onwriteend=null;return f}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));if(typeof module!=="undefined"&&module!==null){module.exports=saveAs}else{if((typeof define!=="undefined"&&0)){define([],function(){return saveAs})}}void function(a,b){if(typeof module==="object"){module.exports=b()}else{if(0==="function"){define(b)}else{a.adler32cs=b()}}}(jsPDF,function(){var h=typeof ArrayBuffer==="function"&&typeof Uint8Array==="function";var d=null,a=(function(){if(!h){return function o(){return false}}try{var m=require("buffer");if(typeof m.Buffer==="function"){d=m.Buffer}}catch(n){}return function o(p){return p instanceof ArrayBuffer||d!==null&&p instanceof d}}());var b=(function(){if(d!==null){return function m(n){return new d(n,"utf8").toString("binary")}}else{return function m(n){return unescape(encodeURIComponent(n))}}}());var f=65521;var k=function k(r,n){var o=r&65535,m=r>>>16;for(var p=0,q=n.length;p<q;p++){o=(o+(n.charCodeAt(p)&255))%f;m=(m+o)%f}return(m<<16|o)>>>0};var l=function l(s,r){var o=s&65535,n=s>>>16;for(var p=0,q=r.length,m;p<q;p++){o=(o+r[p])%f;n=(n+o)%f}return(n<<16|o)>>>0};var g={};var c=g.Adler32=(function(){var u=function n(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(!isFinite(w=w==null?1:+w)){throw new Error("First arguments needs to be a finite number.")}this.checksum=w>>>0};var q=u.prototype={};q.constructor=u;u.from=function(w){w.prototype=q;return w}(function t(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(w==null){throw new Error("First argument needs to be a string.")}this.checksum=k(1,w.toString())});u.fromUtf8=function(w){w.prototype=q;return w}(function o(x){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(x==null){throw new Error("First argument needs to be a string.")}var w=b(x.toString());this.checksum=k(1,w)});if(h){u.fromBuffer=function(w){w.prototype=q;return w}(function v(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(!a(w)){throw new Error("First argument needs to be ArrayBuffer.")}var x=new Uint8Array(w);return this.checksum=l(1,x)})}q.update=function p(w){if(w==null){throw new Error("First argument needs to be a string.")}w=w.toString();return this.checksum=k(this.checksum,w)};q.updateUtf8=function m(x){if(x==null){throw new Error("First argument needs to be a string.")}var w=b(x.toString());return this.checksum=k(this.checksum,w)};if(h){q.updateBuffer=function s(w){if(!a(w)){throw new Error("First argument needs to be ArrayBuffer.")}var x=new Uint8Array(w);return this.checksum=l(this.checksum,x)}}q.clone=function r(){return new n(this.checksum)};return u}());g.from=function i(m){if(m==null){throw new Error("First argument needs to be a string.")}return k(1,m.toString())};g.fromUtf8=function e(n){if(n==null){throw new Error("First argument needs to be a string.")}var m=b(n.toString());return k(1,m)};if(h){g.fromBuffer=function j(m){if(!a(m)){throw new Error("First argument need to be ArrayBuffer.")}var n=new Uint8Array(m);return l(1,n)}}return g});var Deflater=(function(h){var ad=15;var b=30;var o=19;var k=29;var e=256;var f=(e+1+k);var g=(2*f+1);var c=256;var U=7;var A=16;var z=17;var D=18;var t=8*2;var x=-1;var M=1;var K=2;var a=0;var Y=0;var C=1;var q=3;var l=4;var u=0;var ac=1;var L=2;var af=-2;var n=-3;var N=-5;var W=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];function r(){var ah=this;function aj(aw){var ax=ah.dyn_tree;var av=ah.stat_desc.static_tree;var an=ah.stat_desc.extra_bits;var ak=ah.stat_desc.extra_base;var au=ah.stat_desc.max_length;var aq;var al,am;var at;var ap;var ar;var ao=0;for(at=0;at<=ad;at++){aw.bl_count[at]=0}ax[aw.heap[aw.heap_max]*2+1]=0;for(aq=aw.heap_max+1;aq<g;aq++){al=aw.heap[aq];at=ax[ax[al*2+1]*2+1]+1;if(at>au){at=au;ao++}ax[al*2+1]=at;if(al>ah.max_code){continue}aw.bl_count[at]++;ap=0;if(al>=ak){ap=an[al-ak]}ar=ax[al*2];aw.opt_len+=ar*(at+ap);if(av){aw.static_len+=ar*(av[al*2+1]+ap)}}if(ao===0){return}do{at=au-1;while(aw.bl_count[at]===0){at--}aw.bl_count[at]--;aw.bl_count[at+1]+=2;aw.bl_count[au]--;ao-=2}while(ao>0);for(at=au;at!==0;at--){al=aw.bl_count[at];while(al!==0){am=aw.heap[--aq];if(am>ah.max_code){continue}if(ax[am*2+1]!=at){aw.opt_len+=(at-ax[am*2+1])*ax[am*2];ax[am*2+1]=at}al--}}}function ai(am,ak){var al=0;do{al|=am&1;am>>>=1;al<<=1}while(--ak>0);return al>>>1}function ag(al,ar,am){var ao=[];var an=0;var ap;var aq;var ak;for(ap=1;ap<=ad;ap++){ao[ap]=an=((an+am[ap-1])<<1)}for(aq=0;aq<=ar;aq++){ak=al[aq*2+1];if(ak===0){continue}al[aq*2]=ai(ao[ak]++,ak)}}ah.build_tree=function(an){var al=ah.dyn_tree;var ap=ah.stat_desc.static_tree;var am=ah.stat_desc.elems;var ar,ak;var aq=-1;var ao;an.heap_len=0;an.heap_max=g;for(ar=0;ar<am;ar++){if(al[ar*2]!==0){an.heap[++an.heap_len]=aq=ar;an.depth[ar]=0}else{al[ar*2+1]=0}}while(an.heap_len<2){ao=an.heap[++an.heap_len]=aq<2?++aq:0;al[ao*2]=1;an.depth[ao]=0;an.opt_len--;if(ap){an.static_len-=ap[ao*2+1]}}ah.max_code=aq;for(ar=Math.floor(an.heap_len/2);ar>=1;ar--){an.pqdownheap(al,ar)}ao=am;do{ar=an.heap[1];an.heap[1]=an.heap[an.heap_len--];an.pqdownheap(al,1);ak=an.heap[1];an.heap[--an.heap_max]=ar;an.heap[--an.heap_max]=ak;al[ao*2]=(al[ar*2]+al[ak*2]);an.depth[ao]=Math.max(an.depth[ar],an.depth[ak])+1;al[ar*2+1]=al[ak*2+1]=ao;an.heap[1]=ao++;an.pqdownheap(al,1)}while(an.heap_len>=2);an.heap[--an.heap_max]=an.heap[1];aj(an);ag(al,ah.max_code,an.bl_count)}}r._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28];r.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0];r.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576];r.d_code=function(ag){return((ag)<256?W[ag]:W[256+((ag)>>>7)])};r.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];r.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];r.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];r.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function Z(aj,ai,ah,ag,al){var ak=this;ak.static_tree=aj;ak.extra_bits=ai;ak.extra_base=ah;ak.elems=ag;ak.max_length=al}Z.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8];Z.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5];Z.static_l_desc=new Z(Z.static_ltree,r.extra_lbits,e+1,f,ad);Z.static_d_desc=new Z(Z.static_dtree,r.extra_dbits,0,b,ad);Z.static_bl_desc=new Z(null,r.extra_blbits,0,o,U);var X=9;var V=8;function m(ag,al,ah,ak,aj){var ai=this;ai.good_length=ag;ai.max_lazy=al;ai.nice_length=ah;ai.max_chain=ak;ai.func=aj}var F=0;var p=1;var H=2;var d=[new m(0,0,0,0,F),new m(4,4,8,4,p),new m(4,5,16,8,p),new m(4,6,32,32,p),new m(4,4,16,16,H),new m(8,16,32,32,H),new m(8,16,128,128,H),new m(8,32,128,256,H),new m(32,128,258,1024,H),new m(32,258,258,4096,H)];var s=["need dictionary","stream end","","","stream error","data error","","buffer error","",""];var I=0;var T=1;var E=2;var j=3;var i=32;var y=42;var S=113;var Q=666;var R=8;var O=0;var ab=1;var B=2;var ae=3;var w=258;var v=(w+ae+1);function P(ai,al,ah,ak){var aj=ai[al*2];var ag=ai[ah*2];return(aj<ag||(aj==ag&&ak[al]<=ak[ah]))}function G(){var aT=this;var aI;var aR;var ba;var aA;var am;var an;var aZ;var aD;var bl;var ag;var aN;var aH;var a1;var ax;var a8;var aP;var bq;var bp;var bg;var aO;var at;var br;var aU;var aK;var aj;var az;var a3;var a9;var ah;var ao;var ay;var bd;var aF;var al;var aB=new r();var bo=new r();var bf=new r();aT.depth=[];var a2;var bi;var a6;var ak;var av;var a7;var aQ;var au;aT.bl_count=[];aT.heap=[];bd=[];aF=[];al=[];function aV(){var bs;ag=2*an;aH[ax-1]=0;for(bs=0;bs<ax-1;bs++){aH[bs]=0}a3=d[a9].max_lazy;ao=d[a9].good_length;ay=d[a9].nice_length;az=d[a9].max_chain;br=0;bp=0;aK=0;bg=aj=ae-1;at=0;a1=0}function aW(){var bs;for(bs=0;bs<f;bs++){bd[bs*2]=0}for(bs=0;bs<b;bs++){aF[bs*2]=0}for(bs=0;bs<o;bs++){al[bs*2]=0}bd[c*2]=1;aT.opt_len=aT.static_len=0;a6=av=0}function bj(){aB.dyn_tree=bd;aB.stat_desc=Z.static_l_desc;bo.dyn_tree=aF;bo.stat_desc=Z.static_d_desc;bf.dyn_tree=al;bf.stat_desc=Z.static_bl_desc;aQ=0;au=0;a7=8;aW()}aT.pqdownheap=function(bs,bu){var bw=aT.heap;var bt=bw[bu];var bv=bu<<1;while(bv<=aT.heap_len){if(bv<aT.heap_len&&P(bs,bw[bv+1],bw[bv],aT.depth)){bv++}if(P(bs,bt,bw[bv],aT.depth)){break}bw[bu]=bw[bv];bu=bv;bv<<=1}bw[bu]=bt};function a4(bA,bz){var bt;var bx=-1;var bs;var bv=bA[0*2+1];var bw=0;var bu=7;var by=4;if(bv===0){bu=138;by=3}bA[(bz+1)*2+1]=65535;for(bt=0;bt<=bz;bt++){bs=bv;bv=bA[(bt+1)*2+1];if(++bw<bu&&bs==bv){continue}else{if(bw<by){al[bs*2]+=bw}else{if(bs!==0){if(bs!=bx){al[bs*2]++}al[A*2]++}else{if(bw<=10){al[z*2]++}else{al[D*2]++}}}}bw=0;bx=bs;if(bv===0){bu=138;by=3}else{if(bs==bv){bu=6;by=3}else{bu=7;by=4}}}}function aL(){var bs;a4(bd,aB.max_code);a4(aF,bo.max_code);bf.build_tree(aT);for(bs=o-1;bs>=3;bs--){if(al[r.bl_order[bs]*2+1]!==0){break}}aT.opt_len+=3*(bs+1)+5+5+4;return bs}function ai(bs){aT.pending_buf[aT.pending++]=bs}function bb(bs){ai(bs&255);ai((bs>>>8)&255)}function aJ(bs){ai((bs>>8)&255);ai((bs&255)&255)}function bk(bu,bt){var bv,bs=bt;if(au>t-bs){bv=bu;aQ|=((bv<<au)&65535);bb(aQ);aQ=bv>>>(t-au);au+=bs-t}else{aQ|=(((bu)<<au)&65535);au+=bs}}function aS(bu,bs){var bt=bu*2;bk(bs[bt]&65535,bs[bt+1]&65535)}function a5(bA,bz){var bt;var bx=-1;var bs;var bv=bA[0*2+1];var bw=0;var bu=7;var by=4;if(bv===0){bu=138;by=3}for(bt=0;bt<=bz;bt++){bs=bv;bv=bA[(bt+1)*2+1];if(++bw<bu&&bs==bv){continue}else{if(bw<by){do{aS(bs,al)}while(--bw!==0)}else{if(bs!==0){if(bs!=bx){aS(bs,al);bw--}aS(A,al);bk(bw-3,2)}else{if(bw<=10){aS(z,al);bk(bw-3,3)}else{aS(D,al);bk(bw-11,7)}}}}bw=0;bx=bs;if(bv===0){bu=138;by=3}else{if(bs==bv){bu=6;by=3}else{bu=7;by=4}}}}function bh(bt,bs,bu){var bv;bk(bt-257,5);bk(bs-1,5);bk(bu-4,4);for(bv=0;bv<bu;bv++){bk(al[r.bl_order[bv]*2+1],3)}a5(bd,bt-1);a5(aF,bs-1)}function a0(){if(au==16){bb(aQ);aQ=0;au=0}else{if(au>=8){ai(aQ&255);aQ>>>=8;au-=8}}}function ar(){bk(ab<<1,3);aS(c,Z.static_ltree);a0();if(1+a7+10-au<9){bk(ab<<1,3);aS(c,Z.static_ltree);a0()}a7=7}function aG(bw,bu){var bs,bv,bt;aT.pending_buf[ak+a6*2]=(bw>>>8)&255;aT.pending_buf[ak+a6*2+1]=bw&255;aT.pending_buf[a2+a6]=bu&255;a6++;if(bw===0){bd[bu*2]++}else{av++;bw--;bd[(r._length_code[bu]+e+1)*2]++;aF[r.d_code(bw)*2]++}if((a6&8191)===0&&a9>2){bs=a6*8;bv=br-bp;for(bt=0;bt<b;bt++){bs+=aF[bt*2]*(5+r.extra_dbits[bt])}bs>>>=3;if((av<Math.floor(a6/2))&&bs<Math.floor(bv/2)){return true}}return(a6==bi-1)}function aY(by,bv){var bx;var bu;var bw=0;var bt;var bs;if(a6!==0){do{bx=((aT.pending_buf[ak+bw*2]<<8)&65280)|(aT.pending_buf[ak+bw*2+1]&255);bu=(aT.pending_buf[a2+bw])&255;bw++;if(bx===0){aS(bu,by)}else{bt=r._length_code[bu];aS(bt+e+1,by);bs=r.extra_lbits[bt];if(bs!==0){bu-=r.base_length[bt];bk(bu,bs)}bx--;bt=r.d_code(bx);aS(bt,bv);bs=r.extra_dbits[bt];if(bs!==0){bx-=r.base_dist[bt];bk(bx,bs)}}}while(bw<a6)}aS(c,by);a7=by[c*2+1]}function bm(){if(au>8){bb(aQ)}else{if(au>0){ai(aQ&255)}}aQ=0;au=0}function aw(bt,bs,bu){bm();a7=8;if(bu){bb(bs);bb(~bs)}aT.pending_buf.set(bl.subarray(bt,bt+bs),aT.pending);aT.pending+=bs}function aM(bt,bu,bs){bk((O<<1)+(bs?1:0),3);aw(bt,bu,true)}function aE(bv,bx,bs){var bu,bt;var bw=0;if(a9>0){aB.build_tree(aT);bo.build_tree(aT);bw=aL();bu=(aT.opt_len+3+7)>>>3;bt=(aT.static_len+3+7)>>>3;if(bt<=bu){bu=bt}}else{bu=bt=bx+5}if((bx+4<=bu)&&bv!=-1){aM(bv,bx,bs)}else{if(bt==bu){bk((ab<<1)+(bs?1:0),3);aY(Z.static_ltree,Z.static_dtree)}else{bk((B<<1)+(bs?1:0),3);bh(aB.max_code+1,bo.max_code+1,bw+1);aY(bd,aF)}}aW();if(bs){bm()}}function ap(bs){aE(bp>=0?bp:-1,br-bp,bs);bp=br;aI.flush_pending()}function be(){var bv,bs;var bu;var bt;do{bt=(ag-aK-br);if(bt===0&&br===0&&aK===0){bt=an}else{if(bt==-1){bt--}else{if(br>=an+an-v){bl.set(bl.subarray(an,an+an),0);aU-=an;br-=an;bp-=an;bv=ax;bu=bv;do{bs=(aH[--bu]&65535);aH[bu]=(bs>=an?bs-an:0)}while(--bv!==0);bv=an;bu=bv;do{bs=(aN[--bu]&65535);aN[bu]=(bs>=an?bs-an:0)}while(--bv!==0);bt+=an}}}if(aI.avail_in===0){return}bv=aI.read_buf(bl,br+aK,bt);aK+=bv;if(aK>=ae){a1=bl[br]&255;a1=(((a1)<<bq)^(bl[br+1]&255))&aP}}while(aK<v&&aI.avail_in!==0)}function aX(bs){var bu=65535;var bt;if(bu>ba-5){bu=ba-5}while(true){if(aK<=1){be();if(aK===0&&bs==Y){return I}if(aK===0){break}}br+=aK;aK=0;bt=bp+bu;if(br===0||br>=bt){aK=(br-bt);br=bt;ap(false);if(aI.avail_out===0){return I}}if(br-bp>=an-v){ap(false);if(aI.avail_out===0){return I}}}ap(bs==l);if(aI.avail_out===0){return(bs==l)?E:I}return bs==l?j:T}function bn(bv){var by=az;var bD=br;var bw;var bx;var bs=aj;var bt=br>(an-v)?br-(an-v):0;var bu=ay;var bz=aD;var bB=br+w;var bC=bl[bD+bs-1];var bA=bl[bD+bs];if(aj>=ao){by>>=2}if(bu>aK){bu=aK}do{bw=bv;if(bl[bw+bs]!=bA||bl[bw+bs-1]!=bC||bl[bw]!=bl[bD]||bl[++bw]!=bl[bD+1]){continue}bD+=2;bw++;do{}while(bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bD<bB);bx=w-(bB-bD);bD=bB-w;if(bx>bs){aU=bv;bs=bx;if(bx>=bu){break}bC=bl[bD+bs-1];bA=bl[bD+bs]}}while((bv=(aN[bv&bz]&65535))>bt&&--by!==0);if(bs<=aK){return bs}return aK}function aq(bs){var bu=0;var bt;while(true){if(aK<v){be();if(aK<v&&bs==Y){return I}if(aK===0){break}}if(aK>=ae){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bu=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}if(bu!==0&&((br-bu)&65535)<=an-v){if(ah!=K){bg=bn(bu)}}if(bg>=ae){bt=aG(br-aU,bg-ae);aK-=bg;if(bg<=a3&&aK>=ae){bg--;do{br++;a1=((a1<<bq)^(bl[(br)+(ae-1)]&255))&aP;bu=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}while(--bg!==0);br++}else{br+=bg;bg=0;a1=bl[br]&255;a1=(((a1)<<bq)^(bl[br+1]&255))&aP}}else{bt=aG(0,bl[br]&255);aK--;br++}if(bt){ap(false);if(aI.avail_out===0){return I}}}ap(bs==l);if(aI.avail_out===0){if(bs==l){return E}else{return I}}return bs==l?j:T}function bc(bt){var bv=0;var bu;var bs;while(true){if(aK<v){be();if(aK<v&&bt==Y){return I}if(aK===0){break}}if(aK>=ae){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bv=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}aj=bg;aO=aU;bg=ae-1;if(bv!==0&&aj<a3&&((br-bv)&65535)<=an-v){if(ah!=K){bg=bn(bv)}if(bg<=5&&(ah==M||(bg==ae&&br-aU>4096))){bg=ae-1}}if(aj>=ae&&bg<=aj){bs=br+aK-ae;bu=aG(br-1-aO,aj-ae);aK-=aj-1;aj-=2;do{if(++br<=bs){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bv=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}}while(--aj!==0);at=0;bg=ae-1;br++;if(bu){ap(false);if(aI.avail_out===0){return I}}}else{if(at!==0){bu=aG(0,bl[br-1]&255);if(bu){ap(false)}br++;aK--;if(aI.avail_out===0){return I}}else{at=1;br++;aK--}}}if(at!==0){bu=aG(0,bl[br-1]&255);at=0}ap(bt==l);if(aI.avail_out===0){if(bt==l){return E}else{return I}}return bt==l?j:T}function aC(bs){bs.total_in=bs.total_out=0;bs.msg=null;aT.pending=0;aT.pending_out=0;aR=S;am=Y;bj();aV();return u}aT.deflateInit=function(bs,bu,bv,bt,bx,bw){if(!bt){bt=R}if(!bx){bx=V}if(!bw){bw=a}bs.msg=null;if(bu==x){bu=6}if(bx<1||bx>X||bt!=R||bv<9||bv>15||bu<0||bu>9||bw<0||bw>K){return af}bs.dstate=aT;aZ=bv;an=1<<aZ;aD=an-1;a8=bx+7;ax=1<<a8;aP=ax-1;bq=Math.floor((a8+ae-1)/ae);bl=new Uint8Array(an*2);aN=[];aH=[];bi=1<<(bx+6);aT.pending_buf=new Uint8Array(bi*4);ba=bi*4;ak=Math.floor(bi/2);a2=(1+2)*bi;a9=bu;ah=bw;aA=bt&255;return aC(bs)};aT.deflateEnd=function(){if(aR!=y&&aR!=S&&aR!=Q){return af}aT.pending_buf=null;aH=null;aN=null;bl=null;aT.dstate=null;return aR==S?n:u};aT.deflateParams=function(bs,bt,bv){var bu=u;if(bt==x){bt=6}if(bt<0||bt>9||bv<0||bv>K){return af}if(d[a9].func!=d[bt].func&&bs.total_in!==0){bu=bs.deflate(C)}if(a9!=bt){a9=bt;a3=d[a9].max_lazy;ao=d[a9].good_length;ay=d[a9].nice_length;az=d[a9].max_chain}ah=bv;return bu};aT.deflateSetDictionary=function(bs,bx,bv){var bu=bv;var bw,bt=0;if(!bx||aR!=y){return af}if(bu<ae){return u}if(bu>an-v){bu=an-v;bt=bv-bu}bl.set(bx.subarray(bt,bt+bu),0);br=bu;bp=bu;a1=bl[0]&255;a1=(((a1)<<bq)^(bl[1]&255))&aP;for(bw=0;bw<=bu-ae;bw++){a1=(((a1)<<bq)^(bl[(bw)+(ae-1)]&255))&aP;aN[bw&aD]=aH[a1];aH[a1]=bw}return u};aT.deflate=function(bt,bs){var bu,by,bw,bv,bx;if(bs>l||bs<0){return af}if(!bt.next_out||(!bt.next_in&&bt.avail_in!==0)||(aR==Q&&bs!=l)){bt.msg=s[L-(af)];return af}if(bt.avail_out===0){bt.msg=s[L-(N)];return N}aI=bt;bv=am;am=bs;if(aR==y){by=(R+((aZ-8)<<4))<<8;bw=((a9-1)&255)>>1;if(bw>3){bw=3}by|=(bw<<6);if(br!==0){by|=i}by+=31-(by%31);aR=S;aJ(by)}if(aT.pending!==0){aI.flush_pending();if(aI.avail_out===0){am=-1;return u}}else{if(aI.avail_in===0&&bs<=bv&&bs!=l){aI.msg=s[L-(N)];return N}}if(aR==Q&&aI.avail_in!==0){bt.msg=s[L-(N)];return N}if(aI.avail_in!==0||aK!==0||(bs!=Y&&aR!=Q)){bx=-1;switch(d[a9].func){case F:bx=aX(bs);break;case p:bx=aq(bs);break;case H:bx=bc(bs);break;default:}if(bx==E||bx==j){aR=Q}if(bx==I||bx==E){if(aI.avail_out===0){am=-1}return u}if(bx==T){if(bs==C){ar()}else{aM(0,0,false);if(bs==q){for(bu=0;bu<ax;bu++){aH[bu]=0}}}aI.flush_pending();if(aI.avail_out===0){am=-1;return u}}}if(bs!=l){return u}return ac}}function J(){var ag=this;ag.next_in_index=0;ag.next_out_index=0;ag.avail_in=0;ag.total_in=0;ag.avail_out=0;ag.total_out=0}J.prototype={deflateInit:function(ai,ah){var ag=this;ag.dstate=new G();if(!ah){ah=ad}return ag.dstate.deflateInit(ag,ai,ah)},deflate:function(ag){var ah=this;if(!ah.dstate){return af}return ah.dstate.deflate(ah,ag)},deflateEnd:function(){var ah=this;if(!ah.dstate){return af}var ag=ah.dstate.deflateEnd();ah.dstate=null;return ag},deflateParams:function(ai,ah){var ag=this;if(!ag.dstate){return af}return ag.dstate.deflateParams(ag,ai,ah)},deflateSetDictionary:function(ai,ah){var ag=this;if(!ag.dstate){return af}return ag.dstate.deflateSetDictionary(ag,ai,ah)},read_buf:function(ah,ak,ai){var aj=this;var ag=aj.avail_in;if(ag>ai){ag=ai}if(ag===0){return 0}aj.avail_in-=ag;ah.set(aj.next_in.subarray(aj.next_in_index,aj.next_in_index+ag),ak);aj.next_in_index+=ag;aj.total_in+=ag;return ag},flush_pending:function(){var ah=this;var ag=ah.dstate.pending;if(ag>ah.avail_out){ag=ah.avail_out}if(ag===0){return}ah.next_out.set(ah.dstate.pending_buf.subarray(ah.dstate.pending_out,ah.dstate.pending_out+ag),ah.next_out_index);ah.next_out_index+=ag;ah.dstate.pending_out+=ag;ah.total_out+=ag;ah.avail_out-=ag;ah.dstate.pending-=ag;if(ah.dstate.pending===0){ah.dstate.pending_out=0}}};return function aa(al){var ai=this;var ak=new J();var aj=512;var ag=Y;var ah=new Uint8Array(aj);if(typeof al=="undefined"){al=x}ak.deflateInit(al);ak.next_out=ah;ai.append=function(aq,ap){var ao,an=[],au=0,am=0,at=0,ar;if(!aq.length){return}ak.next_in_index=0;ak.next_in=aq;ak.avail_in=aq.length;do{ak.next_out_index=0;ak.avail_out=aj;ao=ak.deflate(ag);if(ao!=u){throw"deflating: "+ak.msg}if(ak.next_out_index){if(ak.next_out_index==aj){an.push(new Uint8Array(ah))}else{an.push(new Uint8Array(ah.subarray(0,ak.next_out_index)))}}at+=ak.next_out_index;if(ap&&ak.next_in_index>0&&ak.next_in_index!=au){ap(ak.next_in_index);au=ak.next_in_index}}while(ak.avail_in>0||ak.avail_out===0);ar=new Uint8Array(at);an.forEach(function(av){ar.set(av,am);am+=av.length});return ar};ai.flush=function(){var ao,an=[],am=0,aq=0,ap;do{ak.next_out_index=0;ak.avail_out=aj;ao=ak.deflate(l);if(ao!=ac&&ao!=u){throw"deflating: "+ak.msg}if(aj-ak.avail_out>0){an.push(new Uint8Array(ah.subarray(0,ak.next_out_index)))}aq+=ak.next_out_index}while(ak.avail_in>0||ak.avail_out===0);ak.deflateEnd();ap=new Uint8Array(aq);an.forEach(function(ar){ap.set(ar,am);am+=ar.length});return ap}}})(this);(function(b){var a;a=(function(){var m,j,f,k,g,l,i,c;d.load=function(n,e,q){var o,p=this;if(typeof e==="function"){q=e}o=new XMLHttpRequest;o.open("GET",n,true);o.responseType="arraybuffer";o.onload=function(){var r,s;r=new Uint8Array(o.response||o.mozResponseArrayBuffer);s=new d(r);if(typeof(e!=null?e.getContext:void 0)==="function"){s.render(e)}return typeof q==="function"?q(s):void 0};return o.send(null)};k=0;f=1;g=2;j=0;m=1;function d(t){var o,e,q,A,v,n,u,w,z,y,x,B,r,p,s;this.data=t;this.pos=8;this.palette=[];this.imgData=[];this.transparency={};this.animation=null;this.text={};n=null;while(true){o=this.readUInt32();y=((function(){var D,C;C=[];for(u=D=0;D<4;u=++D){C.push(String.fromCharCode(this.data[this.pos++]))}return C}).call(this)).join("");switch(y){case"IHDR":this.width=this.readUInt32();this.height=this.readUInt32();this.bits=this.data[this.pos++];this.colorType=this.data[this.pos++];this.compressionMethod=this.data[this.pos++];this.filterMethod=this.data[this.pos++];this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||Infinity,frames:[]};break;case"PLTE":this.palette=this.read(o);break;case"fcTL":if(n){this.animation.frames.push(n)}this.pos+=4;n={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()};v=this.readUInt16();A=this.readUInt16()||100;n.delay=1000*v/A;n.disposeOp=this.data[this.pos++];n.blendOp=this.data[this.pos++];n.data=[];break;case"IDAT":case"fdAT":if(y==="fdAT"){this.pos+=4;o-=4}t=(n!=null?n.data:void 0)||this.imgData;for(u=r=0;0<=o?r<o:r>o;u=0<=o?++r:--r){t.push(this.data[this.pos++])}break;case"tRNS":this.transparency={};switch(this.colorType){case 3:q=this.palette.length/3;this.transparency.indexed=this.read(o);if(this.transparency.indexed.length>q){throw new Error("More transparent colors than palette size")}x=q-this.transparency.indexed.length;if(x>0){for(u=p=0;0<=x?p<x:p>x;u=0<=x?++p:--p){this.transparency.indexed.push(255)}}break;case 0:this.transparency.grayscale=this.read(o)[0];break;case 2:this.transparency.rgb=this.read(o)}break;case"tEXt":B=this.read(o);w=B.indexOf(0);z=String.fromCharCode.apply(String,B.slice(0,w));this.text[z]=String.fromCharCode.apply(String,B.slice(w+1));break;case"IEND":if(n){this.animation.frames.push(n)}this.colors=(function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}).call(this);this.hasAlphaChannel=(s=this.colorType)===4||s===6;e=this.colors+(this.hasAlphaChannel?1:0);this.pixelBitlength=this.bits*e;this.colorSpace=(function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}).call(this);this.imgData=new Uint8Array(this.imgData);return;default:this.pos+=o}this.pos+=4;if(this.pos>this.data.length){throw new Error("Incomplete or corrupt PNG file")}}return}d.prototype.read=function(n){var o,p,e;e=[];for(o=p=0;0<=n?p<n:p>n;o=0<=n?++p:--p){e.push(this.data[this.pos++])}return e};d.prototype.readUInt32=function(){var p,o,n,e;p=this.data[this.pos++]<<24;o=this.data[this.pos++]<<16;n=this.data[this.pos++]<<8;e=this.data[this.pos++];return p|o|n|e};d.prototype.readUInt16=function(){var n,e;n=this.data[this.pos++]<<8;e=this.data[this.pos++];return n|e};d.prototype.decodePixels=function(K){var F,J,y,G,x,w,D,s,E,q,n,B,C,z,A,I,H,u,v,t,r,o,e;if(K==null){K=this.imgData}if(K.length===0){return new Uint8Array(0)}K=new FlateStream(K);K=K.getBytes();B=this.pixelBitlength/8;I=B*this.width;C=new Uint8Array(I*this.height);w=K.length;A=0;z=0;J=0;while(z<w){switch(K[z++]){case 0:for(G=v=0;v<I;G=v+=1){C[J++]=K[z++]}break;case 1:for(G=t=0;t<I;G=t+=1){F=K[z++];x=G<B?0:C[J-B];C[J++]=(F+x)%256}break;case 2:for(G=r=0;r<I;G=r+=1){F=K[z++];y=(G-(G%B))/B;H=A&&C[(A-1)*I+y*B+(G%B)];C[J++]=(H+F)%256}break;case 3:for(G=o=0;o<I;G=o+=1){F=K[z++];y=(G-(G%B))/B;x=G<B?0:C[J-B];H=A&&C[(A-1)*I+y*B+(G%B)];C[J++]=(F+Math.floor((x+H)/2))%256}break;case 4:for(G=e=0;e<I;G=e+=1){F=K[z++];y=(G-(G%B))/B;x=G<B?0:C[J-B];if(A===0){H=u=0}else{H=C[(A-1)*I+y*B+(G%B)];u=y&&C[(A-1)*I+(y-1)*B+(G%B)]}D=x+H-u;s=Math.abs(D-x);q=Math.abs(D-H);n=Math.abs(D-u);if(s<=q&&s<=n){E=x}else{if(q<=n){E=H}else{E=u}}C[J++]=(F+E)%256}break;default:throw new Error("Invalid filter algorithm: "+K[z-1])}A++}return C};d.prototype.decodePalette=function(){var u,s,e,n,v,t,o,q,r,p;n=this.palette;o=this.transparency.indexed||[];t=new Uint8Array((o.length||0)+n.length);v=0;e=n.length;u=0;for(s=q=0,r=n.length;q<r;s=q+=3){t[v++]=n[s];t[v++]=n[s+1];t[v++]=n[s+2];t[v++]=(p=o[u++])!=null?p:255}return t};d.prototype.copyToImageData=function(e,q){var s,n,w,x,y,t,r,o,p,z,u;n=this.colors;p=null;s=this.hasAlphaChannel;if(this.palette.length){p=(u=this._decodedPalette)!=null?u:this._decodedPalette=this.decodePalette();n=4;s=true}w=e.data||e;o=w.length;y=p||q;x=t=0;if(n===1){while(x<o){r=p?q[x/4]*4:t;z=y[r++];w[x++]=z;w[x++]=z;w[x++]=z;w[x++]=s?y[r++]:255;t=r}}else{while(x<o){r=p?q[x/4]*4:t;w[x++]=y[r++];w[x++]=y[r++];w[x++]=y[r++];w[x++]=s?y[r++]:255;t=r}}};d.prototype.decode=function(){var e;e=new Uint8Array(this.width*this.height*4);this.copyToImageData(e,this.decodePixels());return e};try{i=b.document.createElement("canvas");c=i.getContext("2d")}catch(h){return -1}l=function(n){var e;c.width=n.width;c.height=n.height;c.clearRect(0,0,n.width,n.height);c.putImageData(n,0,0);e=new Image;e.src=i.toDataURL();return e};d.prototype.decodeFrames=function(u){var n,s,e,o,q,t,r,p;if(!this.animation){return}r=this.animation.frames;p=[];for(s=q=0,t=r.length;q<t;s=++q){n=r[s];e=u.createImageData(n.width,n.height);o=this.decodePixels(new Uint8Array(n.data));this.copyToImageData(e,o);n.imageData=e;p.push(n.image=l(e))}return p};d.prototype.renderFrame=function(e,o){var q,p,n;p=this.animation.frames;q=p[o];n=p[o-1];if(o===0){e.clearRect(0,0,this.width,this.height)}if((n!=null?n.disposeOp:void 0)===f){e.clearRect(n.xOffset,n.yOffset,n.width,n.height)}else{if((n!=null?n.disposeOp:void 0)===g){e.putImageData(n.imageData,n.xOffset,n.yOffset)}}if(q.blendOp===j){e.clearRect(q.xOffset,q.yOffset,q.width,q.height)}return e.drawImage(q.image,q.xOffset,q.yOffset)};d.prototype.animate=function(o){var n,s,r,q,e,p,t=this;s=0;p=this.animation,q=p.numFrames,r=p.frames,e=p.numPlays;return(n=function(){var u,v;u=s++%q;v=r[u];t.renderFrame(o,u);if(q>1&&s/q<e){return t.animation._timeout=setTimeout(n,v.delay)}})()};d.prototype.stopAnimation=function(){var e;return clearTimeout((e=this.animation)!=null?e._timeout:void 0)};d.prototype.render=function(n){var e,o;if(n._png){n._png.stopAnimation()}n._png=this;n.width=this.width;n.height=this.height;e=n.getContext("2d");if(this.animation){this.decodeFrames(e);return this.animate(e)}else{o=e.createImageData(this.width,this.height);this.copyToImageData(o,this.decodePixels());return e.putImageData(o,0,0)}};return d})();b.PNG=a})(typeof window!=="undefined"&&window||this);var DecodeStream=(function(){function b(){this.pos=0;this.bufferLength=0;this.eof=false;this.buffer=null}b.prototype={ensureBuffer:function h(o){var k=this.buffer;var n=k?k.byteLength:0;if(o<n){return k}var m=512;while(m<o){m<<=1}var j=new Uint8Array(m);for(var l=0;l<n;++l){j[l]=k[l]}return this.buffer=j},getByte:function a(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return this.buffer[this.pos++]},getBytes:function i(l){var m=this.pos;if(l){this.ensureBuffer(m+l);var k=m+l;while(!this.eof&&this.bufferLength<k){this.readBlock()}var j=this.bufferLength;if(k>j){k=j}}else{while(!this.eof){this.readBlock()}var k=this.bufferLength}this.pos=k;return this.buffer.subarray(m,k)},lookChar:function f(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return String.fromCharCode(this.buffer[this.pos])},getChar:function c(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return String.fromCharCode(this.buffer[this.pos++])},makeSubStream:function e(m,k,l){var j=m+k;while(this.bufferLength<=j&&!this.eof){this.readBlock()}return new Stream(this.buffer,m,k,l)},skip:function d(j){if(!j){j=1}this.pos+=j},reset:function g(){this.pos=0}};return b})();var FlateStream=(function(){if(typeof Uint32Array==="undefined"){return undefined}var g=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);var b=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]);var d=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]);var a=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,590000,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9];var f=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];function c(h){throw new Error(h)}function e(i){var k=0;var j=i[k++];var h=i[k++];if(j==-1||h==-1){c("Invalid header in flate stream")}if((j&15)!=8){c("Unknown compression method in flate stream")}if((((j<<8)+h)%31)!=0){c("Bad FCHECK in flate stream")}if(h&32){c("FDICT bit set in flate stream")}this.bytes=i;this.bytesPos=k;this.codeSize=0;this.codeBuf=0;DecodeStream.call(this)}e.prototype=Object.create(DecodeStream.prototype);e.prototype.getBits=function(l){var j=this.codeSize;var k=this.codeBuf;var i=this.bytes;var m=this.bytesPos;var h;while(j<l){if(typeof(h=i[m++])=="undefined"){c("Bad encoding in flate stream")}k|=h<<j;j+=8}h=k&((1<<l)-1);this.codeBuf=k>>l;this.codeSize=j-=l;this.bytesPos=m;return h};e.prototype.getCode=function(o){var h=o[0];var j=o[1];var l=this.codeSize;var p=this.codeBuf;var r=this.bytes;var m=this.bytesPos;while(l<j){var n;if(typeof(n=r[m++])=="undefined"){c("Bad encoding in flate stream")}p|=(n<<l);l+=8}var i=h[p&((1<<j)-1)];var k=i>>16;var q=i&65535;if(l==0||l<k||k==0){c("Bad encoding in flate stream")}this.codeBuf=(p>>k);this.codeSize=(l-k);this.bytesPos=m;return q};e.prototype.generateHuffmanTable=function(m){var l=m.length;var o=0;for(var p=0;p<l;++p){if(m[p]>o){o=m[p]}}var v=1<<o;var h=new Uint32Array(v);for(var q=1,j=0,s=2;q<=o;++q,j<<=1,s<<=1){for(var k=0;k<l;++k){if(m[k]==q){var r=0;var u=j;for(var p=0;p<q;++p){r=(r<<1)|(u&1);u>>=1}for(var p=r;p<v;p+=s){h[p]=(q<<16)|k}++j}}}return[h,o]};e.prototype.readBlock=function(){function w(O,P,i,N,n){var k=O.getBits(i)+N;while(k-->0){P[F++]=n}}var l=this.getBits(3);if(l&1){this.eof=true}l>>=1;if(l==0){var z=this.bytes;var v=this.bytesPos;var L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}var C=L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}C|=(L<<8);if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}var K=L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}K|=(L<<8);if(K!=(~C&65535)){c("Bad uncompressed block length in flate stream")}this.codeBuf=0;this.codeSize=0;var r=this.bufferLength;var E=this.ensureBuffer(r+C);var m=r+C;this.bufferLength=m;for(var B=r;B<m;++B){if(typeof(L=z[v++])=="undefined"){this.eof=true;break}E[B]=L}this.bytesPos=v;return}var t;var u;if(l==1){t=a;u=f}else{if(l==2){var M=this.getBits(5)+257;var x=this.getBits(5)+1;var h=this.getBits(4)+4;var o=Array(g.length);var F=0;while(F<h){o[g[F++]]=this.getBits(3)}var y=this.generateHuffmanTable(o);var G=0;var F=0;var J=M+x;var H=new Array(J);while(F<J){var j=this.getCode(y);if(j==16){w(this,H,2,3,G)}else{if(j==17){w(this,H,3,3,G=0)}else{if(j==18){w(this,H,7,11,G=0)}else{H[F++]=G=j}}}}t=this.generateHuffmanTable(H.slice(0,M));u=this.generateHuffmanTable(H.slice(M,J))}else{c("Unknown block type in flate stream")}}var E=this.buffer;var I=E?E.length:0;var s=this.bufferLength;while(true){var q=this.getCode(t);if(q<256){if(s+1>=I){E=this.ensureBuffer(s+1);I=E.length}E[s++]=q;continue}if(q==256){this.bufferLength=s;return}q-=257;q=b[q];var p=q>>16;if(p>0){p=this.getBits(p)}var G=(q&65535)+p;q=this.getCode(u);q=d[q];p=q>>16;if(p>0){p=this.getBits(p)}var A=(q&65535)+p;if(s+G>=I){E=this.ensureBuffer(s+G);I=E.length}for(var D=0;D<G;++D,++s){E[s]=E[s-A]}}};return e})();(function(b){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(typeof b.btoa==="undefined"){b.btoa=function(k){var f,e,d,o,n,m,l,p,j=0,q=0,h="",g=[];if(!k){return k}do{f=k.charCodeAt(j++);e=k.charCodeAt(j++);d=k.charCodeAt(j++);p=f<<16|e<<8|d;o=p>>18&63;n=p>>12&63;m=p>>6&63;l=p&63;g[q++]=a.charAt(o)+a.charAt(n)+a.charAt(m)+a.charAt(l)}while(j<k.length);h=g.join("");var c=k.length%3;return(c?h.slice(0,c-3):h)+"===".slice(c||3)}}if(typeof b.atob==="undefined"){b.atob=function(j){var e,d,c,n,m,l,k,o,h=0,p=0,f="",g=[];if(!j){return j}j+="";do{n=a.indexOf(j.charAt(h++));m=a.indexOf(j.charAt(h++));l=a.indexOf(j.charAt(h++));k=a.indexOf(j.charAt(h++));o=n<<18|m<<12|l<<6|k;e=o>>16&255;d=o>>8&255;c=o&255;if(l==64){g[p++]=String.fromCharCode(e)}else{if(k==64){g[p++]=String.fromCharCode(e,d)}else{g[p++]=String.fromCharCode(e,d,c)}}}while(h<j.length);f=g.join("");return f}}if(!Array.prototype.map){Array.prototype.map=function(e){if(this===void 0||this===null||typeof e!=="function"){throw new TypeError()}var h=Object(this),c=h.length>>>0,g=new Array(c);var d=arguments.length>1?arguments[1]:void 0;for(var f=0;f<c;f++){if(f in h){g[f]=e.call(d,h[f],f,h)}}return g}}if(!Array.isArray){Array.isArray=function(c){return Object.prototype.toString.call(c)==="[object Array]"}}if(!Array.prototype.forEach){Array.prototype.forEach=function(e,d){if(this===void 0||this===null||typeof e!=="function"){throw new TypeError()}var g=Object(this),c=g.length>>>0;for(var f=0;f<c;f++){if(f in g){e.call(d,g[f],f,g)}}}}if(!Object.keys){Object.keys=(function(){var e=Object.prototype.hasOwnProperty,f=!({toString:null}).propertyIsEnumerable("toString"),d=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],c=d.length;return function(j){if(typeof j!=="object"&&(typeof j!=="function"||j===null)){throw new TypeError()}var g=[],k,h;for(k in j){if(e.call(j,k)){g.push(k)}}if(f){for(h=0;h<c;h++){if(e.call(j,d[h])){g.push(d[h])}}}return g}}())}if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(!String.prototype.trimLeft){String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}}if(!String.prototype.trimRight){String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")}}})(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this);Gwt=new Object();Gwt.Core=new Object();Gwt.Core.Contrib={Protocol:window.location.protocol,HostName:window.location.hostname,Port:window.location.port,Backend:this.Protocol+"//"+this.HostName+"/backend",Host:this.Protocol+"//"+this.HostName+"/frontend",Images:"share/images/",Icons:"share/icons/",db:"remote",request_id:0};Gwt.Core.Request=function(c,a,b){this.XHR=new XMLHttpRequest();this.Url=null;this.Func=null;this.Data=null;this.InitRequest(c,a,b)};Gwt.Core.Request.prototype.InitRequest=function(c,a,b){this.Url=c;this.Func=a;this.Data=b;this.XHR.onreadystatechange=this.Ready.bind(this);this.XHR.open("POST",this.Url,true);this.Send()};Gwt.Core.Request.prototype.Send=function(){if(this.Data instanceof File){this.UploadFile();return}this.SendData()};Gwt.Core.Request.prototype.UploadFile=function(){this.Boundary="---------------------------"+Date.now().toString(16);this.XHR.setRequestHeader("Content-Type","multipart/form-data; boundary="+this.Boundary);this.Multipart=[];this.Multipart.push("--"+this.Boundary+"\r\n");var a='Content-Disposition: form-data; name="userfile"; filename="'+this.Data.name+'"\r\nContent-Type: '+this.Data.type+"\r\n\r\n";this.Multipart.push(a);this.FileData=new FileReader();this.FileData.readAsBinaryString(this.Data);this.FileData.addEventListener("load",this.SendFile.bind(this),false)};Gwt.Core.Request.prototype.SendFile=function(){this.Multipart.push(this.FileData.result);this.Multipart.push("\r\n--"+this.Boundary+"--");var c=this.Multipart.join("");var b=c.length,d=new Uint8Array(b);for(var a=0;a<b;a++){d[a]=c.charCodeAt(a)&255}this.XHR.send(d)};Gwt.Core.Request.prototype.SendData=function(){this.XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");var a="data="+JSON.stringify(this.Data);this.XHR.send(a)};Gwt.Core.Request.prototype.Ready=function(){if(this.XHR.readyState==4&&this.XHR.status==200){this.Func(JSON.parse(this.XHR.response))}};Gwt.Gui=new Object();Gwt.Gui={WIN_POS_CENTER:"WIN_POS_CENTER",WIN_POS_LEFT:"WIN_POS_LEFT",WIN_POS_TOP:"WIN_POS_TOP",WIN_POS_RIGHT:"WIN_POS_RIGHT",WIN_POS_BOTTOM:"WIN_POS_BOTTOM",ALIGN_CENTER:"ALIGN_CENTER",ALIGN_LEFT:"ALIGN_LEFT",ALIGN_RIGHT:"ALIGN_RIGHT"};Gwt.Gui.Event={Window:{AfterPrint:"afterprint",BeforePrint:"beforeprint",BeforeUnload:"beforeunload",Error:"error",HashChange:"hashchange",Load:"load",Message:"message",Offline:"offline",Online:"online",PageHide:"pagehide",PageShow:"pageshow",PopState:"popstate",Resize:"resize",Storage:"storage",Unload:"unload"},Form:{Blur:"blur",Change:"change",ContextMenu:"contextmenu",Focus:"focus",Input:"input",Invalid:"invalid",Reset:"reset",Search:"search",Select:"select",Submit:"submit"},Mouse:{Click:"click",DBClick:"dbclick",Drag:"drag",DragEnd:"dragend",DragEnter:"dragenter",DragLeave:"dragleave",DragOver:"dragover",DragStart:"dragstart",Drop:"drop",MouseDown:"mousedown",MouseMove:"mousemove",MouseOut:"mouseout",MouseOver:"mouseover",MouseUp:"mouseup",Scroll:"scroll",Wheel:"wheel"},Keyboard:{KeyUp:"keyup",KeyPress:"keypress",KeyDown:"keydown",KeyCodes:{Enter:13,Ctrl:17,Alt:18,AtlGr:225,Shift:16,Up:38,Down:40,Left:37,Right:39,Tap:9,Insert:45,Home:36,Del:46,End:35,Repag:33,Avpag:34,Meta:91}},Clipboard:{Copy:"copy",Cut:"cut",Paste:"paste"},Media:{Abort:"abort",CanPlay:"canplay",CanPlayThtough:"canplaythrough",CueChange:"cuechange",DurationChange:"durationchange",Emptied:"emptied",Ended:"ended",Error:"error",LoadedData:"loadeddata",LoadedMetadata:"loadedmetadata",LoadStart:"loadstart",Pause:"pause",Play:"play",Playing:"playing",Progress:"progress",RateChange:"ratechange",Seeked:"seeked",Seeking:"seeking",Stalled:"stalled",Suspend:"suspend",TimeUpdate:"timeupdate",VolumeChange:"volumechange",Waiting:"waiting"},Misc:{Error:"error",Show:"show",Toggle:"toggle"}};Gwt.Gui.SCREEN_DEVICE_WIDTH=window.innerWidth;Gwt.Gui.SCREEN_DEVICE_HEIGHT=window.innerHeight;Gwt.Gui.SCREEN_DEVICE_PIXEL_RATIO=window.devicePixelRatio;Gwt.Gui.SCREEN_DEVICE_ORIENTATION=window.innerWidth>window.innerHeight?"landscape":"portrait";Gwt.Gui.SCREEN_DEVICE_ASPECT_RATIO=(window.innerWidth>window.innerHeight?window.innerWidth/window.innerHeight:window.innerHeight/window.innerWidth).toString().substring(0,4);Gwt.Gui.Contrib=new Object();Gwt.Gui.Contrib.Color=function(a,f,e,d){this.Red=null;this.Green=null;this.Blue=null;this.Alpha=null;if(typeof a!=="number"){var c=Object.keys(Gwt.Gui.Contrib.Colors);for(var b=0;b<c.length;b++){if(a===Gwt.Gui.Contrib.Colors[c[b]]){this.Red=a[0];this.Green=a[1];this.Blue=a[2];this.Alpha=a[3]}}}else{this.Red=a;this.Green=f;this.Blue=e;this.Alpha=d}};Gwt.Gui.Contrib.Color.prototype.ToString=function(){return"rgba("+this.Red+","+this.Green+","+this.Blue+","+this.Alpha+")"};Gwt.Gui.Contrib.Color.prototype.SetRed=function(a){this.Red=a};Gwt.Gui.Contrib.Color.prototype.SetGreen=function(a){this.Green=a};Gwt.Gui.Contrib.Color.prototype.SetBlue=function(a){this.Blue=a};Gwt.Gui.Contrib.Color.prototype.SetAlpha=function(a){this.Alpha=a};Gwt.Gui.Contrib.Colors={AliceBlue:[240,248,255,1],AntiqueWhite:[250,235,215,1],Aqua:[0,255,255,1],AquaMarine:[127,255,212,1],Azure:[240,255,255,1],Beige:[245,245,220,1],Black:[0,0,0,1],Blue:[0,0,255,1],BlueViolet:[138,43,226,1],Brown:[165,42,42,1],BurlyWood:[222,184,135,1],CadetBlue:[95,158,160,1],Chartreuse:[127,255,0,1],Chocolate:[210,105,30,1],Coral:[255,127,80,1],CornFlowerBlue:[100,149,237,1],CornSilk:[255,248,220,1],Crimson:[220,20,60,1],DarkBlue:[0,0,139,1],DarkCyan:[0,139,139,1],DarkGrey:[169,169,169,1],DarkGreen:[0,100,0,1],DarkOliveGreen:[85,107,47,1],DarkOrchid:[153,50,204,1],DarkRed:[139,0,0,1],DarkSeaGreen:[143,188,143,1],DarkSlateBlue:[72,61,139,1],DarkSlateGray:[47,79,79,1],DarkTurquoise:[0,206,209,1],DeepPink:[255,20,147,1],DeepSkyBlue:[0,191,255,1],DodgerBlue:[30,144,255,1],Fuchsia:[255,0,255,1],Gainsboro:[220,220,220,1],GhostWhite:[248,248,255,1],Gold:[255,215,0,1],GoldenRod:[218,165,32,1],Green:[0,128,0,1],Grey:[128,128,128,1],GreenYellow:[173,255,47,1],HotPink:[255,105,180,1],IndianRed:[205,92,92,1],Khaki:[240,230,140,1],Lavender:[230,230,250,1],LavenderBlush:[255,240,245,1],LawnGreen:[124,252,0,1],LemonChiffon:[255,250,205,1],LightBlue:[173,216,230,1],LighCoral:[240,128,128,1],LighCyan:[224,255,255,1],LighGoldenRodYellow:[250,210,210,1],LighGrey:[211,211,211,1],LighPink:[255,182,193,1],LighSalmon:[255,160,122,1],LighSeaGreen:[32,178,170,1],LighSkyBlue:[135,206,250,1],LighSlateGrey:[119,136,153,1],LighSteelBlue:[176,196,222,1],LighYellow:[255,255,224,1],Lime:[0,255,0,1],LimeGreen:[50,205,50,1],Linen:[250,240,230,1],Magenta:[255,0,255,1],Maroon:[128,0,0,1],MediumAquaMarine:[102,205,170,1],MediumBlue:[0,0,205,1],MediumOrchid:[186,85,211,1],MediumPurple:[147,112,219,1],MediumSeaGreen:[60,179,113,1],MediumSlateBlue:[123,104,238,1],MediumSpringGreen:[0,250,154,1],MediumTurquoise:[72,209,204,1],MediumVioletRed:[199,21,133,1],MidnightBlue:[25,25,112,1],MintCream:[245,255,250,1],MistyRose:[255,225,228,1],Moccasin:[255,228,181,1],Navy:[0,0,128,1],OliveDrab:[107,142,35,1],Orange:[255,165,0,1],OrangeRed:[255,69,0,1],PaleGoldenRod:[232,232,170,1],PaleGreen:[152,251,152,1],PeachPuff:[255,218,185,1],Peru:[205,133,63,1],Pink:[255,192,203,1],Plum:[221,160,221,1],PowderBlue:[176,224,230,1],Purple:[128,0,128,1],RebeccaPurple:[102,51,153,1],Red:[255,0,0,1],RosyBrown:[188,143,143,1],RoyalBlue:[65,105,225,1],Salmon:[250,128,114,1],SeaGreen:[46,139,87,1],Sienna:[160,82,45,1],Silver:[192,192,192,1],SkyBlue:[135,206,235,1],SlateBlue:[106,90,205,1],SlateGrey:[112,128,144,1],Snow:[255,250,250,1],SpringGreen:[0,255,127,1],SteelBlue:[70,130,180,1],Tan:[210,180,140,1],Teal:[0,128,128,1],Thistle:[216,191,216,1],Tomato:[255,99,71,1],Transparent:[0,0,0,0],Violet:[238,130,238,1],Wheat:[245,222,179,1],White:[255,255,255,1],WhiteSmoke:[245,245,245,1],Yellow:[255,255,0,1],YellowGreen:[154,205,50,1]};Gwt.Gui.Contrib.BorderStyle={None:"none",Hidden:"hidden",Dotted:"dotted",Dashed:"dashed",Solid:"solid",Double:"double",Groove:"groove",Ridge:"ridge",Inset:"inset",Outset:"outset",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.PositionType={Static:"statci",Relative:"relative",Fixed:"fixed",Absolute:"absolute"};Gwt.Gui.Contrib.Display={Inline:"inline",Block:"block",Flex:"flex",InlineBlock:"inline-block",InlineFlex:"inline-flex",InlineTable:"inline-table",ListItem:"list-item",RunIn:"run-in",Table:"table",TableCaption:"table-caption",TableColumnGroup:"table-column-group",TableHeaderGroup:"table-header-group",TableFooterGroup:"table-footer-group",TableRowGroup:"table-row-group",TableCell:"table-cell",TableColumn:"table-column",TableRow:"table-row",None:"none",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.Overflow={Visible:"visible",Hidden:"hidden",Scroll:"scroll",Auto:"auto",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.Valign={Baseline:"baseline",Length:"length",Percent:"%",Sub:"sub",Supper:"supper",Top:"top",TextTop:"text-top",Middle:"middle",Bottom:"bottom",TextBottom:"text-bottom",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.Cursor={Alias:"alias",AllScroll:"all-scroll",Auto:"auto",Cell:"cell",ContextMenu:"context-menu",ColResize:"col-resize",Copy:"copy",Crosshair:"crosshair",Default:"default",EResize:"e-resize",EWResize:"ew-resize",Grab:"grab",Grabbing:"grabbing",Help:"help",Move:"move",NResize:"n-resize",NEResize:"ne-resize",NESwResize:"nesw-resize",NSResize:"ns-resize",NWResize:"nw-resize",NWSEResize:"nwse-resize",NoDrop:"no-drop",None:"none",NotAllowed:"not-allowed",Pointer:"pointer",Progress:"progress",RowResize:"row-resize",SResize:"s-resize",SEResize:"se-resize",SWResize:"sw-resize",Text:"text",URL:"url",VerticalText:"vertical-text",WResize:"w-resize",Wait:"wait",ZoomIn:"zoom-in",ZoomOut:"zoom-out",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.FontWeight={Normal:"normal",Bold:"bold",Bolder:"bolder",Lighter:"lighter",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.UserSelect={None:"none",Text:"text",All:"all"};Gwt.Gui.Contrib.TextAlign={Left:"left",Right:"right",Center:"center",Justify:"justify",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundAttachment={Scroll:"scroll",Fixed:"fixed",Local:"local",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundClip={BorderBox:"border-box",PaddingBox:"padding-box",ContentBox:"content-box",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundRepeat={Repeat:"repeat",RepeatX:"repeat-x",RepeatY:"repeat-y",NoRepeat:"no-repeat",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundSize={Auto:"auto",Length:"length",Cover:"cover",Contain:"contain",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundPosition={Left:"left",Right:"right",Top:"top",Bottom:"bottom",Center:"center"};Gwt.Gui.Contrib.OutLine={Dotted:"dotted",Dashed:"dashed",Solid:"solid",Double:"double",Groove:"groove",Ridge:"ridge",Inset:"inset",Outset:"outset",None:"none",Hidden:"hidden"};Gwt.Gui.Frame=function(){this.BackgroundAttachment=null;this.BackgroundClip=null;this.BackgroundColor=null;this.BackgroundImage=null;this.BackgroundOrigin=null;this.BackgroundPositionX=null;this.BackgroundPositionY=null;this.BackgroundRepeatX=null;this.BackgroundRepeatY=null;this.BackgroundSizeHeight=null;this.BackgroundSizeWidth=null;this.Border=null;this.BorderRadius=null;this.BorderStyle=null;this.BoxShadowH=null;this.BoxShadowV=null;this.BoxShadowBlur=null;this.BoxShadowSize=null;this.BoxShadowColor=null;this.Color=null;this.Cursor=null;this.Display=null;this.Expand=null;this.FontFamily=null;this.FontSize=null;this.FontWeight=null;this.Height=null;this.Html=null;this.Margin=null;this.MarginBottom=null;this.MarginLeft=null;this.MarginRight=null;this.MarginTop=null;this.MaxHeight=null;this.MaxWidth=null;this.MinHeight=null;this.MinWidth=null;this.Overflow=null;this.Opacity=null;this.OutLine=null;this.Padding=null;this.PaddingBottom=null;this.PaddingLeft=null;this.PaddingRight=null;this.PaddingTop=null;this.PositionLeft=null;this.PositionTop=null;this.PositionType=null;this.TabIndex=null;this.TextShadowBlur=null;this.TextShadowColor=null;this.TextShadowOffsx=null;this.TextShadowOffsy=null;this.UserSelect=null;this.Valign=null;this.Visibility=null;this.Width=null;this.ZIndex=null;this.ClassName=null;this.Parent=null;this.InitFrame()};Gwt.Gui.Frame.prototype.InitFrame=function(){this.SetHtml("div");this.SetTabIndex(0);this.SetClassName("Gwt_Gui_Frame");this.SetExpand(false);this.SetBorder(0);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetPosition(0,0)};Gwt.Gui.Frame.prototype.FinalizeFrame=function(){this.Html.parentNode.removeChild(this.Html);this.BackgroundAttachment=null;this.BackgroundClip=null;this.BackgroundColor=null;this.BackgroundImage=null;this.BackgroundOrigin=null;this.BackgroundPositionX=null;this.BackgroundPositionY=null;this.BackgroundRepeatX=null;this.BackgroundRepeatY=null;this.BackgroundSizeHeight=null;this.BackgroundSizeWidth=null;this.Border=null;this.BorderRadius=null;this.BorderStyle=null;this.Color=null;this.Cursor=null;this.Display=null;this.Expand=null;this.FontFamily=null;this.FontSize=null;this.FontWeight=null;this.Height=null;this.Html=null;this.Margin=null;this.MarginBottom=null;this.MarginLeft=null;this.MarginRight=null;this.MarginTop=null;this.MaxHeight=null;this.MaxWidth=null;this.Overflow=null;this.Opacity=null;this.OutLine=null;this.Padding=null;this.PaddingBottom=null;this.PaddingLeft=null;this.PaddingRight=null;this.PaddingTop=null;this.PositionLeft=null;this.PositionTop=null;this.PositionType=null;this.TabIndex=null;this.TextShadowBlur=null;this.TextShadowColor=null;this.TextShadowOffsx=null;this.TextShadowOffsy=null;this.UserSelect=null;this.Valign=null;this.Visibility=null;this.Width=null;this.ZIndex=null;this.ClassName=null;this.Parent=null};Gwt.Gui.Frame.prototype.Add=function(a){this.Html.appendChild(a.Html)};Gwt.Gui.Frame.prototype.AddEvent=function(b,a){this.Html.addEventListener(b,a,true)};Gwt.Gui.Frame.prototype.RemoveEvent=function(b,a){this.Html.removeEventListener(b,a,true)};Gwt.Gui.Frame.prototype.SetHtml=function(a){this.Html=document.createElement(a);this.InitStyle()};Gwt.Gui.Frame.prototype.SetTabIndex=function(a){this.TabIndex=a;this.Html.tabIndex=this.TabIndex};Gwt.Gui.Frame.prototype.SetSize=function(a,b){this.Width=a;this.Height=b;this.SetMaxWidth(this.Width);this.SetMaxHeight(this.Height);this.SetMinWidth(this.Width);this.SetMinHeight(this.Height);this.Html.style.width=this.Width+"px";this.Html.style.height=this.Height+"px"};Gwt.Gui.Frame.prototype.SetWidth=function(a){this.Width=a;this.SetMaxWidth(this.Width);this.SetMinWidth(this.Width);this.Html.style.width=this.Width+"px"};Gwt.Gui.Frame.prototype.SetHeight=function(a){this.Height=a;this.SetMaxHeight(this.Height);this.SetMinHeight(this.Height);this.Html.style.height=this.Height+"px"};Gwt.Gui.Frame.prototype.GetWidth=function(){return this.Width};Gwt.Gui.Frame.prototype.GetHeight=function(){return this.Height};Gwt.Gui.Frame.prototype.GetHtml=function(){return this.Html};Gwt.Gui.Frame.prototype.SetPosition=function(b,c){var f=Gwt.Gui.SCREEN_DEVICE_WIDTH*0.05;var a=Gwt.Gui.SCREEN_DEVICE_HEIGHT*0.05;this.PositionTop=b;this.PositionLeft=c;if(this.PositionTop===Gwt.Gui.WIN_POS_CENTER&&this.PositionLeft===undefined){var e=((Gwt.Gui.SCREEN_DEVICE_WIDTH-this.GetWidth())/2);var d=((Gwt.Gui.SCREEN_DEVICE_HEIGHT-this.GetHeight())/2)}else{if(this.PositionLeft!==undefined&&this.PositionTop!==undefined){switch(this.PositionLeft){case Gwt.Gui.WIN_POS_LEFT:var e=0;break;case Gwt.Gui.WIN_POS_CENTER:var e=(Gwt.Gui.SCREEN_DEVICE_WIDTH-this.GetWidth())/2;break;case Gwt.Gui.WIN_POS_RIGHT:var e=(Gwt.Gui.SCREEN_DEVICE_WIDTH-this.GetWidth())-2;break;default:var e=this.PositionLeft}switch(this.PositionTop){case Gwt.Gui.WIN_POS_TOP:var d=0;break;case Gwt.Gui.WIN_POS_CENTER:var d=(Gwt.Gui.SCREEN_DEVICE_HEIGHT-this.GetHeight())/2;break;case Gwt.Gui.WIN_POS_BOTTOM:var d=(Gwt.Gui.SCREEN_DEVICE_HEIGHT-this.GetHeight())-2;break;default:var d=this.PositionTop}}else{d=0;e=0}}this.PositionTop=d;this.PositionLeft=e;this.Html.style.top=this.PositionTop;this.Html.style.left=this.PositionLeft};Gwt.Gui.Frame.prototype.GetPositionLeft=function(){return this.PositionLeft};Gwt.Gui.Frame.prototype.GetPositionTop=function(){return this.PositionTop};Gwt.Gui.Frame.prototype.SetFocus=function(){this.Html.focus()};Gwt.Gui.Frame.prototype.SetBackgroundAttachment=function(a){this.BackgroundAttachment=a;this.Html.style.backgroundAttachment=this.BackgroundAttachment};Gwt.Gui.Frame.prototype.SetBackgroundClip=function(a){this.BackgroundClip=a;this.Html.style.backgroundClip=this.BackgroundClip};Gwt.Gui.Frame.prototype.SetBackgroundColor=function(a){this.BackgroundColor=a;this.Html.style.backgroundColor=this.BackgroundColor.ToString()};Gwt.Gui.Frame.prototype.SetBackgroundImage=function(a){this.BackgroundImage=a;this.Html.style.backgroundImage="url("+this.BackgroundImage+")"};Gwt.Gui.Frame.prototype.SetBackgroundOrigin=function(a){this.BackgroundOrigin=a;this.Html.style.backgroundOrigin=this.BackgroundOrigin};Gwt.Gui.Frame.prototype.SetBackgroundPosition=function(b,a){this.BackgroundPositionX=b;this.BackgroundPositionY=a;this.Html.style.backgroundPosition=""+this.BackgroundPositionX+" "+this.BackgroundPositionY+""};Gwt.Gui.Frame.prototype.SetBackgroundRepeat=function(b,a){this.BackgroundRepeatX=b;this.BackgroundRepeatY=a;this.Html.style.backgroundRepeatX=this.BackgroundRepeatX;this.Html.style.backgroundRepeatY=this.BackgroundRepeatY};Gwt.Gui.Frame.prototype.SetBackgroundSize=function(a,b){this.BackgroundSizeWidth=a;this.BackgroundSizeHeight=b;if(typeof this.BackgroundSizeWidth==="string"){this.Html.style.backgroundSize=this.BackgroundSizeWidth}else{this.Html.style.backgroundSize=this.BackgroundSizeWidth+"px "+this.BackgroundSizeHeight+"px"}};Gwt.Gui.Frame.prototype.SetBorder=function(a){this.Border=a;this.Html.style.borderWidth=this.Border+"px"};Gwt.Gui.Frame.prototype.SetBorderStyle=function(a){this.BorderStyle=a;this.Html.style.borderStyle=this.BorderStyle};Gwt.Gui.Frame.prototype.SetBorderRadius=function(a){this.BorderRadius=a;this.Html.style.borderRadius=this.BorderRadius+"px"};Gwt.Gui.Frame.prototype.SetBorderColor=function(a){this.Html.style.borderColor=a.ToString()};Gwt.Gui.Frame.prototype.SetBoxShadow=function(c,b,d,a,e){this.BoxShadowH=c;this.BoxShadowV=b;this.BoxShadowBlur=d;this.BoxShadowSize=a;this.BoxShadowColor=e;this.Html.style.boxShadow=this.BoxShadowH+"px "+this.BoxShadowV+"px "+this.BoxShadowBlur+"px "+this.BoxShadowSize+"px "+this.BoxShadowColor.ToString()};Gwt.Gui.Frame.prototype.SetClassName=function(a){this.ClassName=a;this.Html.className=this.ClassName};Gwt.Gui.Frame.prototype.GetClassName=function(){return this.ClassName};Gwt.Gui.Frame.prototype.SetParent=function(a){this.Parent=a};Gwt.Gui.Frame.prototype.GetParent=function(){return this.Parent};Gwt.Gui.Frame.prototype.SetColor=function(a){this.Color=a;this.Html.style.color=this.Color.ToString()};Gwt.Gui.Frame.prototype.SetCursor=function(a){this.Cursor=a;this.Html.style.cursor=this.Cursor};Gwt.Gui.Frame.prototype.SetDisplay=function(a){this.Display=a;this.Html.style.display=this.Display};Gwt.Gui.Frame.prototype.SetFontFamily=function(a){this.FontFamily=a;this.Html.style.fontFamily=this.FontFamily};Gwt.Gui.Frame.prototype.SetFontSize=function(a){this.FontSize=a;this.Html.style.fontSize=this.FontSize+"pt"};Gwt.Gui.Frame.prototype.GetFontSize=function(){return this.FontSize};Gwt.Gui.Frame.prototype.SetFontWeight=function(a){this.FontWeight=a;this.Html.style.fontWeight=this.FontWeight};Gwt.Gui.Frame.prototype.InitStyle=function(){this.SetMaxHeight(Gwt.Gui.SCREEN_DEVICE_HEIGHT);this.SetMaxWidth(Gwt.Gui.SCREEN_DEVICE_WIDTH);this.SetMinHeight(0);this.SetMinWidth(0);this.SetPositionType(Gwt.Gui.Contrib.PositionType.Relative);this.SetDisplay(Gwt.Gui.Contrib.Display.Block);this.SetOverflow(Gwt.Gui.Contrib.Overflow.Hidden);this.SetPadding(0);this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Transparent));this.SetBorder(0);this.SetColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure))};Gwt.Gui.Frame.prototype.SetMaxHeight=function(a){this.MaxHeight=a;this.Html.style.maxHeight=this.MaxHeight+"px"};Gwt.Gui.Frame.prototype.SetMaxWidth=function(a){this.MaxWidth=a;this.Html.style.maxWidth=this.MaxWidth+"px"};Gwt.Gui.Frame.prototype.SetMinHeight=function(a){this.MinHeight=a;this.Html.style.minHeight=this.MinHeight+"px"};Gwt.Gui.Frame.prototype.SetMinWidth=function(a){this.MinWidth=a;this.Html.style.minWidth=this.MinWidth+"px"};Gwt.Gui.Frame.prototype.SetMargin=function(a){this.Margin=a;this.Html.style.margin=this.Margin+"px"};Gwt.Gui.Frame.prototype.SetMarginTop=function(a){this.MarginTop=a;this.Html.style.marginTop=this.MarginTop+"px"};Gwt.Gui.Frame.prototype.SetMarginBottom=function(a){this.MarginBottom=a;this.Html.style.marginBottom=this.MarginBottom+"px"};Gwt.Gui.Frame.prototype.SetMarginLeft=function(a){this.MarginLeft=a;this.Html.style.marginLeft=this.MarginLeft+"px"};Gwt.Gui.Frame.prototype.SetMarginRight=function(a){this.MarginRight=a;this.Html.style.marginRight=this.MarginRight+"px"};Gwt.Gui.Frame.prototype.SetPadding=function(a){this.Padding=a;this.Html.style.padding=this.Padding+"px"};Gwt.Gui.Frame.prototype.SetPaddingTop=function(a){this.PaddingTop=a;this.Html.style.paddingTop=this.PaddingTop+"px"};Gwt.Gui.Frame.prototype.SetPaddingBottom=function(a){this.PaddingBottom=a;this.Html.style.paddingBottom=this.PaddingBottom+"px"};Gwt.Gui.Frame.prototype.SetPaddingLeft=function(a){this.PaddingLeft=a;this.Html.style.paddingLeft=this.PaddingLeft+"px"};Gwt.Gui.Frame.prototype.SetPaddingRight=function(a){this.PaddingRight=a;this.Html.style.paddingRight=this.PaddingRight+"px"};Gwt.Gui.Frame.prototype.SetPositionType=function(a){this.PositionType=a;this.Html.style.position=this.PositionType};Gwt.Gui.Frame.prototype.SetOverflow=function(a){this.Overflow=a;this.Html.style.overflow=this.Overflow};Gwt.Gui.Frame.prototype.SetOpacity=function(a){this.Opacity=a;this.Html.style.opacity=this.Opacity};Gwt.Gui.Frame.prototype.SetTextShadow=function(b,a,c,d){this.TextShadowOffsx=b;this.TextShadowOffsy=a;this.TextShadowBlur=c;this.TextShadowColor=d;this.Html.style.textShadow=this.TextShadowOffsx+"px "+this.TextShadowOffsy+"px "+this.TextShadowBlur+"px "+this.TextShadowColor.ToString()};Gwt.Gui.Frame.prototype.SetZIndex=function(a){this.ZIndex=a;this.Html.style.zIndex=this.ZIndex};Gwt.Gui.Frame.prototype.SetSelectable=function(a){this.UserSelect=a;this.Html.style.userSelect=this.UserSelect};Gwt.Gui.Frame.prototype.SetValign=function(a){this.Valign=a;this.Html.style.verticalAlign=this.Valign};Gwt.Gui.Frame.prototype.SetVisibility=function(a){this.Visibility=a;this.Html.style.visibility=this.Visibility};Gwt.Gui.Frame.prototype.SetExpand=function(a){this.Expand=a};Gwt.Gui.Frame.prototype.IsExpand=function(){return this.Expand};Gwt.Gui.Frame.prototype.SetOutLine=function(a){this.OutLine=a;this.Html.style.outline=this.OutLine};Gwt.Gui.Frame.prototype.GetOutLine=function(){return this.OutLine};Gwt.Gui.Window=function(){Gwt.Gui.Frame.call(this);this.InitWindow()};Gwt.Gui.Window.prototype=new Gwt.Gui.Frame();Gwt.Gui.Window.prototype.constructor=Gwt.Gui.Window;Gwt.Gui.Window.prototype.FinalizeWindow=function(){this.FinalizeFrame()};Gwt.Gui.Window.prototype.InitWindow=function(){this.SetClassName("Gwt_Gui_Window");this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(25,25,25,0.3));this.SetBackgroundSize(Gwt.Gui.Contrib.BackgroundSize.Cover);this.SetBoxShadow(0,0,10,2,new Gwt.Gui.Contrib.Color(102,205,102,0.3));this.SetBorder(0);var c=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.White);c.SetAlpha(0.5);this.SetBorderColor(c);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetBorder(1);this.SetBorderRadius(5);this.SetPositionType(Gwt.Gui.Contrib.PositionType.Absolute);this.SetSize(256,256);this.SetDisplay(Gwt.Gui.Contrib.Display.Block);var b=(Math.random()*Gwt.Gui.SCREEN_DEVICE_WIDTH)-this.GetWidth();var a=(Math.random()*Gwt.Gui.SCREEN_DEVICE_HEIGHT)-this.GetHeight();if(b<0){b=0}if(a<0){a=0}this.SetPosition(a,b)};Gwt.Gui.Window.prototype.SetBorderSpacing=function(a){var b=a*2;this.layout.SetWidth(this.GetWidth()-b);this.layout.SetHeight(this.GetHeight()-b);var d=(this.GetWidth()-(this.GetWidth()-b))/2;var c=((this.GetHeight()-(this.GetHeight()-b))/2);this.layout.SetPosition(d,c)};Gwt.Gui.Window.prototype.Open=function(){desktop.show(this)};Gwt.Gui.Window.prototype.Close=function(){this.FinalizeWindow()};Gwt.Gui.Dialog=function(a){Gwt.Gui.Frame.call(this);this.DialogBox=null;this.InitDialog(a)};Gwt.Gui.Dialog.prototype=new Gwt.Gui.Frame();Gwt.Gui.Dialog.prototype.constructor=Gwt.Gui.Dialog;Gwt.Gui.Dialog.prototype.InitDialog=function(d){this.SetClassName("Gwt_Gui_Dialog");this.SetPositionType(Gwt.Gui.Contrib.PositionType.Absolute);this.SetParent(d);this.AddEvent(Gwt.Gui.Event.Mouse.Click,this.Close.bind(this));this.SetSize(Gwt.Gui.SCREEN_DEVICE_WIDTH,Gwt.Gui.SCREEN_DEVICE_HEIGHT);this.SetPosition(Gwt.Gui.WIN_POS_TOP,Gwt.Gui.WIN_POS_LEFT);var b=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.DarkSlateGray);b.SetAlpha(0.75);this.SetBackgroundColor(b);this.SetZIndex(900000);this.DialogBox=new Gwt.Gui.Frame();this.DialogBox.SetSize(256,256);var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.DarkSlateGray);a.SetAlpha(0.75);this.DialogBox.SetBackgroundColor(a);var c=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);c.SetAlpha(0.33);this.DialogBox.SetBorderColor(c);this.DialogBox.SetBorder(1);this.DialogBox.SetBorderRadius(5);this.DialogBox.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.DialogBox.SetZIndex(1000000);this.Add(this.DialogBox)};Gwt.Gui.Dialog.prototype.Open=function(){desktop.show(this)};Gwt.Gui.Dialog.prototype.Close=function(){this.DialogBox.FinalizeFrame();this.DialogBox=null;this.FinalizeFrame()};Gwt.Gui.Button=function(a,b){Gwt.Gui.Frame.call(this);this.Image=null;this.Text=null;this.InitButton(a,b)};Gwt.Gui.Button.prototype=new Gwt.Gui.Frame();Gwt.Gui.Button.prototype.constructor=Gwt.Gui.Button;Gwt.Gui.Button.prototype.FinalizeButton=function(){this.Image=null;this.Text=null;this.FinalizeFrame()};Gwt.Gui.Button.prototype.InitButton=function(b,c){this.SetClassName("Gwt_Gui_Button");this.SetExpand(false);this.SetBorder(1);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);a.SetAlpha(0.3);this.SetBorderColor(a);this.SetBorderRadius(5);this.SetMargin(0);this.AddEvent(Gwt.Gui.Event.Mouse.MouseMove,this.MouseMove.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseDown,this.MouseDown.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseUp,this.MouseMove.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseOut,this.MouseOut.bind(this));this.Image=new Gwt.Gui.Image(b);this.Image.SetSize(24,24);this.Image.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);this.Text=new Gwt.Gui.StaticText(c);this.Text.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);this.Text.SetValign(Gwt.Gui.Contrib.Valign.Top);this.SetSize(this.Image.GetWidth()+this.Text.GetWidth(),24);this.Add(this.Image);this.Add(this.Text)};Gwt.Gui.Button.prototype.MouseMove=function(){this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(25,25,25,0.1))};Gwt.Gui.Button.prototype.MouseDown=function(){this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(25,25,25,0.2))};Gwt.Gui.Button.prototype.MouseOut=function(){this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Transparent))};Gwt.Gui.Button.prototype.SetText=function(a){this.Text.SetText(a);this.Text.SetWidth(this.GetWidth()*0.7)};Gwt.Gui.Button.prototype.SetImage=function(a){this.Image.SetImage(a)};Gwt.Gui.Button.prototype.SetFontSize=function(a){this.Text.SetFontSize(a);this.SetSize(this.Image.GetWidth()+this.Text.GetWidth(),24)};Gwt.Gui.Entry=function(a){Gwt.Gui.Frame.call(this);this.InitEntry(a)};Gwt.Gui.Entry.prototype=new Gwt.Gui.Frame();Gwt.Gui.Entry.prototype.constructor=Gwt.Gui.Entry;Gwt.Gui.Entry.prototype.FinalizeEntry=function(){this.FinalizeFrame()};Gwt.Gui.Entry.prototype.InitEntry=function(a){this.SetHtml("input");this.Html.setAttribute("type","text");this.SetClassName("Gwt_Gui_Entry");this.SetExpand(true);this.SetPadding(3);this.SetBorderRadius(5);this.SetPlaceholder(a||"Entry text");this.SetFontSize(11)};Gwt.Gui.Entry.prototype.SetPlaceholder=function(a){this.Html.placeholder=a};Gwt.Gui.Entry.prototype.ChangeToPassword=function(){this.Html.type="password"};Gwt.Gui.Entry.prototype.ChangeToText=function(){this.Html.type="text"};Gwt.Gui.Entry.prototype.GetText=function(){return this.Html.value};Gwt.Gui.Entry.prototype.SetText=function(a){this.Html.value=a};Gwt.Gui.Entry.prototype.SetMaxLength=function(a){this.Html.maxLength=a};Gwt.Gui.Entry.prototype.Reset=function(){this.SetText("")};Gwt.Gui.File=function(a){Gwt.Gui.Frame.call(this);this.DataSize=null;this.FileName=null;this.MimeType=null;this.Data=null;this.InitFile()};Gwt.Gui.File.prototype=new Gwt.Gui.Frame();Gwt.Gui.File.prototype.constructor=Gwt.Gui.File;Gwt.Gui.File.prototype.FinalizeFile=function(){this.FinalizeFrame()};Gwt.Gui.File.prototype.InitFile=function(){this.SetHtml("input");this.Html.setAttribute("type","file");this.Html.removeAttribute("multiple");this.SetOpacity(1);this.SetWidth(180);this.SetClassName("Gwt_Gui_Text");this.AddEvent(Gwt.Gui.Event.Form.Change,this.UpdateInfo.bind(this))};Gwt.Gui.File.prototype.UpdateInfo=function(){this.Data=this.Html.files[0];this.DataSize=this.Data.size;this.FileName=this.Data.name;this.MimeType=this.Data.type};Gwt.Gui.File.prototype.GetData=function(){return this.Data};Gwt.Gui.File.prototype.GetDataSize=function(){return this.DataSize};Gwt.Gui.File.prototype.GetFileName=function(){return this.FileName};Gwt.Gui.File.prototype.GetMimeType=function(){return this.MimeType};Gwt.Gui.File.prototype.Reset=function(){this.Data=null;this.DataSize=null;this.FileName=null;this.MimeType=null};Gwt.Gui.Text=function(a){Gwt.Gui.Frame.call(this);this.InitText()};Gwt.Gui.Text.prototype=new Gwt.Gui.Frame();Gwt.Gui.Text.prototype.constructor=Gwt.Gui.Text;Gwt.Gui.Text.prototype.FinalizeText=function(){this.FinalizeFrame()};Gwt.Gui.Text.prototype.InitText=function(){this.SetHtml("textarea");this.SetClassName("Gwt_Gui_Text");this.SetExpand(true);this.SetPadding(3);this.SetBorderRadius(5);this.SetPlaceholder(Placeholder||"Text multi-line");this.SetFontSize(10);this.SetHeight(96);this.SetAlign();this.SetMaxLength(185)};Gwt.Gui.Text.prototype.SetPlaceholder=function(a){this.html.Placeholder=a};Gwt.Gui.Text.prototype.ChangeToPassword=function(){this.html.type="password"};Gwt.Gui.Text.prototype.ChangeToText=function(){this.html.type="text"};Gwt.Gui.Text.prototype.GetText=function(){return this.html.value};Gwt.Gui.Text.prototype.SetText=function(a){this.html.value=text};Gwt.Gui.Text.prototype.SetMaxLength=function(a){this.html.maxLength=value};Gwt.Gui.Text.prototype.Reset=function(){this.SetText("")};Gwt.Gui.Text.prototype.SetAlign=function(a){switch(a){case Gwt.Gui.ALIGN_LEFT:this.align=Gwt.Gui.ALIGN_LEFT;this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Left;break;case Gwt.Gui.ALIGN_CENTER:this.align=Gwt.Gui.ALIGN_CENTER;this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Center;break;case Gwt.Gui.ALIGN_RIGHT:this.align=Gwt.Gui.ALIGN_RIGHT;this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Right;break;default:this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Justify;break}};Gwt.Gui.HBox=function(a){Gwt.Gui.Frame.call(this);this.Childs=null;this.MarginElements=null;this.InitHbox(a)};Gwt.Gui.HBox.prototype=new Gwt.Gui.Frame();Gwt.Gui.HBox.prototype.constructor=Gwt.Gui.HBox;Gwt.Gui.HBox.prototype.FinalizeHbox=function(){this.Childs=null;this.MarginElements=null;this.FinalizeFrame()};Gwt.Gui.HBox.prototype.InitHbox=function(a){this.SetClassName("Gwt_Gui_HBox");this.SetDisplay(Gwt.Gui.Contrib.Display.Block);this.Childs=[];this.MarginElements=typeof(a)=="undefined"?12:a};Gwt.Gui.HBox.prototype.GetChilds=function(){return this.Childs};Gwt.Gui.HBox.prototype.GetMarginElements=function(){return this.MarginElements};Gwt.Gui.HBox.prototype.Add=function(a){this.GetChilds().push(a);this.GetHtml().appendChild(a.GetHtml());if(a.GetClassName()=="Gwt_Gui_VBox"){var d=[];for(var c=0;c<this.GetChilds().length;c++){if(this.GetChilds()[c].GetClassName()=="Gwt_Gui_VBox"){d.push(this.GetChilds()[c])}}for(var b=0;b<d.length;b++){d[b].SetWidth(this.GetWidth()/d.length);d[b].SetHeight(this.GetHeight())}}else{a.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);if(a.GetHtml()==this.GetHtml().firstChild){a.SetMargin(0)}else{if(a.GetHtml()==this.GetHtml().lastChild){a.SetMarginLeft(this.GetMarginElements())}}}};Gwt.Gui.Image=function(a){Gwt.Gui.Frame.call(this);this.InitImage(a)};Gwt.Gui.Image.prototype=new Gwt.Gui.Frame();Gwt.Gui.Image.prototype.constructor=Gwt.Gui.Image;Gwt.Gui.Image.prototype.FinalizeImage=function(){this.FinalizeFrame()};Gwt.Gui.Image.prototype.InitImage=function(a){this.SetHtml("img");this.SetClassName("Gwt_Gui_Image");this.SetCursor(Gwt.Gui.Contrib.Cursor.Default);this.SetImage(a||Gwt.Core.Contrib.Host+Gwt.Core.Contrib.Images+"default_image.svg");this.SetSelectable("none")};Gwt.Gui.Image.prototype.SetImage=function(a){this.Html.src=a};Gwt.Gui.Item=function(b,a){Gwt.Gui.Frame.call(this);this.Text=null;this.Value=null;this.InitItem(b,a)};Gwt.Gui.Item.prototype=new Gwt.Gui.Frame();Gwt.Gui.Item.prototype.constructor=Gwt.Gui.Item;Gwt.Gui.Item.prototype.FinalizeItem=function(){this.Text=null;this.Value=null;this.FinalizeFrame()};Gwt.Gui.Item.prototype.InitItem=function(b,a){this.SetClassName("Gwt_Gui_Item");this.Text=new Gwt.Gui.StaticText(b);this.Value=a;this.SetHeight(24);var c=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);c.SetAlpha(0);this.SetBorderColor(c);this.SetBorder(0);this.SetBackgroundColor(c);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetBorderRadius(0);this.AddEvent(Gwt.Gui.Event.Mouse.MouseOver,this.MouseOver.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseOut,this.MouseOut.bind(this));this.Add(this.Text)};Gwt.Gui.Item.prototype.GetValue=function(){return this.Value};Gwt.Gui.Item.prototype.MouseOver=function(a){var b=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);b.SetAlpha(0.25);this.SetBackgroundColor(b)};Gwt.Gui.Item.prototype.MouseOut=function(a){var b=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);b.SetAlpha(0);this.SetBackgroundColor(b)};Gwt.Gui.Item.prototype.Reset=function(){var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);a.SetAlpha(0);this.SetBackgroundColor(a)};Gwt.Gui.SelectDialogBox=function(){Gwt.Gui.Dialog.call(this);this.items=null;this.LayoutDialog=null;this.Container=null;this.InitSelectDialogBox()};Gwt.Gui.SelectDialogBox.prototype=new Gwt.Gui.Dialog();Gwt.Gui.SelectDialogBox.prototype.constructor=Gwt.Gui.SelectDialogBox;Gwt.Gui.SelectDialogBox.prototype.FinalizeSelectDialogBox=function(){this.LayoutDialog=null;this.Container=null;this.items=null;this.FinalizeDialog()};Gwt.Gui.SelectDialogBox.prototype.InitSelectDialogBox=function(){this.SetClassName("Gwt_Gui_Select_dialog_box");this.LayoutDialog=new Gwt.Gui.VBox(this.DialogBox,0);this.LayoutDialog.SetSize(this.DialogBox.GetWidth()*0.95,this.DialogBox.GetHeight()*0.95);var b=(this.DialogBox.GetHeight()-this.LayoutDialog.GetHeight())/2;var a=(this.DialogBox.GetWidth()-this.LayoutDialog.GetWidth())/2;this.LayoutDialog.SetPosition(b,a);this.Container=new Gwt.Gui.VBox(this.DialogBox,3);this.Container.AddEvent(Gwt.Gui.Event.Mouse.Wheel,this.EventScroll.bind(this));this.Container.SetSize(this.LayoutDialog.GetWidth(),0);this.DialogBox.Add(this.LayoutDialog);this.LayoutDialog.Add(this.Container)};Gwt.Gui.SelectDialogBox.prototype.AddItem=function(a){a.SetWidth(this.Container.GetWidth());this.Container.SetHeight(this.Container.GetHeight()+27);this.Container.Add(a);this.items++};Gwt.Gui.SelectDialogBox.prototype.EventScroll=function(f){var b=f.deltaY;var e=this.Container.GetPositionTop();var a=this.Container.GetPositionLeft();var g=this.Container.GetHeight()>this.LayoutDialog.GetHeight();var c=this.items-9;var d=0;if(c>0){d=-27*c}if(b<0&&g&&e<0){e+=27}else{if(b>0&&g&&e>d){e-=27}else{e=e}}this.Container.SetPosition(e,a)};Gwt.Gui.SelectBox=function(a,b){Gwt.Gui.Frame.call(this);this.StaticText=null;this.SelectDialogBox=null;this.Placeholder=null;this.Options=null;this.Text=null;this.Value=null;this.InitSelectBox(a,b)};Gwt.Gui.SelectBox.prototype=new Gwt.Gui.Frame();Gwt.Gui.SelectBox.prototype.constructor=Gwt.Gui.SelectBox;Gwt.Gui.SelectBox.prototype.FinalizeSelectBox=function(){this.StaticText=null;this.SelectDialogBox=null;this.Placeholder=null;this.Options=null;this.FinalizeFrame()};Gwt.Gui.SelectBox.prototype.InitSelectBox=function(a,b){this.SetClassName("Gwt_Gui_Select_box");this.SetExpand(true);this.AddEvent(Gwt.Gui.Event.Mouse.Click,this.ShowDialog.bind(this));this.AddEvent(Gwt.Gui.Event.Keyboard.KeyPress,this.ShowDialog.bind(this));this.Placeholder=a;this.StaticText=new Gwt.Gui.StaticText(this.Placeholder);this.Add(this.StaticText);this.Options=[];this.Options[0]=new Gwt.Gui.Item(this.Placeholder,"");this.Options[0].AddEvent(Gwt.Gui.Event.Mouse.Click,this.SetValue.bind(this,Event,this.Placeholder,""));this.Options[0].SetBackgroundImage(Gwt.Core.Contrib.Images+"check_item.svg");this.Options[0].SetBackgroundRepeat(Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);this.Options[0].SetBackgroundPosition(Gwt.Gui.Contrib.BackgroundPosition.Right,Gwt.Gui.Contrib.BackgroundPosition.Center);for(var c=0;c<b.length;c++){this.Options[c+1]=new Gwt.Gui.Item(b[c].text,b[c].value);this.Options[c+1].AddEvent(Gwt.Gui.Event.Mouse.Click,this.SetValue.bind(this,Event,b[c].text,b[c].value))}};Gwt.Gui.SelectBox.prototype.ShowDialog=function(c){if(c.type==Gwt.Gui.Event.Keyboard.KeyPress){if(c.keyCode==Gwt.Gui.Event.Keyboard.KeyCodes.Enter){this.SelectDialogBox=new Gwt.Gui.SelectDialogBox();for(var b=0;b<this.Options.length;b++){this.Options[b].Reset();this.SelectDialogBox.AddItem(this.Options[b])}this.SelectDialogBox.Open()}}if(c.type==Gwt.Gui.Event.Mouse.Click){this.SelectDialogBox=new Gwt.Gui.SelectDialogBox();for(var a=0;a<this.Options.length;a++){this.Options[a].Reset();this.SelectDialogBox.AddItem(this.Options[a])}this.SelectDialogBox.Open()}};Gwt.Gui.SelectBox.prototype.SetText=function(a){this.Text=a;this.StaticText.SetText(this.Text)};Gwt.Gui.SelectBox.prototype.SetValue=function(a,d,b){this.SetText(d);this.Value=b;for(var c=0;c<this.Options.length;c++){if(this.Options[c].GetValue()==this.Value){this.Options[c].SetBackgroundImage(Gwt.Core.Contrib.Images+"check_item.svg");this.Options[c].SetBackgroundRepeat(Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);this.Options[c].SetBackgroundPosition(Gwt.Gui.Contrib.BackgroundPosition.Right,Gwt.Gui.Contrib.BackgroundPosition.Center)}else{this.Options[c].SetBackgroundImage("")}}};Gwt.Gui.StaticText=function(a){Gwt.Gui.Frame.call(this);this.Text=null;this.InitStaticText(a)};Gwt.Gui.StaticText.prototype=new Gwt.Gui.Frame();Gwt.Gui.StaticText.prototype.constructor=Gwt.Gui.StaticText;Gwt.Gui.StaticText.prototype.FinalizeStaticText=function(){this.FinalizeFrame()};Gwt.Gui.StaticText.prototype.InitStaticText=function(a){this.SetClassName("Gwt_Gui_Static_Text");this.Text=a||"Default Text";this.SetText(this.Text);this.SetFontSize(11);this.SetColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure));this.SetCursor(Gwt.Gui.Contrib.Cursor.Default);this.SetSelectable(Gwt.Gui.Contrib.UserSelect.None);this.SetOverflow(Gwt.Gui.Contrib.Overflow.Hidden)};Gwt.Gui.StaticText.prototype.SetText=function(a){this.Text=a;this.Html.textContent=this.Text};Gwt.Gui.StaticText.prototype.TextAlign=function(a){if(a=="left"||a=="center"||a=="right"||a=="justify"){this.Html.style.textAlign=a}else{console.log("Align invalid")}};Gwt.Gui.StaticText.prototype.GetText=function(){return this.Html.value};Gwt.Gui.StaticText.prototype.GetLength=function(){return this.Text.length};Gwt.Gui.StaticText.prototype.Reset=function(){this.SetText("Default Text")};Gwt.Gui.VBox=function(a,b){Gwt.Gui.Frame.call(this);this.Childs=null;this.MarginElements=null;this.Alignment=null;this.init_vbox(b)};Gwt.Gui.VBox.prototype=new Gwt.Gui.Frame();Gwt.Gui.VBox.prototype.constructor=Gwt.Gui.VBox;Gwt.Gui.VBox.prototype.finalize_vbox=function(){this.Childs=null;this.MarginElements=null;this.Alignment=null;this.FinalizeFrame()};Gwt.Gui.VBox.prototype.init_vbox=function(a){this.SetClassName("Gwt_Gui_VBox");this.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);this.SetAlignment(Gwt.Gui.ALIGN_LEFT);this.Childs=[];this.MarginElements=typeof(a)=="undefined"?12:a};Gwt.Gui.VBox.prototype.GetChilds=function(){return this.Childs};Gwt.Gui.VBox.prototype.GetMarginElements=function(){return this.MarginElements};Gwt.Gui.VBox.prototype.Add=function(b){this.GetChilds().push(b);this.GetHtml().appendChild(b.GetHtml());if(b.GetClassName()=="Gwt_Gui_HBox"){var a=[];for(var d=0;d<this.GetChilds().length;d++){if(this.GetChilds()[d].GetClassName()=="Gwt_Gui_HBox"){a.push(this.GetChilds()[d])}}for(var c=0;c<a.length;c++){a[c].SetWidth(this.GetWidth());a[c].SetHeight(this.GetHeight()/a.length)}}else{b.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);if(b.GetHtml()==this.GetHtml().firstChild){b.SetMargin(0)}else{if(b.GetHtml()==this.GetHtml().lastChild){b.SetMarginTop(this.GetMarginElements())}}if(b.IsExpand()){b.SetWidth(this.GetWidth()*0.99)}if(!b.IsExpand()){switch(this.GetAlignment()){case Gwt.Gui.ALIGN_LEFT:b.SetMarginLeft(0);break;case Gwt.Gui.ALIGN_CENTER:b.SetMarginLeft((this.GetWidth()-b.GetWidth())/2);break;case Gwt.Gui.ALIGN_RIGHT:b.SetMarginLeft(this.GetWidth()-b.GetWidth());break;default:console.log("imposible set alignment in vbox.");break}}}};Gwt.Gui.VBox.prototype.SetAlignment=function(a){switch(a){case Gwt.Gui.ALIGN_CENTER:this.Alignment=Gwt.Gui.ALIGN_CENTER;break;case Gwt.Gui.ALIGN_LEFT:this.Alignment=Gwt.Gui.ALIGN_LEFT;break;case Gwt.Gui.ALIGN_RIGHT:this.Alignment=Gwt.Gui.ALIGN_RIGHT;break;default:console.log("Alignment not valid in vbox.");break}};Gwt.Gui.VBox.prototype.GetAlignment=function(){return this.Alignment};Gwt.Gui.Slider=function(a){Gwt.Gui.Frame.call(this);this.Slots=null;this.Panel=null;this.ArrowLeft=null;this.ArrowRight=null;this.Viewer=null;this.Slide=null;this.InitSlider(a)};Gwt.Gui.Slider.prototype=new Gwt.Gui.Frame();Gwt.Gui.Slider.prototype.constructor=Gwt.Gui.Slider;Gwt.Gui.Slider.prototype.FinalizeSlider=function(a){this.Slots=null;this.Panel=null;this.ArrowLeft=null;this.ArrowRight=null;this.Viewer=null;this.Slide=null;this.FinalizeFrame()};Gwt.Gui.Slider.prototype.InitSlider=function(a){this.SetClassName("Gwt_Gui_Slider");this.Slots=new Array(typeof(a)=="undefined"?1:a);this.Panel=new Gwt.Gui.Frame();this.ArrowLeft=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"arrow-left.svg","");this.ArrowLeft.SetWidth(24);this.ArrowLeft.AddEvent(Gwt.Gui.Event.Mouse.Click,this.SlideRight.bind(this));this.ArrowRight=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"arrow-right.svg","");this.ArrowRight.SetWidth(24);this.ArrowRight.AddEvent(Gwt.Gui.Event.Mouse.Click,this.SlideLeft.bind(this));this.Viewer=new Gwt.Gui.Frame();this.Slide=new Gwt.Gui.HBox();this._Add(this.Viewer);this._Add(this.Panel)};Gwt.Gui.Slider.prototype.GetSlots=function(){return this.Slots};Gwt.Gui.Slider.prototype._Add=function(a){a.Parent=this;this.Add(a)};Gwt.Gui.Slider.prototype.Setup=function(){this.Panel.SetSize(this.GetWidth(),28);this.Viewer.SetSize(this.GetWidth(),(this.GetHeight()-28));var e=new Gwt.Gui.HBox();var d=new Gwt.Gui.VBox();var c=new Gwt.Gui.VBox();e.SetSize(this.Panel.GetWidth(),28);d.SetHeight(28);c.SetHeight(28);c.SetAlignment(Gwt.Gui.ALIGN_RIGHT);e.Add(d);e.Add(c);this.Panel.Add(e);d.Add(this.ArrowLeft);c.Add(this.ArrowRight);this.Slide.SetSize(this.Viewer.GetWidth()*this.GetSlots().length,this.Viewer.GetHeight());this.Viewer.Add(this.Slide);for(var b=0;b<this.GetSlots().length;b++){var a=new Gwt.Gui.VBox();this.GetSlots()[b]=a}for(var b=0;b<this.GetSlots().length;b++){this.Slide.Add(this.GetSlots()[b])}};Gwt.Gui.Slider.prototype.SlideLeft=function(){if(-this.Slide.GetPositionLeft()<(this.GetSlots().length-1)*this.Viewer.GetWidth()){this.Slide.SetPosition(0,this.Slide.GetPositionLeft()-this.Viewer.GetWidth())}};Gwt.Gui.Slider.prototype.SlideRight=function(){if(this.Slide.GetPositionLeft()<0&&this.Slide.GetPositionLeft()<(this.GetSlots().length-1)*this.Viewer.GetWidth()){this.Slide.SetPosition(0,this.Slide.GetPositionLeft()+this.Viewer.GetWidth())}};Gwt.Gui.Slider.prototype.AddSlotWidget=function(b,a){this.GetSlots()[b].Add(a)};Gwt.Gui.Clock=function(){Gwt.Gui.Frame.call(this);this.resource=null;this.seconds=null;this.minutes=null;this.hours=null;this.seconds_bar=null;this.minutes_bar=null;this.hours_bar=null;this.center=null;this.seconds_interval=null;this.InitClock()};Gwt.Gui.Clock.prototype=new Gwt.Gui.Frame();Gwt.Gui.Clock.prototype.constructor=Gwt.Gui.Clock;Gwt.Gui.Clock.prototype.FinalizeClock=function(){this.resource=null;this.seconds=null;this.minutes=null;this.hours=null;this.seconds_bar=null;this.minutes_bar=null;this.hours_bar=null;this.center=null;this.seconds_interval=null;this.FinalizeFrame()};Gwt.Gui.Clock.prototype.InitClock=function(){this.SetClassName("Gwt_Gui_Clock");this.SetSize(200,200);this.resource=new XMLHttpRequest();this.resource.open("GET",Gwt.Core.Contrib.Images+"clock.svg",true);this.resource.overrideMimeType("image/svg+xml");this.resource.onreadystatechange=this.Ready.bind(this);this.resource.send("")};Gwt.Gui.Clock.prototype.Ready=function(){if(this.resource.readyState==4&&this.resource.status==200){this.Html.appendChild(this.resource.responseXML.documentElement);var a=new Date();this.seconds=a.getSeconds();this.minutes=a.getMinutes();this.hours=a.getHours();this.seconds_bar=this.Html.firstChild.getElementById("seconds");this.minutes_bar=this.Html.firstChild.getElementById("minutes");this.hours_bar=this.Html.firstChild.getElementById("hours");this.center={x:this.Html.firstChild.getAttribute("width")/2,y:this.Html.firstChild.getAttribute("height")/2};this.seconds_bar.setAttribute("transform","rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");this.seconds_interval=setInterval(this.UpdateSeconds.bind(this),1000);this.minutes_bar.setAttribute("transform","rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");this.hours_bar.setAttribute("transform","rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")")}};Gwt.Gui.Clock.prototype.UpdateSeconds=function(){this.seconds+=1;this.seconds_bar.setAttribute("transform","rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");if(this.seconds==60){this.seconds=0;this.UpdateMinutes()}};Gwt.Gui.Clock.prototype.UpdateMinutes=function(){this.minutes+=1;this.minutes_bar.setAttribute("transform","rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");if(this.minutes==60){this.minutes=0;this.UpdateHours()}};Gwt.Gui.Clock.prototype.UpdateHours=function(){this.hours+=1;this.hours_bar.setAttribute("transform","rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");if(this.hours==24){this.hours=0}};Gwt.Gui.ButtonSvUpDl=function(){Gwt.Gui.Button.call(this,Gwt.Core.Contrib.Images+"appbar.cabinet.in.svg","Guardar");this.Update=null;this.InitButtonSvUpDl()};Gwt.Gui.ButtonSvUpDl.prototype=new Gwt.Gui.Button();Gwt.Gui.ButtonSvUpDl.prototype.constructor=Gwt.Gui.ButtonSvUpDl;Gwt.Gui.ButtonSvUpDl.prototype.FinalizeButtonSvUpDl=function(){this.Update=null;this.FinalizeButton()};Gwt.Gui.ButtonSvUpDl.prototype.InitButtonSvUpDl=function(){this.SetWidth(90);this.SetText("Guardar");this.AddEvent(Gwt.Gui.Event.Mouse.Mousemove,this.CtrlSvUpDl.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.Mouseout,this.CtrlReset.bind(this));this.Update=false};Gwt.Gui.ButtonSvUpDl.prototype.CtrlSvUpDl=function(a){if(!this.Update){this.SetImage(Gwt.Core.Contrib.Images+"icons/list-add.svg");this.SetWidth(85);this.SetText("Guardar")}else{if(this.Update&&!a.ctrlKey){this.SetImage(Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");this.SetWidth(100);this.SetText("Actualizar")}else{if(this.Update&&a.ctrlKey){this.SetImage(Gwt.Core.Contrib.Images+"icons/application-exit.svg");this.SetWidth(90);this.SetText("Eliminar")}}}};Gwt.Gui.ButtonSvUpDl.prototype.CtrlReset=function(a){if(!this.Update){this.SetImage(Gwt.Core.Contrib.Images+"icons/list-add.svg");this.SetWidth(85);this.SetText("Guardar")}else{this.SetImage(Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");this.SetWidth(100);this.SetText("Actualizar")}};Gwt.Gui.ButtonSvUpDl.prototype.set_update=function(a){this.Update=a;if(this.Update){this.SetImage(Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");this.SetWidth(100);this.SetText("Actualizar")}else{this.SetImage(Gwt.Core.Contrib.Images+"icons/list-add.svg");this.SetWidth(85);this.SetText("Guardar")}};Gwt.Gui.ButtonOnOff=function(){Gwt.Gui.Frame.call(this);this.Graphic=null;this.InitButtonOnOff();this.Status=0};Gwt.Gui.ButtonOnOff.prototype=new Gwt.Gui.Frame();Gwt.Gui.ButtonOnOff.prototype.constructor=Gwt.Gui.ButtonOnOff;Gwt.Gui.ButtonOnOff.prototype.FinalizeButtonOnOff=function(){this.Graphic=null;this.FinalizeFrame()};Gwt.Gui.ButtonOnOff.prototype.InitButtonOnOff=function(){this.SetClassName("Gwt_Gui_Button_on_off");this.SetSize(48,24);this.SetBorder(1);this.SetOutLine(Gwt.Gui.Contrib.OutLine.None);var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);a.SetAlpha(0.5);this.SetBorderColor(a);var b=new Gwt.Gui.Contrib.Color(25,25,25);b.SetAlpha(0.25);this.SetBackgroundColor(b);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetBorderRadius(24);this.Graphic=new Gwt.Graphic.Svg.Canvas();this.Graphic.SetSize(24,24);this.Graphic.SetViewBox(0,0,this.Graphic.GetWidth(),this.Graphic.GetHeight());this.Circle=new Gwt.Graphic.Svg.Circle();this.Circle.SetFill("Azure");this.Circle.SetCx(12);this.Circle.SetCy(12);this.Text=new Gwt.Gui.StaticText(Text);this.Text.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);this.Text.SetValign(Gwt.Gui.Contrib.Valign.Middle);this.AddEvent(Gwt.Gui.Event.Mouse.Click,this.Click.bind(this));this.Graphic.Add(this.Circle);this.Circle.Add(this.Text);this.Add(this.Graphic)};Gwt.Gui.ButtonOnOff.prototype.SetText=function(){this.Text.SetText="Off";this.Text.SetWidth(this.GetWidth()*0.7)};Gwt.Gui.ButtonOnOff.prototype.SetFontSize=function(a){this.Text.SetFontSize(a);this.SetSize(this.Graphic.GetWidth()+this.Text.GetWidth(),24)};Gwt.Gui.ButtonOnOff.prototype.Click=function(){if(this.Status===0){this.Graphic.SetPosition(0,24);var a=new Gwt.Gui.Contrib.Color(0,102,255);a.SetAlpha(0.3);this.SetBackgroundColor(a);this.Status=1}else{this.Graphic.SetPosition(0,0);var a=new Gwt.Gui.Contrib.Color(25,25,25);a.SetAlpha(0.25);this.SetBackgroundColor(a);this.Status=0}};Gwt.Graphic=new Object();Gwt.Graphic.Svg=new Object();Gwt.Graphic.Svg.Contrib=new Object();Gwt.Graphic.Svg.Contrib.AspectRatio={XMinYMin:"xMimYMin",XMidYMid:"xMidYMid",XMaxYMax:"xMaxYMax",XMinYMid:"xMinYMid",XMidYMin:"xMidYMin",XMidYMax:"xMidYMax",XMaxYMid:"xMaxYMid",XMinYMax:"xMinYMax",XMaxYMin:"xMaxYMin"};Gwt.Graphic.Svg.Contrib.ZoomAndPan={Magnify:"magnify",Disable:"disable"};Gwt.Graphic.Svg.Contrib.StrokeLineCap={Butt:"butt",Round:"round",Square:"square"};Gwt.Graphic.Svg.Graphic=function(){this.Html=null;this.Width=null;this.Height=null;this.Fill=null;this.FillOpacity=null;this.Stroke=null;this.StrokeOpacity=null;this.StrokeWidth=null;this.StrokeLineCap=null;this.StrokeDashArray=null;this.InitGraphic()};Gwt.Graphic.Svg.Graphic.prototype.InitGraphic=function(){this.Html=document.createElement("svg");this.SetWidth(100);this.SetHeight(100)};Gwt.Graphic.Svg.Graphic.prototype.FinalizeGraphic=function(){this.Html=null;this.Width=null;this.Height=null};Gwt.Graphic.Svg.Graphic.prototype.Add=function(a){this.Html.appendChild(a.Html)};Gwt.Graphic.Svg.Graphic.prototype.SetWidth=function(a){this.Width=a;this.Html.setAttribute("width",this.Width+"px")};Gwt.Graphic.Svg.Graphic.prototype.GetWidth=function(){return this.Width};Gwt.Graphic.Svg.Graphic.prototype.SetHeight=function(a){this.Height=a;this.Html.setAttribute("height",this.Height+"px")};Gwt.Graphic.Svg.Graphic.prototype.GetHeight=function(){return this.Height};Gwt.Graphic.Svg.Graphic.prototype.SetSize=function(a,b){this.SetWidth(a);this.SetHeight(b)};Gwt.Graphic.Svg.Graphic.prototype.SetFill=function(a){this.Fill=a;this.Html.setAttribute("fill",this.Fill)};Gwt.Graphic.Svg.Graphic.prototype.SetFillOpacity=function(a){this.FillOpacity=a;this.Html.setAttribute("fill-opacity",this.FillOpacity)};Gwt.Graphic.Svg.Graphic.prototype.SetStroke=function(a){this.Stroke=a;this.Html.setAttribute("stroke",this.Stroke)};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeOpacity=function(a){this.StrokeOpacity=a;this.Html.setAttribute("stroke-opacity",this.StrokeOpacity)};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeWidth=function(a){this.StrokeWidth=a;this.Html.setAttribute("stroke-width",this.StrokeWidth+"px")};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeLineCap=function(a){this.StrokeLineCap=a;this.Html.setAttribute("stroke-linecap",this.StrokeLineCap)};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeDashArray=function(a){this.StrokeDashArray=a;this.Html.setAttribute("stroke-dasharray",this.StrokeDashArray)};Gwt.Graphic.Svg.Canvas=function(){Gwt.Gui.Frame.call(this);this.X=null;this.Y=null;this.ViewBoxMinX=null;this.ViewBoxMinY=null;this.ViewBoxWidth=null;this.ViewBoxHeight=null;this.PreserveAspectRatio=null;this.ZoomAndPan=null;this.Xmlns=null;this.XmlnsXlink=null;this.XmlSpace=null;this.InitCanvas()};Gwt.Graphic.Svg.Canvas.prototype=new Gwt.Gui.Frame();Gwt.Graphic.Svg.Canvas.prototype.constructor=Gwt.Graphic.Svg.Canvas;Gwt.Graphic.Svg.Canvas.prototype.InitCanvas=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","svg");this.SetX(0);this.SetY(0);this.SetWidth(100);this.SetHeight(100);this.SetViewBox(0,0,this.GetWidth(),this.GetHeight());this.SetPreserveAspectRatio(Gwt.Graphic.Svg.Contrib.AspectRatio.XMaxYMax);this.SetZoomAndPan(Gwt.Graphic.Svg.Contrib.ZoomAndPan.Disable);this.SetXmlns("http://www.w3.org/2000/svg","http://www.w3.org/1999/xlink","preserve");this.SetPositionType(Gwt.Gui.Contrib.PositionType.Relative)};Gwt.Graphic.Svg.Canvas.prototype.FinalizeCanvas=function(){this.FinalizeSvgGraphic();this.X=null;this.Y=null;this.ViewBoxMinX=null;this.ViewBoxMinY=null;this.ViewBoxWidth=null;this.ViewBoxHeight=null;this.PreserveAspectRatio=null;this.ZoomAndPan=null;this.Xmlns=null;this.XmlnsXlink=null;this.XmlSpace=null};Gwt.Graphic.Svg.Canvas.prototype.SetX=function(a){this.X=a;this.Html.setAttribute("x",this.X+"px")};Gwt.Graphic.Svg.Canvas.prototype.GetX=function(){return this.X};Gwt.Graphic.Svg.Canvas.prototype.SetY=function(a){this.Y=a;this.Html.setAttribute("Y",this.Y+"px")};Gwt.Graphic.Svg.Canvas.prototype.GetY=function(){return this.Y};Gwt.Graphic.Svg.Canvas.prototype.SetViewBox=function(c,b,a,d){this.ViewBoxMinX=c;this.ViewBoxMinY=b;this.ViewBoxWidth=a;this.ViewBoxHeight=d;this.Html.setAttribute("viewBox",this.ViewBoxMinX+", "+this.ViewBoxMinX+", "+this.ViewBoxWidth+", "+this.ViewBoxHeight)};Gwt.Graphic.Svg.Canvas.prototype.SetPreserveAspectRatio=function(a){this.PreserveAspectRatio=a;this.Html.setAttribute("preserveAspectRatio",this.PreserveAspectRatio)};Gwt.Graphic.Svg.Canvas.prototype.SetZoomAndPan=function(a){this.ZoomAndPan=a;this.Html.setAttribute("zoomAndPan",this.ZoomAndPan)};Gwt.Graphic.Svg.Canvas.prototype.SetXmlns=function(b,c,a){this.Xmlns=b;this.XmlnsXlink=c;this.XmlSpace=a;this.Html.setAttribute("xmlns",this.Xmlns);this.Html.setAttribute("xmlns:xlink",this.XmlnsXlink);this.Html.setAttribute("xml:space",this.XmlSpace)};Gwt.Graphic.Svg.Rect=function(){Gwt.Graphic.Svg.Graphic.call(this);this.X=null;this.Y=null;this.Rx=null;this.Ry=null;this.InitRect()};Gwt.Graphic.Svg.Rect.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Rect.prototype.constructor=Gwt.Graphic.Svg.Rect;Gwt.Graphic.Svg.Rect.prototype.InitRect=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","rect");this.SetX(0);this.SetY(0);this.SetSize(100,100)};Gwt.Graphic.Svg.Rect.prototype.SetX=function(a){this.X=a;this.Html.setAttribute("x",this.X+"px")};Gwt.Graphic.Svg.Rect.prototype.GetX=function(){return this.X};Gwt.Graphic.Svg.Rect.prototype.SetY=function(a){this.Y=a;this.Html.setAttribute("Y",this.Y+"px")};Gwt.Graphic.Svg.Rect.prototype.GetY=function(){return this.Y};Gwt.Graphic.Svg.Rect.prototype.SetRx=function(a){this.Rx=a;this.Html.setAttribute("rx",this.Rx+"px")};Gwt.Graphic.Svg.Rect.prototype.GetRx=function(){return this.Rx};Gwt.Graphic.Svg.Rect.prototype.SetRy=function(a){this.Ry=a;this.Html.setAttribute("ry",this.Ry+"px")};Gwt.Graphic.Svg.Rect.prototype.GetRy=function(){return this.Ry};Gwt.Graphic.Svg.Circle=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Cx=null;this.Cy=null;this.R=null;this.InitCircle()};Gwt.Graphic.Svg.Circle.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Circle.prototype.constructor=Gwt.Graphic.Svg.Circle;Gwt.Graphic.Svg.Circle.prototype.InitCircle=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","circle");this.SetCx(0);this.SetCy(0);this.SetR(10)};Gwt.Graphic.Svg.Circle.prototype.SetCx=function(a){this.Cx=a;this.Html.setAttribute("cx",this.Cx+"px")};Gwt.Graphic.Svg.Circle.prototype.GetCx=function(){return this.Cx};Gwt.Graphic.Svg.Circle.prototype.SetCy=function(a){this.Cy=a;this.Html.setAttribute("cy",this.Cy+"px")};Gwt.Graphic.Svg.Circle.prototype.GetCy=function(){return this.Cy};Gwt.Graphic.Svg.Circle.prototype.SetR=function(a){this.R=a;this.Html.setAttribute("r",this.R+"px")};Gwt.Graphic.Svg.Circle.prototype.GetR=function(){return this.R};Gwt.Graphic.Svg.Ellipse=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Cx=null;this.Cy=null;this.Rx=null;this.Ry=null;this.InitEllipse()};Gwt.Graphic.Svg.Ellipse.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Ellipse.prototype.constructor=Gwt.Graphic.Svg.Ellipse;Gwt.Graphic.Svg.Ellipse.prototype.InitEllipse=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","ellipse");this.SetCx(0);this.SetCy(0);this.SetRx(0);this.SetRy(0)};Gwt.Graphic.Svg.Ellipse.prototype.SetCx=function(a){this.Cx=a;this.Html.setAttribute("cx",this.Cx+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetCx=function(){return this.Cx};Gwt.Graphic.Svg.Ellipse.prototype.SetCy=function(a){this.Cy=a;this.Html.setAttribute("cy",this.Cy+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetCy=function(){return this.Cy};Gwt.Graphic.Svg.Ellipse.prototype.SetRx=function(a){this.Rx=a;this.Html.setAttribute("rx",this.Rx+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetRx=function(){return this.Rx};Gwt.Graphic.Svg.Ellipse.prototype.SetRy=function(a){this.Ry=a;this.Html.setAttribute("ry",this.Ry+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetRy=function(){return this.Ry};Gwt.Graphic.Svg.Line=function(){Gwt.Graphic.Svg.Graphic.call(this);this.X1=null;this.Y1=null;this.X2=null;this.Y2=null;this.InitLine()};Gwt.Graphic.Svg.Line.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Line.prototype.constructor=Gwt.Graphic.Svg.Line;Gwt.Graphic.Svg.Line.prototype.InitLine=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","line");this.SetP1(0,0);this.SetP2(10,10)};Gwt.Graphic.Svg.Line.prototype.SetX1=function(a){this.X1=a;this.Html.setAttribute("x1",this.X1+"px")};Gwt.Graphic.Svg.Line.prototype.GetX1=function(){return this.X1};Gwt.Graphic.Svg.Line.prototype.SetY1=function(a){this.Y1=a;this.Html.setAttribute("y1",this.Y1+"px")};Gwt.Graphic.Svg.Line.prototype.GetY1=function(){return this.Y1};Gwt.Graphic.Svg.Line.prototype.SetX2=function(a){this.X2=a;this.Html.setAttribute("x2",this.X2+"px")};Gwt.Graphic.Svg.Line.prototype.GetX2=function(){return this.X2};Gwt.Graphic.Svg.Line.prototype.SetY2=function(a){this.Y2=a;this.Html.setAttribute("y2",this.Y2+"px")};Gwt.Graphic.Svg.Line.prototype.GetY2=function(){return this.Y2};Gwt.Graphic.Svg.Line.prototype.SetP1=function(b,a){this.SetX1(b);this.SetY1(a)};Gwt.Graphic.Svg.Line.prototype.SetP2=function(b,a){this.SetX2(b);this.SetY2(a)};Gwt.Graphic.Svg.Polygon=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Points=null;this.FillRule=null;this.InitPolygon()};Gwt.Graphic.Svg.Polygon.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Polygon.prototype.constructor=Gwt.Graphic.Svg.Polygon;Gwt.Graphic.Svg.Polygon.prototype.InitPolygon=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","polygon")};Gwt.Graphic.Svg.Polygon.prototype.SetPoints=function(a){this.Points=a;this.Html.setAttribute("points",this.Points)};Gwt.Graphic.Svg.Polygon.prototype.GetPoints=function(){return this.Points};Gwt.Graphic.Svg.Polygon.prototype.SetFillRule=function(a){this.FillRule=a;this.Html.setAttribute("fill-rule",this.FillRule)};Gwt.Graphic.Svg.Polyline=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Points=null;this.InitPolygon()};Gwt.Graphic.Svg.Polyline.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Polyline.prototype.constructor=Gwt.Graphic.Svg.Polyline;Gwt.Graphic.Svg.Polyline.prototype.InitPolyline=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","polyline")};Gwt.Graphic.Svg.Polyline.prototype.SetPoints=function(a){this.Points=a;this.Html.setAttribute("points",this.Points)};Gwt.Graphic.Svg.Polyline.prototype.GetPoints=function(){return this.Points};Gwt.Graphic.Svg.Path=function(){Gwt.Graphic.Svg.Graphic.call(this);this.D=null;this.M=null;this.L=null;this.H=null;this.V=null;this.C=null;this.S=null;this.Q=null;this.T=null;this.A=null;this.Z=null;this.InitPath()};Gwt.Graphic.Svg.Path.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Path.prototype.constructor=Gwt.Graphic.Svg.Path;Gwt.Graphic.Svg.Path.prototype.InitPath=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","path")};Gwt.Graphic.Svg.Path.prototype.SetD=function(a){this.D=a;this.Html.setAttribute("d",this.D)};Gwt.Graphic.Svg.Path.prototype.GetD=function(){return this.D};Gwt.Graphic.Svg.Path.prototype.SetM=function(a){this.M="M"+a};Gwt.Graphic.Svg.Path.prototype.GetM=function(){return this.M};Gwt.Graphic.Svg.Path.prototype.SetL=function(a){this.L="L"+a};Gwt.Graphic.Svg.Path.prototype.GetL=function(){return this.L};Gwt.Graphic.Svg.Path.prototype.SetH=function(a){this.H="H"+a};Gwt.Graphic.Svg.Path.prototype.GetH=function(){return this.H};Gwt.Graphic.Svg.Path.prototype.SetV=function(a){this.V="V"+a};Gwt.Graphic.Svg.Path.prototype.GetV=function(){return this.V};Gwt.Graphic.Svg.Path.prototype.SetC=function(a){this.C="C"+a};Gwt.Graphic.Svg.Path.prototype.GetC=function(){return this.C};Gwt.Graphic.Svg.Path.prototype.SetS=function(a){this.S="S"+a};Gwt.Graphic.Svg.Path.prototype.GetS=function(){return this.S};Gwt.Graphic.Svg.Path.prototype.SetQ=function(a){this.Q="Q"+a};Gwt.Graphic.Svg.Path.prototype.GetQ=function(){return this.Q};Gwt.Graphic.Svg.Path.prototype.SetT=function(a){this.T="T"+a};Gwt.Graphic.Svg.Path.prototype.GetT=function(){return this.T};Gwt.Graphic.Svg.Path.prototype.SetA=function(a){this.A="A"+a};Gwt.Graphic.Svg.Path.prototype.GetA=function(){return this.A};Gwt.Graphic.Svg.Path.prototype.SetZ=function(){this.Z="Z"};Gwt.Graphic.Svg.Path.prototype.UnsetZ=function(){this.A=""};Gwt.Graphic.Svg.Path.prototype.GetZ=function(){return this.Z};Gwt.Graphic.Svg.Arc=function(){Gwt.Graphic.Svg.Path.call(this);this.X1=null;this.Y1=null;this.X2=null;this.Y2=null;this.CenterX=null;this.CenterY=null;this.Radius=null;this.InitArc()};Gwt.Graphic.Svg.Arc.prototype=new Gwt.Graphic.Svg.Path();Gwt.Graphic.Svg.Arc.prototype.constructor=Gwt.Graphic.Svg.Arc;Gwt.Graphic.Svg.Arc.prototype.InitArc=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","path")};Gwt.Graphic.Svg.Arc.prototype.PolarToCartesian=function(d,c,b){var a=(b-90)*(Math.PI/180);return{x:(d+(this.Radius*Math.cos(a))),y:(c+(this.Radius*Math.sin(a)))}};Gwt.Graphic.Svg.Arc.prototype.DescribeArc=function(h,e,g,a,c){this.CenterX=h;this.CenterY=e;this.Radius=g;var f=this.PolarToCartesian(h,e,c);this.X1=f.x;this.Y1=f.y;var b=this.PolarToCartesian(h,e,a);this.X2=b.x;this.Y2=b.y;var d=c-a<=180?"0":"1";this.SetM([this.X1,this.Y1].join(" "));this.SetA([this.Radius,this.Radius,0,d,0,this.X2,this.Y2].join(" "));this.SetL([this.CenterX,this.CenterY].join(" "));this.SetZ();this.SetD([this.GetM(),this.GetA(),this.GetL(),this.GetZ()].join(" "))};window.addEventListener("load",init);function init(a){desktop.open();test.open()}function start_up_env(a){login.close();new Gwt.Core.Request("/backend/sys/",{action:"start_up_env",username:a},function(b){sessionStorage.setItem("session","active");sessionStorage.setItem("group",b.response.group);sessionStorage.setItem("user",b.response.user);start_session()})}function start_session(a){lancelot.open();document.onmousemove=renueve_session;document.onkeypress=renueve_session;if(typeof(session_env)!="undefined"){clearTimeout(session_env)}session_env=setTimeout(block_session,60000)}function block_session(){sessionStorage.setItem("session","block");lancelot.close();block.open();if(typeof(session_env)!="undefined"){clearTimeout(session_env)}session_env=setTimeout(close_session,60000)}function unlock_session(){clearTimeout(session_env);session_env=null;block.close();login.open()}function renueve_session(){if(sessionStorage.hasOwnProperty("session")){if(sessionStorage.getItem("session")!="block"){clearTimeout(session_env);session_env=setTimeout(block_session,60000)}}}function close_session(){clearTimeout(session_env);session_env=null;new Gwt.Core.Request("/backend/auth/",{action:"logout"},function(a){console.log(a)});sessionStorage.clear();block.close();login.open()};desktop=(function(){var a;function b(){Gwt.Gui.Frame.call(this);document.body.appendChild(this.Html);this.SetClassName("Gwt_Gui_Desktop");this.SetSize(Gwt.Gui.SCREEN_DEVICE_WIDTH,Gwt.Gui.SCREEN_DEVICE_HEIGHT);this.SetMargin(0);this.SetPadding(0);this.SetBackgroundImage(Gwt.Core.Contrib.Images+"dark1.jpeg");this.SetBackgroundAttachment(Gwt.Gui.Contrib.BackgroundAttachment.Fixed);this.SetBackgroundClip(Gwt.Gui.Contrib.BackgroundClip.ContentBox);this.SetBackgroundRepeat(Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat,Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);this.SetBackgroundSize(Gwt.Gui.Contrib.BackgroundSize.Cover);this.SetBorder(0)}b.prototype=new Gwt.Gui.Frame();b.prototype.constructor=b;b.prototype.Show=function(c){this.Add(c)};return new function(){this.open=function(){if(a==null){a=new b()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.show=function(c){a.Show(c)}}})();login=(function(){var a;function b(){Gwt.Gui.Window.call(this);this.SetSize(Gwt.Gui.SCREEN_DEVICE_WIDTH-50,Gwt.Gui.SCREEN_DEVICE_HEIGHT-50);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.imageLogin=new Gwt.Gui.Image(Gwt.Core.Contrib.Images+"connecting_world.svg");this.imageLogin.SetSize(500,350);this.imageLogin.SetPosition(180,170);this.imageLogin.SetPositionType(Gwt.Gui.Contrib.PositionType.Absolute);this.title_label=new Gwt.Gui.StaticText("Login");this.id_type_select=new Gwt.Gui.SelectBox("Tipo de Documento",[{text:"Tarjeta de Identidad",value:"T.I"},{text:"Cédula de Ciudadanía",value:"C.C"},{text:"Registro Civil",value:"R.C"},{text:"Cédula Extranjera",value:"C.E"},{text:"Pasaporte",value:"PS"},{text:"Libreta Militar",value:"L.M"},{text:"Registro de Defunción",value:"R.D"},{text:"Carnét de Salud",value:"C.S"},{text:"Registro Mercantil",value:"R.M"}]);this.username_entry=new Gwt.Gui.Entry("Número de Documento");this.username_entry.SetFocus();this.password_entry=new Gwt.Gui.Entry("Contraseña");this.password_entry.ChangeToPassword();this.password_entry.SetMaxLength(4);this.send_button=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"ArrowRight.svg","Entrar");this.send_button.SetWidth(80);this.send_button.AddEvent(Gwt.Gui.Event.Mouse.Click,this.send.bind(this));this.controls_container=new Gwt.Gui.VBox();this.controls_container.SetSize(180,170);this.controls_container.SetPosition(((this.GetHeight()*50)/100)-(this.controls_container.GetHeight()/2),(this.GetWidth()*70)/100);this.Add(this.imageLogin);this.Add(this.controls_container);this.controls_container.Add(this.title_label);this.controls_container.Add(this.id_type_select);this.controls_container.Add(this.username_entry);this.controls_container.Add(this.password_entry);this.controls_container.Add(this.send_button)}b.prototype=new Gwt.Gui.Window();b.prototype.constructor=b;b.prototype.send=function(){if(this.username_entry.GetText()!==""&&this.password_entry.GetText()!==""){var c=new jsSHA(this.password_entry.GetText(),"TEXT").getHash("SHA-256","HEX");new Gwt.Core.Request("/backend/auth/",{username:this.username_entry.GetText(),password:c},this.response.bind(this))}else{console.log("Datos vacíos")}};b.prototype.response=function(c){if(c.status=="success"){if(Boolean(Number(c.response))){start_up_env(this.username_entry.GetText())}}else{console.log(c)}};return new function(){this.open=function(){if(a===undefined){a=new b();a.Open()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.close=function(){if(a!==undefined){a.Close();a=undefined}}}})();block=(function(){var a;function b(){Gwt.Gui.Window.call(this);this.SetSize(250,300);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);var d=new Date();var e=["Dom","Lun","Mar","Mie","Jue","Vie","Sáb"];var c=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];this.clock=new Gwt.Gui.Clock();this.date=new Gwt.Gui.StaticText("%d, %m %n, %y".replace("%d",e[d.getDay()]).replace("%m",c[d.getMonth()]).replace("%n",d.getDate()).replace("%y",d.getFullYear()));this.date.SetWidth(180);this.date.TextAlign("center");this.unlock_button=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"document-decrypt.svg","Desbloquear");this.unlock_button.SetWidth(120);this.layout=new Gwt.Gui.VBox();this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);this.Add(this.layout);this.SetBorderSpacing(12);this.layout.Add(this.clock);this.layout.Add(this.date);this.layout.Add(this.unlock_button);this.unlock_button.AddEvent(Gwt.Gui.Event.Mouse.Click,this.unlock.bind(this))}b.prototype=new Gwt.Gui.Window();b.prototype.constructor=b;b.prototype.unlock=function(){unlock_session()};return new function(){this.open=function(){if(a===undefined){a=new b();a.Open()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.close=function(){if(a!==undefined){a.Close();a=undefined}}}})();test=(function(){var a;function b(){Gwt.Gui.Window.call(this);this.SetSize(256,256);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.file1=new Gwt.Gui.File();this.file1.AddEvent(Gwt.Gui.Event.Form.Change,this.send.bind(this));this.buttonoff=new Gwt.Gui.ButtonOnOff();this.buttonoff.SetPosition(25,25);this.Add(this.buttonoff)}b.prototype=new Gwt.Gui.Window();b.prototype.constructor=b;b.prototype.send=function(){var c=[{document:"1098671330",document_tsype:"c.c"}];new Gwt.Core.Request("/backend/insert_user/",this.response.bind(this),c)};b.prototype.response=function(c){console.log(c)};return new function(){this.open=function(){if(a===undefined){a=new b();a.Open()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.close=function(){if(a!==undefined){a.Close();a=undefined}}}})();cuentas=(function(){var b;function a(){Gwt.Gui.Window.call(this);this.SetSize(200,170);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.title_label=new Gwt.Gui.StaticText("Cuentas");this.code=new Gwt.Gui.Entry("Código");this.name=new Gwt.Gui.Entry("Nombre");this.save_button=new Gwt.Gui.ButtonSvUpDl();this.layout=new Gwt.Gui.VBox();this.Add(this.layout);this.SetBorderSpacing(12);this.layout.Add(this.title_label);this.layout.Add(this.code);this.layout.Add(this.name);this.layout.Add(this.save_button);this.update=false;this.id_update_delete=null}a.prototype=new Gwt.Gui.Window();a.prototype.constructor=a;return new function(){this.open=function(){if(b===undefined){b=new a();b.Open()}else{console.log("%app yet opened".replace("%app",b.__proto__.constructor.name))}};this.close=function(){if(b!==undefined){b.Close();b=undefined}}}})();
=======
;var saveAs=saveAs||(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(l){if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var m=l.document,i=function(){return l.URL||l.webkitURL||l},p=m.createElementNS("http://www.w3.org/1999/xhtml","a"),d="download" in p,q=function(s){var r=m.createEvent("MouseEvents");r.initMouseEvent("click",true,false,l,0,0,0,0,0,false,false,false,false,0,null);s.dispatchEvent(r)},g=l.webkitRequestFileSystem,n=l.requestFileSystem||g||l.mozRequestFileSystem,e=function(r){(l.setImmediate||l.setTimeout)(function(){throw r},0)},k="application/octet-stream",h=0,c=10,o=function(s){var r=function(){if(typeof s==="string"){i().revokeObjectURL(s)}else{s.remove()}};if(l.chrome){r()}else{setTimeout(r,c)}},j=function(s,r,v){r=[].concat(r);var u=r.length;while(u--){var w=s["on"+r[u]];if(typeof w==="function"){try{w.call(s,v||s)}catch(t){e(t)}}}},b=function(r,s){var t=this,z=r.type,C=false,v,u,y=function(){j(t,"writestart progress write writeend".split(" "))},B=function(){if(C||!v){v=i().createObjectURL(r)}if(u){u.location.href=v}else{var D=l.open(v,"_blank");if(D==undefined&&typeof safari!=="undefined"){l.location.href=v}}t.readyState=t.DONE;y();o(v)},x=function(D){return function(){if(t.readyState!==t.DONE){return D.apply(this,arguments)}}},w={create:true,exclusive:false},A;t.readyState=t.INIT;if(!s){s="download"}if(d){v=i().createObjectURL(r);p.href=v;p.download=s;q(p);t.readyState=t.DONE;y();o(v);return}if(l.chrome&&z&&z!==k){A=r.slice||r.webkitSlice;r=A.call(r,0,r.size,k);C=true}if(g&&s!=="download"){s+=".download"}if(z===k||g){u=l}if(!n){B();return}h+=r.size;n(l.TEMPORARY,h,x(function(D){D.root.getDirectory("saved",w,x(function(E){var F=function(){E.getFile(s,w,x(function(G){G.createWriter(x(function(H){H.onwriteend=function(I){u.location.href=G.toURL();t.readyState=t.DONE;j(t,"writeend",I);o(G)};H.onerror=function(){var I=H.error;if(I.code!==I.ABORT_ERR){B()}};"writestart progress write abort".split(" ").forEach(function(I){H["on"+I]=t["on"+I]});H.write(r);t.abort=function(){H.abort();t.readyState=t.DONE};t.readyState=t.WRITING}),B)}),B)};E.getFile(s,{create:false},x(function(G){G.remove();F()}),x(function(G){if(G.code===G.NOT_FOUND_ERR){F()}else{B()}}))}),B)}),B)},a=b.prototype,f=function(r,s){return new b(r,s)};a.abort=function(){var r=this;r.readyState=r.DONE;j(r,"abort")};a.readyState=a.INIT=0;a.WRITING=1;a.DONE=2;a.error=a.onwritestart=a.onprogress=a.onwrite=a.onabort=a.onerror=a.onwriteend=null;return f}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));if(typeof module!=="undefined"&&module!==null){module.exports=saveAs}else{if((typeof define!=="undefined"&&0)){define([],function(){return saveAs})}}void function(a,b){if(typeof module==="object"){module.exports=b()}else{if(0==="function"){define(b)}else{a.adler32cs=b()}}}(jsPDF,function(){var h=typeof ArrayBuffer==="function"&&typeof Uint8Array==="function";var d=null,a=(function(){if(!h){return function o(){return false}}try{var m=require("buffer");if(typeof m.Buffer==="function"){d=m.Buffer}}catch(n){}return function o(p){return p instanceof ArrayBuffer||d!==null&&p instanceof d}}());var b=(function(){if(d!==null){return function m(n){return new d(n,"utf8").toString("binary")}}else{return function m(n){return unescape(encodeURIComponent(n))}}}());var f=65521;var k=function k(r,n){var o=r&65535,m=r>>>16;for(var p=0,q=n.length;p<q;p++){o=(o+(n.charCodeAt(p)&255))%f;m=(m+o)%f}return(m<<16|o)>>>0};var l=function l(s,r){var o=s&65535,n=s>>>16;for(var p=0,q=r.length,m;p<q;p++){o=(o+r[p])%f;n=(n+o)%f}return(n<<16|o)>>>0};var g={};var c=g.Adler32=(function(){var u=function n(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(!isFinite(w=w==null?1:+w)){throw new Error("First arguments needs to be a finite number.")}this.checksum=w>>>0};var q=u.prototype={};q.constructor=u;u.from=function(w){w.prototype=q;return w}(function t(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(w==null){throw new Error("First argument needs to be a string.")}this.checksum=k(1,w.toString())});u.fromUtf8=function(w){w.prototype=q;return w}(function o(x){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(x==null){throw new Error("First argument needs to be a string.")}var w=b(x.toString());this.checksum=k(1,w)});if(h){u.fromBuffer=function(w){w.prototype=q;return w}(function v(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(!a(w)){throw new Error("First argument needs to be ArrayBuffer.")}var x=new Uint8Array(w);return this.checksum=l(1,x)})}q.update=function p(w){if(w==null){throw new Error("First argument needs to be a string.")}w=w.toString();return this.checksum=k(this.checksum,w)};q.updateUtf8=function m(x){if(x==null){throw new Error("First argument needs to be a string.")}var w=b(x.toString());return this.checksum=k(this.checksum,w)};if(h){q.updateBuffer=function s(w){if(!a(w)){throw new Error("First argument needs to be ArrayBuffer.")}var x=new Uint8Array(w);return this.checksum=l(this.checksum,x)}}q.clone=function r(){return new n(this.checksum)};return u}());g.from=function i(m){if(m==null){throw new Error("First argument needs to be a string.")}return k(1,m.toString())};g.fromUtf8=function e(n){if(n==null){throw new Error("First argument needs to be a string.")}var m=b(n.toString());return k(1,m)};if(h){g.fromBuffer=function j(m){if(!a(m)){throw new Error("First argument need to be ArrayBuffer.")}var n=new Uint8Array(m);return l(1,n)}}return g});var Deflater=(function(h){var ad=15;var b=30;var o=19;var k=29;var e=256;var f=(e+1+k);var g=(2*f+1);var c=256;var U=7;var A=16;var z=17;var D=18;var t=8*2;var x=-1;var M=1;var K=2;var a=0;var Y=0;var C=1;var q=3;var l=4;var u=0;var ac=1;var L=2;var af=-2;var n=-3;var N=-5;var W=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];function r(){var ah=this;function aj(aw){var ax=ah.dyn_tree;var av=ah.stat_desc.static_tree;var an=ah.stat_desc.extra_bits;var ak=ah.stat_desc.extra_base;var au=ah.stat_desc.max_length;var aq;var al,am;var at;var ap;var ar;var ao=0;for(at=0;at<=ad;at++){aw.bl_count[at]=0}ax[aw.heap[aw.heap_max]*2+1]=0;for(aq=aw.heap_max+1;aq<g;aq++){al=aw.heap[aq];at=ax[ax[al*2+1]*2+1]+1;if(at>au){at=au;ao++}ax[al*2+1]=at;if(al>ah.max_code){continue}aw.bl_count[at]++;ap=0;if(al>=ak){ap=an[al-ak]}ar=ax[al*2];aw.opt_len+=ar*(at+ap);if(av){aw.static_len+=ar*(av[al*2+1]+ap)}}if(ao===0){return}do{at=au-1;while(aw.bl_count[at]===0){at--}aw.bl_count[at]--;aw.bl_count[at+1]+=2;aw.bl_count[au]--;ao-=2}while(ao>0);for(at=au;at!==0;at--){al=aw.bl_count[at];while(al!==0){am=aw.heap[--aq];if(am>ah.max_code){continue}if(ax[am*2+1]!=at){aw.opt_len+=(at-ax[am*2+1])*ax[am*2];ax[am*2+1]=at}al--}}}function ai(am,ak){var al=0;do{al|=am&1;am>>>=1;al<<=1}while(--ak>0);return al>>>1}function ag(al,ar,am){var ao=[];var an=0;var ap;var aq;var ak;for(ap=1;ap<=ad;ap++){ao[ap]=an=((an+am[ap-1])<<1)}for(aq=0;aq<=ar;aq++){ak=al[aq*2+1];if(ak===0){continue}al[aq*2]=ai(ao[ak]++,ak)}}ah.build_tree=function(an){var al=ah.dyn_tree;var ap=ah.stat_desc.static_tree;var am=ah.stat_desc.elems;var ar,ak;var aq=-1;var ao;an.heap_len=0;an.heap_max=g;for(ar=0;ar<am;ar++){if(al[ar*2]!==0){an.heap[++an.heap_len]=aq=ar;an.depth[ar]=0}else{al[ar*2+1]=0}}while(an.heap_len<2){ao=an.heap[++an.heap_len]=aq<2?++aq:0;al[ao*2]=1;an.depth[ao]=0;an.opt_len--;if(ap){an.static_len-=ap[ao*2+1]}}ah.max_code=aq;for(ar=Math.floor(an.heap_len/2);ar>=1;ar--){an.pqdownheap(al,ar)}ao=am;do{ar=an.heap[1];an.heap[1]=an.heap[an.heap_len--];an.pqdownheap(al,1);ak=an.heap[1];an.heap[--an.heap_max]=ar;an.heap[--an.heap_max]=ak;al[ao*2]=(al[ar*2]+al[ak*2]);an.depth[ao]=Math.max(an.depth[ar],an.depth[ak])+1;al[ar*2+1]=al[ak*2+1]=ao;an.heap[1]=ao++;an.pqdownheap(al,1)}while(an.heap_len>=2);an.heap[--an.heap_max]=an.heap[1];aj(an);ag(al,ah.max_code,an.bl_count)}}r._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28];r.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0];r.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576];r.d_code=function(ag){return((ag)<256?W[ag]:W[256+((ag)>>>7)])};r.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];r.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];r.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];r.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function Z(aj,ai,ah,ag,al){var ak=this;ak.static_tree=aj;ak.extra_bits=ai;ak.extra_base=ah;ak.elems=ag;ak.max_length=al}Z.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8];Z.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5];Z.static_l_desc=new Z(Z.static_ltree,r.extra_lbits,e+1,f,ad);Z.static_d_desc=new Z(Z.static_dtree,r.extra_dbits,0,b,ad);Z.static_bl_desc=new Z(null,r.extra_blbits,0,o,U);var X=9;var V=8;function m(ag,al,ah,ak,aj){var ai=this;ai.good_length=ag;ai.max_lazy=al;ai.nice_length=ah;ai.max_chain=ak;ai.func=aj}var F=0;var p=1;var H=2;var d=[new m(0,0,0,0,F),new m(4,4,8,4,p),new m(4,5,16,8,p),new m(4,6,32,32,p),new m(4,4,16,16,H),new m(8,16,32,32,H),new m(8,16,128,128,H),new m(8,32,128,256,H),new m(32,128,258,1024,H),new m(32,258,258,4096,H)];var s=["need dictionary","stream end","","","stream error","data error","","buffer error","",""];var I=0;var T=1;var E=2;var j=3;var i=32;var y=42;var S=113;var Q=666;var R=8;var O=0;var ab=1;var B=2;var ae=3;var w=258;var v=(w+ae+1);function P(ai,al,ah,ak){var aj=ai[al*2];var ag=ai[ah*2];return(aj<ag||(aj==ag&&ak[al]<=ak[ah]))}function G(){var aT=this;var aI;var aR;var ba;var aA;var am;var an;var aZ;var aD;var bl;var ag;var aN;var aH;var a1;var ax;var a8;var aP;var bq;var bp;var bg;var aO;var at;var br;var aU;var aK;var aj;var az;var a3;var a9;var ah;var ao;var ay;var bd;var aF;var al;var aB=new r();var bo=new r();var bf=new r();aT.depth=[];var a2;var bi;var a6;var ak;var av;var a7;var aQ;var au;aT.bl_count=[];aT.heap=[];bd=[];aF=[];al=[];function aV(){var bs;ag=2*an;aH[ax-1]=0;for(bs=0;bs<ax-1;bs++){aH[bs]=0}a3=d[a9].max_lazy;ao=d[a9].good_length;ay=d[a9].nice_length;az=d[a9].max_chain;br=0;bp=0;aK=0;bg=aj=ae-1;at=0;a1=0}function aW(){var bs;for(bs=0;bs<f;bs++){bd[bs*2]=0}for(bs=0;bs<b;bs++){aF[bs*2]=0}for(bs=0;bs<o;bs++){al[bs*2]=0}bd[c*2]=1;aT.opt_len=aT.static_len=0;a6=av=0}function bj(){aB.dyn_tree=bd;aB.stat_desc=Z.static_l_desc;bo.dyn_tree=aF;bo.stat_desc=Z.static_d_desc;bf.dyn_tree=al;bf.stat_desc=Z.static_bl_desc;aQ=0;au=0;a7=8;aW()}aT.pqdownheap=function(bs,bu){var bw=aT.heap;var bt=bw[bu];var bv=bu<<1;while(bv<=aT.heap_len){if(bv<aT.heap_len&&P(bs,bw[bv+1],bw[bv],aT.depth)){bv++}if(P(bs,bt,bw[bv],aT.depth)){break}bw[bu]=bw[bv];bu=bv;bv<<=1}bw[bu]=bt};function a4(bA,bz){var bt;var bx=-1;var bs;var bv=bA[0*2+1];var bw=0;var bu=7;var by=4;if(bv===0){bu=138;by=3}bA[(bz+1)*2+1]=65535;for(bt=0;bt<=bz;bt++){bs=bv;bv=bA[(bt+1)*2+1];if(++bw<bu&&bs==bv){continue}else{if(bw<by){al[bs*2]+=bw}else{if(bs!==0){if(bs!=bx){al[bs*2]++}al[A*2]++}else{if(bw<=10){al[z*2]++}else{al[D*2]++}}}}bw=0;bx=bs;if(bv===0){bu=138;by=3}else{if(bs==bv){bu=6;by=3}else{bu=7;by=4}}}}function aL(){var bs;a4(bd,aB.max_code);a4(aF,bo.max_code);bf.build_tree(aT);for(bs=o-1;bs>=3;bs--){if(al[r.bl_order[bs]*2+1]!==0){break}}aT.opt_len+=3*(bs+1)+5+5+4;return bs}function ai(bs){aT.pending_buf[aT.pending++]=bs}function bb(bs){ai(bs&255);ai((bs>>>8)&255)}function aJ(bs){ai((bs>>8)&255);ai((bs&255)&255)}function bk(bu,bt){var bv,bs=bt;if(au>t-bs){bv=bu;aQ|=((bv<<au)&65535);bb(aQ);aQ=bv>>>(t-au);au+=bs-t}else{aQ|=(((bu)<<au)&65535);au+=bs}}function aS(bu,bs){var bt=bu*2;bk(bs[bt]&65535,bs[bt+1]&65535)}function a5(bA,bz){var bt;var bx=-1;var bs;var bv=bA[0*2+1];var bw=0;var bu=7;var by=4;if(bv===0){bu=138;by=3}for(bt=0;bt<=bz;bt++){bs=bv;bv=bA[(bt+1)*2+1];if(++bw<bu&&bs==bv){continue}else{if(bw<by){do{aS(bs,al)}while(--bw!==0)}else{if(bs!==0){if(bs!=bx){aS(bs,al);bw--}aS(A,al);bk(bw-3,2)}else{if(bw<=10){aS(z,al);bk(bw-3,3)}else{aS(D,al);bk(bw-11,7)}}}}bw=0;bx=bs;if(bv===0){bu=138;by=3}else{if(bs==bv){bu=6;by=3}else{bu=7;by=4}}}}function bh(bt,bs,bu){var bv;bk(bt-257,5);bk(bs-1,5);bk(bu-4,4);for(bv=0;bv<bu;bv++){bk(al[r.bl_order[bv]*2+1],3)}a5(bd,bt-1);a5(aF,bs-1)}function a0(){if(au==16){bb(aQ);aQ=0;au=0}else{if(au>=8){ai(aQ&255);aQ>>>=8;au-=8}}}function ar(){bk(ab<<1,3);aS(c,Z.static_ltree);a0();if(1+a7+10-au<9){bk(ab<<1,3);aS(c,Z.static_ltree);a0()}a7=7}function aG(bw,bu){var bs,bv,bt;aT.pending_buf[ak+a6*2]=(bw>>>8)&255;aT.pending_buf[ak+a6*2+1]=bw&255;aT.pending_buf[a2+a6]=bu&255;a6++;if(bw===0){bd[bu*2]++}else{av++;bw--;bd[(r._length_code[bu]+e+1)*2]++;aF[r.d_code(bw)*2]++}if((a6&8191)===0&&a9>2){bs=a6*8;bv=br-bp;for(bt=0;bt<b;bt++){bs+=aF[bt*2]*(5+r.extra_dbits[bt])}bs>>>=3;if((av<Math.floor(a6/2))&&bs<Math.floor(bv/2)){return true}}return(a6==bi-1)}function aY(by,bv){var bx;var bu;var bw=0;var bt;var bs;if(a6!==0){do{bx=((aT.pending_buf[ak+bw*2]<<8)&65280)|(aT.pending_buf[ak+bw*2+1]&255);bu=(aT.pending_buf[a2+bw])&255;bw++;if(bx===0){aS(bu,by)}else{bt=r._length_code[bu];aS(bt+e+1,by);bs=r.extra_lbits[bt];if(bs!==0){bu-=r.base_length[bt];bk(bu,bs)}bx--;bt=r.d_code(bx);aS(bt,bv);bs=r.extra_dbits[bt];if(bs!==0){bx-=r.base_dist[bt];bk(bx,bs)}}}while(bw<a6)}aS(c,by);a7=by[c*2+1]}function bm(){if(au>8){bb(aQ)}else{if(au>0){ai(aQ&255)}}aQ=0;au=0}function aw(bt,bs,bu){bm();a7=8;if(bu){bb(bs);bb(~bs)}aT.pending_buf.set(bl.subarray(bt,bt+bs),aT.pending);aT.pending+=bs}function aM(bt,bu,bs){bk((O<<1)+(bs?1:0),3);aw(bt,bu,true)}function aE(bv,bx,bs){var bu,bt;var bw=0;if(a9>0){aB.build_tree(aT);bo.build_tree(aT);bw=aL();bu=(aT.opt_len+3+7)>>>3;bt=(aT.static_len+3+7)>>>3;if(bt<=bu){bu=bt}}else{bu=bt=bx+5}if((bx+4<=bu)&&bv!=-1){aM(bv,bx,bs)}else{if(bt==bu){bk((ab<<1)+(bs?1:0),3);aY(Z.static_ltree,Z.static_dtree)}else{bk((B<<1)+(bs?1:0),3);bh(aB.max_code+1,bo.max_code+1,bw+1);aY(bd,aF)}}aW();if(bs){bm()}}function ap(bs){aE(bp>=0?bp:-1,br-bp,bs);bp=br;aI.flush_pending()}function be(){var bv,bs;var bu;var bt;do{bt=(ag-aK-br);if(bt===0&&br===0&&aK===0){bt=an}else{if(bt==-1){bt--}else{if(br>=an+an-v){bl.set(bl.subarray(an,an+an),0);aU-=an;br-=an;bp-=an;bv=ax;bu=bv;do{bs=(aH[--bu]&65535);aH[bu]=(bs>=an?bs-an:0)}while(--bv!==0);bv=an;bu=bv;do{bs=(aN[--bu]&65535);aN[bu]=(bs>=an?bs-an:0)}while(--bv!==0);bt+=an}}}if(aI.avail_in===0){return}bv=aI.read_buf(bl,br+aK,bt);aK+=bv;if(aK>=ae){a1=bl[br]&255;a1=(((a1)<<bq)^(bl[br+1]&255))&aP}}while(aK<v&&aI.avail_in!==0)}function aX(bs){var bu=65535;var bt;if(bu>ba-5){bu=ba-5}while(true){if(aK<=1){be();if(aK===0&&bs==Y){return I}if(aK===0){break}}br+=aK;aK=0;bt=bp+bu;if(br===0||br>=bt){aK=(br-bt);br=bt;ap(false);if(aI.avail_out===0){return I}}if(br-bp>=an-v){ap(false);if(aI.avail_out===0){return I}}}ap(bs==l);if(aI.avail_out===0){return(bs==l)?E:I}return bs==l?j:T}function bn(bv){var by=az;var bD=br;var bw;var bx;var bs=aj;var bt=br>(an-v)?br-(an-v):0;var bu=ay;var bz=aD;var bB=br+w;var bC=bl[bD+bs-1];var bA=bl[bD+bs];if(aj>=ao){by>>=2}if(bu>aK){bu=aK}do{bw=bv;if(bl[bw+bs]!=bA||bl[bw+bs-1]!=bC||bl[bw]!=bl[bD]||bl[++bw]!=bl[bD+1]){continue}bD+=2;bw++;do{}while(bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bD<bB);bx=w-(bB-bD);bD=bB-w;if(bx>bs){aU=bv;bs=bx;if(bx>=bu){break}bC=bl[bD+bs-1];bA=bl[bD+bs]}}while((bv=(aN[bv&bz]&65535))>bt&&--by!==0);if(bs<=aK){return bs}return aK}function aq(bs){var bu=0;var bt;while(true){if(aK<v){be();if(aK<v&&bs==Y){return I}if(aK===0){break}}if(aK>=ae){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bu=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}if(bu!==0&&((br-bu)&65535)<=an-v){if(ah!=K){bg=bn(bu)}}if(bg>=ae){bt=aG(br-aU,bg-ae);aK-=bg;if(bg<=a3&&aK>=ae){bg--;do{br++;a1=((a1<<bq)^(bl[(br)+(ae-1)]&255))&aP;bu=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}while(--bg!==0);br++}else{br+=bg;bg=0;a1=bl[br]&255;a1=(((a1)<<bq)^(bl[br+1]&255))&aP}}else{bt=aG(0,bl[br]&255);aK--;br++}if(bt){ap(false);if(aI.avail_out===0){return I}}}ap(bs==l);if(aI.avail_out===0){if(bs==l){return E}else{return I}}return bs==l?j:T}function bc(bt){var bv=0;var bu;var bs;while(true){if(aK<v){be();if(aK<v&&bt==Y){return I}if(aK===0){break}}if(aK>=ae){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bv=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}aj=bg;aO=aU;bg=ae-1;if(bv!==0&&aj<a3&&((br-bv)&65535)<=an-v){if(ah!=K){bg=bn(bv)}if(bg<=5&&(ah==M||(bg==ae&&br-aU>4096))){bg=ae-1}}if(aj>=ae&&bg<=aj){bs=br+aK-ae;bu=aG(br-1-aO,aj-ae);aK-=aj-1;aj-=2;do{if(++br<=bs){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bv=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}}while(--aj!==0);at=0;bg=ae-1;br++;if(bu){ap(false);if(aI.avail_out===0){return I}}}else{if(at!==0){bu=aG(0,bl[br-1]&255);if(bu){ap(false)}br++;aK--;if(aI.avail_out===0){return I}}else{at=1;br++;aK--}}}if(at!==0){bu=aG(0,bl[br-1]&255);at=0}ap(bt==l);if(aI.avail_out===0){if(bt==l){return E}else{return I}}return bt==l?j:T}function aC(bs){bs.total_in=bs.total_out=0;bs.msg=null;aT.pending=0;aT.pending_out=0;aR=S;am=Y;bj();aV();return u}aT.deflateInit=function(bs,bu,bv,bt,bx,bw){if(!bt){bt=R}if(!bx){bx=V}if(!bw){bw=a}bs.msg=null;if(bu==x){bu=6}if(bx<1||bx>X||bt!=R||bv<9||bv>15||bu<0||bu>9||bw<0||bw>K){return af}bs.dstate=aT;aZ=bv;an=1<<aZ;aD=an-1;a8=bx+7;ax=1<<a8;aP=ax-1;bq=Math.floor((a8+ae-1)/ae);bl=new Uint8Array(an*2);aN=[];aH=[];bi=1<<(bx+6);aT.pending_buf=new Uint8Array(bi*4);ba=bi*4;ak=Math.floor(bi/2);a2=(1+2)*bi;a9=bu;ah=bw;aA=bt&255;return aC(bs)};aT.deflateEnd=function(){if(aR!=y&&aR!=S&&aR!=Q){return af}aT.pending_buf=null;aH=null;aN=null;bl=null;aT.dstate=null;return aR==S?n:u};aT.deflateParams=function(bs,bt,bv){var bu=u;if(bt==x){bt=6}if(bt<0||bt>9||bv<0||bv>K){return af}if(d[a9].func!=d[bt].func&&bs.total_in!==0){bu=bs.deflate(C)}if(a9!=bt){a9=bt;a3=d[a9].max_lazy;ao=d[a9].good_length;ay=d[a9].nice_length;az=d[a9].max_chain}ah=bv;return bu};aT.deflateSetDictionary=function(bs,bx,bv){var bu=bv;var bw,bt=0;if(!bx||aR!=y){return af}if(bu<ae){return u}if(bu>an-v){bu=an-v;bt=bv-bu}bl.set(bx.subarray(bt,bt+bu),0);br=bu;bp=bu;a1=bl[0]&255;a1=(((a1)<<bq)^(bl[1]&255))&aP;for(bw=0;bw<=bu-ae;bw++){a1=(((a1)<<bq)^(bl[(bw)+(ae-1)]&255))&aP;aN[bw&aD]=aH[a1];aH[a1]=bw}return u};aT.deflate=function(bt,bs){var bu,by,bw,bv,bx;if(bs>l||bs<0){return af}if(!bt.next_out||(!bt.next_in&&bt.avail_in!==0)||(aR==Q&&bs!=l)){bt.msg=s[L-(af)];return af}if(bt.avail_out===0){bt.msg=s[L-(N)];return N}aI=bt;bv=am;am=bs;if(aR==y){by=(R+((aZ-8)<<4))<<8;bw=((a9-1)&255)>>1;if(bw>3){bw=3}by|=(bw<<6);if(br!==0){by|=i}by+=31-(by%31);aR=S;aJ(by)}if(aT.pending!==0){aI.flush_pending();if(aI.avail_out===0){am=-1;return u}}else{if(aI.avail_in===0&&bs<=bv&&bs!=l){aI.msg=s[L-(N)];return N}}if(aR==Q&&aI.avail_in!==0){bt.msg=s[L-(N)];return N}if(aI.avail_in!==0||aK!==0||(bs!=Y&&aR!=Q)){bx=-1;switch(d[a9].func){case F:bx=aX(bs);break;case p:bx=aq(bs);break;case H:bx=bc(bs);break;default:}if(bx==E||bx==j){aR=Q}if(bx==I||bx==E){if(aI.avail_out===0){am=-1}return u}if(bx==T){if(bs==C){ar()}else{aM(0,0,false);if(bs==q){for(bu=0;bu<ax;bu++){aH[bu]=0}}}aI.flush_pending();if(aI.avail_out===0){am=-1;return u}}}if(bs!=l){return u}return ac}}function J(){var ag=this;ag.next_in_index=0;ag.next_out_index=0;ag.avail_in=0;ag.total_in=0;ag.avail_out=0;ag.total_out=0}J.prototype={deflateInit:function(ai,ah){var ag=this;ag.dstate=new G();if(!ah){ah=ad}return ag.dstate.deflateInit(ag,ai,ah)},deflate:function(ag){var ah=this;if(!ah.dstate){return af}return ah.dstate.deflate(ah,ag)},deflateEnd:function(){var ah=this;if(!ah.dstate){return af}var ag=ah.dstate.deflateEnd();ah.dstate=null;return ag},deflateParams:function(ai,ah){var ag=this;if(!ag.dstate){return af}return ag.dstate.deflateParams(ag,ai,ah)},deflateSetDictionary:function(ai,ah){var ag=this;if(!ag.dstate){return af}return ag.dstate.deflateSetDictionary(ag,ai,ah)},read_buf:function(ah,ak,ai){var aj=this;var ag=aj.avail_in;if(ag>ai){ag=ai}if(ag===0){return 0}aj.avail_in-=ag;ah.set(aj.next_in.subarray(aj.next_in_index,aj.next_in_index+ag),ak);aj.next_in_index+=ag;aj.total_in+=ag;return ag},flush_pending:function(){var ah=this;var ag=ah.dstate.pending;if(ag>ah.avail_out){ag=ah.avail_out}if(ag===0){return}ah.next_out.set(ah.dstate.pending_buf.subarray(ah.dstate.pending_out,ah.dstate.pending_out+ag),ah.next_out_index);ah.next_out_index+=ag;ah.dstate.pending_out+=ag;ah.total_out+=ag;ah.avail_out-=ag;ah.dstate.pending-=ag;if(ah.dstate.pending===0){ah.dstate.pending_out=0}}};return function aa(al){var ai=this;var ak=new J();var aj=512;var ag=Y;var ah=new Uint8Array(aj);if(typeof al=="undefined"){al=x}ak.deflateInit(al);ak.next_out=ah;ai.append=function(aq,ap){var ao,an=[],au=0,am=0,at=0,ar;if(!aq.length){return}ak.next_in_index=0;ak.next_in=aq;ak.avail_in=aq.length;do{ak.next_out_index=0;ak.avail_out=aj;ao=ak.deflate(ag);if(ao!=u){throw"deflating: "+ak.msg}if(ak.next_out_index){if(ak.next_out_index==aj){an.push(new Uint8Array(ah))}else{an.push(new Uint8Array(ah.subarray(0,ak.next_out_index)))}}at+=ak.next_out_index;if(ap&&ak.next_in_index>0&&ak.next_in_index!=au){ap(ak.next_in_index);au=ak.next_in_index}}while(ak.avail_in>0||ak.avail_out===0);ar=new Uint8Array(at);an.forEach(function(av){ar.set(av,am);am+=av.length});return ar};ai.flush=function(){var ao,an=[],am=0,aq=0,ap;do{ak.next_out_index=0;ak.avail_out=aj;ao=ak.deflate(l);if(ao!=ac&&ao!=u){throw"deflating: "+ak.msg}if(aj-ak.avail_out>0){an.push(new Uint8Array(ah.subarray(0,ak.next_out_index)))}aq+=ak.next_out_index}while(ak.avail_in>0||ak.avail_out===0);ak.deflateEnd();ap=new Uint8Array(aq);an.forEach(function(ar){ap.set(ar,am);am+=ar.length});return ap}}})(this);(function(b){var a;a=(function(){var m,j,f,k,g,l,i,c;d.load=function(n,e,q){var o,p=this;if(typeof e==="function"){q=e}o=new XMLHttpRequest;o.open("GET",n,true);o.responseType="arraybuffer";o.onload=function(){var r,s;r=new Uint8Array(o.response||o.mozResponseArrayBuffer);s=new d(r);if(typeof(e!=null?e.getContext:void 0)==="function"){s.render(e)}return typeof q==="function"?q(s):void 0};return o.send(null)};k=0;f=1;g=2;j=0;m=1;function d(t){var o,e,q,A,v,n,u,w,z,y,x,B,r,p,s;this.data=t;this.pos=8;this.palette=[];this.imgData=[];this.transparency={};this.animation=null;this.text={};n=null;while(true){o=this.readUInt32();y=((function(){var D,C;C=[];for(u=D=0;D<4;u=++D){C.push(String.fromCharCode(this.data[this.pos++]))}return C}).call(this)).join("");switch(y){case"IHDR":this.width=this.readUInt32();this.height=this.readUInt32();this.bits=this.data[this.pos++];this.colorType=this.data[this.pos++];this.compressionMethod=this.data[this.pos++];this.filterMethod=this.data[this.pos++];this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||Infinity,frames:[]};break;case"PLTE":this.palette=this.read(o);break;case"fcTL":if(n){this.animation.frames.push(n)}this.pos+=4;n={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()};v=this.readUInt16();A=this.readUInt16()||100;n.delay=1000*v/A;n.disposeOp=this.data[this.pos++];n.blendOp=this.data[this.pos++];n.data=[];break;case"IDAT":case"fdAT":if(y==="fdAT"){this.pos+=4;o-=4}t=(n!=null?n.data:void 0)||this.imgData;for(u=r=0;0<=o?r<o:r>o;u=0<=o?++r:--r){t.push(this.data[this.pos++])}break;case"tRNS":this.transparency={};switch(this.colorType){case 3:q=this.palette.length/3;this.transparency.indexed=this.read(o);if(this.transparency.indexed.length>q){throw new Error("More transparent colors than palette size")}x=q-this.transparency.indexed.length;if(x>0){for(u=p=0;0<=x?p<x:p>x;u=0<=x?++p:--p){this.transparency.indexed.push(255)}}break;case 0:this.transparency.grayscale=this.read(o)[0];break;case 2:this.transparency.rgb=this.read(o)}break;case"tEXt":B=this.read(o);w=B.indexOf(0);z=String.fromCharCode.apply(String,B.slice(0,w));this.text[z]=String.fromCharCode.apply(String,B.slice(w+1));break;case"IEND":if(n){this.animation.frames.push(n)}this.colors=(function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}).call(this);this.hasAlphaChannel=(s=this.colorType)===4||s===6;e=this.colors+(this.hasAlphaChannel?1:0);this.pixelBitlength=this.bits*e;this.colorSpace=(function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}).call(this);this.imgData=new Uint8Array(this.imgData);return;default:this.pos+=o}this.pos+=4;if(this.pos>this.data.length){throw new Error("Incomplete or corrupt PNG file")}}return}d.prototype.read=function(n){var o,p,e;e=[];for(o=p=0;0<=n?p<n:p>n;o=0<=n?++p:--p){e.push(this.data[this.pos++])}return e};d.prototype.readUInt32=function(){var p,o,n,e;p=this.data[this.pos++]<<24;o=this.data[this.pos++]<<16;n=this.data[this.pos++]<<8;e=this.data[this.pos++];return p|o|n|e};d.prototype.readUInt16=function(){var n,e;n=this.data[this.pos++]<<8;e=this.data[this.pos++];return n|e};d.prototype.decodePixels=function(K){var F,J,y,G,x,w,D,s,E,q,n,B,C,z,A,I,H,u,v,t,r,o,e;if(K==null){K=this.imgData}if(K.length===0){return new Uint8Array(0)}K=new FlateStream(K);K=K.getBytes();B=this.pixelBitlength/8;I=B*this.width;C=new Uint8Array(I*this.height);w=K.length;A=0;z=0;J=0;while(z<w){switch(K[z++]){case 0:for(G=v=0;v<I;G=v+=1){C[J++]=K[z++]}break;case 1:for(G=t=0;t<I;G=t+=1){F=K[z++];x=G<B?0:C[J-B];C[J++]=(F+x)%256}break;case 2:for(G=r=0;r<I;G=r+=1){F=K[z++];y=(G-(G%B))/B;H=A&&C[(A-1)*I+y*B+(G%B)];C[J++]=(H+F)%256}break;case 3:for(G=o=0;o<I;G=o+=1){F=K[z++];y=(G-(G%B))/B;x=G<B?0:C[J-B];H=A&&C[(A-1)*I+y*B+(G%B)];C[J++]=(F+Math.floor((x+H)/2))%256}break;case 4:for(G=e=0;e<I;G=e+=1){F=K[z++];y=(G-(G%B))/B;x=G<B?0:C[J-B];if(A===0){H=u=0}else{H=C[(A-1)*I+y*B+(G%B)];u=y&&C[(A-1)*I+(y-1)*B+(G%B)]}D=x+H-u;s=Math.abs(D-x);q=Math.abs(D-H);n=Math.abs(D-u);if(s<=q&&s<=n){E=x}else{if(q<=n){E=H}else{E=u}}C[J++]=(F+E)%256}break;default:throw new Error("Invalid filter algorithm: "+K[z-1])}A++}return C};d.prototype.decodePalette=function(){var u,s,e,n,v,t,o,q,r,p;n=this.palette;o=this.transparency.indexed||[];t=new Uint8Array((o.length||0)+n.length);v=0;e=n.length;u=0;for(s=q=0,r=n.length;q<r;s=q+=3){t[v++]=n[s];t[v++]=n[s+1];t[v++]=n[s+2];t[v++]=(p=o[u++])!=null?p:255}return t};d.prototype.copyToImageData=function(e,q){var s,n,w,x,y,t,r,o,p,z,u;n=this.colors;p=null;s=this.hasAlphaChannel;if(this.palette.length){p=(u=this._decodedPalette)!=null?u:this._decodedPalette=this.decodePalette();n=4;s=true}w=e.data||e;o=w.length;y=p||q;x=t=0;if(n===1){while(x<o){r=p?q[x/4]*4:t;z=y[r++];w[x++]=z;w[x++]=z;w[x++]=z;w[x++]=s?y[r++]:255;t=r}}else{while(x<o){r=p?q[x/4]*4:t;w[x++]=y[r++];w[x++]=y[r++];w[x++]=y[r++];w[x++]=s?y[r++]:255;t=r}}};d.prototype.decode=function(){var e;e=new Uint8Array(this.width*this.height*4);this.copyToImageData(e,this.decodePixels());return e};try{i=b.document.createElement("canvas");c=i.getContext("2d")}catch(h){return -1}l=function(n){var e;c.width=n.width;c.height=n.height;c.clearRect(0,0,n.width,n.height);c.putImageData(n,0,0);e=new Image;e.src=i.toDataURL();return e};d.prototype.decodeFrames=function(u){var n,s,e,o,q,t,r,p;if(!this.animation){return}r=this.animation.frames;p=[];for(s=q=0,t=r.length;q<t;s=++q){n=r[s];e=u.createImageData(n.width,n.height);o=this.decodePixels(new Uint8Array(n.data));this.copyToImageData(e,o);n.imageData=e;p.push(n.image=l(e))}return p};d.prototype.renderFrame=function(e,o){var q,p,n;p=this.animation.frames;q=p[o];n=p[o-1];if(o===0){e.clearRect(0,0,this.width,this.height)}if((n!=null?n.disposeOp:void 0)===f){e.clearRect(n.xOffset,n.yOffset,n.width,n.height)}else{if((n!=null?n.disposeOp:void 0)===g){e.putImageData(n.imageData,n.xOffset,n.yOffset)}}if(q.blendOp===j){e.clearRect(q.xOffset,q.yOffset,q.width,q.height)}return e.drawImage(q.image,q.xOffset,q.yOffset)};d.prototype.animate=function(o){var n,s,r,q,e,p,t=this;s=0;p=this.animation,q=p.numFrames,r=p.frames,e=p.numPlays;return(n=function(){var u,v;u=s++%q;v=r[u];t.renderFrame(o,u);if(q>1&&s/q<e){return t.animation._timeout=setTimeout(n,v.delay)}})()};d.prototype.stopAnimation=function(){var e;return clearTimeout((e=this.animation)!=null?e._timeout:void 0)};d.prototype.render=function(n){var e,o;if(n._png){n._png.stopAnimation()}n._png=this;n.width=this.width;n.height=this.height;e=n.getContext("2d");if(this.animation){this.decodeFrames(e);return this.animate(e)}else{o=e.createImageData(this.width,this.height);this.copyToImageData(o,this.decodePixels());return e.putImageData(o,0,0)}};return d})();b.PNG=a})(typeof window!=="undefined"&&window||this);var DecodeStream=(function(){function b(){this.pos=0;this.bufferLength=0;this.eof=false;this.buffer=null}b.prototype={ensureBuffer:function h(o){var k=this.buffer;var n=k?k.byteLength:0;if(o<n){return k}var m=512;while(m<o){m<<=1}var j=new Uint8Array(m);for(var l=0;l<n;++l){j[l]=k[l]}return this.buffer=j},getByte:function a(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return this.buffer[this.pos++]},getBytes:function i(l){var m=this.pos;if(l){this.ensureBuffer(m+l);var k=m+l;while(!this.eof&&this.bufferLength<k){this.readBlock()}var j=this.bufferLength;if(k>j){k=j}}else{while(!this.eof){this.readBlock()}var k=this.bufferLength}this.pos=k;return this.buffer.subarray(m,k)},lookChar:function f(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return String.fromCharCode(this.buffer[this.pos])},getChar:function c(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return String.fromCharCode(this.buffer[this.pos++])},makeSubStream:function e(m,k,l){var j=m+k;while(this.bufferLength<=j&&!this.eof){this.readBlock()}return new Stream(this.buffer,m,k,l)},skip:function d(j){if(!j){j=1}this.pos+=j},reset:function g(){this.pos=0}};return b})();var FlateStream=(function(){if(typeof Uint32Array==="undefined"){return undefined}var g=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);var b=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]);var d=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]);var a=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,590000,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9];var f=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];function c(h){throw new Error(h)}function e(i){var k=0;var j=i[k++];var h=i[k++];if(j==-1||h==-1){c("Invalid header in flate stream")}if((j&15)!=8){c("Unknown compression method in flate stream")}if((((j<<8)+h)%31)!=0){c("Bad FCHECK in flate stream")}if(h&32){c("FDICT bit set in flate stream")}this.bytes=i;this.bytesPos=k;this.codeSize=0;this.codeBuf=0;DecodeStream.call(this)}e.prototype=Object.create(DecodeStream.prototype);e.prototype.getBits=function(l){var j=this.codeSize;var k=this.codeBuf;var i=this.bytes;var m=this.bytesPos;var h;while(j<l){if(typeof(h=i[m++])=="undefined"){c("Bad encoding in flate stream")}k|=h<<j;j+=8}h=k&((1<<l)-1);this.codeBuf=k>>l;this.codeSize=j-=l;this.bytesPos=m;return h};e.prototype.getCode=function(o){var h=o[0];var j=o[1];var l=this.codeSize;var p=this.codeBuf;var r=this.bytes;var m=this.bytesPos;while(l<j){var n;if(typeof(n=r[m++])=="undefined"){c("Bad encoding in flate stream")}p|=(n<<l);l+=8}var i=h[p&((1<<j)-1)];var k=i>>16;var q=i&65535;if(l==0||l<k||k==0){c("Bad encoding in flate stream")}this.codeBuf=(p>>k);this.codeSize=(l-k);this.bytesPos=m;return q};e.prototype.generateHuffmanTable=function(m){var l=m.length;var o=0;for(var p=0;p<l;++p){if(m[p]>o){o=m[p]}}var v=1<<o;var h=new Uint32Array(v);for(var q=1,j=0,s=2;q<=o;++q,j<<=1,s<<=1){for(var k=0;k<l;++k){if(m[k]==q){var r=0;var u=j;for(var p=0;p<q;++p){r=(r<<1)|(u&1);u>>=1}for(var p=r;p<v;p+=s){h[p]=(q<<16)|k}++j}}}return[h,o]};e.prototype.readBlock=function(){function w(O,P,i,N,n){var k=O.getBits(i)+N;while(k-->0){P[F++]=n}}var l=this.getBits(3);if(l&1){this.eof=true}l>>=1;if(l==0){var z=this.bytes;var v=this.bytesPos;var L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}var C=L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}C|=(L<<8);if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}var K=L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}K|=(L<<8);if(K!=(~C&65535)){c("Bad uncompressed block length in flate stream")}this.codeBuf=0;this.codeSize=0;var r=this.bufferLength;var E=this.ensureBuffer(r+C);var m=r+C;this.bufferLength=m;for(var B=r;B<m;++B){if(typeof(L=z[v++])=="undefined"){this.eof=true;break}E[B]=L}this.bytesPos=v;return}var t;var u;if(l==1){t=a;u=f}else{if(l==2){var M=this.getBits(5)+257;var x=this.getBits(5)+1;var h=this.getBits(4)+4;var o=Array(g.length);var F=0;while(F<h){o[g[F++]]=this.getBits(3)}var y=this.generateHuffmanTable(o);var G=0;var F=0;var J=M+x;var H=new Array(J);while(F<J){var j=this.getCode(y);if(j==16){w(this,H,2,3,G)}else{if(j==17){w(this,H,3,3,G=0)}else{if(j==18){w(this,H,7,11,G=0)}else{H[F++]=G=j}}}}t=this.generateHuffmanTable(H.slice(0,M));u=this.generateHuffmanTable(H.slice(M,J))}else{c("Unknown block type in flate stream")}}var E=this.buffer;var I=E?E.length:0;var s=this.bufferLength;while(true){var q=this.getCode(t);if(q<256){if(s+1>=I){E=this.ensureBuffer(s+1);I=E.length}E[s++]=q;continue}if(q==256){this.bufferLength=s;return}q-=257;q=b[q];var p=q>>16;if(p>0){p=this.getBits(p)}var G=(q&65535)+p;q=this.getCode(u);q=d[q];p=q>>16;if(p>0){p=this.getBits(p)}var A=(q&65535)+p;if(s+G>=I){E=this.ensureBuffer(s+G);I=E.length}for(var D=0;D<G;++D,++s){E[s]=E[s-A]}}};return e})();(function(b){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(typeof b.btoa==="undefined"){b.btoa=function(k){var f,e,d,o,n,m,l,p,j=0,q=0,h="",g=[];if(!k){return k}do{f=k.charCodeAt(j++);e=k.charCodeAt(j++);d=k.charCodeAt(j++);p=f<<16|e<<8|d;o=p>>18&63;n=p>>12&63;m=p>>6&63;l=p&63;g[q++]=a.charAt(o)+a.charAt(n)+a.charAt(m)+a.charAt(l)}while(j<k.length);h=g.join("");var c=k.length%3;return(c?h.slice(0,c-3):h)+"===".slice(c||3)}}if(typeof b.atob==="undefined"){b.atob=function(j){var e,d,c,n,m,l,k,o,h=0,p=0,f="",g=[];if(!j){return j}j+="";do{n=a.indexOf(j.charAt(h++));m=a.indexOf(j.charAt(h++));l=a.indexOf(j.charAt(h++));k=a.indexOf(j.charAt(h++));o=n<<18|m<<12|l<<6|k;e=o>>16&255;d=o>>8&255;c=o&255;if(l==64){g[p++]=String.fromCharCode(e)}else{if(k==64){g[p++]=String.fromCharCode(e,d)}else{g[p++]=String.fromCharCode(e,d,c)}}}while(h<j.length);f=g.join("");return f}}if(!Array.prototype.map){Array.prototype.map=function(e){if(this===void 0||this===null||typeof e!=="function"){throw new TypeError()}var h=Object(this),c=h.length>>>0,g=new Array(c);var d=arguments.length>1?arguments[1]:void 0;for(var f=0;f<c;f++){if(f in h){g[f]=e.call(d,h[f],f,h)}}return g}}if(!Array.isArray){Array.isArray=function(c){return Object.prototype.toString.call(c)==="[object Array]"}}if(!Array.prototype.forEach){Array.prototype.forEach=function(e,d){if(this===void 0||this===null||typeof e!=="function"){throw new TypeError()}var g=Object(this),c=g.length>>>0;for(var f=0;f<c;f++){if(f in g){e.call(d,g[f],f,g)}}}}if(!Object.keys){Object.keys=(function(){var e=Object.prototype.hasOwnProperty,f=!({toString:null}).propertyIsEnumerable("toString"),d=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],c=d.length;return function(j){if(typeof j!=="object"&&(typeof j!=="function"||j===null)){throw new TypeError()}var g=[],k,h;for(k in j){if(e.call(j,k)){g.push(k)}}if(f){for(h=0;h<c;h++){if(e.call(j,d[h])){g.push(d[h])}}}return g}}())}if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(!String.prototype.trimLeft){String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}}if(!String.prototype.trimRight){String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")}}})(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this);Gwt=new Object();Gwt.Core=new Object();Gwt.Core.Contrib=new Object();Gwt.Core.Contrib.Protocol=window.location.protocol;Gwt.Core.Contrib.HostName=window.location.hostname;Gwt.Core.Contrib.Port=window.location.port;Gwt.Core.Contrib.Host=Gwt.Core.Contrib.Protocol+"//"+Gwt.Core.Contrib.HostName+"/";Gwt.Core.Contrib.Backend=Gwt.Core.Contrib.Host+"backend/";Gwt.Core.Contrib.Frontend=Gwt.Core.Contrib.Host+"frontend/";Gwt.Core.Contrib.Images="share/images/";Gwt.Core.Contrib.Icons="share/icons/";Gwt.Core.Contrib.db="remote";Gwt.Core.Contrib.request_id=0;Gwt.Core.Request=function(c,a,b){this.XHR=new XMLHttpRequest();this.Url=null;this.Func=null;this.Data=null;this.InitRequest(c,a,b)};Gwt.Core.Request.prototype.InitRequest=function(c,a,b){this.Url=c;this.Func=a;this.Data=b;this.XHR.onreadystatechange=this.Ready.bind(this);this.XHR.open("POST",this.Url,true);this.Send()};Gwt.Core.Request.prototype.Send=function(){if(this.Data.userfile!==undefined){this.UploadFile();return}this.SendData()};Gwt.Core.Request.prototype.UploadFile=function(){this.Boundary="---------------------------"+Date.now().toString(16);this.XHR.setRequestHeader("Content-Type","multipart/form-data; boundary="+this.Boundary);this.Multipart=[];this.Multipart.push("\r\n--"+this.Boundary+"\r\n");var b='Content-Disposition: form-data; name="user_info"; filename="document_type.txt"\r\nContent-Type: "txt"\r\n\r\n';this.Multipart.push(b);this.Multipart.push(JSON.stringify(this.Data.user_info));this.Multipart.push("\r\n--"+this.Boundary+"\r\n");var a='Content-Disposition: form-data; name="userfile"; filename="'+this.Data.userfile.name+'"\r\nContent-Type: '+this.Data.userfile.type+"\r\n\r\n";this.Multipart.push(a);this.FileData=new FileReader();this.FileData.readAsBinaryString(this.Data.userfile);this.FileData.addEventListener("load",this.SendFile.bind(this),false)};Gwt.Core.Request.prototype.SendFile=function(){this.Multipart.push(this.FileData.result);this.Multipart.push("\r\n--"+this.Boundary+"--");var c=this.Multipart.join("");this.XHR.setRequestHeader("Content-Length",c.length);var b=c.length,d=new Uint8Array(b);for(var a=0;a<b;a++){d[a]=c.charCodeAt(a)&255}this.XHR.send(d)};Gwt.Core.Request.prototype.SendData=function(){this.XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");var a="data="+JSON.stringify(this.Data);this.XHR.send(a)};Gwt.Core.Request.prototype.Ready=function(){if(this.XHR.readyState==4&&this.XHR.status==200){this.Func(JSON.parse(this.XHR.response))}};Gwt.Gui=new Object();Gwt.Gui={WIN_POS_CENTER:"WIN_POS_CENTER",WIN_POS_LEFT:"WIN_POS_LEFT",WIN_POS_TOP:"WIN_POS_TOP",WIN_POS_RIGHT:"WIN_POS_RIGHT",WIN_POS_BOTTOM:"WIN_POS_BOTTOM",ALIGN_CENTER:"ALIGN_CENTER",ALIGN_LEFT:"ALIGN_LEFT",ALIGN_RIGHT:"ALIGN_RIGHT"};Gwt.Gui.Event={Window:{AfterPrint:"afterprint",BeforePrint:"beforeprint",BeforeUnload:"beforeunload",Error:"error",HashChange:"hashchange",Load:"load",Message:"message",Offline:"offline",Online:"online",PageHide:"pagehide",PageShow:"pageshow",PopState:"popstate",Resize:"resize",Storage:"storage",Unload:"unload"},Form:{Blur:"blur",Change:"change",ContextMenu:"contextmenu",Focus:"focus",Input:"input",Invalid:"invalid",Reset:"reset",Search:"search",Select:"select",Submit:"submit"},Mouse:{Click:"click",DBClick:"dbclick",Drag:"drag",DragEnd:"dragend",DragEnter:"dragenter",DragLeave:"dragleave",DragOver:"dragover",DragStart:"dragstart",Drop:"drop",MouseDown:"mousedown",MouseMove:"mousemove",MouseOut:"mouseout",MouseOver:"mouseover",MouseUp:"mouseup",Scroll:"scroll",Wheel:"wheel"},Keyboard:{KeyUp:"keyup",KeyPress:"keypress",KeyDown:"keydown",KeyCodes:{Enter:13,Ctrl:17,Alt:18,AtlGr:225,Shift:16,Up:38,Down:40,Left:37,Right:39,Tap:9,Insert:45,Home:36,Del:46,End:35,Repag:33,Avpag:34,Meta:91}},Clipboard:{Copy:"copy",Cut:"cut",Paste:"paste"},Media:{Abort:"abort",CanPlay:"canplay",CanPlayThtough:"canplaythrough",CueChange:"cuechange",DurationChange:"durationchange",Emptied:"emptied",Ended:"ended",Error:"error",LoadedData:"loadeddata",LoadedMetadata:"loadedmetadata",LoadStart:"loadstart",Pause:"pause",Play:"play",Playing:"playing",Progress:"progress",RateChange:"ratechange",Seeked:"seeked",Seeking:"seeking",Stalled:"stalled",Suspend:"suspend",TimeUpdate:"timeupdate",VolumeChange:"volumechange",Waiting:"waiting"},Misc:{Error:"error",Show:"show",Toggle:"toggle"}};Gwt.Gui.SCREEN_DEVICE_WIDTH=window.innerWidth;Gwt.Gui.SCREEN_DEVICE_HEIGHT=window.innerHeight;Gwt.Gui.SCREEN_DEVICE_PIXEL_RATIO=window.devicePixelRatio;Gwt.Gui.SCREEN_DEVICE_ORIENTATION=window.innerWidth>window.innerHeight?"landscape":"portrait";Gwt.Gui.SCREEN_DEVICE_ASPECT_RATIO=(window.innerWidth>window.innerHeight?window.innerWidth/window.innerHeight:window.innerHeight/window.innerWidth).toString().substring(0,4);Gwt.Gui.Contrib=new Object();Gwt.Gui.Contrib.Color=function(a,f,e,d){this.Red=null;this.Green=null;this.Blue=null;this.Alpha=null;if(typeof a!=="number"){var c=Object.keys(Gwt.Gui.Contrib.Colors);for(var b=0;b<c.length;b++){if(a===Gwt.Gui.Contrib.Colors[c[b]]){this.Red=a[0];this.Green=a[1];this.Blue=a[2];this.Alpha=a[3]}}}else{this.Red=a;this.Green=f;this.Blue=e;this.Alpha=d}};Gwt.Gui.Contrib.Color.prototype.ToString=function(){return"rgba("+this.Red+","+this.Green+","+this.Blue+","+this.Alpha+")"};Gwt.Gui.Contrib.Color.prototype.SetRed=function(a){this.Red=a};Gwt.Gui.Contrib.Color.prototype.SetGreen=function(a){this.Green=a};Gwt.Gui.Contrib.Color.prototype.SetBlue=function(a){this.Blue=a};Gwt.Gui.Contrib.Color.prototype.SetAlpha=function(a){this.Alpha=a};Gwt.Gui.Contrib.Colors={AliceBlue:[240,248,255,1],AntiqueWhite:[250,235,215,1],Aqua:[0,255,255,1],AquaMarine:[127,255,212,1],Azure:[240,255,255,1],Beige:[245,245,220,1],Black:[0,0,0,1],Blue:[0,0,255,1],BlueViolet:[138,43,226,1],Brown:[165,42,42,1],BurlyWood:[222,184,135,1],CadetBlue:[95,158,160,1],Chartreuse:[127,255,0,1],Chocolate:[210,105,30,1],Coral:[255,127,80,1],CornFlowerBlue:[100,149,237,1],CornSilk:[255,248,220,1],Crimson:[220,20,60,1],DarkBlue:[0,0,139,1],DarkCyan:[0,139,139,1],DarkGrey:[169,169,169,1],DarkGreen:[0,100,0,1],DarkOliveGreen:[85,107,47,1],DarkOrchid:[153,50,204,1],DarkRed:[139,0,0,1],DarkSeaGreen:[143,188,143,1],DarkSlateBlue:[72,61,139,1],DarkSlateGray:[47,79,79,1],DarkTurquoise:[0,206,209,1],DeepPink:[255,20,147,1],DeepSkyBlue:[0,191,255,1],DodgerBlue:[30,144,255,1],Fuchsia:[255,0,255,1],Gainsboro:[220,220,220,1],GhostWhite:[248,248,255,1],Gold:[255,215,0,1],GoldenRod:[218,165,32,1],Green:[0,128,0,1],Grey:[128,128,128,1],GreenYellow:[173,255,47,1],HotPink:[255,105,180,1],IndianRed:[205,92,92,1],Khaki:[240,230,140,1],Lavender:[230,230,250,1],LavenderBlush:[255,240,245,1],LawnGreen:[124,252,0,1],LemonChiffon:[255,250,205,1],LightBlue:[173,216,230,1],LighCoral:[240,128,128,1],LighCyan:[224,255,255,1],LighGoldenRodYellow:[250,210,210,1],LighGrey:[211,211,211,1],LighPink:[255,182,193,1],LighSalmon:[255,160,122,1],LighSeaGreen:[32,178,170,1],LighSkyBlue:[135,206,250,1],LighSlateGrey:[119,136,153,1],LighSteelBlue:[176,196,222,1],LighYellow:[255,255,224,1],Lime:[0,255,0,1],LimeGreen:[50,205,50,1],Linen:[250,240,230,1],Magenta:[255,0,255,1],Maroon:[128,0,0,1],MediumAquaMarine:[102,205,170,1],MediumBlue:[0,0,205,1],MediumOrchid:[186,85,211,1],MediumPurple:[147,112,219,1],MediumSeaGreen:[60,179,113,1],MediumSlateBlue:[123,104,238,1],MediumSpringGreen:[0,250,154,1],MediumTurquoise:[72,209,204,1],MediumVioletRed:[199,21,133,1],MidnightBlue:[25,25,112,1],MintCream:[245,255,250,1],MistyRose:[255,225,228,1],Moccasin:[255,228,181,1],Navy:[0,0,128,1],OliveDrab:[107,142,35,1],Orange:[255,165,0,1],OrangeRed:[255,69,0,1],PaleGoldenRod:[232,232,170,1],PaleGreen:[152,251,152,1],PeachPuff:[255,218,185,1],Peru:[205,133,63,1],Pink:[255,192,203,1],Plum:[221,160,221,1],PowderBlue:[176,224,230,1],Purple:[128,0,128,1],RebeccaPurple:[102,51,153,1],Red:[255,0,0,1],RosyBrown:[188,143,143,1],RoyalBlue:[65,105,225,1],Salmon:[250,128,114,1],SeaGreen:[46,139,87,1],Sienna:[160,82,45,1],Silver:[192,192,192,1],SkyBlue:[135,206,235,1],SlateBlue:[106,90,205,1],SlateGrey:[112,128,144,1],Snow:[255,250,250,1],SpringGreen:[0,255,127,1],SteelBlue:[70,130,180,1],Tan:[210,180,140,1],Teal:[0,128,128,1],Thistle:[216,191,216,1],Tomato:[255,99,71,1],Transparent:[0,0,0,0],Violet:[238,130,238,1],Wheat:[245,222,179,1],White:[255,255,255,1],WhiteSmoke:[245,245,245,1],Yellow:[255,255,0,1],YellowGreen:[154,205,50,1]};Gwt.Gui.Contrib.BorderStyle={None:"none",Hidden:"hidden",Dotted:"dotted",Dashed:"dashed",Solid:"solid",Double:"double",Groove:"groove",Ridge:"ridge",Inset:"inset",Outset:"outset",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.PositionType={Static:"statci",Relative:"relative",Fixed:"fixed",Absolute:"absolute"};Gwt.Gui.Contrib.Display={Inline:"inline",Block:"block",Flex:"flex",InlineBlock:"inline-block",InlineFlex:"inline-flex",InlineTable:"inline-table",ListItem:"list-item",RunIn:"run-in",Table:"table",TableCaption:"table-caption",TableColumnGroup:"table-column-group",TableHeaderGroup:"table-header-group",TableFooterGroup:"table-footer-group",TableRowGroup:"table-row-group",TableCell:"table-cell",TableColumn:"table-column",TableRow:"table-row",None:"none",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.Overflow={Visible:"visible",Hidden:"hidden",Scroll:"scroll",Auto:"auto",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.Valign={Baseline:"baseline",Length:"length",Percent:"%",Sub:"sub",Supper:"supper",Top:"top",TextTop:"text-top",Middle:"middle",Bottom:"bottom",TextBottom:"text-bottom",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.Cursor={Alias:"alias",AllScroll:"all-scroll",Auto:"auto",Cell:"cell",ContextMenu:"context-menu",ColResize:"col-resize",Copy:"copy",Crosshair:"crosshair",Default:"default",EResize:"e-resize",EWResize:"ew-resize",Grab:"grab",Grabbing:"grabbing",Help:"help",Move:"move",NResize:"n-resize",NEResize:"ne-resize",NESwResize:"nesw-resize",NSResize:"ns-resize",NWResize:"nw-resize",NWSEResize:"nwse-resize",NoDrop:"no-drop",None:"none",NotAllowed:"not-allowed",Pointer:"pointer",Progress:"progress",RowResize:"row-resize",SResize:"s-resize",SEResize:"se-resize",SWResize:"sw-resize",Text:"text",URL:"url",VerticalText:"vertical-text",WResize:"w-resize",Wait:"wait",ZoomIn:"zoom-in",ZoomOut:"zoom-out",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.FontWeight={Normal:"normal",Bold:"bold",Bolder:"bolder",Lighter:"lighter",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.UserSelect={None:"none",Text:"text",All:"all"};Gwt.Gui.Contrib.TextAlign={Left:"left",Right:"right",Center:"center",Justify:"justify",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundAttachment={Scroll:"scroll",Fixed:"fixed",Local:"local",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundClip={BorderBox:"border-box",PaddingBox:"padding-box",ContentBox:"content-box",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundRepeat={Repeat:"repeat",RepeatX:"repeat-x",RepeatY:"repeat-y",NoRepeat:"no-repeat",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundSize={Auto:"auto",Length:"length",Cover:"cover",Contain:"contain",Initial:"initial",Inherit:"inherit"};Gwt.Gui.Contrib.BackgroundPosition={Left:"left",Right:"right",Top:"top",Bottom:"bottom",Center:"center"};Gwt.Gui.Contrib.OutLine={Dotted:"dotted",Dashed:"dashed",Solid:"solid",Double:"double",Groove:"groove",Ridge:"ridge",Inset:"inset",Outset:"outset",None:"none",Hidden:"hidden"};Gwt.Gui.Frame=function(){this.BackgroundAttachment=null;this.BackgroundClip=null;this.BackgroundColor=null;this.BackgroundImage=null;this.BackgroundOrigin=null;this.BackgroundPositionX=null;this.BackgroundPositionY=null;this.BackgroundRepeatX=null;this.BackgroundRepeatY=null;this.BackgroundSizeHeight=null;this.BackgroundSizeWidth=null;this.Border=null;this.BorderRadius=null;this.BorderStyle=null;this.BoxShadowH=null;this.BoxShadowV=null;this.BoxShadowBlur=null;this.BoxShadowSize=null;this.BoxShadowColor=null;this.Color=null;this.Cursor=null;this.Display=null;this.Expand=null;this.FontFamily=null;this.FontSize=null;this.FontWeight=null;this.Height=null;this.Html=null;this.Margin=null;this.MarginBottom=null;this.MarginLeft=null;this.MarginRight=null;this.MarginTop=null;this.MaxHeight=null;this.MaxWidth=null;this.MinHeight=null;this.MinWidth=null;this.Overflow=null;this.Opacity=null;this.OutLine=null;this.Padding=null;this.PaddingBottom=null;this.PaddingLeft=null;this.PaddingRight=null;this.PaddingTop=null;this.PositionLeft=null;this.PositionTop=null;this.PositionType=null;this.TabIndex=null;this.TextShadowBlur=null;this.TextShadowColor=null;this.TextShadowOffsx=null;this.TextShadowOffsy=null;this.UserSelect=null;this.Valign=null;this.Visibility=null;this.Width=null;this.ZIndex=null;this.ClassName=null;this.Parent=null;this.InitFrame()};Gwt.Gui.Frame.prototype.InitFrame=function(){this.SetHtml("div");this.SetTabIndex(0);this.SetClassName("Gwt_Gui_Frame");this.SetExpand(false);this.SetBorder(0);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetPosition(0,0)};Gwt.Gui.Frame.prototype.FinalizeFrame=function(){this.Html.parentNode.removeChild(this.Html);this.BackgroundAttachment=null;this.BackgroundClip=null;this.BackgroundColor=null;this.BackgroundImage=null;this.BackgroundOrigin=null;this.BackgroundPositionX=null;this.BackgroundPositionY=null;this.BackgroundRepeatX=null;this.BackgroundRepeatY=null;this.BackgroundSizeHeight=null;this.BackgroundSizeWidth=null;this.Border=null;this.BorderRadius=null;this.BorderStyle=null;this.Color=null;this.Cursor=null;this.Display=null;this.Expand=null;this.FontFamily=null;this.FontSize=null;this.FontWeight=null;this.Height=null;this.Html=null;this.Margin=null;this.MarginBottom=null;this.MarginLeft=null;this.MarginRight=null;this.MarginTop=null;this.MaxHeight=null;this.MaxWidth=null;this.Overflow=null;this.Opacity=null;this.OutLine=null;this.Padding=null;this.PaddingBottom=null;this.PaddingLeft=null;this.PaddingRight=null;this.PaddingTop=null;this.PositionLeft=null;this.PositionTop=null;this.PositionType=null;this.TabIndex=null;this.TextShadowBlur=null;this.TextShadowColor=null;this.TextShadowOffsx=null;this.TextShadowOffsy=null;this.UserSelect=null;this.Valign=null;this.Visibility=null;this.Width=null;this.ZIndex=null;this.ClassName=null;this.Parent=null};Gwt.Gui.Frame.prototype.Add=function(a){this.Html.appendChild(a.Html)};Gwt.Gui.Frame.prototype.AddEvent=function(b,a){this.Html.addEventListener(b,a,true)};Gwt.Gui.Frame.prototype.RemoveEvent=function(b,a){this.Html.removeEventListener(b,a,true)};Gwt.Gui.Frame.prototype.SetHtml=function(a){this.Html=document.createElement(a);this.InitStyle()};Gwt.Gui.Frame.prototype.SetTabIndex=function(a){this.TabIndex=a;this.Html.tabIndex=this.TabIndex};Gwt.Gui.Frame.prototype.SetSize=function(a,b){this.Width=a;this.Height=b;this.SetMaxWidth(this.Width);this.SetMaxHeight(this.Height);this.SetMinWidth(this.Width);this.SetMinHeight(this.Height);this.Html.style.width=this.Width+"px";this.Html.style.height=this.Height+"px"};Gwt.Gui.Frame.prototype.SetWidth=function(a){this.Width=a;this.SetMaxWidth(this.Width);this.SetMinWidth(this.Width);this.Html.style.width=this.Width+"px"};Gwt.Gui.Frame.prototype.SetHeight=function(a){this.Height=a;this.SetMaxHeight(this.Height);this.SetMinHeight(this.Height);this.Html.style.height=this.Height+"px"};Gwt.Gui.Frame.prototype.GetWidth=function(){return this.Width};Gwt.Gui.Frame.prototype.GetHeight=function(){return this.Height};Gwt.Gui.Frame.prototype.GetHtml=function(){return this.Html};Gwt.Gui.Frame.prototype.SetPosition=function(c,b){var f=Gwt.Gui.SCREEN_DEVICE_WIDTH*0.05;var a=Gwt.Gui.SCREEN_DEVICE_HEIGHT*0.05;this.PositionTop=b;this.PositionLeft=c;if(this.PositionLeft===Gwt.Gui.WIN_POS_CENTER&&this.PositionTop===undefined){var e=((Gwt.Gui.SCREEN_DEVICE_WIDTH-this.GetWidth())/2);var d=((Gwt.Gui.SCREEN_DEVICE_HEIGHT-this.GetHeight())/2)}else{if(this.PositionLeft!==undefined&&this.PositionTop!==undefined){switch(this.PositionLeft){case Gwt.Gui.WIN_POS_LEFT:var e=0;break;case Gwt.Gui.WIN_POS_CENTER:var e=(Gwt.Gui.SCREEN_DEVICE_WIDTH-this.GetWidth())/2;break;case Gwt.Gui.WIN_POS_RIGHT:var e=(Gwt.Gui.SCREEN_DEVICE_WIDTH-this.GetWidth())-2;break;default:var e=this.PositionLeft}switch(this.PositionTop){case Gwt.Gui.WIN_POS_TOP:var d=0;break;case Gwt.Gui.WIN_POS_CENTER:var d=(Gwt.Gui.SCREEN_DEVICE_HEIGHT-this.GetHeight())/2;break;case Gwt.Gui.WIN_POS_BOTTOM:var d=(Gwt.Gui.SCREEN_DEVICE_HEIGHT-this.GetHeight())-2;break;default:var d=this.PositionTop}}else{d=0;e=0}}this.PositionTop=d;this.PositionLeft=e;this.Html.style.top=this.PositionTop;this.Html.style.left=this.PositionLeft};Gwt.Gui.Frame.prototype.GetPositionLeft=function(){return this.PositionLeft};Gwt.Gui.Frame.prototype.GetPositionTop=function(){return this.PositionTop};Gwt.Gui.Frame.prototype.SetFocus=function(){this.Html.focus()};Gwt.Gui.Frame.prototype.SetBackgroundAttachment=function(a){this.BackgroundAttachment=a;this.Html.style.backgroundAttachment=this.BackgroundAttachment};Gwt.Gui.Frame.prototype.SetBackgroundClip=function(a){this.BackgroundClip=a;this.Html.style.backgroundClip=this.BackgroundClip};Gwt.Gui.Frame.prototype.SetBackgroundColor=function(a){this.BackgroundColor=a;this.Html.style.backgroundColor=this.BackgroundColor.ToString()};Gwt.Gui.Frame.prototype.SetBackgroundImage=function(a){this.BackgroundImage=a;this.Html.style.backgroundImage="url("+this.BackgroundImage+")"};Gwt.Gui.Frame.prototype.SetBackgroundOrigin=function(a){this.BackgroundOrigin=a;this.Html.style.backgroundOrigin=this.BackgroundOrigin};Gwt.Gui.Frame.prototype.SetBackgroundPosition=function(b,a){this.BackgroundPositionX=b;this.BackgroundPositionY=a;this.Html.style.backgroundPosition=""+this.BackgroundPositionX+" "+this.BackgroundPositionY+""};Gwt.Gui.Frame.prototype.SetBackgroundRepeat=function(b,a){this.BackgroundRepeatX=b;this.BackgroundRepeatY=a;this.Html.style.backgroundRepeatX=this.BackgroundRepeatX;this.Html.style.backgroundRepeatY=this.BackgroundRepeatY};Gwt.Gui.Frame.prototype.SetBackgroundSize=function(a,b){this.BackgroundSizeWidth=a;this.BackgroundSizeHeight=b;if(typeof this.BackgroundSizeWidth==="string"){this.Html.style.backgroundSize=this.BackgroundSizeWidth}else{this.Html.style.backgroundSize=this.BackgroundSizeWidth+"px "+this.BackgroundSizeHeight+"px"}};Gwt.Gui.Frame.prototype.SetBorder=function(a){this.Border=a;this.Html.style.borderWidth=this.Border+"px"};Gwt.Gui.Frame.prototype.SetBorderStyle=function(a){this.BorderStyle=a;this.Html.style.borderStyle=this.BorderStyle};Gwt.Gui.Frame.prototype.SetBorderRadius=function(a){this.BorderRadius=a;this.Html.style.borderRadius=this.BorderRadius+"px"};Gwt.Gui.Frame.prototype.SetBorderColor=function(a){this.Html.style.borderColor=a.ToString()};Gwt.Gui.Frame.prototype.SetBoxShadow=function(c,b,d,a,e){this.BoxShadowH=c;this.BoxShadowV=b;this.BoxShadowBlur=d;this.BoxShadowSize=a;this.BoxShadowColor=e;this.Html.style.boxShadow=this.BoxShadowH+"px "+this.BoxShadowV+"px "+this.BoxShadowBlur+"px "+this.BoxShadowSize+"px "+this.BoxShadowColor.ToString()};Gwt.Gui.Frame.prototype.SetClassName=function(a){this.ClassName=a;this.Html.className=this.ClassName};Gwt.Gui.Frame.prototype.GetClassName=function(){return this.ClassName};Gwt.Gui.Frame.prototype.SetParent=function(a){this.Parent=a};Gwt.Gui.Frame.prototype.GetParent=function(){return this.Parent};Gwt.Gui.Frame.prototype.SetColor=function(a){this.Color=a;this.Html.style.color=this.Color.ToString()};Gwt.Gui.Frame.prototype.SetCursor=function(a){this.Cursor=a;this.Html.style.cursor=this.Cursor};Gwt.Gui.Frame.prototype.SetDisplay=function(a){this.Display=a;this.Html.style.display=this.Display};Gwt.Gui.Frame.prototype.SetFontFamily=function(a){this.FontFamily=a;this.Html.style.fontFamily=this.FontFamily};Gwt.Gui.Frame.prototype.SetFontSize=function(a){this.FontSize=a;this.Html.style.fontSize=this.FontSize+"pt"};Gwt.Gui.Frame.prototype.GetFontSize=function(){return this.FontSize};Gwt.Gui.Frame.prototype.SetFontWeight=function(a){this.FontWeight=a;this.Html.style.fontWeight=this.FontWeight};Gwt.Gui.Frame.prototype.InitStyle=function(){this.SetMaxHeight(Gwt.Gui.SCREEN_DEVICE_HEIGHT);this.SetMaxWidth(Gwt.Gui.SCREEN_DEVICE_WIDTH);this.SetMinHeight(0);this.SetMinWidth(0);this.SetPositionType(Gwt.Gui.Contrib.PositionType.Relative);this.SetDisplay(Gwt.Gui.Contrib.Display.Block);this.SetOverflow(Gwt.Gui.Contrib.Overflow.Hidden);this.SetPadding(0);this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Transparent));this.SetBorder(0);this.SetColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure))};Gwt.Gui.Frame.prototype.SetMaxHeight=function(a){this.MaxHeight=a;this.Html.style.maxHeight=this.MaxHeight+"px"};Gwt.Gui.Frame.prototype.SetMaxWidth=function(a){this.MaxWidth=a;this.Html.style.maxWidth=this.MaxWidth+"px"};Gwt.Gui.Frame.prototype.SetMinHeight=function(a){this.MinHeight=a;this.Html.style.minHeight=this.MinHeight+"px"};Gwt.Gui.Frame.prototype.SetMinWidth=function(a){this.MinWidth=a;this.Html.style.minWidth=this.MinWidth+"px"};Gwt.Gui.Frame.prototype.SetMargin=function(a){this.Margin=a;this.Html.style.margin=this.Margin+"px"};Gwt.Gui.Frame.prototype.SetMarginTop=function(a){this.MarginTop=a;this.Html.style.marginTop=this.MarginTop+"px"};Gwt.Gui.Frame.prototype.SetMarginBottom=function(a){this.MarginBottom=a;this.Html.style.marginBottom=this.MarginBottom+"px"};Gwt.Gui.Frame.prototype.SetMarginLeft=function(a){this.MarginLeft=a;this.Html.style.marginLeft=this.MarginLeft+"px"};Gwt.Gui.Frame.prototype.SetMarginRight=function(a){this.MarginRight=a;this.Html.style.marginRight=this.MarginRight+"px"};Gwt.Gui.Frame.prototype.SetPadding=function(a){this.Padding=a;this.Html.style.padding=this.Padding+"px"};Gwt.Gui.Frame.prototype.SetPaddingTop=function(a){this.PaddingTop=a;this.Html.style.paddingTop=this.PaddingTop+"px"};Gwt.Gui.Frame.prototype.SetPaddingBottom=function(a){this.PaddingBottom=a;this.Html.style.paddingBottom=this.PaddingBottom+"px"};Gwt.Gui.Frame.prototype.SetPaddingLeft=function(a){this.PaddingLeft=a;this.Html.style.paddingLeft=this.PaddingLeft+"px"};Gwt.Gui.Frame.prototype.SetPaddingRight=function(a){this.PaddingRight=a;this.Html.style.paddingRight=this.PaddingRight+"px"};Gwt.Gui.Frame.prototype.SetPositionType=function(a){this.PositionType=a;this.Html.style.position=this.PositionType};Gwt.Gui.Frame.prototype.SetOverflow=function(a){this.Overflow=a;this.Html.style.overflow=this.Overflow};Gwt.Gui.Frame.prototype.SetOpacity=function(a){this.Opacity=a;this.Html.style.opacity=this.Opacity};Gwt.Gui.Frame.prototype.SetTextShadow=function(b,a,c,d){this.TextShadowOffsx=b;this.TextShadowOffsy=a;this.TextShadowBlur=c;this.TextShadowColor=d;this.Html.style.textShadow=this.TextShadowOffsx+"px "+this.TextShadowOffsy+"px "+this.TextShadowBlur+"px "+this.TextShadowColor.ToString()};Gwt.Gui.Frame.prototype.SetZIndex=function(a){this.ZIndex=a;this.Html.style.zIndex=this.ZIndex};Gwt.Gui.Frame.prototype.SetSelectable=function(a){this.UserSelect=a;this.Html.style.userSelect=this.UserSelect};Gwt.Gui.Frame.prototype.SetValign=function(a){this.Valign=a;this.Html.style.verticalAlign=this.Valign};Gwt.Gui.Frame.prototype.SetVisibility=function(a){this.Visibility=a;this.Html.style.visibility=this.Visibility};Gwt.Gui.Frame.prototype.SetExpand=function(a){this.Expand=a};Gwt.Gui.Frame.prototype.IsExpand=function(){return this.Expand};Gwt.Gui.Frame.prototype.SetOutLine=function(a){this.OutLine=a;this.Html.style.outline=this.OutLine};Gwt.Gui.Frame.prototype.GetOutLine=function(){return this.OutLine};Gwt.Gui.Window=function(){Gwt.Gui.Frame.call(this);this.InitWindow()};Gwt.Gui.Window.prototype=new Gwt.Gui.Frame();Gwt.Gui.Window.prototype.constructor=Gwt.Gui.Window;Gwt.Gui.Window.prototype.FinalizeWindow=function(){this.FinalizeFrame()};Gwt.Gui.Window.prototype.InitWindow=function(){this.SetClassName("Gwt_Gui_Window");this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(25,25,25,0.3));this.SetBackgroundSize(Gwt.Gui.Contrib.BackgroundSize.Cover);this.SetBoxShadow(0,0,10,2,new Gwt.Gui.Contrib.Color(102,205,102,0.3));this.SetBorder(0);var c=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.White);c.SetAlpha(0.5);this.SetBorderColor(c);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetBorder(1);this.SetBorderRadius(5);this.SetPositionType(Gwt.Gui.Contrib.PositionType.Absolute);this.SetSize(256,256);this.SetDisplay(Gwt.Gui.Contrib.Display.Block);var b=(Math.random()*Gwt.Gui.SCREEN_DEVICE_WIDTH)-this.GetWidth();var a=(Math.random()*Gwt.Gui.SCREEN_DEVICE_HEIGHT)-this.GetHeight();if(b<0){b=0}if(a<0){a=0}this.SetPosition(b,top)};Gwt.Gui.Window.prototype.SetBorderSpacing=function(a){var b=a*2;this.layout.SetWidth(this.GetWidth()-b);this.layout.SetHeight(this.GetHeight()-b);var d=(this.GetWidth()-(this.GetWidth()-b))/2;var c=((this.GetHeight()-(this.GetHeight()-b))/2);this.layout.SetPosition(d,c)};Gwt.Gui.Window.prototype.Open=function(){desktop.show(this)};Gwt.Gui.Window.prototype.Close=function(){this.FinalizeWindow()};Gwt.Gui.Dialog=function(a){Gwt.Gui.Frame.call(this);this.DialogBox=null;this.InitDialog(a)};Gwt.Gui.Dialog.prototype=new Gwt.Gui.Frame();Gwt.Gui.Dialog.prototype.constructor=Gwt.Gui.Dialog;Gwt.Gui.Dialog.prototype.InitDialog=function(d){this.SetClassName("Gwt_Gui_Dialog");this.SetPositionType(Gwt.Gui.Contrib.PositionType.Absolute);this.SetParent(d);this.AddEvent(Gwt.Gui.Event.Mouse.Click,this.Close.bind(this));this.SetSize(Gwt.Gui.SCREEN_DEVICE_WIDTH,Gwt.Gui.SCREEN_DEVICE_HEIGHT);this.SetPosition(Gwt.Gui.WIN_POS_TOP,Gwt.Gui.WIN_POS_LEFT);var b=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.DarkSlateGray);b.SetAlpha(0.75);this.SetBackgroundColor(b);this.SetZIndex(900000);this.DialogBox=new Gwt.Gui.Frame();this.DialogBox.SetSize(256,256);var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.DarkSlateGray);a.SetAlpha(0.75);this.DialogBox.SetBackgroundColor(a);var c=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);c.SetAlpha(0.33);this.DialogBox.SetBorderColor(c);this.DialogBox.SetBorder(1);this.DialogBox.SetBorderRadius(5);this.DialogBox.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.DialogBox.SetZIndex(1000000);this.Add(this.DialogBox)};Gwt.Gui.Dialog.prototype.Open=function(){desktop.show(this)};Gwt.Gui.Dialog.prototype.Close=function(){this.DialogBox.FinalizeFrame();this.DialogBox=null;this.FinalizeFrame()};Gwt.Gui.Button=function(a,b){Gwt.Gui.Frame.call(this);this.Image=null;this.Text=null;this.InitButton(a,b)};Gwt.Gui.Button.prototype=new Gwt.Gui.Frame();Gwt.Gui.Button.prototype.constructor=Gwt.Gui.Button;Gwt.Gui.Button.prototype.FinalizeButton=function(){this.Image=null;this.Text=null;this.FinalizeFrame()};Gwt.Gui.Button.prototype.InitButton=function(b,c){this.SetClassName("Gwt_Gui_Button");this.SetExpand(false);this.SetBorder(1);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);a.SetAlpha(0.3);this.SetBorderColor(a);this.SetBorderRadius(5);this.SetMargin(0);this.AddEvent(Gwt.Gui.Event.Mouse.MouseMove,this.MouseMove.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseDown,this.MouseDown.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseUp,this.MouseMove.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseOut,this.MouseOut.bind(this));this.Image=new Gwt.Gui.Image(b);this.Image.SetSize(24,24);this.Image.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);this.Text=new Gwt.Gui.StaticText(c);this.Text.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);this.Text.SetValign(Gwt.Gui.Contrib.Valign.Top);this.SetSize(this.Image.GetWidth()+this.Text.GetWidth(),24);this.Add(this.Image);this.Add(this.Text)};Gwt.Gui.Button.prototype.MouseMove=function(){this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(25,25,25,0.1))};Gwt.Gui.Button.prototype.MouseDown=function(){this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(25,25,25,0.2))};Gwt.Gui.Button.prototype.MouseOut=function(){this.SetBackgroundColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Transparent))};Gwt.Gui.Button.prototype.SetText=function(a){this.Text.SetText(a);this.Text.SetWidth(this.GetWidth()*0.7)};Gwt.Gui.Button.prototype.SetImage=function(a){this.Image.SetImage(a)};Gwt.Gui.Button.prototype.SetFontSize=function(a){this.Text.SetFontSize(a);this.SetSize(this.Image.GetWidth()+this.Text.GetWidth(),24)};Gwt.Gui.Entry=function(a){Gwt.Gui.Frame.call(this);this.InitEntry(a)};Gwt.Gui.Entry.prototype=new Gwt.Gui.Frame();Gwt.Gui.Entry.prototype.constructor=Gwt.Gui.Entry;Gwt.Gui.Entry.prototype.FinalizeEntry=function(){this.FinalizeFrame()};Gwt.Gui.Entry.prototype.InitEntry=function(a){this.SetHtml("input");this.Html.setAttribute("type","text");this.SetClassName("Gwt_Gui_Entry");this.SetExpand(true);this.SetPadding(3);this.SetBorderRadius(5);this.SetPlaceholder(a||"Entry text");this.SetFontSize(11)};Gwt.Gui.Entry.prototype.SetPlaceholder=function(a){this.Html.placeholder=a};Gwt.Gui.Entry.prototype.ChangeToPassword=function(){this.Html.type="password"};Gwt.Gui.Entry.prototype.ChangeToText=function(){this.Html.type="text"};Gwt.Gui.Entry.prototype.GetText=function(){return this.Html.value};Gwt.Gui.Entry.prototype.SetText=function(a){this.Html.value=a};Gwt.Gui.Entry.prototype.SetMaxLength=function(a){this.Html.maxLength=a};Gwt.Gui.Entry.prototype.Reset=function(){this.SetText("")};Gwt.Gui.File=function(a){Gwt.Gui.Frame.call(this);this.Input=null;this.DataSize=null;this.FileName=null;this.MimeType=null;this.Data=null;this.InitFile()};Gwt.Gui.File.prototype=new Gwt.Gui.Frame();Gwt.Gui.File.prototype.constructor=Gwt.Gui.File;Gwt.Gui.File.prototype.FinalizeFile=function(){this.FinalizeFrame()};Gwt.Gui.File.prototype.InitFile=function(){this.Input=new Gwt.Gui.Frame();this.Input.SetHtml("input");this.Input.Html.setAttribute("type","file");this.Input.Html.removeAttribute("multiple");this.Input.SetOpacity(0);this.Input.SetWidth(24);this.Input.SetHeight(24);this.SetWidth(24);this.SetHeight(24);this.SetClassName("Gwt_Gui_File");this.SetBackgroundImage(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.paperclip.rotated.svg");this.SetBackgroundSize(24,24);this.Add(this.Input);this.Input.AddEvent(Gwt.Gui.Event.Form.Change,this.UpdateInfo.bind(this))};Gwt.Gui.File.prototype.UpdateInfo=function(){this.Data=this.Input.Html.files[0];this.DataSize=this.Data.size;this.FileName=this.Data.name;this.MimeType=this.Data.type};Gwt.Gui.File.prototype.GetData=function(){return this.Data};Gwt.Gui.File.prototype.GetDataSize=function(){return this.DataSize};Gwt.Gui.File.prototype.GetFileName=function(){return this.FileName};Gwt.Gui.File.prototype.GetMimeType=function(){return this.MimeType};Gwt.Gui.File.prototype.Reset=function(){this.Data=null;this.DataSize=null;this.FileName=null;this.MimeType=null};Gwt.Gui.File.prototype.AddEvent=function(b,a){this.Input.AddEvent(b,a)};Gwt.Gui.Text=function(a){Gwt.Gui.Frame.call(this);this.InitText()};Gwt.Gui.Text.prototype=new Gwt.Gui.Frame();Gwt.Gui.Text.prototype.constructor=Gwt.Gui.Text;Gwt.Gui.Text.prototype.FinalizeText=function(){this.FinalizeFrame()};Gwt.Gui.Text.prototype.InitText=function(){this.SetHtml("textarea");this.SetClassName("Gwt_Gui_Text");this.SetExpand(true);this.SetPadding(3);this.SetBorderRadius(5);this.SetPlaceholder(Placeholder||"Text multi-line");this.SetFontSize(10);this.SetHeight(96);this.SetAlign();this.SetMaxLength(185)};Gwt.Gui.Text.prototype.SetPlaceholder=function(a){this.html.Placeholder=a};Gwt.Gui.Text.prototype.ChangeToPassword=function(){this.html.type="password"};Gwt.Gui.Text.prototype.ChangeToText=function(){this.html.type="text"};Gwt.Gui.Text.prototype.GetText=function(){return this.html.value};Gwt.Gui.Text.prototype.SetText=function(a){this.html.value=text};Gwt.Gui.Text.prototype.SetMaxLength=function(a){this.html.maxLength=value};Gwt.Gui.Text.prototype.Reset=function(){this.SetText("")};Gwt.Gui.Text.prototype.SetAlign=function(a){switch(a){case Gwt.Gui.ALIGN_LEFT:this.align=Gwt.Gui.ALIGN_LEFT;this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Left;break;case Gwt.Gui.ALIGN_CENTER:this.align=Gwt.Gui.ALIGN_CENTER;this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Center;break;case Gwt.Gui.ALIGN_RIGHT:this.align=Gwt.Gui.ALIGN_RIGHT;this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Right;break;default:this.html.style.textAlign=Gwt.Gui.Contrib.TextAlign.Justify;break}};Gwt.Gui.HBox=function(a){Gwt.Gui.Frame.call(this);this.Childs=null;this.MarginElements=null;this.InitHbox(a)};Gwt.Gui.HBox.prototype=new Gwt.Gui.Frame();Gwt.Gui.HBox.prototype.constructor=Gwt.Gui.HBox;Gwt.Gui.HBox.prototype.FinalizeHbox=function(){this.Childs=null;this.MarginElements=null;this.FinalizeFrame()};Gwt.Gui.HBox.prototype.InitHbox=function(a){this.SetClassName("Gwt_Gui_HBox");this.SetDisplay(Gwt.Gui.Contrib.Display.Block);this.Childs=[];this.MarginElements=typeof(a)=="undefined"?12:a};Gwt.Gui.HBox.prototype.GetChilds=function(){return this.Childs};Gwt.Gui.HBox.prototype.GetMarginElements=function(){return this.MarginElements};Gwt.Gui.HBox.prototype.Add=function(a){this.GetChilds().push(a);this.GetHtml().appendChild(a.GetHtml());if(a.GetClassName()=="Gwt_Gui_VBox"){var d=[];for(var c=0;c<this.GetChilds().length;c++){if(this.GetChilds()[c].GetClassName()=="Gwt_Gui_VBox"){d.push(this.GetChilds()[c])}}for(var b=0;b<d.length;b++){d[b].SetWidth(this.GetWidth()/d.length);d[b].SetHeight(this.GetHeight())}}else{a.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);if(a.GetHtml()==this.GetHtml().firstChild){a.SetMargin(0)}else{if(a.GetHtml()==this.GetHtml().lastChild){a.SetMarginLeft(this.GetMarginElements())}}}};Gwt.Gui.Image=function(a){Gwt.Gui.Frame.call(this);this.InitImage(a)};Gwt.Gui.Image.prototype=new Gwt.Gui.Frame();Gwt.Gui.Image.prototype.constructor=Gwt.Gui.Image;Gwt.Gui.Image.prototype.FinalizeImage=function(){this.FinalizeFrame()};Gwt.Gui.Image.prototype.InitImage=function(a){this.SetHtml("img");this.SetClassName("Gwt_Gui_Image");this.SetCursor(Gwt.Gui.Contrib.Cursor.Default);this.SetImage(a||Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"default_image.svg");this.SetSelectable("none")};Gwt.Gui.Image.prototype.SetImage=function(a){this.Html.src=a};Gwt.Gui.Item=function(b,a){Gwt.Gui.Frame.call(this);this.Text=null;this.Value=null;this.InitItem(b,a)};Gwt.Gui.Item.prototype=new Gwt.Gui.Frame();Gwt.Gui.Item.prototype.constructor=Gwt.Gui.Item;Gwt.Gui.Item.prototype.FinalizeItem=function(){this.Text=null;this.Value=null;this.FinalizeFrame()};Gwt.Gui.Item.prototype.InitItem=function(b,a){this.SetClassName("Gwt_Gui_Item");this.Text=new Gwt.Gui.StaticText(b);this.Value=a;this.SetHeight(24);var c=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);c.SetAlpha(0);this.SetBorderColor(c);this.SetBorder(0);this.SetBackgroundColor(c);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetBorderRadius(0);this.AddEvent(Gwt.Gui.Event.Mouse.MouseOver,this.MouseOver.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.MouseOut,this.MouseOut.bind(this));this.Add(this.Text)};Gwt.Gui.Item.prototype.GetValue=function(){return this.Value};Gwt.Gui.Item.prototype.MouseOver=function(a){var b=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);b.SetAlpha(0.25);this.SetBackgroundColor(b)};Gwt.Gui.Item.prototype.MouseOut=function(a){var b=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);b.SetAlpha(0);this.SetBackgroundColor(b)};Gwt.Gui.Item.prototype.Reset=function(){var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);a.SetAlpha(0);this.SetBackgroundColor(a)};Gwt.Gui.SelectDialogBox=function(){Gwt.Gui.Dialog.call(this);this.items=null;this.LayoutDialog=null;this.Container=null;this.InitSelectDialogBox()};Gwt.Gui.SelectDialogBox.prototype=new Gwt.Gui.Dialog();Gwt.Gui.SelectDialogBox.prototype.constructor=Gwt.Gui.SelectDialogBox;Gwt.Gui.SelectDialogBox.prototype.FinalizeSelectDialogBox=function(){this.LayoutDialog=null;this.Container=null;this.items=null;this.FinalizeDialog()};Gwt.Gui.SelectDialogBox.prototype.InitSelectDialogBox=function(){this.SetClassName("Gwt_Gui_Select_dialog_box");this.LayoutDialog=new Gwt.Gui.VBox(this.DialogBox,0);this.LayoutDialog.SetSize(this.DialogBox.GetWidth()*0.95,this.DialogBox.GetHeight()*0.95);var b=(this.DialogBox.GetHeight()-this.LayoutDialog.GetHeight())/2;var a=(this.DialogBox.GetWidth()-this.LayoutDialog.GetWidth())/2;this.LayoutDialog.SetPosition(b,a);this.Container=new Gwt.Gui.VBox(this.DialogBox,3);this.Container.AddEvent(Gwt.Gui.Event.Mouse.Wheel,this.EventScroll.bind(this));this.Container.SetSize(this.LayoutDialog.GetWidth(),0);this.DialogBox.Add(this.LayoutDialog);this.LayoutDialog.Add(this.Container)};Gwt.Gui.SelectDialogBox.prototype.AddItem=function(a){a.SetWidth(this.Container.GetWidth());this.Container.SetHeight(this.Container.GetHeight()+27);this.Container.Add(a);this.items++};Gwt.Gui.SelectDialogBox.prototype.EventScroll=function(f){var b=f.deltaY;var e=this.Container.GetPositionTop();var a=this.Container.GetPositionLeft();var g=this.Container.GetHeight()>this.LayoutDialog.GetHeight();var c=this.items-9;var d=0;if(c>0){d=-27*c}if(b<0&&g&&e<0){e+=27}else{if(b>0&&g&&e>d){e-=27}else{e=e}}this.Container.SetPosition(e,a)};Gwt.Gui.SelectBox=function(a,b){Gwt.Gui.Frame.call(this);this.StaticText=null;this.SelectDialogBox=null;this.Placeholder=null;this.Options=null;this.Text=null;this.Value=null;this.InitSelectBox(a,b)};Gwt.Gui.SelectBox.prototype=new Gwt.Gui.Frame();Gwt.Gui.SelectBox.prototype.constructor=Gwt.Gui.SelectBox;Gwt.Gui.SelectBox.prototype.FinalizeSelectBox=function(){this.StaticText=null;this.SelectDialogBox=null;this.Placeholder=null;this.Options=null;this.FinalizeFrame()};Gwt.Gui.SelectBox.prototype.InitSelectBox=function(a,b){this.SetClassName("Gwt_Gui_Select_box");this.SetExpand(true);this.AddEvent(Gwt.Gui.Event.Mouse.Click,this.ShowDialog.bind(this));this.AddEvent(Gwt.Gui.Event.Keyboard.KeyPress,this.ShowDialog.bind(this));this.Placeholder=a;this.StaticText=new Gwt.Gui.StaticText(this.Placeholder);this.Add(this.StaticText);this.Options=[];this.Options[0]=new Gwt.Gui.Item(this.Placeholder,"");this.Options[0].AddEvent(Gwt.Gui.Event.Mouse.Click,this.SetValue.bind(this,Event,this.Placeholder,""));this.Options[0].SetBackgroundImage(Gwt.Core.Contrib.Images+"check_item.svg");this.Options[0].SetBackgroundRepeat(Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);this.Options[0].SetBackgroundPosition(Gwt.Gui.Contrib.BackgroundPosition.Right,Gwt.Gui.Contrib.BackgroundPosition.Center);for(var c=0;c<b.length;c++){this.Options[c+1]=new Gwt.Gui.Item(b[c].text,b[c].value);this.Options[c+1].AddEvent(Gwt.Gui.Event.Mouse.Click,this.SetValue.bind(this,Event,b[c].text,b[c].value))}};Gwt.Gui.SelectBox.prototype.ShowDialog=function(c){if(c.type==Gwt.Gui.Event.Keyboard.KeyPress){if(c.keyCode==Gwt.Gui.Event.Keyboard.KeyCodes.Enter){this.SelectDialogBox=new Gwt.Gui.SelectDialogBox();for(var b=0;b<this.Options.length;b++){this.Options[b].Reset();this.SelectDialogBox.AddItem(this.Options[b])}this.SelectDialogBox.Open()}}if(c.type==Gwt.Gui.Event.Mouse.Click){this.SelectDialogBox=new Gwt.Gui.SelectDialogBox();for(var a=0;a<this.Options.length;a++){this.Options[a].Reset();this.SelectDialogBox.AddItem(this.Options[a])}this.SelectDialogBox.Open()}};Gwt.Gui.SelectBox.prototype.SetText=function(a){this.Text=a;this.StaticText.SetText(this.Text)};Gwt.Gui.SelectBox.prototype.SetValue=function(a,d,b){this.SetText(d);this.Value=b;for(var c=0;c<this.Options.length;c++){if(this.Options[c].GetValue()==this.Value){this.Options[c].SetBackgroundImage(Gwt.Core.Contrib.Images+"check_item.svg");this.Options[c].SetBackgroundRepeat(Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);this.Options[c].SetBackgroundPosition(Gwt.Gui.Contrib.BackgroundPosition.Right,Gwt.Gui.Contrib.BackgroundPosition.Center)}else{this.Options[c].SetBackgroundImage("")}}};Gwt.Gui.StaticText=function(a){Gwt.Gui.Frame.call(this);this.Text=null;this.InitStaticText(a)};Gwt.Gui.StaticText.prototype=new Gwt.Gui.Frame();Gwt.Gui.StaticText.prototype.constructor=Gwt.Gui.StaticText;Gwt.Gui.StaticText.prototype.FinalizeStaticText=function(){this.FinalizeFrame()};Gwt.Gui.StaticText.prototype.InitStaticText=function(a){this.SetClassName("Gwt_Gui_Static_Text");this.Text=a||"Default Text";this.SetText(this.Text);this.SetFontSize(11);this.SetColor(new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure));this.SetCursor(Gwt.Gui.Contrib.Cursor.Default);this.SetSelectable(Gwt.Gui.Contrib.UserSelect.None);this.SetOverflow(Gwt.Gui.Contrib.Overflow.Hidden)};Gwt.Gui.StaticText.prototype.SetText=function(a){this.Text=a;this.Html.textContent=this.Text};Gwt.Gui.StaticText.prototype.TextAlign=function(a){if(a=="left"||a=="center"||a=="right"||a=="justify"){this.Html.style.textAlign=a}else{console.log("Align invalid")}};Gwt.Gui.StaticText.prototype.GetText=function(){return this.Html.value};Gwt.Gui.StaticText.prototype.GetLength=function(){return this.Text.length};Gwt.Gui.StaticText.prototype.Reset=function(){this.SetText("Default Text")};Gwt.Gui.VBox=function(a,b){Gwt.Gui.Frame.call(this);this.Childs=null;this.MarginElements=null;this.Alignment=null;this.init_vbox(b)};Gwt.Gui.VBox.prototype=new Gwt.Gui.Frame();Gwt.Gui.VBox.prototype.constructor=Gwt.Gui.VBox;Gwt.Gui.VBox.prototype.finalize_vbox=function(){this.Childs=null;this.MarginElements=null;this.Alignment=null;this.FinalizeFrame()};Gwt.Gui.VBox.prototype.init_vbox=function(a){this.SetClassName("Gwt_Gui_VBox");this.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);this.SetAlignment(Gwt.Gui.ALIGN_LEFT);this.Childs=[];this.MarginElements=typeof(a)=="undefined"?12:a};Gwt.Gui.VBox.prototype.GetChilds=function(){return this.Childs};Gwt.Gui.VBox.prototype.GetMarginElements=function(){return this.MarginElements};Gwt.Gui.VBox.prototype.Add=function(b){this.GetChilds().push(b);this.GetHtml().appendChild(b.GetHtml());if(b.GetClassName()=="Gwt_Gui_HBox"){var a=[];for(var d=0;d<this.GetChilds().length;d++){if(this.GetChilds()[d].GetClassName()=="Gwt_Gui_HBox"){a.push(this.GetChilds()[d])}}for(var c=0;c<a.length;c++){a[c].SetWidth(this.GetWidth());a[c].SetHeight(this.GetHeight()/a.length)}}else{b.SetDisplay(Gwt.Gui.Contrib.Display.InlineBlock);if(b.GetHtml()==this.GetHtml().firstChild){b.SetMargin(0)}else{if(b.GetHtml()==this.GetHtml().lastChild){b.SetMarginTop(this.GetMarginElements())}}if(b.IsExpand()){b.SetWidth(this.GetWidth()*0.99)}if(!b.IsExpand()){switch(this.GetAlignment()){case Gwt.Gui.ALIGN_LEFT:b.SetMarginLeft(0);break;case Gwt.Gui.ALIGN_CENTER:b.SetMarginLeft((this.GetWidth()-b.GetWidth())/2);break;case Gwt.Gui.ALIGN_RIGHT:b.SetMarginLeft(this.GetWidth()-b.GetWidth());break;default:console.log("imposible set alignment in vbox.");break}}}};Gwt.Gui.VBox.prototype.SetAlignment=function(a){switch(a){case Gwt.Gui.ALIGN_CENTER:this.Alignment=Gwt.Gui.ALIGN_CENTER;break;case Gwt.Gui.ALIGN_LEFT:this.Alignment=Gwt.Gui.ALIGN_LEFT;break;case Gwt.Gui.ALIGN_RIGHT:this.Alignment=Gwt.Gui.ALIGN_RIGHT;break;default:console.log("Alignment not valid in vbox.");break}};Gwt.Gui.VBox.prototype.GetAlignment=function(){return this.Alignment};Gwt.Gui.Slider=function(a){Gwt.Gui.Frame.call(this);this.Slots=null;this.Panel=null;this.ArrowLeft=null;this.ArrowRight=null;this.Viewer=null;this.Slide=null;this.InitSlider(a)};Gwt.Gui.Slider.prototype=new Gwt.Gui.Frame();Gwt.Gui.Slider.prototype.constructor=Gwt.Gui.Slider;Gwt.Gui.Slider.prototype.FinalizeSlider=function(a){this.Slots=null;this.Panel=null;this.ArrowLeft=null;this.ArrowRight=null;this.Viewer=null;this.Slide=null;this.FinalizeFrame()};Gwt.Gui.Slider.prototype.InitSlider=function(a){this.SetClassName("Gwt_Gui_Slider");this.Slots=new Array(typeof(a)=="undefined"?1:a);this.Panel=new Gwt.Gui.Frame();this.ArrowLeft=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"arrow-left.svg","");this.ArrowLeft.SetWidth(24);this.ArrowLeft.AddEvent(Gwt.Gui.Event.Mouse.Click,this.SlideRight.bind(this));this.ArrowRight=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"arrow-right.svg","");this.ArrowRight.SetWidth(24);this.ArrowRight.AddEvent(Gwt.Gui.Event.Mouse.Click,this.SlideLeft.bind(this));this.Viewer=new Gwt.Gui.Frame();this.Slide=new Gwt.Gui.HBox();this._Add(this.Viewer);this._Add(this.Panel)};Gwt.Gui.Slider.prototype.GetSlots=function(){return this.Slots};Gwt.Gui.Slider.prototype._Add=function(a){a.Parent=this;this.Add(a)};Gwt.Gui.Slider.prototype.Setup=function(){this.Panel.SetSize(this.GetWidth(),28);this.Viewer.SetSize(this.GetWidth(),(this.GetHeight()-28));var e=new Gwt.Gui.HBox();var d=new Gwt.Gui.VBox();var c=new Gwt.Gui.VBox();e.SetSize(this.Panel.GetWidth(),28);d.SetHeight(28);c.SetHeight(28);c.SetAlignment(Gwt.Gui.ALIGN_RIGHT);e.Add(d);e.Add(c);this.Panel.Add(e);d.Add(this.ArrowLeft);c.Add(this.ArrowRight);this.Slide.SetSize(this.Viewer.GetWidth()*this.GetSlots().length,this.Viewer.GetHeight());this.Viewer.Add(this.Slide);for(var b=0;b<this.GetSlots().length;b++){var a=new Gwt.Gui.VBox();this.GetSlots()[b]=a}for(var b=0;b<this.GetSlots().length;b++){this.Slide.Add(this.GetSlots()[b])}};Gwt.Gui.Slider.prototype.SlideLeft=function(){if(-this.Slide.GetPositionLeft()<(this.GetSlots().length-1)*this.Viewer.GetWidth()){this.Slide.SetPosition(0,this.Slide.GetPositionLeft()-this.Viewer.GetWidth())}};Gwt.Gui.Slider.prototype.SlideRight=function(){if(this.Slide.GetPositionLeft()<0&&this.Slide.GetPositionLeft()<(this.GetSlots().length-1)*this.Viewer.GetWidth()){this.Slide.SetPosition(0,this.Slide.GetPositionLeft()+this.Viewer.GetWidth())}};Gwt.Gui.Slider.prototype.AddSlotWidget=function(b,a){this.GetSlots()[b].Add(a)};Gwt.Gui.Clock=function(){Gwt.Gui.Frame.call(this);this.resource=null;this.seconds=null;this.minutes=null;this.hours=null;this.seconds_bar=null;this.minutes_bar=null;this.hours_bar=null;this.center=null;this.seconds_interval=null;this.InitClock()};Gwt.Gui.Clock.prototype=new Gwt.Gui.Frame();Gwt.Gui.Clock.prototype.constructor=Gwt.Gui.Clock;Gwt.Gui.Clock.prototype.FinalizeClock=function(){this.resource=null;this.seconds=null;this.minutes=null;this.hours=null;this.seconds_bar=null;this.minutes_bar=null;this.hours_bar=null;this.center=null;this.seconds_interval=null;this.FinalizeFrame()};Gwt.Gui.Clock.prototype.InitClock=function(){this.SetClassName("Gwt_Gui_Clock");this.SetSize(200,200);this.resource=new XMLHttpRequest();this.resource.open("GET",Gwt.Core.Contrib.Images+"clock.svg",true);this.resource.overrideMimeType("image/svg+xml");this.resource.onreadystatechange=this.Ready.bind(this);this.resource.send("")};Gwt.Gui.Clock.prototype.Ready=function(){if(this.resource.readyState==4&&this.resource.status==200){this.Html.appendChild(this.resource.responseXML.documentElement);var a=new Date();this.seconds=a.getSeconds();this.minutes=a.getMinutes();this.hours=a.getHours();this.seconds_bar=this.Html.firstChild.getElementById("seconds");this.minutes_bar=this.Html.firstChild.getElementById("minutes");this.hours_bar=this.Html.firstChild.getElementById("hours");this.center={x:this.Html.firstChild.getAttribute("width")/2,y:this.Html.firstChild.getAttribute("height")/2};this.seconds_bar.setAttribute("transform","rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");this.seconds_interval=setInterval(this.UpdateSeconds.bind(this),1000);this.minutes_bar.setAttribute("transform","rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");this.hours_bar.setAttribute("transform","rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")")}};Gwt.Gui.Clock.prototype.UpdateSeconds=function(){this.seconds+=1;this.seconds_bar.setAttribute("transform","rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");if(this.seconds==60){this.seconds=0;this.UpdateMinutes()}};Gwt.Gui.Clock.prototype.UpdateMinutes=function(){this.minutes+=1;this.minutes_bar.setAttribute("transform","rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");if(this.minutes==60){this.minutes=0;this.UpdateHours()}};Gwt.Gui.Clock.prototype.UpdateHours=function(){this.hours+=1;this.hours_bar.setAttribute("transform","rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");if(this.hours==24){this.hours=0}};Gwt.Gui.ButtonSvUpDl=function(){Gwt.Gui.Button.call(this,Gwt.Core.Contrib.Images+"appbar.cabinet.in.svg","Guardar");this.Update=null;this.InitButtonSvUpDl()};Gwt.Gui.ButtonSvUpDl.prototype=new Gwt.Gui.Button();Gwt.Gui.ButtonSvUpDl.prototype.constructor=Gwt.Gui.ButtonSvUpDl;Gwt.Gui.ButtonSvUpDl.prototype.FinalizeButtonSvUpDl=function(){this.Update=null;this.FinalizeButton()};Gwt.Gui.ButtonSvUpDl.prototype.InitButtonSvUpDl=function(){this.SetWidth(90);this.SetText("Guardar");this.AddEvent(Gwt.Gui.Event.Mouse.Mousemove,this.CtrlSvUpDl.bind(this));this.AddEvent(Gwt.Gui.Event.Mouse.Mouseout,this.CtrlReset.bind(this));this.Update=false};Gwt.Gui.ButtonSvUpDl.prototype.CtrlSvUpDl=function(a){if(!this.Update){this.SetImage(Gwt.Core.Contrib.Images+"icons/list-add.svg");this.SetWidth(85);this.SetText("Guardar")}else{if(this.Update&&!a.ctrlKey){this.SetImage(Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");this.SetWidth(100);this.SetText("Actualizar")}else{if(this.Update&&a.ctrlKey){this.SetImage(Gwt.Core.Contrib.Images+"icons/application-exit.svg");this.SetWidth(90);this.SetText("Eliminar")}}}};Gwt.Gui.ButtonSvUpDl.prototype.CtrlReset=function(a){if(!this.Update){this.SetImage(Gwt.Core.Contrib.Images+"icons/list-add.svg");this.SetWidth(85);this.SetText("Guardar")}else{this.SetImage(Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");this.SetWidth(100);this.SetText("Actualizar")}};Gwt.Gui.ButtonSvUpDl.prototype.set_update=function(a){this.Update=a;if(this.Update){this.SetImage(Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");this.SetWidth(100);this.SetText("Actualizar")}else{this.SetImage(Gwt.Core.Contrib.Images+"icons/list-add.svg");this.SetWidth(85);this.SetText("Guardar")}};Gwt.Gui.ButtonOnOff=function(){Gwt.Gui.Frame.call(this);this.Graphic=null;this.InitButtonOnOff();this.Status=0};Gwt.Gui.ButtonOnOff.prototype=new Gwt.Gui.Frame();Gwt.Gui.ButtonOnOff.prototype.constructor=Gwt.Gui.ButtonOnOff;Gwt.Gui.ButtonOnOff.prototype.FinalizeButtonOnOff=function(){this.Graphic=null;this.FinalizeFrame()};Gwt.Gui.ButtonOnOff.prototype.InitButtonOnOff=function(){this.SetClassName("Gwt_Gui_Button_on_off");this.SetSize(48,24);this.SetBorder(1);this.SetOutLine(Gwt.Gui.Contrib.OutLine.None);var a=new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Azure);a.SetAlpha(0.5);this.SetBorderColor(a);var b=new Gwt.Gui.Contrib.Color(25,25,25);b.SetAlpha(0.25);this.SetBackgroundColor(b);this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);this.SetBorderRadius(24);this.Graphic=new Gwt.Graphic.Svg.Canvas();this.Graphic.SetSize(24,24);this.Graphic.SetViewBox(0,0,this.Graphic.GetWidth(),this.Graphic.GetHeight());this.Circle=new Gwt.Graphic.Svg.Circle();this.Circle.SetFill("Azure");this.Circle.SetCx(12);this.Circle.SetCy(12);this.AddEvent(Gwt.Gui.Event.Mouse.Click,this.Click.bind(this));this.Graphic.Add(this.Circle);this.Add(this.Graphic)};Gwt.Gui.ButtonOnOff.prototype.Click=function(){if(this.Status===0){this.Graphic.SetPosition(24,0);var a=new Gwt.Gui.Contrib.Color(0,102,255);a.SetAlpha(0.3);this.SetBackgroundColor(a);this.Status=1}else{this.Graphic.SetPosition(0,0);var a=new Gwt.Gui.Contrib.Color(25,25,25);a.SetAlpha(0.25);this.SetBackgroundColor(a);this.Status=0}};Gwt.Graphic=new Object();Gwt.Graphic.Svg=new Object();Gwt.Graphic.Svg.Contrib=new Object();Gwt.Graphic.Svg.Contrib.AspectRatio={XMinYMin:"xMimYMin",XMidYMid:"xMidYMid",XMaxYMax:"xMaxYMax",XMinYMid:"xMinYMid",XMidYMin:"xMidYMin",XMidYMax:"xMidYMax",XMaxYMid:"xMaxYMid",XMinYMax:"xMinYMax",XMaxYMin:"xMaxYMin"};Gwt.Graphic.Svg.Contrib.ZoomAndPan={Magnify:"magnify",Disable:"disable"};Gwt.Graphic.Svg.Contrib.StrokeLineCap={Butt:"butt",Round:"round",Square:"square"};Gwt.Graphic.Svg.Graphic=function(){this.Html=null;this.Width=null;this.Height=null;this.Fill=null;this.FillOpacity=null;this.Stroke=null;this.StrokeOpacity=null;this.StrokeWidth=null;this.StrokeLineCap=null;this.StrokeDashArray=null;this.InitGraphic()};Gwt.Graphic.Svg.Graphic.prototype.InitGraphic=function(){this.Html=document.createElement("svg");this.SetWidth(100);this.SetHeight(100)};Gwt.Graphic.Svg.Graphic.prototype.FinalizeGraphic=function(){this.Html=null;this.Width=null;this.Height=null};Gwt.Graphic.Svg.Graphic.prototype.Add=function(a){this.Html.appendChild(a.Html)};Gwt.Graphic.Svg.Graphic.prototype.SetWidth=function(a){this.Width=a;this.Html.setAttribute("width",this.Width+"px")};Gwt.Graphic.Svg.Graphic.prototype.GetWidth=function(){return this.Width};Gwt.Graphic.Svg.Graphic.prototype.SetHeight=function(a){this.Height=a;this.Html.setAttribute("height",this.Height+"px")};Gwt.Graphic.Svg.Graphic.prototype.GetHeight=function(){return this.Height};Gwt.Graphic.Svg.Graphic.prototype.SetSize=function(a,b){this.SetWidth(a);this.SetHeight(b)};Gwt.Graphic.Svg.Graphic.prototype.SetFill=function(a){this.Fill=a;this.Html.setAttribute("fill",this.Fill)};Gwt.Graphic.Svg.Graphic.prototype.SetFillOpacity=function(a){this.FillOpacity=a;this.Html.setAttribute("fill-opacity",this.FillOpacity)};Gwt.Graphic.Svg.Graphic.prototype.SetStroke=function(a){this.Stroke=a;this.Html.setAttribute("stroke",this.Stroke)};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeOpacity=function(a){this.StrokeOpacity=a;this.Html.setAttribute("stroke-opacity",this.StrokeOpacity)};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeWidth=function(a){this.StrokeWidth=a;this.Html.setAttribute("stroke-width",this.StrokeWidth+"px")};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeLineCap=function(a){this.StrokeLineCap=a;this.Html.setAttribute("stroke-linecap",this.StrokeLineCap)};Gwt.Graphic.Svg.Graphic.prototype.SetStrokeDashArray=function(a){this.StrokeDashArray=a;this.Html.setAttribute("stroke-dasharray",this.StrokeDashArray)};Gwt.Graphic.Svg.Canvas=function(){Gwt.Gui.Frame.call(this);this.X=null;this.Y=null;this.ViewBoxMinX=null;this.ViewBoxMinY=null;this.ViewBoxWidth=null;this.ViewBoxHeight=null;this.PreserveAspectRatio=null;this.ZoomAndPan=null;this.Xmlns=null;this.XmlnsXlink=null;this.XmlSpace=null;this.InitCanvas()};Gwt.Graphic.Svg.Canvas.prototype=new Gwt.Gui.Frame();Gwt.Graphic.Svg.Canvas.prototype.constructor=Gwt.Graphic.Svg.Canvas;Gwt.Graphic.Svg.Canvas.prototype.InitCanvas=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","svg");this.SetX(0);this.SetY(0);this.SetWidth(100);this.SetHeight(100);this.SetViewBox(0,0,this.GetWidth(),this.GetHeight());this.SetPreserveAspectRatio(Gwt.Graphic.Svg.Contrib.AspectRatio.XMaxYMax);this.SetZoomAndPan(Gwt.Graphic.Svg.Contrib.ZoomAndPan.Disable);this.SetXmlns("http://www.w3.org/2000/svg","http://www.w3.org/1999/xlink","preserve");this.SetPositionType(Gwt.Gui.Contrib.PositionType.Relative)};Gwt.Graphic.Svg.Canvas.prototype.FinalizeCanvas=function(){this.FinalizeSvgGraphic();this.X=null;this.Y=null;this.ViewBoxMinX=null;this.ViewBoxMinY=null;this.ViewBoxWidth=null;this.ViewBoxHeight=null;this.PreserveAspectRatio=null;this.ZoomAndPan=null;this.Xmlns=null;this.XmlnsXlink=null;this.XmlSpace=null};Gwt.Graphic.Svg.Canvas.prototype.SetX=function(a){this.X=a;this.Html.setAttribute("x",this.X+"px")};Gwt.Graphic.Svg.Canvas.prototype.GetX=function(){return this.X};Gwt.Graphic.Svg.Canvas.prototype.SetY=function(a){this.Y=a;this.Html.setAttribute("Y",this.Y+"px")};Gwt.Graphic.Svg.Canvas.prototype.GetY=function(){return this.Y};Gwt.Graphic.Svg.Canvas.prototype.SetViewBox=function(c,b,a,d){this.ViewBoxMinX=c;this.ViewBoxMinY=b;this.ViewBoxWidth=a;this.ViewBoxHeight=d;this.Html.setAttribute("viewBox",this.ViewBoxMinX+", "+this.ViewBoxMinX+", "+this.ViewBoxWidth+", "+this.ViewBoxHeight)};Gwt.Graphic.Svg.Canvas.prototype.SetPreserveAspectRatio=function(a){this.PreserveAspectRatio=a;this.Html.setAttribute("preserveAspectRatio",this.PreserveAspectRatio)};Gwt.Graphic.Svg.Canvas.prototype.SetZoomAndPan=function(a){this.ZoomAndPan=a;this.Html.setAttribute("zoomAndPan",this.ZoomAndPan)};Gwt.Graphic.Svg.Canvas.prototype.SetXmlns=function(b,c,a){this.Xmlns=b;this.XmlnsXlink=c;this.XmlSpace=a;this.Html.setAttribute("xmlns",this.Xmlns);this.Html.setAttribute("xmlns:xlink",this.XmlnsXlink);this.Html.setAttribute("xml:space",this.XmlSpace)};Gwt.Graphic.Svg.Rect=function(){Gwt.Graphic.Svg.Graphic.call(this);this.X=null;this.Y=null;this.Rx=null;this.Ry=null;this.InitRect()};Gwt.Graphic.Svg.Rect.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Rect.prototype.constructor=Gwt.Graphic.Svg.Rect;Gwt.Graphic.Svg.Rect.prototype.InitRect=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","rect");this.SetX(0);this.SetY(0);this.SetSize(100,100)};Gwt.Graphic.Svg.Rect.prototype.SetX=function(a){this.X=a;this.Html.setAttribute("x",this.X+"px")};Gwt.Graphic.Svg.Rect.prototype.GetX=function(){return this.X};Gwt.Graphic.Svg.Rect.prototype.SetY=function(a){this.Y=a;this.Html.setAttribute("Y",this.Y+"px")};Gwt.Graphic.Svg.Rect.prototype.GetY=function(){return this.Y};Gwt.Graphic.Svg.Rect.prototype.SetRx=function(a){this.Rx=a;this.Html.setAttribute("rx",this.Rx+"px")};Gwt.Graphic.Svg.Rect.prototype.GetRx=function(){return this.Rx};Gwt.Graphic.Svg.Rect.prototype.SetRy=function(a){this.Ry=a;this.Html.setAttribute("ry",this.Ry+"px")};Gwt.Graphic.Svg.Rect.prototype.GetRy=function(){return this.Ry};Gwt.Graphic.Svg.Circle=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Cx=null;this.Cy=null;this.R=null;this.InitCircle()};Gwt.Graphic.Svg.Circle.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Circle.prototype.constructor=Gwt.Graphic.Svg.Circle;Gwt.Graphic.Svg.Circle.prototype.InitCircle=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","circle");this.SetCx(0);this.SetCy(0);this.SetR(10)};Gwt.Graphic.Svg.Circle.prototype.SetCx=function(a){this.Cx=a;this.Html.setAttribute("cx",this.Cx+"px")};Gwt.Graphic.Svg.Circle.prototype.GetCx=function(){return this.Cx};Gwt.Graphic.Svg.Circle.prototype.SetCy=function(a){this.Cy=a;this.Html.setAttribute("cy",this.Cy+"px")};Gwt.Graphic.Svg.Circle.prototype.GetCy=function(){return this.Cy};Gwt.Graphic.Svg.Circle.prototype.SetR=function(a){this.R=a;this.Html.setAttribute("r",this.R+"px")};Gwt.Graphic.Svg.Circle.prototype.GetR=function(){return this.R};Gwt.Graphic.Svg.Ellipse=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Cx=null;this.Cy=null;this.Rx=null;this.Ry=null;this.InitEllipse()};Gwt.Graphic.Svg.Ellipse.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Ellipse.prototype.constructor=Gwt.Graphic.Svg.Ellipse;Gwt.Graphic.Svg.Ellipse.prototype.InitEllipse=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","ellipse");this.SetCx(0);this.SetCy(0);this.SetRx(0);this.SetRy(0)};Gwt.Graphic.Svg.Ellipse.prototype.SetCx=function(a){this.Cx=a;this.Html.setAttribute("cx",this.Cx+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetCx=function(){return this.Cx};Gwt.Graphic.Svg.Ellipse.prototype.SetCy=function(a){this.Cy=a;this.Html.setAttribute("cy",this.Cy+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetCy=function(){return this.Cy};Gwt.Graphic.Svg.Ellipse.prototype.SetRx=function(a){this.Rx=a;this.Html.setAttribute("rx",this.Rx+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetRx=function(){return this.Rx};Gwt.Graphic.Svg.Ellipse.prototype.SetRy=function(a){this.Ry=a;this.Html.setAttribute("ry",this.Ry+"px")};Gwt.Graphic.Svg.Ellipse.prototype.GetRy=function(){return this.Ry};Gwt.Graphic.Svg.Line=function(){Gwt.Graphic.Svg.Graphic.call(this);this.X1=null;this.Y1=null;this.X2=null;this.Y2=null;this.InitLine()};Gwt.Graphic.Svg.Line.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Line.prototype.constructor=Gwt.Graphic.Svg.Line;Gwt.Graphic.Svg.Line.prototype.InitLine=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","line");this.SetP1(0,0);this.SetP2(10,10)};Gwt.Graphic.Svg.Line.prototype.SetX1=function(a){this.X1=a;this.Html.setAttribute("x1",this.X1+"px")};Gwt.Graphic.Svg.Line.prototype.GetX1=function(){return this.X1};Gwt.Graphic.Svg.Line.prototype.SetY1=function(a){this.Y1=a;this.Html.setAttribute("y1",this.Y1+"px")};Gwt.Graphic.Svg.Line.prototype.GetY1=function(){return this.Y1};Gwt.Graphic.Svg.Line.prototype.SetX2=function(a){this.X2=a;this.Html.setAttribute("x2",this.X2+"px")};Gwt.Graphic.Svg.Line.prototype.GetX2=function(){return this.X2};Gwt.Graphic.Svg.Line.prototype.SetY2=function(a){this.Y2=a;this.Html.setAttribute("y2",this.Y2+"px")};Gwt.Graphic.Svg.Line.prototype.GetY2=function(){return this.Y2};Gwt.Graphic.Svg.Line.prototype.SetP1=function(b,a){this.SetX1(b);this.SetY1(a)};Gwt.Graphic.Svg.Line.prototype.SetP2=function(b,a){this.SetX2(b);this.SetY2(a)};Gwt.Graphic.Svg.Polygon=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Points=null;this.FillRule=null;this.InitPolygon()};Gwt.Graphic.Svg.Polygon.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Polygon.prototype.constructor=Gwt.Graphic.Svg.Polygon;Gwt.Graphic.Svg.Polygon.prototype.InitPolygon=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","polygon")};Gwt.Graphic.Svg.Polygon.prototype.SetPoints=function(a){this.Points=a;this.Html.setAttribute("points",this.Points)};Gwt.Graphic.Svg.Polygon.prototype.GetPoints=function(){return this.Points};Gwt.Graphic.Svg.Polygon.prototype.SetFillRule=function(a){this.FillRule=a;this.Html.setAttribute("fill-rule",this.FillRule)};Gwt.Graphic.Svg.Polyline=function(){Gwt.Graphic.Svg.Graphic.call(this);this.Points=null;this.InitPolygon()};Gwt.Graphic.Svg.Polyline.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Polyline.prototype.constructor=Gwt.Graphic.Svg.Polyline;Gwt.Graphic.Svg.Polyline.prototype.InitPolyline=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","polyline")};Gwt.Graphic.Svg.Polyline.prototype.SetPoints=function(a){this.Points=a;this.Html.setAttribute("points",this.Points)};Gwt.Graphic.Svg.Polyline.prototype.GetPoints=function(){return this.Points};Gwt.Graphic.Svg.Path=function(){Gwt.Graphic.Svg.Graphic.call(this);this.D=null;this.M=null;this.L=null;this.H=null;this.V=null;this.C=null;this.S=null;this.Q=null;this.T=null;this.A=null;this.Z=null;this.InitPath()};Gwt.Graphic.Svg.Path.prototype=new Gwt.Graphic.Svg.Graphic();Gwt.Graphic.Svg.Path.prototype.constructor=Gwt.Graphic.Svg.Path;Gwt.Graphic.Svg.Path.prototype.InitPath=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","path")};Gwt.Graphic.Svg.Path.prototype.SetD=function(a){this.D=a;this.Html.setAttribute("d",this.D)};Gwt.Graphic.Svg.Path.prototype.GetD=function(){return this.D};Gwt.Graphic.Svg.Path.prototype.SetM=function(a){this.M="M"+a};Gwt.Graphic.Svg.Path.prototype.GetM=function(){return this.M};Gwt.Graphic.Svg.Path.prototype.SetL=function(a){this.L="L"+a};Gwt.Graphic.Svg.Path.prototype.GetL=function(){return this.L};Gwt.Graphic.Svg.Path.prototype.SetH=function(a){this.H="H"+a};Gwt.Graphic.Svg.Path.prototype.GetH=function(){return this.H};Gwt.Graphic.Svg.Path.prototype.SetV=function(a){this.V="V"+a};Gwt.Graphic.Svg.Path.prototype.GetV=function(){return this.V};Gwt.Graphic.Svg.Path.prototype.SetC=function(a){this.C="C"+a};Gwt.Graphic.Svg.Path.prototype.GetC=function(){return this.C};Gwt.Graphic.Svg.Path.prototype.SetS=function(a){this.S="S"+a};Gwt.Graphic.Svg.Path.prototype.GetS=function(){return this.S};Gwt.Graphic.Svg.Path.prototype.SetQ=function(a){this.Q="Q"+a};Gwt.Graphic.Svg.Path.prototype.GetQ=function(){return this.Q};Gwt.Graphic.Svg.Path.prototype.SetT=function(a){this.T="T"+a};Gwt.Graphic.Svg.Path.prototype.GetT=function(){return this.T};Gwt.Graphic.Svg.Path.prototype.SetA=function(a){this.A="A"+a};Gwt.Graphic.Svg.Path.prototype.GetA=function(){return this.A};Gwt.Graphic.Svg.Path.prototype.SetZ=function(){this.Z="Z"};Gwt.Graphic.Svg.Path.prototype.UnsetZ=function(){this.A=""};Gwt.Graphic.Svg.Path.prototype.GetZ=function(){return this.Z};Gwt.Graphic.Svg.Arc=function(){Gwt.Graphic.Svg.Path.call(this);this.X1=null;this.Y1=null;this.X2=null;this.Y2=null;this.CenterX=null;this.CenterY=null;this.Radius=null;this.InitArc()};Gwt.Graphic.Svg.Arc.prototype=new Gwt.Graphic.Svg.Path();Gwt.Graphic.Svg.Arc.prototype.constructor=Gwt.Graphic.Svg.Arc;Gwt.Graphic.Svg.Arc.prototype.InitArc=function(){this.Html=document.createElementNS("http://www.w3.org/2000/svg","path")};Gwt.Graphic.Svg.Arc.prototype.PolarToCartesian=function(d,c,b){var a=(b-90)*(Math.PI/180);return{x:(d+(this.Radius*Math.cos(a))),y:(c+(this.Radius*Math.sin(a)))}};Gwt.Graphic.Svg.Arc.prototype.DescribeArc=function(h,e,g,a,c){this.CenterX=h;this.CenterY=e;this.Radius=g;var f=this.PolarToCartesian(h,e,c);this.X1=f.x;this.Y1=f.y;var b=this.PolarToCartesian(h,e,a);this.X2=b.x;this.Y2=b.y;var d=c-a<=180?"0":"1";this.SetM([this.X1,this.Y1].join(" "));this.SetA([this.Radius,this.Radius,0,d,0,this.X2,this.Y2].join(" "));this.SetL([this.CenterX,this.CenterY].join(" "));this.SetZ();this.SetD([this.GetM(),this.GetA(),this.GetL(),this.GetZ()].join(" "))};window.addEventListener("load",init);function init(a){desktop.open();test.open()}function start_up_env(a){login.close();new Gwt.Core.Request("/backend/sys/",{action:"start_up_env",username:a},function(b){sessionStorage.setItem("session","active");sessionStorage.setItem("group",b.response.group);sessionStorage.setItem("user",b.response.user);start_session()})}function start_session(a){lancelot.open();document.onmousemove=renueve_session;document.onkeypress=renueve_session;if(typeof(session_env)!="undefined"){clearTimeout(session_env)}session_env=setTimeout(block_session,60000)}function block_session(){sessionStorage.setItem("session","block");lancelot.close();block.open();if(typeof(session_env)!="undefined"){clearTimeout(session_env)}session_env=setTimeout(close_session,60000)}function unlock_session(){clearTimeout(session_env);session_env=null;block.close();login.open()}function renueve_session(){if(sessionStorage.hasOwnProperty("session")){if(sessionStorage.getItem("session")!="block"){clearTimeout(session_env);session_env=setTimeout(block_session,60000)}}}function close_session(){clearTimeout(session_env);session_env=null;new Gwt.Core.Request("/backend/auth/",{action:"logout"},function(a){console.log(a)});sessionStorage.clear();block.close();login.open()};desktop=(function(){var a;function b(){Gwt.Gui.Frame.call(this);document.body.appendChild(this.Html);this.SetClassName("Gwt_Gui_Desktop");this.SetSize(Gwt.Gui.SCREEN_DEVICE_WIDTH,Gwt.Gui.SCREEN_DEVICE_HEIGHT);this.SetMargin(0);this.SetPadding(0);this.SetBackgroundImage(Gwt.Core.Contrib.Images+"dark1.jpeg");this.SetBackgroundAttachment(Gwt.Gui.Contrib.BackgroundAttachment.Fixed);this.SetBackgroundClip(Gwt.Gui.Contrib.BackgroundClip.ContentBox);this.SetBackgroundRepeat(Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat,Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);this.SetBackgroundSize(Gwt.Gui.Contrib.BackgroundSize.Cover);this.SetBorder(0)}b.prototype=new Gwt.Gui.Frame();b.prototype.constructor=b;b.prototype.Show=function(c){this.Add(c)};return new function(){this.open=function(){if(a==null){a=new b()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.show=function(c){a.Show(c)}}})();login=(function(){var a;function b(){Gwt.Gui.Window.call(this);this.SetSize(Gwt.Gui.SCREEN_DEVICE_WIDTH-50,Gwt.Gui.SCREEN_DEVICE_HEIGHT-50);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.imageLogin=new Gwt.Gui.Image(Gwt.Core.Contrib.Images+"connecting_world.svg");this.imageLogin.SetSize(500,350);this.imageLogin.SetPosition(170,180);this.imageLogin.SetPositionType(Gwt.Gui.Contrib.PositionType.Absolute);this.title_label=new Gwt.Gui.StaticText("Login");this.id_type_select=new Gwt.Gui.SelectBox("Tipo de Documento",[{text:"Tarjeta de Identidad",value:"T.I"},{text:"Cédula de Ciudadanía",value:"C.C"},{text:"Registro Civil",value:"R.C"},{text:"Cédula Extranjera",value:"C.E"},{text:"Pasaporte",value:"PS"},{text:"Libreta Militar",value:"L.M"},{text:"Registro de Defunción",value:"R.D"},{text:"Carnét de Salud",value:"C.S"},{text:"Registro Mercantil",value:"R.M"}]);this.username_entry=new Gwt.Gui.Entry("Número de Documento");this.username_entry.SetFocus();this.password_entry=new Gwt.Gui.Entry("Contraseña");this.password_entry.ChangeToPassword();this.password_entry.SetMaxLength(4);this.send_button=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"ArrowRight.svg","Entrar");this.send_button.SetWidth(80);this.send_button.AddEvent(Gwt.Gui.Event.Mouse.Click,this.send.bind(this));this.controls_container=new Gwt.Gui.VBox();this.controls_container.SetSize(180,170);this.controls_container.SetPosition((this.GetWidth()*70)/100,((this.GetHeight()*50)/100)-(this.controls_container.GetHeight()/2));this.Add(this.imageLogin);this.Add(this.controls_container);this.controls_container.Add(this.title_label);this.controls_container.Add(this.id_type_select);this.controls_container.Add(this.username_entry);this.controls_container.Add(this.password_entry);this.controls_container.Add(this.send_button)}b.prototype=new Gwt.Gui.Window();b.prototype.constructor=b;b.prototype.send=function(){if(this.username_entry.GetText()!==""&&this.password_entry.GetText()!==""){var c=new jsSHA(this.password_entry.GetText(),"TEXT").getHash("SHA-256","HEX");new Gwt.Core.Request("/backend/auth/",{username:this.username_entry.GetText(),password:c},this.response.bind(this))}else{console.log("Datos vacíos")}};b.prototype.response=function(c){if(c.status=="success"){if(Boolean(Number(c.response))){start_up_env(this.username_entry.GetText())}}else{console.log(c)}};return new function(){this.open=function(){if(a===undefined){a=new b();a.Open()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.close=function(){if(a!==undefined){a.Close();a=undefined}}}})();block=(function(){var a;function b(){Gwt.Gui.Window.call(this);this.SetSize(250,300);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);var d=new Date();var e=["Dom","Lun","Mar","Mie","Jue","Vie","Sáb"];var c=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];this.clock=new Gwt.Gui.Clock();this.date=new Gwt.Gui.StaticText("%d, %m %n, %y".replace("%d",e[d.getDay()]).replace("%m",c[d.getMonth()]).replace("%n",d.getDate()).replace("%y",d.getFullYear()));this.date.SetWidth(180);this.date.TextAlign("center");this.unlock_button=new Gwt.Gui.Button(Gwt.Core.Contrib.Images+"document-decrypt.svg","Desbloquear");this.unlock_button.SetWidth(120);this.layout=new Gwt.Gui.VBox();this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);this.Add(this.layout);this.SetBorderSpacing(12);this.layout.Add(this.clock);this.layout.Add(this.date);this.layout.Add(this.unlock_button);this.unlock_button.AddEvent(Gwt.Gui.Event.Mouse.Click,this.unlock.bind(this))}b.prototype=new Gwt.Gui.Window();b.prototype.constructor=b;b.prototype.unlock=function(){unlock_session()};return new function(){this.open=function(){if(a===undefined){a=new b();a.Open()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.close=function(){if(a!==undefined){a.Close();a=undefined}}}})();test=(function(){var a;function b(){Gwt.Gui.Window.call(this);this.SetSize(256,256);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.file1=new Gwt.Gui.File();this.file1.AddEvent(Gwt.Gui.Event.Form.Change,this.send.bind(this));this.file1.SetPosition(25,10);this.buttonoff=new Gwt.Gui.ButtonOnOff();this.buttonoff.SetPosition(25,25);this.Add(this.file1);this.Add(this.buttonoff)}b.prototype=new Gwt.Gui.Window();b.prototype.constructor=b;b.prototype.send=function(){var c={user_info:{document:"1098671330",document_type:"c.c"},userfile:this.file1.GetData()};new Gwt.Core.Request("/backend/upload_file/",this.response.bind(this),c)};b.prototype.response=function(c){console.log(c)};return new function(){this.open=function(){if(a===undefined){a=new b();a.Open()}else{console.log("%app open".replace("%app",a.__proto__.constructor.name))}};this.close=function(){if(a!==undefined){a.Close();a=undefined}}}})();cuentas=(function(){var b;function a(){Gwt.Gui.Window.call(this);this.SetSize(200,170);this.SetPosition(Gwt.Gui.WIN_POS_CENTER);this.title_label=new Gwt.Gui.StaticText("Cuentas");this.code=new Gwt.Gui.Entry("Código");this.name=new Gwt.Gui.Entry("Nombre");this.save_button=new Gwt.Gui.ButtonSvUpDl();this.layout=new Gwt.Gui.VBox();this.Add(this.layout);this.SetBorderSpacing(12);this.layout.Add(this.title_label);this.layout.Add(this.code);this.layout.Add(this.name);this.layout.Add(this.save_button);this.update=false;this.id_update_delete=null}a.prototype=new Gwt.Gui.Window();a.prototype.constructor=a;return new function(){this.open=function(){if(b===undefined){b=new a();b.Open()}else{console.log("%app yet opened".replace("%app",b.__proto__.constructor.name))}};this.close=function(){if(b!==undefined){b.Close();b=undefined}}}})();
>>>>>>> upstream/master
=======
;var saveAs=saveAs||(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(l){if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var m=l.document,i=function(){return l.URL||l.webkitURL||l},p=m.createElementNS("http://www.w3.org/1999/xhtml","a"),d="download" in p,q=function(s){var r=m.createEvent("MouseEvents");r.initMouseEvent("click",true,false,l,0,0,0,0,0,false,false,false,false,0,null);s.dispatchEvent(r)},g=l.webkitRequestFileSystem,n=l.requestFileSystem||g||l.mozRequestFileSystem,e=function(r){(l.setImmediate||l.setTimeout)(function(){throw r},0)},k="application/octet-stream",h=0,c=10,o=function(s){var r=function(){if(typeof s==="string"){i().revokeObjectURL(s)}else{s.remove()}};if(l.chrome){r()}else{setTimeout(r,c)}},j=function(s,r,v){r=[].concat(r);var u=r.length;while(u--){var w=s["on"+r[u]];if(typeof w==="function"){try{w.call(s,v||s)}catch(t){e(t)}}}},b=function(r,s){var t=this,z=r.type,C=false,v,u,y=function(){j(t,"writestart progress write writeend".split(" "))},B=function(){if(C||!v){v=i().createObjectURL(r)}if(u){u.location.href=v}else{var D=l.open(v,"_blank");if(D==undefined&&typeof safari!=="undefined"){l.location.href=v}}t.readyState=t.DONE;y();o(v)},x=function(D){return function(){if(t.readyState!==t.DONE){return D.apply(this,arguments)}}},w={create:true,exclusive:false},A;t.readyState=t.INIT;if(!s){s="download"}if(d){v=i().createObjectURL(r);p.href=v;p.download=s;q(p);t.readyState=t.DONE;y();o(v);return}if(l.chrome&&z&&z!==k){A=r.slice||r.webkitSlice;r=A.call(r,0,r.size,k);C=true}if(g&&s!=="download"){s+=".download"}if(z===k||g){u=l}if(!n){B();return}h+=r.size;n(l.TEMPORARY,h,x(function(D){D.root.getDirectory("saved",w,x(function(E){var F=function(){E.getFile(s,w,x(function(G){G.createWriter(x(function(H){H.onwriteend=function(I){u.location.href=G.toURL();t.readyState=t.DONE;j(t,"writeend",I);o(G)};H.onerror=function(){var I=H.error;if(I.code!==I.ABORT_ERR){B()}};"writestart progress write abort".split(" ").forEach(function(I){H["on"+I]=t["on"+I]});H.write(r);t.abort=function(){H.abort();t.readyState=t.DONE};t.readyState=t.WRITING}),B)}),B)};E.getFile(s,{create:false},x(function(G){G.remove();F()}),x(function(G){if(G.code===G.NOT_FOUND_ERR){F()}else{B()}}))}),B)}),B)},a=b.prototype,f=function(r,s){return new b(r,s)};a.abort=function(){var r=this;r.readyState=r.DONE;j(r,"abort")};a.readyState=a.INIT=0;a.WRITING=1;a.DONE=2;a.error=a.onwritestart=a.onprogress=a.onwrite=a.onabort=a.onerror=a.onwriteend=null;return f}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));if(typeof module!=="undefined"&&module!==null){module.exports=saveAs}else{if((typeof define!=="undefined"&&0)){define([],function(){return saveAs})}}void function(a,b){if(typeof module==="object"){module.exports=b()}else{if(0==="function"){define(b)}else{a.adler32cs=b()}}}(jsPDF,function(){var h=typeof ArrayBuffer==="function"&&typeof Uint8Array==="function";var d=null,a=(function(){if(!h){return function o(){return false}}try{var m=require("buffer");if(typeof m.Buffer==="function"){d=m.Buffer}}catch(n){}return function o(p){return p instanceof ArrayBuffer||d!==null&&p instanceof d}}());var b=(function(){if(d!==null){return function m(n){return new d(n,"utf8").toString("binary")}}else{return function m(n){return unescape(encodeURIComponent(n))}}}());var f=65521;var k=function k(r,n){var o=r&65535,m=r>>>16;for(var p=0,q=n.length;p<q;p++){o=(o+(n.charCodeAt(p)&255))%f;m=(m+o)%f}return(m<<16|o)>>>0};var l=function l(s,r){var o=s&65535,n=s>>>16;for(var p=0,q=r.length,m;p<q;p++){o=(o+r[p])%f;n=(n+o)%f}return(n<<16|o)>>>0};var g={};var c=g.Adler32=(function(){var u=function n(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(!isFinite(w=w==null?1:+w)){throw new Error("First arguments needs to be a finite number.")}this.checksum=w>>>0};var q=u.prototype={};q.constructor=u;u.from=function(w){w.prototype=q;return w}(function t(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(w==null){throw new Error("First argument needs to be a string.")}this.checksum=k(1,w.toString())});u.fromUtf8=function(w){w.prototype=q;return w}(function o(x){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(x==null){throw new Error("First argument needs to be a string.")}var w=b(x.toString());this.checksum=k(1,w)});if(h){u.fromBuffer=function(w){w.prototype=q;return w}(function v(w){if(!(this instanceof u)){throw new TypeError("Constructor cannot called be as a function.")}if(!a(w)){throw new Error("First argument needs to be ArrayBuffer.")}var x=new Uint8Array(w);return this.checksum=l(1,x)})}q.update=function p(w){if(w==null){throw new Error("First argument needs to be a string.")}w=w.toString();return this.checksum=k(this.checksum,w)};q.updateUtf8=function m(x){if(x==null){throw new Error("First argument needs to be a string.")}var w=b(x.toString());return this.checksum=k(this.checksum,w)};if(h){q.updateBuffer=function s(w){if(!a(w)){throw new Error("First argument needs to be ArrayBuffer.")}var x=new Uint8Array(w);return this.checksum=l(this.checksum,x)}}q.clone=function r(){return new n(this.checksum)};return u}());g.from=function i(m){if(m==null){throw new Error("First argument needs to be a string.")}return k(1,m.toString())};g.fromUtf8=function e(n){if(n==null){throw new Error("First argument needs to be a string.")}var m=b(n.toString());return k(1,m)};if(h){g.fromBuffer=function j(m){if(!a(m)){throw new Error("First argument need to be ArrayBuffer.")}var n=new Uint8Array(m);return l(1,n)}}return g});var Deflater=(function(h){var ad=15;var b=30;var o=19;var k=29;var e=256;var f=(e+1+k);var g=(2*f+1);var c=256;var U=7;var A=16;var z=17;var D=18;var t=8*2;var x=-1;var M=1;var K=2;var a=0;var Y=0;var C=1;var q=3;var l=4;var u=0;var ac=1;var L=2;var af=-2;var n=-3;var N=-5;var W=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];function r(){var ah=this;function aj(aw){var ax=ah.dyn_tree;var av=ah.stat_desc.static_tree;var an=ah.stat_desc.extra_bits;var ak=ah.stat_desc.extra_base;var au=ah.stat_desc.max_length;var aq;var al,am;var at;var ap;var ar;var ao=0;for(at=0;at<=ad;at++){aw.bl_count[at]=0}ax[aw.heap[aw.heap_max]*2+1]=0;for(aq=aw.heap_max+1;aq<g;aq++){al=aw.heap[aq];at=ax[ax[al*2+1]*2+1]+1;if(at>au){at=au;ao++}ax[al*2+1]=at;if(al>ah.max_code){continue}aw.bl_count[at]++;ap=0;if(al>=ak){ap=an[al-ak]}ar=ax[al*2];aw.opt_len+=ar*(at+ap);if(av){aw.static_len+=ar*(av[al*2+1]+ap)}}if(ao===0){return}do{at=au-1;while(aw.bl_count[at]===0){at--}aw.bl_count[at]--;aw.bl_count[at+1]+=2;aw.bl_count[au]--;ao-=2}while(ao>0);for(at=au;at!==0;at--){al=aw.bl_count[at];while(al!==0){am=aw.heap[--aq];if(am>ah.max_code){continue}if(ax[am*2+1]!=at){aw.opt_len+=(at-ax[am*2+1])*ax[am*2];ax[am*2+1]=at}al--}}}function ai(am,ak){var al=0;do{al|=am&1;am>>>=1;al<<=1}while(--ak>0);return al>>>1}function ag(al,ar,am){var ao=[];var an=0;var ap;var aq;var ak;for(ap=1;ap<=ad;ap++){ao[ap]=an=((an+am[ap-1])<<1)}for(aq=0;aq<=ar;aq++){ak=al[aq*2+1];if(ak===0){continue}al[aq*2]=ai(ao[ak]++,ak)}}ah.build_tree=function(an){var al=ah.dyn_tree;var ap=ah.stat_desc.static_tree;var am=ah.stat_desc.elems;var ar,ak;var aq=-1;var ao;an.heap_len=0;an.heap_max=g;for(ar=0;ar<am;ar++){if(al[ar*2]!==0){an.heap[++an.heap_len]=aq=ar;an.depth[ar]=0}else{al[ar*2+1]=0}}while(an.heap_len<2){ao=an.heap[++an.heap_len]=aq<2?++aq:0;al[ao*2]=1;an.depth[ao]=0;an.opt_len--;if(ap){an.static_len-=ap[ao*2+1]}}ah.max_code=aq;for(ar=Math.floor(an.heap_len/2);ar>=1;ar--){an.pqdownheap(al,ar)}ao=am;do{ar=an.heap[1];an.heap[1]=an.heap[an.heap_len--];an.pqdownheap(al,1);ak=an.heap[1];an.heap[--an.heap_max]=ar;an.heap[--an.heap_max]=ak;al[ao*2]=(al[ar*2]+al[ak*2]);an.depth[ao]=Math.max(an.depth[ar],an.depth[ak])+1;al[ar*2+1]=al[ak*2+1]=ao;an.heap[1]=ao++;an.pqdownheap(al,1)}while(an.heap_len>=2);an.heap[--an.heap_max]=an.heap[1];aj(an);ag(al,ah.max_code,an.bl_count)}}r._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28];r.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0];r.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576];r.d_code=function(ag){return((ag)<256?W[ag]:W[256+((ag)>>>7)])};r.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];r.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];r.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];r.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function Z(aj,ai,ah,ag,al){var ak=this;ak.static_tree=aj;ak.extra_bits=ai;ak.extra_base=ah;ak.elems=ag;ak.max_length=al}Z.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8];Z.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5];Z.static_l_desc=new Z(Z.static_ltree,r.extra_lbits,e+1,f,ad);Z.static_d_desc=new Z(Z.static_dtree,r.extra_dbits,0,b,ad);Z.static_bl_desc=new Z(null,r.extra_blbits,0,o,U);var X=9;var V=8;function m(ag,al,ah,ak,aj){var ai=this;ai.good_length=ag;ai.max_lazy=al;ai.nice_length=ah;ai.max_chain=ak;ai.func=aj}var F=0;var p=1;var H=2;var d=[new m(0,0,0,0,F),new m(4,4,8,4,p),new m(4,5,16,8,p),new m(4,6,32,32,p),new m(4,4,16,16,H),new m(8,16,32,32,H),new m(8,16,128,128,H),new m(8,32,128,256,H),new m(32,128,258,1024,H),new m(32,258,258,4096,H)];var s=["need dictionary","stream end","","","stream error","data error","","buffer error","",""];var I=0;var T=1;var E=2;var j=3;var i=32;var y=42;var S=113;var Q=666;var R=8;var O=0;var ab=1;var B=2;var ae=3;var w=258;var v=(w+ae+1);function P(ai,al,ah,ak){var aj=ai[al*2];var ag=ai[ah*2];return(aj<ag||(aj==ag&&ak[al]<=ak[ah]))}function G(){var aT=this;var aI;var aR;var ba;var aA;var am;var an;var aZ;var aD;var bl;var ag;var aN;var aH;var a1;var ax;var a8;var aP;var bq;var bp;var bg;var aO;var at;var br;var aU;var aK;var aj;var az;var a3;var a9;var ah;var ao;var ay;var bd;var aF;var al;var aB=new r();var bo=new r();var bf=new r();aT.depth=[];var a2;var bi;var a6;var ak;var av;var a7;var aQ;var au;aT.bl_count=[];aT.heap=[];bd=[];aF=[];al=[];function aV(){var bs;ag=2*an;aH[ax-1]=0;for(bs=0;bs<ax-1;bs++){aH[bs]=0}a3=d[a9].max_lazy;ao=d[a9].good_length;ay=d[a9].nice_length;az=d[a9].max_chain;br=0;bp=0;aK=0;bg=aj=ae-1;at=0;a1=0}function aW(){var bs;for(bs=0;bs<f;bs++){bd[bs*2]=0}for(bs=0;bs<b;bs++){aF[bs*2]=0}for(bs=0;bs<o;bs++){al[bs*2]=0}bd[c*2]=1;aT.opt_len=aT.static_len=0;a6=av=0}function bj(){aB.dyn_tree=bd;aB.stat_desc=Z.static_l_desc;bo.dyn_tree=aF;bo.stat_desc=Z.static_d_desc;bf.dyn_tree=al;bf.stat_desc=Z.static_bl_desc;aQ=0;au=0;a7=8;aW()}aT.pqdownheap=function(bs,bu){var bw=aT.heap;var bt=bw[bu];var bv=bu<<1;while(bv<=aT.heap_len){if(bv<aT.heap_len&&P(bs,bw[bv+1],bw[bv],aT.depth)){bv++}if(P(bs,bt,bw[bv],aT.depth)){break}bw[bu]=bw[bv];bu=bv;bv<<=1}bw[bu]=bt};function a4(bA,bz){var bt;var bx=-1;var bs;var bv=bA[0*2+1];var bw=0;var bu=7;var by=4;if(bv===0){bu=138;by=3}bA[(bz+1)*2+1]=65535;for(bt=0;bt<=bz;bt++){bs=bv;bv=bA[(bt+1)*2+1];if(++bw<bu&&bs==bv){continue}else{if(bw<by){al[bs*2]+=bw}else{if(bs!==0){if(bs!=bx){al[bs*2]++}al[A*2]++}else{if(bw<=10){al[z*2]++}else{al[D*2]++}}}}bw=0;bx=bs;if(bv===0){bu=138;by=3}else{if(bs==bv){bu=6;by=3}else{bu=7;by=4}}}}function aL(){var bs;a4(bd,aB.max_code);a4(aF,bo.max_code);bf.build_tree(aT);for(bs=o-1;bs>=3;bs--){if(al[r.bl_order[bs]*2+1]!==0){break}}aT.opt_len+=3*(bs+1)+5+5+4;return bs}function ai(bs){aT.pending_buf[aT.pending++]=bs}function bb(bs){ai(bs&255);ai((bs>>>8)&255)}function aJ(bs){ai((bs>>8)&255);ai((bs&255)&255)}function bk(bu,bt){var bv,bs=bt;if(au>t-bs){bv=bu;aQ|=((bv<<au)&65535);bb(aQ);aQ=bv>>>(t-au);au+=bs-t}else{aQ|=(((bu)<<au)&65535);au+=bs}}function aS(bu,bs){var bt=bu*2;bk(bs[bt]&65535,bs[bt+1]&65535)}function a5(bA,bz){var bt;var bx=-1;var bs;var bv=bA[0*2+1];var bw=0;var bu=7;var by=4;if(bv===0){bu=138;by=3}for(bt=0;bt<=bz;bt++){bs=bv;bv=bA[(bt+1)*2+1];if(++bw<bu&&bs==bv){continue}else{if(bw<by){do{aS(bs,al)}while(--bw!==0)}else{if(bs!==0){if(bs!=bx){aS(bs,al);bw--}aS(A,al);bk(bw-3,2)}else{if(bw<=10){aS(z,al);bk(bw-3,3)}else{aS(D,al);bk(bw-11,7)}}}}bw=0;bx=bs;if(bv===0){bu=138;by=3}else{if(bs==bv){bu=6;by=3}else{bu=7;by=4}}}}function bh(bt,bs,bu){var bv;bk(bt-257,5);bk(bs-1,5);bk(bu-4,4);for(bv=0;bv<bu;bv++){bk(al[r.bl_order[bv]*2+1],3)}a5(bd,bt-1);a5(aF,bs-1)}function a0(){if(au==16){bb(aQ);aQ=0;au=0}else{if(au>=8){ai(aQ&255);aQ>>>=8;au-=8}}}function ar(){bk(ab<<1,3);aS(c,Z.static_ltree);a0();if(1+a7+10-au<9){bk(ab<<1,3);aS(c,Z.static_ltree);a0()}a7=7}function aG(bw,bu){var bs,bv,bt;aT.pending_buf[ak+a6*2]=(bw>>>8)&255;aT.pending_buf[ak+a6*2+1]=bw&255;aT.pending_buf[a2+a6]=bu&255;a6++;if(bw===0){bd[bu*2]++}else{av++;bw--;bd[(r._length_code[bu]+e+1)*2]++;aF[r.d_code(bw)*2]++}if((a6&8191)===0&&a9>2){bs=a6*8;bv=br-bp;for(bt=0;bt<b;bt++){bs+=aF[bt*2]*(5+r.extra_dbits[bt])}bs>>>=3;if((av<Math.floor(a6/2))&&bs<Math.floor(bv/2)){return true}}return(a6==bi-1)}function aY(by,bv){var bx;var bu;var bw=0;var bt;var bs;if(a6!==0){do{bx=((aT.pending_buf[ak+bw*2]<<8)&65280)|(aT.pending_buf[ak+bw*2+1]&255);bu=(aT.pending_buf[a2+bw])&255;bw++;if(bx===0){aS(bu,by)}else{bt=r._length_code[bu];aS(bt+e+1,by);bs=r.extra_lbits[bt];if(bs!==0){bu-=r.base_length[bt];bk(bu,bs)}bx--;bt=r.d_code(bx);aS(bt,bv);bs=r.extra_dbits[bt];if(bs!==0){bx-=r.base_dist[bt];bk(bx,bs)}}}while(bw<a6)}aS(c,by);a7=by[c*2+1]}function bm(){if(au>8){bb(aQ)}else{if(au>0){ai(aQ&255)}}aQ=0;au=0}function aw(bt,bs,bu){bm();a7=8;if(bu){bb(bs);bb(~bs)}aT.pending_buf.set(bl.subarray(bt,bt+bs),aT.pending);aT.pending+=bs}function aM(bt,bu,bs){bk((O<<1)+(bs?1:0),3);aw(bt,bu,true)}function aE(bv,bx,bs){var bu,bt;var bw=0;if(a9>0){aB.build_tree(aT);bo.build_tree(aT);bw=aL();bu=(aT.opt_len+3+7)>>>3;bt=(aT.static_len+3+7)>>>3;if(bt<=bu){bu=bt}}else{bu=bt=bx+5}if((bx+4<=bu)&&bv!=-1){aM(bv,bx,bs)}else{if(bt==bu){bk((ab<<1)+(bs?1:0),3);aY(Z.static_ltree,Z.static_dtree)}else{bk((B<<1)+(bs?1:0),3);bh(aB.max_code+1,bo.max_code+1,bw+1);aY(bd,aF)}}aW();if(bs){bm()}}function ap(bs){aE(bp>=0?bp:-1,br-bp,bs);bp=br;aI.flush_pending()}function be(){var bv,bs;var bu;var bt;do{bt=(ag-aK-br);if(bt===0&&br===0&&aK===0){bt=an}else{if(bt==-1){bt--}else{if(br>=an+an-v){bl.set(bl.subarray(an,an+an),0);aU-=an;br-=an;bp-=an;bv=ax;bu=bv;do{bs=(aH[--bu]&65535);aH[bu]=(bs>=an?bs-an:0)}while(--bv!==0);bv=an;bu=bv;do{bs=(aN[--bu]&65535);aN[bu]=(bs>=an?bs-an:0)}while(--bv!==0);bt+=an}}}if(aI.avail_in===0){return}bv=aI.read_buf(bl,br+aK,bt);aK+=bv;if(aK>=ae){a1=bl[br]&255;a1=(((a1)<<bq)^(bl[br+1]&255))&aP}}while(aK<v&&aI.avail_in!==0)}function aX(bs){var bu=65535;var bt;if(bu>ba-5){bu=ba-5}while(true){if(aK<=1){be();if(aK===0&&bs==Y){return I}if(aK===0){break}}br+=aK;aK=0;bt=bp+bu;if(br===0||br>=bt){aK=(br-bt);br=bt;ap(false);if(aI.avail_out===0){return I}}if(br-bp>=an-v){ap(false);if(aI.avail_out===0){return I}}}ap(bs==l);if(aI.avail_out===0){return(bs==l)?E:I}return bs==l?j:T}function bn(bv){var by=az;var bD=br;var bw;var bx;var bs=aj;var bt=br>(an-v)?br-(an-v):0;var bu=ay;var bz=aD;var bB=br+w;var bC=bl[bD+bs-1];var bA=bl[bD+bs];if(aj>=ao){by>>=2}if(bu>aK){bu=aK}do{bw=bv;if(bl[bw+bs]!=bA||bl[bw+bs-1]!=bC||bl[bw]!=bl[bD]||bl[++bw]!=bl[bD+1]){continue}bD+=2;bw++;do{}while(bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bl[++bD]==bl[++bw]&&bD<bB);bx=w-(bB-bD);bD=bB-w;if(bx>bs){aU=bv;bs=bx;if(bx>=bu){break}bC=bl[bD+bs-1];bA=bl[bD+bs]}}while((bv=(aN[bv&bz]&65535))>bt&&--by!==0);if(bs<=aK){return bs}return aK}function aq(bs){var bu=0;var bt;while(true){if(aK<v){be();if(aK<v&&bs==Y){return I}if(aK===0){break}}if(aK>=ae){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bu=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}if(bu!==0&&((br-bu)&65535)<=an-v){if(ah!=K){bg=bn(bu)}}if(bg>=ae){bt=aG(br-aU,bg-ae);aK-=bg;if(bg<=a3&&aK>=ae){bg--;do{br++;a1=((a1<<bq)^(bl[(br)+(ae-1)]&255))&aP;bu=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}while(--bg!==0);br++}else{br+=bg;bg=0;a1=bl[br]&255;a1=(((a1)<<bq)^(bl[br+1]&255))&aP}}else{bt=aG(0,bl[br]&255);aK--;br++}if(bt){ap(false);if(aI.avail_out===0){return I}}}ap(bs==l);if(aI.avail_out===0){if(bs==l){return E}else{return I}}return bs==l?j:T}function bc(bt){var bv=0;var bu;var bs;while(true){if(aK<v){be();if(aK<v&&bt==Y){return I}if(aK===0){break}}if(aK>=ae){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bv=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}aj=bg;aO=aU;bg=ae-1;if(bv!==0&&aj<a3&&((br-bv)&65535)<=an-v){if(ah!=K){bg=bn(bv)}if(bg<=5&&(ah==M||(bg==ae&&br-aU>4096))){bg=ae-1}}if(aj>=ae&&bg<=aj){bs=br+aK-ae;bu=aG(br-1-aO,aj-ae);aK-=aj-1;aj-=2;do{if(++br<=bs){a1=(((a1)<<bq)^(bl[(br)+(ae-1)]&255))&aP;bv=(aH[a1]&65535);aN[br&aD]=aH[a1];aH[a1]=br}}while(--aj!==0);at=0;bg=ae-1;br++;if(bu){ap(false);if(aI.avail_out===0){return I}}}else{if(at!==0){bu=aG(0,bl[br-1]&255);if(bu){ap(false)}br++;aK--;if(aI.avail_out===0){return I}}else{at=1;br++;aK--}}}if(at!==0){bu=aG(0,bl[br-1]&255);at=0}ap(bt==l);if(aI.avail_out===0){if(bt==l){return E}else{return I}}return bt==l?j:T}function aC(bs){bs.total_in=bs.total_out=0;bs.msg=null;aT.pending=0;aT.pending_out=0;aR=S;am=Y;bj();aV();return u}aT.deflateInit=function(bs,bu,bv,bt,bx,bw){if(!bt){bt=R}if(!bx){bx=V}if(!bw){bw=a}bs.msg=null;if(bu==x){bu=6}if(bx<1||bx>X||bt!=R||bv<9||bv>15||bu<0||bu>9||bw<0||bw>K){return af}bs.dstate=aT;aZ=bv;an=1<<aZ;aD=an-1;a8=bx+7;ax=1<<a8;aP=ax-1;bq=Math.floor((a8+ae-1)/ae);bl=new Uint8Array(an*2);aN=[];aH=[];bi=1<<(bx+6);aT.pending_buf=new Uint8Array(bi*4);ba=bi*4;ak=Math.floor(bi/2);a2=(1+2)*bi;a9=bu;ah=bw;aA=bt&255;return aC(bs)};aT.deflateEnd=function(){if(aR!=y&&aR!=S&&aR!=Q){return af}aT.pending_buf=null;aH=null;aN=null;bl=null;aT.dstate=null;return aR==S?n:u};aT.deflateParams=function(bs,bt,bv){var bu=u;if(bt==x){bt=6}if(bt<0||bt>9||bv<0||bv>K){return af}if(d[a9].func!=d[bt].func&&bs.total_in!==0){bu=bs.deflate(C)}if(a9!=bt){a9=bt;a3=d[a9].max_lazy;ao=d[a9].good_length;ay=d[a9].nice_length;az=d[a9].max_chain}ah=bv;return bu};aT.deflateSetDictionary=function(bs,bx,bv){var bu=bv;var bw,bt=0;if(!bx||aR!=y){return af}if(bu<ae){return u}if(bu>an-v){bu=an-v;bt=bv-bu}bl.set(bx.subarray(bt,bt+bu),0);br=bu;bp=bu;a1=bl[0]&255;a1=(((a1)<<bq)^(bl[1]&255))&aP;for(bw=0;bw<=bu-ae;bw++){a1=(((a1)<<bq)^(bl[(bw)+(ae-1)]&255))&aP;aN[bw&aD]=aH[a1];aH[a1]=bw}return u};aT.deflate=function(bt,bs){var bu,by,bw,bv,bx;if(bs>l||bs<0){return af}if(!bt.next_out||(!bt.next_in&&bt.avail_in!==0)||(aR==Q&&bs!=l)){bt.msg=s[L-(af)];return af}if(bt.avail_out===0){bt.msg=s[L-(N)];return N}aI=bt;bv=am;am=bs;if(aR==y){by=(R+((aZ-8)<<4))<<8;bw=((a9-1)&255)>>1;if(bw>3){bw=3}by|=(bw<<6);if(br!==0){by|=i}by+=31-(by%31);aR=S;aJ(by)}if(aT.pending!==0){aI.flush_pending();if(aI.avail_out===0){am=-1;return u}}else{if(aI.avail_in===0&&bs<=bv&&bs!=l){aI.msg=s[L-(N)];return N}}if(aR==Q&&aI.avail_in!==0){bt.msg=s[L-(N)];return N}if(aI.avail_in!==0||aK!==0||(bs!=Y&&aR!=Q)){bx=-1;switch(d[a9].func){case F:bx=aX(bs);break;case p:bx=aq(bs);break;case H:bx=bc(bs);break;default:}if(bx==E||bx==j){aR=Q}if(bx==I||bx==E){if(aI.avail_out===0){am=-1}return u}if(bx==T){if(bs==C){ar()}else{aM(0,0,false);if(bs==q){for(bu=0;bu<ax;bu++){aH[bu]=0}}}aI.flush_pending();if(aI.avail_out===0){am=-1;return u}}}if(bs!=l){return u}return ac}}function J(){var ag=this;ag.next_in_index=0;ag.next_out_index=0;ag.avail_in=0;ag.total_in=0;ag.avail_out=0;ag.total_out=0}J.prototype={deflateInit:function(ai,ah){var ag=this;ag.dstate=new G();if(!ah){ah=ad}return ag.dstate.deflateInit(ag,ai,ah)},deflate:function(ag){var ah=this;if(!ah.dstate){return af}return ah.dstate.deflate(ah,ag)},deflateEnd:function(){var ah=this;if(!ah.dstate){return af}var ag=ah.dstate.deflateEnd();ah.dstate=null;return ag},deflateParams:function(ai,ah){var ag=this;if(!ag.dstate){return af}return ag.dstate.deflateParams(ag,ai,ah)},deflateSetDictionary:function(ai,ah){var ag=this;if(!ag.dstate){return af}return ag.dstate.deflateSetDictionary(ag,ai,ah)},read_buf:function(ah,ak,ai){var aj=this;var ag=aj.avail_in;if(ag>ai){ag=ai}if(ag===0){return 0}aj.avail_in-=ag;ah.set(aj.next_in.subarray(aj.next_in_index,aj.next_in_index+ag),ak);aj.next_in_index+=ag;aj.total_in+=ag;return ag},flush_pending:function(){var ah=this;var ag=ah.dstate.pending;if(ag>ah.avail_out){ag=ah.avail_out}if(ag===0){return}ah.next_out.set(ah.dstate.pending_buf.subarray(ah.dstate.pending_out,ah.dstate.pending_out+ag),ah.next_out_index);ah.next_out_index+=ag;ah.dstate.pending_out+=ag;ah.total_out+=ag;ah.avail_out-=ag;ah.dstate.pending-=ag;if(ah.dstate.pending===0){ah.dstate.pending_out=0}}};return function aa(al){var ai=this;var ak=new J();var aj=512;var ag=Y;var ah=new Uint8Array(aj);if(typeof al=="undefined"){al=x}ak.deflateInit(al);ak.next_out=ah;ai.append=function(aq,ap){var ao,an=[],au=0,am=0,at=0,ar;if(!aq.length){return}ak.next_in_index=0;ak.next_in=aq;ak.avail_in=aq.length;do{ak.next_out_index=0;ak.avail_out=aj;ao=ak.deflate(ag);if(ao!=u){throw"deflating: "+ak.msg}if(ak.next_out_index){if(ak.next_out_index==aj){an.push(new Uint8Array(ah))}else{an.push(new Uint8Array(ah.subarray(0,ak.next_out_index)))}}at+=ak.next_out_index;if(ap&&ak.next_in_index>0&&ak.next_in_index!=au){ap(ak.next_in_index);au=ak.next_in_index}}while(ak.avail_in>0||ak.avail_out===0);ar=new Uint8Array(at);an.forEach(function(av){ar.set(av,am);am+=av.length});return ar};ai.flush=function(){var ao,an=[],am=0,aq=0,ap;do{ak.next_out_index=0;ak.avail_out=aj;ao=ak.deflate(l);if(ao!=ac&&ao!=u){throw"deflating: "+ak.msg}if(aj-ak.avail_out>0){an.push(new Uint8Array(ah.subarray(0,ak.next_out_index)))}aq+=ak.next_out_index}while(ak.avail_in>0||ak.avail_out===0);ak.deflateEnd();ap=new Uint8Array(aq);an.forEach(function(ar){ap.set(ar,am);am+=ar.length});return ap}}})(this);(function(b){var a;a=(function(){var m,j,f,k,g,l,i,c;d.load=function(n,e,q){var o,p=this;if(typeof e==="function"){q=e}o=new XMLHttpRequest;o.open("GET",n,true);o.responseType="arraybuffer";o.onload=function(){var r,s;r=new Uint8Array(o.response||o.mozResponseArrayBuffer);s=new d(r);if(typeof(e!=null?e.getContext:void 0)==="function"){s.render(e)}return typeof q==="function"?q(s):void 0};return o.send(null)};k=0;f=1;g=2;j=0;m=1;function d(t){var o,e,q,A,v,n,u,w,z,y,x,B,r,p,s;this.data=t;this.pos=8;this.palette=[];this.imgData=[];this.transparency={};this.animation=null;this.text={};n=null;while(true){o=this.readUInt32();y=((function(){var D,C;C=[];for(u=D=0;D<4;u=++D){C.push(String.fromCharCode(this.data[this.pos++]))}return C}).call(this)).join("");switch(y){case"IHDR":this.width=this.readUInt32();this.height=this.readUInt32();this.bits=this.data[this.pos++];this.colorType=this.data[this.pos++];this.compressionMethod=this.data[this.pos++];this.filterMethod=this.data[this.pos++];this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||Infinity,frames:[]};break;case"PLTE":this.palette=this.read(o);break;case"fcTL":if(n){this.animation.frames.push(n)}this.pos+=4;n={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()};v=this.readUInt16();A=this.readUInt16()||100;n.delay=1000*v/A;n.disposeOp=this.data[this.pos++];n.blendOp=this.data[this.pos++];n.data=[];break;case"IDAT":case"fdAT":if(y==="fdAT"){this.pos+=4;o-=4}t=(n!=null?n.data:void 0)||this.imgData;for(u=r=0;0<=o?r<o:r>o;u=0<=o?++r:--r){t.push(this.data[this.pos++])}break;case"tRNS":this.transparency={};switch(this.colorType){case 3:q=this.palette.length/3;this.transparency.indexed=this.read(o);if(this.transparency.indexed.length>q){throw new Error("More transparent colors than palette size")}x=q-this.transparency.indexed.length;if(x>0){for(u=p=0;0<=x?p<x:p>x;u=0<=x?++p:--p){this.transparency.indexed.push(255)}}break;case 0:this.transparency.grayscale=this.read(o)[0];break;case 2:this.transparency.rgb=this.read(o)}break;case"tEXt":B=this.read(o);w=B.indexOf(0);z=String.fromCharCode.apply(String,B.slice(0,w));this.text[z]=String.fromCharCode.apply(String,B.slice(w+1));break;case"IEND":if(n){this.animation.frames.push(n)}this.colors=(function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}).call(this);this.hasAlphaChannel=(s=this.colorType)===4||s===6;e=this.colors+(this.hasAlphaChannel?1:0);this.pixelBitlength=this.bits*e;this.colorSpace=(function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}).call(this);this.imgData=new Uint8Array(this.imgData);return;default:this.pos+=o}this.pos+=4;if(this.pos>this.data.length){throw new Error("Incomplete or corrupt PNG file")}}return}d.prototype.read=function(n){var o,p,e;e=[];for(o=p=0;0<=n?p<n:p>n;o=0<=n?++p:--p){e.push(this.data[this.pos++])}return e};d.prototype.readUInt32=function(){var p,o,n,e;p=this.data[this.pos++]<<24;o=this.data[this.pos++]<<16;n=this.data[this.pos++]<<8;e=this.data[this.pos++];return p|o|n|e};d.prototype.readUInt16=function(){var n,e;n=this.data[this.pos++]<<8;e=this.data[this.pos++];return n|e};d.prototype.decodePixels=function(K){var F,J,y,G,x,w,D,s,E,q,n,B,C,z,A,I,H,u,v,t,r,o,e;if(K==null){K=this.imgData}if(K.length===0){return new Uint8Array(0)}K=new FlateStream(K);K=K.getBytes();B=this.pixelBitlength/8;I=B*this.width;C=new Uint8Array(I*this.height);w=K.length;A=0;z=0;J=0;while(z<w){switch(K[z++]){case 0:for(G=v=0;v<I;G=v+=1){C[J++]=K[z++]}break;case 1:for(G=t=0;t<I;G=t+=1){F=K[z++];x=G<B?0:C[J-B];C[J++]=(F+x)%256}break;case 2:for(G=r=0;r<I;G=r+=1){F=K[z++];y=(G-(G%B))/B;H=A&&C[(A-1)*I+y*B+(G%B)];C[J++]=(H+F)%256}break;case 3:for(G=o=0;o<I;G=o+=1){F=K[z++];y=(G-(G%B))/B;x=G<B?0:C[J-B];H=A&&C[(A-1)*I+y*B+(G%B)];C[J++]=(F+Math.floor((x+H)/2))%256}break;case 4:for(G=e=0;e<I;G=e+=1){F=K[z++];y=(G-(G%B))/B;x=G<B?0:C[J-B];if(A===0){H=u=0}else{H=C[(A-1)*I+y*B+(G%B)];u=y&&C[(A-1)*I+(y-1)*B+(G%B)]}D=x+H-u;s=Math.abs(D-x);q=Math.abs(D-H);n=Math.abs(D-u);if(s<=q&&s<=n){E=x}else{if(q<=n){E=H}else{E=u}}C[J++]=(F+E)%256}break;default:throw new Error("Invalid filter algorithm: "+K[z-1])}A++}return C};d.prototype.decodePalette=function(){var u,s,e,n,v,t,o,q,r,p;n=this.palette;o=this.transparency.indexed||[];t=new Uint8Array((o.length||0)+n.length);v=0;e=n.length;u=0;for(s=q=0,r=n.length;q<r;s=q+=3){t[v++]=n[s];t[v++]=n[s+1];t[v++]=n[s+2];t[v++]=(p=o[u++])!=null?p:255}return t};d.prototype.copyToImageData=function(e,q){var s,n,w,x,y,t,r,o,p,z,u;n=this.colors;p=null;s=this.hasAlphaChannel;if(this.palette.length){p=(u=this._decodedPalette)!=null?u:this._decodedPalette=this.decodePalette();n=4;s=true}w=e.data||e;o=w.length;y=p||q;x=t=0;if(n===1){while(x<o){r=p?q[x/4]*4:t;z=y[r++];w[x++]=z;w[x++]=z;w[x++]=z;w[x++]=s?y[r++]:255;t=r}}else{while(x<o){r=p?q[x/4]*4:t;w[x++]=y[r++];w[x++]=y[r++];w[x++]=y[r++];w[x++]=s?y[r++]:255;t=r}}};d.prototype.decode=function(){var e;e=new Uint8Array(this.width*this.height*4);this.copyToImageData(e,this.decodePixels());return e};try{i=b.document.createElement("canvas");c=i.getContext("2d")}catch(h){return -1}l=function(n){var e;c.width=n.width;c.height=n.height;c.clearRect(0,0,n.width,n.height);c.putImageData(n,0,0);e=new Image;e.src=i.toDataURL();return e};d.prototype.decodeFrames=function(u){var n,s,e,o,q,t,r,p;if(!this.animation){return}r=this.animation.frames;p=[];for(s=q=0,t=r.length;q<t;s=++q){n=r[s];e=u.createImageData(n.width,n.height);o=this.decodePixels(new Uint8Array(n.data));this.copyToImageData(e,o);n.imageData=e;p.push(n.image=l(e))}return p};d.prototype.renderFrame=function(e,o){var q,p,n;p=this.animation.frames;q=p[o];n=p[o-1];if(o===0){e.clearRect(0,0,this.width,this.height)}if((n!=null?n.disposeOp:void 0)===f){e.clearRect(n.xOffset,n.yOffset,n.width,n.height)}else{if((n!=null?n.disposeOp:void 0)===g){e.putImageData(n.imageData,n.xOffset,n.yOffset)}}if(q.blendOp===j){e.clearRect(q.xOffset,q.yOffset,q.width,q.height)}return e.drawImage(q.image,q.xOffset,q.yOffset)};d.prototype.animate=function(o){var n,s,r,q,e,p,t=this;s=0;p=this.animation,q=p.numFrames,r=p.frames,e=p.numPlays;return(n=function(){var u,v;u=s++%q;v=r[u];t.renderFrame(o,u);if(q>1&&s/q<e){return t.animation._timeout=setTimeout(n,v.delay)}})()};d.prototype.stopAnimation=function(){var e;return clearTimeout((e=this.animation)!=null?e._timeout:void 0)};d.prototype.render=function(n){var e,o;if(n._png){n._png.stopAnimation()}n._png=this;n.width=this.width;n.height=this.height;e=n.getContext("2d");if(this.animation){this.decodeFrames(e);return this.animate(e)}else{o=e.createImageData(this.width,this.height);this.copyToImageData(o,this.decodePixels());return e.putImageData(o,0,0)}};return d})();b.PNG=a})(typeof window!=="undefined"&&window||this);var DecodeStream=(function(){function b(){this.pos=0;this.bufferLength=0;this.eof=false;this.buffer=null}b.prototype={ensureBuffer:function h(o){var k=this.buffer;var n=k?k.byteLength:0;if(o<n){return k}var m=512;while(m<o){m<<=1}var j=new Uint8Array(m);for(var l=0;l<n;++l){j[l]=k[l]}return this.buffer=j},getByte:function a(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return this.buffer[this.pos++]},getBytes:function i(l){var m=this.pos;if(l){this.ensureBuffer(m+l);var k=m+l;while(!this.eof&&this.bufferLength<k){this.readBlock()}var j=this.bufferLength;if(k>j){k=j}}else{while(!this.eof){this.readBlock()}var k=this.bufferLength}this.pos=k;return this.buffer.subarray(m,k)},lookChar:function f(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return String.fromCharCode(this.buffer[this.pos])},getChar:function c(){var j=this.pos;while(this.bufferLength<=j){if(this.eof){return null}this.readBlock()}return String.fromCharCode(this.buffer[this.pos++])},makeSubStream:function e(m,k,l){var j=m+k;while(this.bufferLength<=j&&!this.eof){this.readBlock()}return new Stream(this.buffer,m,k,l)},skip:function d(j){if(!j){j=1}this.pos+=j},reset:function g(){this.pos=0}};return b})();var FlateStream=(function(){if(typeof Uint32Array==="undefined"){return undefined}var g=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);var b=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]);var d=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]);var a=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,590000,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9];var f=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];function c(h){throw new Error(h)}function e(i){var k=0;var j=i[k++];var h=i[k++];if(j==-1||h==-1){c("Invalid header in flate stream")}if((j&15)!=8){c("Unknown compression method in flate stream")}if((((j<<8)+h)%31)!=0){c("Bad FCHECK in flate stream")}if(h&32){c("FDICT bit set in flate stream")}this.bytes=i;this.bytesPos=k;this.codeSize=0;this.codeBuf=0;DecodeStream.call(this)}e.prototype=Object.create(DecodeStream.prototype);e.prototype.getBits=function(l){var j=this.codeSize;var k=this.codeBuf;var i=this.bytes;var m=this.bytesPos;var h;while(j<l){if(typeof(h=i[m++])=="undefined"){c("Bad encoding in flate stream")}k|=h<<j;j+=8}h=k&((1<<l)-1);this.codeBuf=k>>l;this.codeSize=j-=l;this.bytesPos=m;return h};e.prototype.getCode=function(o){var h=o[0];var j=o[1];var l=this.codeSize;var p=this.codeBuf;var r=this.bytes;var m=this.bytesPos;while(l<j){var n;if(typeof(n=r[m++])=="undefined"){c("Bad encoding in flate stream")}p|=(n<<l);l+=8}var i=h[p&((1<<j)-1)];var k=i>>16;var q=i&65535;if(l==0||l<k||k==0){c("Bad encoding in flate stream")}this.codeBuf=(p>>k);this.codeSize=(l-k);this.bytesPos=m;return q};e.prototype.generateHuffmanTable=function(m){var l=m.length;var o=0;for(var p=0;p<l;++p){if(m[p]>o){o=m[p]}}var v=1<<o;var h=new Uint32Array(v);for(var q=1,j=0,s=2;q<=o;++q,j<<=1,s<<=1){for(var k=0;k<l;++k){if(m[k]==q){var r=0;var u=j;for(var p=0;p<q;++p){r=(r<<1)|(u&1);u>>=1}for(var p=r;p<v;p+=s){h[p]=(q<<16)|k}++j}}}return[h,o]};e.prototype.readBlock=function(){function w(O,P,i,N,n){var k=O.getBits(i)+N;while(k-->0){P[F++]=n}}var l=this.getBits(3);if(l&1){this.eof=true}l>>=1;if(l==0){var z=this.bytes;var v=this.bytesPos;var L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}var C=L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}C|=(L<<8);if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}var K=L;if(typeof(L=z[v++])=="undefined"){c("Bad block header in flate stream")}K|=(L<<8);if(K!=(~C&65535)){c("Bad uncompressed block length in flate stream")}this.codeBuf=0;this.codeSize=0;var r=this.bufferLength;var E=this.ensureBuffer(r+C);var m=r+C;this.bufferLength=m;for(var B=r;B<m;++B){if(typeof(L=z[v++])=="undefined"){this.eof=true;break}E[B]=L}this.bytesPos=v;return}var t;var u;if(l==1){t=a;u=f}else{if(l==2){var M=this.getBits(5)+257;var x=this.getBits(5)+1;var h=this.getBits(4)+4;var o=Array(g.length);var F=0;while(F<h){o[g[F++]]=this.getBits(3)}var y=this.generateHuffmanTable(o);var G=0;var F=0;var J=M+x;var H=new Array(J);while(F<J){var j=this.getCode(y);if(j==16){w(this,H,2,3,G)}else{if(j==17){w(this,H,3,3,G=0)}else{if(j==18){w(this,H,7,11,G=0)}else{H[F++]=G=j}}}}t=this.generateHuffmanTable(H.slice(0,M));u=this.generateHuffmanTable(H.slice(M,J))}else{c("Unknown block type in flate stream")}}var E=this.buffer;var I=E?E.length:0;var s=this.bufferLength;while(true){var q=this.getCode(t);if(q<256){if(s+1>=I){E=this.ensureBuffer(s+1);I=E.length}E[s++]=q;continue}if(q==256){this.bufferLength=s;return}q-=257;q=b[q];var p=q>>16;if(p>0){p=this.getBits(p)}var G=(q&65535)+p;q=this.getCode(u);q=d[q];p=q>>16;if(p>0){p=this.getBits(p)}var A=(q&65535)+p;if(s+G>=I){E=this.ensureBuffer(s+G);I=E.length}for(var D=0;D<G;++D,++s){E[s]=E[s-A]}}};return e})();(function(b){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(typeof b.btoa==="undefined"){b.btoa=function(k){var f,e,d,o,n,m,l,p,j=0,q=0,h="",g=[];if(!k){return k}do{f=k.charCodeAt(j++);e=k.charCodeAt(j++);d=k.charCodeAt(j++);p=f<<16|e<<8|d;o=p>>18&63;n=p>>12&63;m=p>>6&63;l=p&63;g[q++]=a.charAt(o)+a.charAt(n)+a.charAt(m)+a.charAt(l)}while(j<k.length);h=g.join("");var c=k.length%3;return(c?h.slice(0,c-3):h)+"===".slice(c||3)}}if(typeof b.atob==="undefined"){b.atob=function(j){var e,d,c,n,m,l,k,o,h=0,p=0,f="",g=[];if(!j){return j}j+="";do{n=a.indexOf(j.charAt(h++));m=a.indexOf(j.charAt(h++));l=a.indexOf(j.charAt(h++));k=a.indexOf(j.charAt(h++));o=n<<18|m<<12|l<<6|k;e=o>>16&255;d=o>>8&255;c=o&255;if(l==64){g[p++]=String.fromCharCode(e)}else{if(k==64){g[p++]=String.fromCharCode(e,d)}else{g[p++]=String.fromCharCode(e,d,c)}}}while(h<j.length);f=g.join("");return f}}if(!Array.prototype.map){Array.prototype.map=function(e){if(this===void 0||this===null||typeof e!=="function"){throw new TypeError()}var h=Object(this),c=h.length>>>0,g=new Array(c);var d=arguments.length>1?arguments[1]:void 0;for(var f=0;f<c;f++){if(f in h){g[f]=e.call(d,h[f],f,h)}}return g}}if(!Array.isArray){Array.isArray=function(c){return Object.prototype.toString.call(c)==="[object Array]"}}if(!Array.prototype.forEach){Array.prototype.forEach=function(e,d){if(this===void 0||this===null||typeof e!=="function"){throw new TypeError()}var g=Object(this),c=g.length>>>0;for(var f=0;f<c;f++){if(f in g){e.call(d,g[f],f,g)}}}}if(!Object.keys){Object.keys=(function(){var e=Object.prototype.hasOwnProperty,f=!({toString:null}).propertyIsEnumerable("toString"),d=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],c=d.length;return function(j){if(typeof j!=="object"&&(typeof j!=="function"||j===null)){throw new TypeError()}var g=[],k,h;for(k in j){if(e.call(j,k)){g.push(k)}}if(f){for(h=0;h<c;h++){if(e.call(j,d[h])){g.push(d[h])}}}return g}}())}if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(!String.prototype.trimLeft){String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}}if(!String.prototype.trimRight){String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")}}})(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this);//##############################################################################
//Gwt
Gwt = new Object ();
//End Gwt
//###############################################################################
//###########################################################################
//Gwt::Core
Gwt.Core = new Object ();

Gwt.Core.Contrib = new Object ();
Gwt.Core.Contrib.Protocol = window.location.protocol;
Gwt.Core.Contrib.HostName = window.location.hostname;
Gwt.Core.Contrib.Port = window.location.port;
Gwt.Core.Contrib.Host = Gwt.Core.Contrib.Protocol+"//"+Gwt.Core.Contrib.HostName+"/";
Gwt.Core.Contrib.Backend = Gwt.Core.Contrib.Host+"backend/";
Gwt.Core.Contrib.Frontend = Gwt.Core.Contrib.Host+"frontend/";
Gwt.Core.Contrib.Images = "share/images/";
Gwt.Core.Contrib.Icons = "share/icons/";
Gwt.Core.Contrib.db = "remote";
Gwt.Core.Contrib.request_id = 0;

//End Gwt::Core::Contrib
//###########################################################################
//Gwt::Core::Request
Gwt.Core.Request = function (Url, Func, Data)
{
	this.XHR = new XMLHttpRequest ();			
	this.Url = null;
	this.Func = null;
	this.Data = null;
	this.InitRequest (Url, Func, Data);
}

Gwt.Core.Request.prototype.InitRequest = function (Url, Func, Data)
{
	this.Url = Url;
	this.Func = Func;
	this.Data = Data;
	this.XHR.onreadystatechange = this.Ready.bind(this);
	this.XHR.open ("POST", this.Url, true);
	this.Send ();
}

Gwt.Core.Request.prototype.Send = function ()
{	
	if (this.Data.userfile !== undefined)
	{
		this.UploadFile ();
		return;
	}
	this.SendData ();
}

Gwt.Core.Request.prototype.UploadFile =  function ()
{
	this.Boundary = "---------------------------" + Date.now().toString(16);
	this.XHR.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + this.Boundary);
	//this.XHR.setRequestHeader("document_type", this.Data.document_type.toString ());
	//this.XHR.setRequestHeader("document", this.Data.document.toString ());
	
	this.Multipart = [];
	
	this.Multipart.push ("\r\n--"+this.Boundary+"\r\n");
	var ContentDispositionDocumentType = "Content-Disposition: form-data; name=\"user_info\"; filename=\"document_type.txt\"\r\nContent-Type: \"txt\"\r\n\r\n";
	this.Multipart.push (ContentDispositionDocumentType);
	this.Multipart.push (JSON.stringify(this.Data.user_info));

	this.Multipart.push ("\r\n--"+this.Boundary+"\r\n");
	var ContentDispositionFile = "Content-Disposition: form-data; name=\"userfile\"; filename=\""+ this.Data.userfile.name + "\"\r\nContent-Type: " + this.Data.userfile.type + "\r\n\r\n";
	this.Multipart.push (ContentDispositionFile);
	
	this.FileData = new FileReader ();
	this.FileData.readAsBinaryString (this.Data.userfile);
    
	this.FileData.addEventListener ("load", this.SendFile.bind(this), false);
}

Gwt.Core.Request.prototype.SendFile = function ()
{
	this.Multipart.push (this.FileData.result);
	
	this.Multipart.push ("\r\n--"+this.Boundary+"--");
	
	var RawData = this.Multipart.join ("");
	
	this.XHR.setRequestHeader("Content-Length", RawData.length);
	
	var NBytes = RawData.length, Uint8Data = new Uint8Array(NBytes);
    for (var i = 0; i < NBytes; i++)
	{
      Uint8Data[i] = RawData.charCodeAt(i) & 0xff;
	}
	
	this.XHR.send (Uint8Data);
}

Gwt.Core.Request.prototype.SendData = function ()
{
	this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
	
	var RawData = "data="+JSON.stringify(this.Data);
	
	this.XHR.send (RawData);
}

Gwt.Core.Request.prototype.Ready = function ()
{
	if (this.XHR.readyState == 4 && this.XHR.status == 200)
	{
		this.Func(JSON.parse(this.XHR.response));
	}
}
//End of Gwt::Core::Request
//##########################################################
//#####################################################################################################
//Gwt::Gui
//environments constants
Gwt.Gui = new Object ();
Gwt.Gui =
{
WIN_POS_CENTER: "WIN_POS_CENTER",
WIN_POS_LEFT: "WIN_POS_LEFT",
WIN_POS_TOP: "WIN_POS_TOP",
WIN_POS_RIGHT: "WIN_POS_RIGHT",
WIN_POS_BOTTOM: "WIN_POS_BOTTOM",
ALIGN_CENTER: "ALIGN_CENTER",
ALIGN_LEFT: "ALIGN_LEFT",
ALIGN_TOP: "ALIGN_TOP",
ALIGN_RIGHT: "ALIGN_RIGHT",
ALIGN_BOTTOM: "ALIGN_BOTTOM",
};

Gwt.Gui.Event =
{
	Window :
	{
		//window events
		AfterPrint: "afterprint",
		BeforePrint: "beforeprint",
		BeforeUnload: "beforeunload",
		Error: "error",
		HashChange: "hashchange",
		Load: "load",
		Message: "message",
		Offline: "offline",
		Online: "online",
		PageHide: "pagehide",
		PageShow: "pageshow",
		PopState: "popstate",
		Resize: "resize",
		Storage: "storage",
		Unload: "unload",
	},
	
	Form:
	{
		//form events
		Blur: "blur",
		Change: "change",
		ContextMenu: "contextmenu",
		Focus: "focus",
		Input: "input",
		Invalid: "invalid",
		Reset: "reset",
		Search: "search",
		Select: "select",
		Submit: "submit",
	},
	
	Mouse:
	{
		//mouse events
		Click: "click",
		DBClick: "dbclick",
		Drag: "drag",
		DragEnd: "dragend",
		DragEnter: "dragenter",
		DragLeave: "dragleave",
		DragOver: "dragover",
		DragStart: "dragstart",
		Drop: "drop",
		MouseDown: "mousedown",
		MouseMove: "mousemove",
		MouseOut: "mouseout",
		MouseOver: "mouseover",
		MouseUp: "mouseup",
		Scroll: "scroll",
		Wheel: "wheel",
	},
	
	Keyboard:
	{
		//keyboard events
		KeyUp: "keyup",
		KeyPress: "keypress",
		KeyDown: "keydown",
		KeyCodes: {Enter: 13, Ctrl: 17, Alt: 18, AtlGr: 225, Shift: 16, Up: 38, Down: 40, Left: 37, Right: 39, Tap: 9, Insert: 45, Home: 36, Del: 46, End: 35, Repag: 33, Avpag: 34, Meta: 91},
	},
	
	Clipboard:
	{
		//clipboard events
		Copy: "copy",
		Cut: "cut",
		Paste: "paste",
	},
	
	Media:
	{
		//media events
		Abort: "abort",
		CanPlay: "canplay",
		CanPlayThtough: "canplaythrough",
		CueChange: "cuechange",
		DurationChange: "durationchange",
		Emptied: "emptied",
		Ended: "ended",
		Error: "error",
		LoadedData: "loadeddata",
		LoadedMetadata: "loadedmetadata",
		LoadStart: "loadstart",
		Pause: "pause",
		Play: "play",
		Playing: "playing",
		Progress: "progress",
		RateChange: "ratechange",
		Seeked: "seeked",
		Seeking: "seeking",
		Stalled: "stalled",
		Suspend: "suspend",
		TimeUpdate: "timeupdate",
		VolumeChange: "volumechange",
		Waiting: "waiting",
	},
	
	Misc:
	{
		//misc events
		Error: "error",
		Show: "show",
		Toggle: "toggle",
	}
	
};

//################################################################################################################################################
//screen info
Gwt.Gui.SCREEN_DEVICE_WIDTH = window.innerWidth;
Gwt.Gui.SCREEN_DEVICE_HEIGHT = window.innerHeight;
Gwt.Gui.SCREEN_DEVICE_PIXEL_RATIO = window.devicePixelRatio;
Gwt.Gui.SCREEN_DEVICE_ORIENTATION = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
Gwt.Gui.SCREEN_DEVICE_ASPECT_RATIO =  (window.innerWidth > window.innerHeight ? window.innerWidth/window.innerHeight : window.innerHeight/window.innerWidth).toString().substring(0,4);

Gwt.Gui.Contrib = new Object ();

Gwt.Gui.Contrib.Color = function (Arg1, Arg2, Arg3, Arg4)
{
	this.Red = null;
	this.Green = null;
	this.Blue = null;
	this.Alpha = null;
	
	if (typeof Arg1 !== "number")
	{
		var key = Object.keys (Gwt.Gui.Contrib.Colors);
		for (var i=0; i<key.length; i++)
		{
			
			if (Arg1 === Gwt.Gui.Contrib.Colors[key[i]])
			{
				this.Red = Arg1[0];
				this.Green = Arg1[1];
				this.Blue = Arg1[2];
				this.Alpha = Arg1[3];
			}
		}
	}
	else 
	{
		this.Red = Arg1;
		this.Green = Arg2;
		this.Blue = Arg3;
		this.Alpha = Arg4;
	}
}

Gwt.Gui.Contrib.Color.prototype.ToString = function ()
{
	return "rgba("+this.Red+","+this.Green+","+this.Blue+","+this.Alpha+")";
}

Gwt.Gui.Contrib.Color.prototype.SetRed = function (Arg1)
{
	this.Red = Arg1;
}

Gwt.Gui.Contrib.Color.prototype.SetGreen = function (Arg1)
{
	this.Green = Arg1;
}

Gwt.Gui.Contrib.Color.prototype.SetBlue = function (Arg1)
{
	this.Blue = Arg1;
}

Gwt.Gui.Contrib.Color.prototype.SetAlpha = function (Arg1)
{
	this.Alpha = Arg1;
}

Gwt.Gui.Contrib.Colors =
{
	AliceBlue: [240,248,255,1],
	AntiqueWhite: [250,235,215,1],
	Aqua: [0,255,255,1],
	AquaMarine: [127,255,212,1],
	Azure : [240,255,255,1],
	Beige: [245,245,220,1],
	Black: [0,0,0,1],
	Blue: [0,0,255,1],
	BlueViolet: [138,43,226,1],
	Brown: [165,42,42,1],
	BurlyWood: [222,184,135,1],
	CadetBlue: [95,158,160,1],
	Chartreuse: [127,255,0,1],
	Chocolate: [210,105,30,1],
	Coral: [255,127,80,1],
	CornFlowerBlue: [100,149,237,1],
	CornSilk: [255,248,220,1],
	Crimson: [220,20,60,1],
	DarkBlue: [0,0,139,1],
	DarkCyan: [0,139,139,1],
	DarkGrey: [169,169,169,1],
	DarkGreen: [0,100,0,1],
	DarkOliveGreen: [85,107,47,1],
	DarkOrchid: [153,50,204,1],
	DarkRed: [139,0,0,1],
	DarkSeaGreen: [143,188,143,1],
	DarkSlateBlue: [72,61,139,1],
	DarkSlateGray : [47,79,79,1],
	DarkTurquoise: [0,206,209,1],
	DeepPink: [255,20,147,1],
	DeepSkyBlue: [0,191,255,1],
	DodgerBlue: [30,144,255,1],
	Fuchsia: [255,0,255,1],
	Gainsboro: [220,220,220,1],
	GhostWhite: [248,248,255,1],
	Gold: [255,215,0,1],
	GoldenRod: [218,165,32,1],
	Green: [0,128,0,1],
	Grey: [128,128,128,1],
	GreenYellow: [173,255,47,1],
	HotPink: [255,105,180,1],
	IndianRed: [205,92,92,1],
	Khaki: [240,230,140,1],
	Lavender: [230,230,250,1],
	LavenderBlush: [255,240,245,1],
	LawnGreen: [124,252,0,1],
	LemonChiffon: [255,250,205,1],
	LightBlue: [173,216,230,1],
	LighCoral: [240,128,128,1],
	LighCyan: [224,255,255,1],
	LighGoldenRodYellow: [250,210,210,1],
	LighGrey: [211,211,211,1],
	LighPink: [255,182,193,1],
	LighSalmon: [255,160,122,1],
	LighSeaGreen: [32,178,170,1],
	LighSkyBlue: [135,206,250,1],
	LighSlateGrey: [119,136,153,1],
	LighSteelBlue: [176,196,222,1],
	LighYellow: [255,255,224,1],
	Lime: [0,255,0,1],
	LimeGreen: [50,205,50,1],
	Linen: [250,240,230,1],
	Magenta: [255,0,255,1],
	Maroon: [128,0,0,1],
	MediumAquaMarine: [102,205,170,1],
	MediumBlue: [0,0,205,1],
	MediumOrchid: [186,85,211,1],
	MediumPurple: [147,112,219,1],
	MediumSeaGreen: [60,179,113,1],
	MediumSlateBlue: [123,104,238,1],
	MediumSpringGreen: [0,250,154,1],
	MediumTurquoise: [72,209,204,1],
	MediumVioletRed: [199,21,133,1],
	MidnightBlue: [25,25,112,1],
	MintCream: [245,255,250,1],
	MistyRose: [255,225,228,1],
	Moccasin: [255,228,181,1],
	Navy: [0,0,128,1],
	OliveDrab: [107,142,35,1],
	Orange: [255,165,0,1],
	OrangeRed: [255,69,0,1],
	PaleGoldenRod: [232,232,170,1],
	PaleGreen: [152,251,152,1],
	PeachPuff: [255,218,185,1],
	Peru: [205,133,63,1],
	Pink: [255,192,203,1],
	Plum: [221,160,221,1],
	PowderBlue: [176,224,230,1],
	Purple: [128,0,128,1],
	RebeccaPurple: [102,51,153,1],
	Red : [255,0,0,1],
	RosyBrown: [188,143,143,1],
	RoyalBlue: [65,105,225,1],
	Salmon: [250,128,114,1],
	SeaGreen: [46,139,87,1],
	Sienna: [160,82,45,1],
	Silver: [192,192,192,1],
	SkyBlue: [135,206,235,1],
	SlateBlue: [106,90,205,1],
	SlateGrey: [112,128,144,1],
	Snow: [255,250,250,1],
	SpringGreen: [0,255,127,1],
	SteelBlue: [70,130,180,1],
	Tan: [210,180,140,1],
	Teal: [0,128,128,1],
	Thistle: [216,191,216,1],
	Tomato: [255,99,71,1],
	Transparent : [0,0,0,0],
	Violet: [238,130,238,1],
	Wheat: [245,222,179,1],
	White : [255,255,255,1],
	WhiteSmoke: [245,245,245,1],
	Yellow: [255,255,0,1],
	YellowGreen: [154,205,50,1],
}

//Gwt Border Styles
Gwt.Gui.Contrib.BorderStyle =
{
	None: "none",
	Hidden: "hidden",
	Dotted: "dotted",
	Dashed: "dashed",
	Solid: "solid",
	Double: "double",
	Groove: "groove",
	Ridge: "ridge",
	Inset: "inset",
	Outset: "outset",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt position type
Gwt.Gui.Contrib.PositionType =
{
	Static: "statci",
	Relative: "relative",
	Fixed: "fixed",
	Absolute: "absolute"
}

//Gwt Display
Gwt.Gui.Contrib.Display =
{
	Inline: "inline",
	Block: "block",
	Flex: "flex",
	InlineBlock: "inline-block",
	InlineFlex: "inline-flex",
	InlineTable: "inline-table",
	ListItem: "list-item",
	RunIn: "run-in",
	Table: "table",
	TableCaption: "table-caption",
	TableColumnGroup: "table-column-group",
	TableHeaderGroup: "table-header-group",
	TableFooterGroup: "table-footer-group",
	TableRowGroup: "table-row-group",
	TableCell: "table-cell",
	TableColumn: "table-column",
	TableRow: "table-row",
	None: "none",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Overflow
Gwt.Gui.Contrib.Overflow =
{
	Visible: "visible",
	Hidden: "hidden",
	Scroll: "scroll",
	Auto: "auto",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Valign
Gwt.Gui.Contrib.Valign =
{
	Baseline: "baseline",
	Length: "length",
	Percent: "%",
	Sub: "sub",
	Supper: "supper",
	Top: "top",
	TextTop: "text-top",
	Middle: "middle",
	Bottom: "bottom",
	TextBottom: "text-bottom",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Cursor
Gwt.Gui.Contrib.Cursor =
{
	Alias: "alias",
	AllScroll: "all-scroll",
	Auto: "auto",
	Cell: "cell",
	ContextMenu: "context-menu",
	ColResize: "col-resize",
	Copy: "copy",
	Crosshair: "crosshair",
	Default: "default",
	EResize: "e-resize",
	EWResize: "ew-resize",
	Grab: "grab",
	Grabbing: "grabbing",
	Help: "help",
	Move: "move",
	NResize: "n-resize",
	NEResize: "ne-resize",
	NESwResize: "nesw-resize",
	NSResize: "ns-resize",
	NWResize: "nw-resize",
	NWSEResize: "nwse-resize",
	NoDrop: "no-drop",
	None: "none",
	NotAllowed: "not-allowed",
	Pointer: "pointer",
	Progress: "progress",
	RowResize: "row-resize",
	SResize: "s-resize",
	SEResize: "se-resize",
	SWResize: "sw-resize",
	Text: "text",
	URL: "url",
	VerticalText: "vertical-text",
	WResize: "w-resize",
	Wait: "wait",
	ZoomIn: "zoom-in",
	ZoomOut: "zoom-out",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Font Weight
Gwt.Gui.Contrib.FontWeight =
{
	Normal: "normal",
	Bold: "bold",
	Bolder: "bolder",
	Lighter: "lighter",
	Initial: "initial",
	Inherit: "inherit"
}

// Gwt User Select
Gwt.Gui.Contrib.UserSelect =
{
	None: "none",
	Text: "text",
	All: "all"
}

//Gwt Text Alignment
Gwt.Gui.Contrib.TextAlign =
{
	Left: "left",
	Right: "right",
	Center: "center",
	Justify: "justify",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Backgroud Attachment
Gwt.Gui.Contrib.BackgroundAttachment =
{
	Scroll: "scroll",
	Fixed: "fixed",
	Local: "local",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Clip
Gwt.Gui.Contrib.BackgroundClip =
{
	BorderBox: "border-box",
	PaddingBox: "padding-box",
	ContentBox: "content-box",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Repeat
Gwt.Gui.Contrib.BackgroundRepeat =
{
	Repeat: "repeat",
	RepeatX: "repeat-x",
	RepeatY: "repeat-y",
	NoRepeat: "no-repeat",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Size
Gwt.Gui.Contrib.BackgroundSize =
{
	Auto: "auto",
	Length: "length",
	Cover: "cover",
	Contain: "contain",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Position
Gwt.Gui.Contrib.BackgroundPosition =
{
	Left: "left",
	Right: "right",
	Top: "top",
	Bottom: "bottom",
	Center: "center"
}

// Gwt OutLine
Gwt.Gui.Contrib.OutLine =
{
	Dotted: "dotted",
	Dashed: "dashed",
	Solid: "solid",
	Double: "double",
	Groove: "groove",
	Ridge: "ridge",
	Inset: "inset",
	Outset: "outset",
	None: "none",
	Hidden: "hidden"
}
//###########################################################################################################

//##################################################################################################
//Class Gwt::Gui::Frame
Gwt.Gui.Frame = function ()
{
    this.BackgroundAttachment = null;
    this.BackgroundClip = null;
    this.BackgroundColor = null;
    this.BackgroundImage = null;
    this.BackgroundOrigin = null;
    this.BackgroundPositionX = null;
    this.BackgroundPositionY = null;
    this.BackgroundRepeatX = null;
    this.BackgroundRepeatY = null;
    this.BackgroundSizeHeight = null;
    this.BackgroundSizeWidth = null;
    this.Border = null;
    this.BorderRadius = null;
    this.BorderStyle = null;
    this.BoxShadowH = null;
    this.BoxShadowV = null;
    this.BoxShadowBlur = null;
    this.BoxShadowSize = null;
    this.BoxShadowColor = null;
    this.Color = null;
    this.Cursor = null;
    this.Display = null;
    this.Expand = null;
    this.FontFamily = null;
    this.FontSize = null;
    this.FontWeight = null;
    this.Height = null;
    this.Html = null;
    this.Margin = null;
    this.MarginBottom = null;
    this.MarginLeft = null;
    this.MarginRight = null;
    this.MarginTop = null;
    this.MaxHeight = null;
    this.MaxWidth = null;
    this.MinHeight = null;
    this.MinWidth = null;
    this.Overflow = null;
    this.Opacity = null;
    this.OutLine = null;
    this.Padding = null;
    this.PaddingBottom = null;
    this.PaddingLeft = null;
    this.PaddingRight = null;
    this.PaddingTop = null;
    this.PositionLeft = null;
    this.PositionTop = null;
    this.PositionType = null;
    this.TabIndex = null;
    this.TextShadowBlur = null;
    this.TextShadowColor = null;
    this.TextShadowOffsx = null;
    this.TextShadowOffsy = null;
    this.UserSelect = null;
    this.Valign = null;
    this.Visibility = null;
    this.Width = null;
    this.ZIndex = null;
    this.ClassName = null;
    this.Parent = null;
    this.Childs = null;
		
    this.InitFrame ();
}

Gwt.Gui.Frame.prototype.InitFrame = function ()
{
    this.SetHtml ("div");
    this.SetTabIndex (0);
    this.SetClassName ("Gwt_Gui_Frame");
    this.SetExpand(false);
    this.SetBorder (0);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetPosition (0, 0);
    this.Childs = [];
}

Gwt.Gui.Frame.prototype.FinalizeFrame = function ()
{
    if (this.Html !== null)
    {
        try
        {
            this.GetHtml().parentNode.removeChild (this.GetHtml ());
        }
        catch (e)
        {
            console.log(e.message);
        }
    }
    
    this.BackgroundAttachment = null;
    this.BackgroundClip = null;
    this.BackgroundColor = null;
    this.BackgroundImage = null;
    this.BackgroundOrigin = null;
    this.BackgroundPositionX = null;
    this.BackgroundPositionY = null;
    this.BackgroundRepeatX = null;
    this.BackgroundRepeatY = null;
    this.BackgroundSizeHeight = null;
    this.BackgroundSizeWidth = null;
    this.Border = null;
    this.BorderRadius = null;
    this.BorderStyle = null;
    this.Color = null;
    this.Cursor = null;
    this.Display = null;
    this.Expand = null;
    this.FontFamily = null;
    this.FontSize = null;
    this.FontWeight = null;
    this.Height = null;
    this.Html = null;
    this.Margin = null;
    this.MarginBottom = null;
    this.MarginLeft = null;
    this.MarginRight = null;
    this.MarginTop = null;
    this.MaxHeight = null;
    this.MaxWidth = null;
    this.Overflow = null;
    this.Opacity = null;
    this.OutLine = null;
    this.Padding = null;
    this.PaddingBottom = null;
    this.PaddingLeft = null;
    this.PaddingRight = null;
    this.PaddingTop = null;
    this.PositionLeft = null;
    this.PositionTop = null;
    this.PositionType = null;
    this.TabIndex = null;
    this.TextShadowBlur = null;
    this.TextShadowColor = null;
    this.TextShadowOffsx = null;
    this.TextShadowOffsy = null;
    this.UserSelect = null;
    this.Valign = null;
    this.Visibility = null;
    this.Width = null;
    this.ZIndex = null;
    this.ClassName = null;
    this.Parent = null;
    this.Childs = null;
}

Gwt.Gui.Frame.prototype.Add = function (Element)
{
    this.Childs.push(Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Frame.prototype.Remove = function (Element)
{
    var elements = this.GetChilds();
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp === Element)
        {
            this.GetHtml().removeChild (Element.GetHtml ());
            elements.splice (i,1);
        }
    }
}

Gwt.Gui.Frame.prototype.GetChilds = function ()
{
	return this.Childs;
}

Gwt.Gui.Frame.prototype.AddEvent = function (Event, Callback)
{
    this.Html.addEventListener (Event, Callback, true);
}

Gwt.Gui.Frame.prototype.RemoveEvent = function (Event, Callback)
{
    this.Html.removeEventListener (Event, Callback, true);
}
Gwt.Gui.Frame.prototype.SetHtml = function (Element)
{
    this.Html = document.createElement (Element);
    this.InitStyle ();
}
Gwt.Gui.Frame.prototype.SetTabIndex = function (TabIndex)
{
    this.TabIndex = TabIndex;
    this.Html.tabIndex = this.TabIndex;
}

Gwt.Gui.Frame.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.Frame.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
}

Gwt.Gui.Frame.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
}

Gwt.Gui.Frame.prototype.GetWidth = function ()
{
    return this.Width;
}

Gwt.Gui.Frame.prototype.GetHeight = function ()
{
    return this.Height;
}

Gwt.Gui.Frame.prototype.GetHtml = function ()
{
    return this.Html;
}

Gwt.Gui.Frame.prototype.SetPosition = function (Left, Top)
{
    var width_add = Gwt.Gui.SCREEN_DEVICE_WIDTH * 0.05;
    var height_add = Gwt.Gui.SCREEN_DEVICE_HEIGHT * 0.05;
	
    this.PositionTop = Top;
    this.PositionLeft = Left;
	
    if (this.PositionLeft === Gwt.Gui.WIN_POS_CENTER && this.PositionTop === undefined)
    {
        var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2);
        var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2) - 24;
    }
    else if (this.PositionLeft !== undefined && this.PositionTop !== undefined)
    {
        switch (this.PositionLeft)
        {
            case Gwt.Gui.WIN_POS_LEFT:
                var left_ = 0;
                break;
            
            case Gwt.Gui.WIN_POS_CENTER:
                var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2);
                break;
			
            case Gwt.Gui.WIN_POS_RIGHT:
                var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())-2);
                break;
				
            default:
                var left_ = this.PositionLeft;
        }
		
        switch (this.PositionTop)
        {
            case Gwt.Gui.WIN_POS_TOP:
                var top_ = 0;
                break;
				
            case Gwt.Gui.WIN_POS_CENTER:
                var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2) - 24;
                break;
				
            case Gwt.Gui.WIN_POS_BOTTOM:
                var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())-2);
                break;
				
            default:
                var top_ = this.PositionTop;
        }
    }
    else
    {
        top_ = 0;
        left_ = 0;
    }
	
    this.PositionTop = top_ ;
    this.PositionLeft = left_;
	
    this.Html.style.top = this.PositionTop;
    this.Html.style.left = this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionLeft = function ()
{
    return this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionTop = function ()
{
    return this.PositionTop;
}

Gwt.Gui.Frame.prototype.SetFocus = function ()
{
    this.Html.focus ();
}

Gwt.Gui.Frame.prototype.SetBackgroundAttachment = function (Attachment)
{
    this.BackgroundAttachment = Attachment;
    this.Html.style.backgroundAttachment = this.BackgroundAttachment;
}

Gwt.Gui.Frame.prototype.SetBackgroundClip = function (Clip)
{
    this.BackgroundClip = Clip;
    this.Html.style.backgroundClip = this.BackgroundClip;
}

Gwt.Gui.Frame.prototype.SetBackgroundColor = function (Color)
{
    this.BackgroundColor = Color;
    this.Html.style.backgroundColor = this.BackgroundColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetBackgroundImage = function (Image)
{
    this.BackgroundImage = Image;
    this.Html.style.backgroundImage = "url("+this.BackgroundImage+")";
}

Gwt.Gui.Frame.prototype.SetBackgroundOrigin = function (Origin)
{
    this.BackgroundOrigin = Origin;
    this.Html.style.backgroundOrigin = this.BackgroundOrigin;
}

Gwt.Gui.Frame.prototype.SetBackgroundPosition = function (X, Y)
{
    this.BackgroundPositionX = X;
    this.BackgroundPositionY = Y;
    this.Html.style.backgroundPosition = ""+this.BackgroundPositionX+" "+this.BackgroundPositionY+"";
}

Gwt.Gui.Frame.prototype.SetBackgroundRepeat = function (X, Y)
{
    this.BackgroundRepeatX = X;
    this.BackgroundRepeatY = Y;
    this.Html.style.backgroundRepeatX = this.BackgroundRepeatX;
    this.Html.style.backgroundRepeatY = this.BackgroundRepeatY;
}

Gwt.Gui.Frame.prototype.SetBackgroundSize = function (Width, Height)
{
    this.BackgroundSizeWidth = Width;
    this.BackgroundSizeHeight = Height;
    if (typeof this.BackgroundSizeWidth === "string")
    {
        this.Html.style.backgroundSize = this.BackgroundSizeWidth;
    }
    else
    {
        this.Html.style.backgroundSize = this.BackgroundSizeWidth+"px "+this.BackgroundSizeHeight+"px";
    }
}

Gwt.Gui.Frame.prototype.SetBorder = function (Border)
{
    this.Border = Border;
    this.Html.style.borderWidth = this.Border+"px";
}

Gwt.Gui.Frame.prototype.GetBorder = function ()
{
    return this.Border;
}

Gwt.Gui.Frame.prototype.SetBorderStyle = function (Style)
{
    this.BorderStyle = Style;
    this.Html.style.borderStyle = this.BorderStyle;
}

Gwt.Gui.Frame.prototype.SetBorderRadius = function (Radius)
{
    this.BorderRadius = Radius;
    this.Html.style.borderRadius= this.BorderRadius+"px";
}

Gwt.Gui.Frame.prototype.SetBorderColor = function (Color)
{	
    this.Html.style.borderColor = Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetBoxShadow = function (H, V, Blur, Size, Color)
{
    this.BoxShadowH = H;
    this.BoxShadowV = V;
    this.BoxShadowBlur = Blur;
    this.BoxShadowSize = Size;
    this.BoxShadowColor = Color;
    this.Html.style.boxShadow = this.BoxShadowH+"px "+this.BoxShadowV+"px "+this.BoxShadowBlur+"px "+this.BoxShadowSize+"px "+this.BoxShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetClassName = function (ClassName)
{
    this.ClassName = ClassName;
    this.Html.className = this.ClassName;
}

Gwt.Gui.Frame.prototype.GetClassName = function ()
{
    return this.ClassName;
}

Gwt.Gui.Frame.prototype.SetParent = function (Parent)
{
    this.Parent = Parent;
}

Gwt.Gui.Frame.prototype.GetParent = function ()
{
    return this.Parent;
}

Gwt.Gui.Frame.prototype.SetColor = function (Color)
{
    this.Color = Color
    this.Html.style.color = this.Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetCursor = function (Cursor)
{
    this.Cursor = Cursor;
    this.Html.style.cursor = this.Cursor;
}

Gwt.Gui.Frame.prototype.SetDisplay = function (Display)
{
    var TypeDisplays = Object.keys(Gwt.Gui.Contrib.Display);
    for (var i = 0; i < TypeDisplays.length; i++)
    {
        if (Display === Gwt.Gui.Contrib.Display[TypeDisplays[i]])
        {
            this.Display = Display;
            this.Html.style.display = this.Display;
            return;
        }
    }
    
    throw TypeError("Invalid Display Value");
}

Gwt.Gui.Frame.prototype.GetDisplay = function ()
{
    return this.Display;
}

Gwt.Gui.Frame.prototype.SetFontFamily = function (FontFamily)
{
    this.FontFamily = FontFamily;
    this.Html.style.fontFamily = this.FontFamily;
}

Gwt.Gui.Frame.prototype.SetFontSize = function (FontSize)
{
    this.FontSize = FontSize;
    this.Html.style.fontSize = this.FontSize+"pt";
}

Gwt.Gui.Frame.prototype.GetFontSize = function ()
{
    return this.FontSize;
}

Gwt.Gui.Frame.prototype.SetFontWeight = function (FontWeight)
{
    this.FontWeight = FontWeight;
    this.Html.style.fontWeight = this.FontWeight;
}

Gwt.Gui.Frame.prototype.InitStyle = function ()
{
    this.SetMaxHeight (Gwt.Gui.SCREEN_DEVICE_HEIGHT);
    this.SetMaxWidth (Gwt.Gui.SCREEN_DEVICE_WIDTH);
    this.SetMinHeight (0);
    this.SetMinWidth (0);
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Relative);
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
    this.SetPadding (0);
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
    this.SetBorder (0);
    this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
}

Gwt.Gui.Frame.prototype.SetMaxHeight = function (MaxHeght)
{
    this.MaxHeight = MaxHeght;
    this.Html.style.maxHeight = this.MaxHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMaxWidth = function (MaxWidth)
{
    this.MaxWidth = MaxWidth;
    this.Html.style.maxWidth = this.MaxWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMinHeight = function (MinHeight)
{
    this.MinHeight = MinHeight;
    this.Html.style.minHeight = this.MinHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMinWidth = function (MinWidth)
{
    this.MinWidth = MinWidth;
    this.Html.style.minWidth = this.MinWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMargin = function (Margin)
{
    this.Margin = Margin;
    this.Html.style.margin = this.Margin+"px";
}

Gwt.Gui.Frame.prototype.GetMargin = function (Margin)
{
    return this.Margin;
}

Gwt.Gui.Frame.prototype.SetMarginTop = function (MarginTop)
{
    this.MarginTop = MarginTop;
    this.Html.style.marginTop = this.MarginTop+"px";
}

Gwt.Gui.Frame.prototype.GetMarginTop = function (Margin)
{
    return this.MarginTop;
}

Gwt.Gui.Frame.prototype.SetMarginBottom = function (MarginBottom)
{
    this.MarginBottom = MarginBottom;
    this.Html.style.marginBottom = this.MarginBottom+"px";
}

Gwt.Gui.Frame.prototype.GetMarginBottom = function (Margin)
{
    return this.MarginBottom;
}

Gwt.Gui.Frame.prototype.SetMarginLeft = function (MarginLeft)
{
    this.MarginLeft = MarginLeft;
    this.Html.style.marginLeft = this.MarginLeft+"px";
}

Gwt.Gui.Frame.prototype.GetMarginLeft = function (Margin)
{
    return this.MarginLeft;
}

Gwt.Gui.Frame.prototype.SetMarginRight = function (MarginRigth)
{
    this.MarginRight = MarginRigth;
    this.Html.style.marginRight = this.MarginRight+"px";
}

Gwt.Gui.Frame.prototype.GetMarginRight = function (Margin)
{
    return this.MarginRight;
}

Gwt.Gui.Frame.prototype.SetPadding = function (Padding)
{
    this.Padding = Padding;
    this.Html.style.padding = this.Padding+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingTop = function (PaddingTop)
{
    this.PaddingTop = PaddingTop;
    this.Html.style.paddingTop = this.PaddingTop+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingBottom = function (PaddingBottom)
{
    this.PaddingBottom = PaddingBottom;
    this.Html.style.paddingBottom = this.PaddingBottom+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingLeft = function (PaddingLeft)
{
    this.PaddingLeft = PaddingLeft;
    this.Html.style.paddingLeft = this.PaddingLeft+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingRight = function (PaddingRight)
{
    this.PaddingRight = PaddingRight;
    this.Html.style.paddingRight = this.PaddingRight+"px";
}

Gwt.Gui.Frame.prototype.SetPositionType = function (PositionType)
{
    this.PositionType = PositionType;
    this.Html.style.position = this.PositionType;
}

Gwt.Gui.Frame.prototype.SetOverflow = function (Overflow)
{
    this.Overflow = Overflow;
    this.Html.style.overflow = this.Overflow;
}

Gwt.Gui.Frame.prototype.SetOpacity = function (Opacity)
{
    this.Opacity = Opacity;
    this.Html.style.opacity = this.Opacity;
}

Gwt.Gui.Frame.prototype.SetTextShadow = function (Offsx, Offsy, Blur, Color)
{
    this.TextShadowOffsx = Offsx;
    this.TextShadowOffsy = Offsy;
    this.TextShadowBlur = Blur;
    this.TextShadowColor = Color;
    this.Html.style.textShadow = this.TextShadowOffsx+"px "+this.TextShadowOffsy+"px "+this.TextShadowBlur+"px "+this.TextShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetZIndex = function (ZIndex)
{
    this.ZIndex = ZIndex;
    this.Html.style.zIndex = this.ZIndex;
}


Gwt.Gui.Frame.prototype.SetSelectable = function (UserSelect)
{
    this.UserSelect = UserSelect;
    this.Html.style.userSelect = this.UserSelect;
}

Gwt.Gui.Frame.prototype.SetValign = function (Valign)
{
    this.Valign = Valign;
    this.Html.style.verticalAlign = this.Valign;
}

Gwt.Gui.Frame.prototype.SetVisibility = function (Value)
{
    this.Visibility = Value;
    this.Html.style.visibility = this.Visibility;
}

Gwt.Gui.Frame.prototype.SetExpand = function (Expand)
{
    this.Expand = Expand;
}

Gwt.Gui.Frame.prototype.GetExpand = function ()
{
    return this.Expand;
}

Gwt.Gui.Frame.prototype.SetOutLine = function (OutLine)
{
    this.OutLine = OutLine;
    this.Html.style.outline = this.OutLine;
}

Gwt.Gui.Frame.prototype.GetOutLine = function ()
{
    return this.OutLine;
}

Gwt.Gui.Frame.prototype.SetHExpand = function (value)
{
    if (typeof(value) !== "boolean")
    {
        throw TypeError("Invalid Boolean Value");
    }
    else
    {
        this.HExpand = value;
    }
}
//Ends Gwt::Gui::Frame Class


//Class Gwt::Gui::Window
Gwt.Gui.Window = function (Title)
{
    Gwt.Gui.Frame.call (this);
    
    this.TitleBar = null;
    this.Body = null;
    this.Title = null;
    
    this.InitWindow (Title);
}

Gwt.Gui.Window.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Window.prototype.constructor = Gwt.Gui.Window;

Gwt.Gui.Window.prototype.FinalizeWindow = function ()
{
    this.TitleBar.FinalizeFrame();
    this.TitleBar = null;
    
    this.Body.FinalizeFrame();
    this.Body = null;
    
    this.Title.FinalizeStaticText();
    this.Title = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Window.prototype.InitWindow = function (Title)
{
    this.TitleBar = new Gwt.Gui.VBox (0);
    this.Body = new Gwt.Gui.Frame ();
    this.Title = new Gwt.Gui.StaticText(Title || "Default Window Title");
    
    this.SetClassName ("Gwt_Gui_Window");
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.3));
    this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.SetBoxShadow (0, 0, 10, 2, new Gwt.Gui.Contrib.Color (102,205,102,0.3));
    this.SetBorder (0);
    var Color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.White);
    Color.SetAlpha (0.5);
    this.SetBorderColor (Color);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorder (1);
    this.SetBorderRadius (5);
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetSize (256, 256);
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    var Left = (Math.random () * Gwt.Gui.SCREEN_DEVICE_WIDTH)-this.GetWidth ();
    var Top = (Math.random () * Gwt.Gui.SCREEN_DEVICE_HEIGHT)-this.GetHeight ();
    if (Left < 0) Left=0;
    if (Top < 0) Top=0;
    this.SetPosition (Left, top);
    
    
    this.TitleBar.SetSize (this.GetWidth(), 32);
    this.TitleBar.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.3));
    this.TitleBar.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.RootAdd (this.TitleBar);
    
    this.Title.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.TitleBar.Add (this.Title);
    
    this.Body.SetSize (this.GetWidth(), this.GetHeight () - 32);
    this.RootAdd (this.Body);
}

Gwt.Gui.Window.prototype.RootAdd = function (Element)
{
    this.GetChilds().push (Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Window.prototype.Add = function (Element)
{
    this.Body.Add (Element);
}

Gwt.Gui.Window.prototype.SetBorderSpacing = function (Border)
{
    var Border_ = Border*2;
    this.layout.SetWidth (this.Body.GetWidth () - Border_);
    this.layout.SetHeight (this.Body.GetHeight () - Border_);
    var left = (this.Body.GetWidth () - (this.Body.GetWidth () - Border_))/2;
    var top = ((this.Body.GetHeight () - (this.Body.GetHeight () - Border_))/2);
    this.layout.SetPosition (left, top);
}

Gwt.Gui.Window.prototype.Open = function ()
{
    desktop.show (this);
}

Gwt.Gui.Window.prototype.Close = function ()
{
    this.FinalizeWindow ();
}

Gwt.Gui.Window.prototype.SetSize = function (Width, Height)
{
    this.SetWidth (Width);
    this.SetHeight (Height);
}

Gwt.Gui.Window.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    this.TitleBar.SetWidth (this.GetWidth ());
    this.Body.SetWidth (this.GetWidth());
}

Gwt.Gui.Window.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    this.Body.SetHeight (this.GetHeight () - 32);
}
//Ends Gwt::Gui::Window
//##################################################################################################
//Class Gwt::Gui::Dialog
Gwt.Gui.Dialog = function (Parent)
{
    Gwt.Gui.Frame.call (this);
    
    this.DialogBox = null;
    this.IsOpen = null;
    this.InitDialog (Parent);
}

Gwt.Gui.Dialog.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Dialog.prototype.constructor = Gwt.Gui.Dialog;

Gwt.Gui.Dialog.prototype.FinalizeDialog = function ()
{
    if(this.DialogBox !== null)
    {
        this.DialogBox.FinalizeFrame ();
    }
    this.DialogBox = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Dialog.prototype.InitDialog = function (Parent)
{
    this.SetClassName ("Gwt_Gui_Dialog");
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetParent (Parent);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Close.bind (this));
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
    this.SetPosition (Gwt.Gui.WIN_POS_TOP, Gwt.Gui.WIN_POS_LEFT);
    var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkGrey);
    color.SetAlpha (0.75);
    this.SetBackgroundColor (color);
    this.SetZIndex (900000);
    
    this.DialogBox = new Gwt.Gui.Frame ();
    this.DialogBox.SetSize (256, 256);
    var color2 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray);
    color2.SetAlpha (0.75);
    this.DialogBox.SetBackgroundColor (color2);
    var colorBorde = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    colorBorde.SetAlpha (0.33);
    this.DialogBox.SetBorderColor (colorBorde);
    this.DialogBox.SetBorder (1);
    this.DialogBox.SetBorderRadius (5);
    this.DialogBox.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DialogBox.SetZIndex (1000000);
    
    this.Add (this.DialogBox);
    
    this.IsOpen = false;
}

Gwt.Gui.Dialog.prototype.Open = function ()
{
    desktop.show (this);
}

Gwt.Gui.Dialog.prototype.Close = function ()
{
    this.FinalizeDialog ();
}

//Ends Gwt::Gui::Dialog
//##################################################################################################


//##################################################################################################
//Class Gwt::Gui::Button
Gwt.Gui.Button = function (Image, Text)
{
    Gwt.Gui.Frame.call (this);
	
    this.Image = null;
    this.Text = null;
	
    this.InitButton (Image, Text);
}

Gwt.Gui.Button.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Button.prototype.constructor = Gwt.Gui.Button;

Gwt.Gui.Button.prototype.FinalizeButton = function ()
{
    this.Image = null;
    this.Text = null;
    this.FinalizeFrame ();
}

Gwt.Gui.Button.prototype.InitButton = function (Image, Text)
{
    this.SetClassName ("Gwt_Gui_Button");
    this.SetExpand (false);
    this.SetBorder (1);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    color.SetAlpha (0.3);
    this.SetBorderColor (color);
    this.SetBorderRadius (5);
    this.SetMargin (0);
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseMove, this.MouseMove.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseDown, this.MouseDown.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseUp, this.MouseMove.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
	
    this.Image = new Gwt.Gui.Image (Image);
    this.Image.SetSize (18, 18);
    this.Image.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Image.SetMarginRight (5);
    this.Image.SetMarginLeft (5);
    this.Image.SetMarginTop (2);
    this.Image.SetValign (Gwt.Gui.Contrib.Valign.Top);
	
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Text.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Text.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
	
    this.Add (this.Image);
    this.Add (this.Text);
}

Gwt.Gui.Button.prototype.MouseMove = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.1));
}

Gwt.Gui.Button.prototype.MouseDown = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.2));
}

Gwt.Gui.Button.prototype.MouseOut = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
}

Gwt.Gui.Button.prototype.SetText = function (Text)
{
    //console.log (this.Image);
    this.Text.SetText (Text);
    this.Text.SetWidth (this.GetWidth ()*0.7);
}

Gwt.Gui.Button.prototype.SetImage = function (Src)
{
    this.Image.SetImage (Src);
}

Gwt.Gui.Button.prototype.SetFontSize = function (FontSize)
{
    this.Text.SetFontSize (FontSize);
    this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
}

//Ends Gwt::Gui::Button
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::Entry
Gwt.Gui.Entry  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	this.InitEntry (Placeholder);
}

Gwt.Gui.Entry.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Entry.prototype.constructor = Gwt.Gui.Entry;

Gwt.Gui.Entry.prototype.FinalizeEntry = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Entry.prototype.InitEntry = function (Placeholder)
{
	this.SetHtml ("input");
	this.Html.setAttribute ("type", "text");
	this.SetClassName ("Gwt_Gui_Entry");
	this.SetExpand (true);
        this.SetHeight (24);
	this.SetPadding (0);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Entry text");
	this.SetFontSize (11);
}

Gwt.Gui.Entry.prototype.SetPlaceholder = function (Text)
{
	this.Html.placeholder = Text;
}

Gwt.Gui.Entry.prototype.ChangeToPassword = function ()
{
	this.Html.type = "password";
}

Gwt.Gui.Entry.prototype.ChangeToText = function ()
{
	this.Html.type = "text";
}

Gwt.Gui.Entry.prototype.GetText = function ()
{
	return this.Html.value;
}

Gwt.Gui.Entry.prototype.SetText = function (Text)
{
	this.Html.value = Text;
}

Gwt.Gui.Entry.prototype.SetMaxLength = function (MaxLength)
{	
	this.Html.maxLength = MaxLength;
}

Gwt.Gui.Entry.prototype.Reset = function ()
{
	this.SetText ("");
}
//Ends Gwt::Gui::Entry
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::File
Gwt.Gui.File  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	
	this.Input = null;
	this.DataSize = null;
	this.FileName = null;
	this.MimeType = null;
	this.Data = null;
	
	this.InitFile ();
}

Gwt.Gui.File.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.File.prototype.constructor = Gwt.Gui.File;

Gwt.Gui.File.prototype.FinalizeFile = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.File.prototype.InitFile = function ()
{
	this.Input = new Gwt.Gui.Frame();
	this.Input.SetHtml ("input");
	this.Input.Html.setAttribute ("type", "file");
	this.Input.Html.removeAttribute ("multiple");
	this.Input.SetOpacity (0);
	this.Input.SetWidth (24);
	this.Input.SetHeight (24);
	
	this.SetWidth (24);
	this.SetHeight (24);
	this.SetClassName ("Gwt_Gui_File");
	this.SetBackgroundImage (Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.paperclip.rotated.svg");
	this.SetBackgroundSize (24, 24);
	this.Add (this.Input);
	
	this.Input.AddEvent (Gwt.Gui.Event.Form.Change, this.UpdateInfo.bind (this));
}

Gwt.Gui.File.prototype.UpdateInfo = function ()
{
	this.Data = this.Input.Html.files[0];
	this.DataSize = this.Data.size;
	this.FileName = this.Data.name;
	this.MimeType = this.Data.type;
}

Gwt.Gui.File.prototype.GetData = function ()
{
	return this.Data;
}

Gwt.Gui.File.prototype.GetDataSize = function ()
{
	return this.DataSize;
}

Gwt.Gui.File.prototype.GetFileName = function ()
{
	return this.FileName;
}

Gwt.Gui.File.prototype.GetMimeType = function ()
{
	return this.MimeType;
}

Gwt.Gui.File.prototype.Reset = function ()
{
	this.Data = null;
	this.DataSize = null;
	this.FileName = null;
	this.MimeType = null;
}

Gwt.Gui.File.prototype.AddEvent = function (Event, Callback)
{
	this.Input.AddEvent (Event, Callback);
}

//Ends Gwt::Gui::File
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::Text
Gwt.Gui.Text  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	this.InitText (Placeholder);
}

Gwt.Gui.Text.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Text.prototype.constructor = Gwt.Gui.Text;

Gwt.Gui.Text.prototype.FinalizeText = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Text.prototype.InitText = function (Placeholder)
{
	this.SetHtml ("textarea");
	this.SetClassName ("Gwt_Gui_Text");
	this.SetExpand (true);
	this.SetPadding (0);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Text multi-line");
	this.SetFontSize (11);
	this.SetHeight (96);
	this.SetAlign ();
	this.SetMaxLength (185);
}

Gwt.Gui.Text.prototype.SetPlaceholder = function (Text)
{
	this.Html.Placeholder = Text;
}

Gwt.Gui.Text.prototype.ChangeToPassword = function ()
{
	this.Html.type = "password";
}

Gwt.Gui.Text.prototype.ChangeToText = function ()
{
	this.Html.type = "text";
}

Gwt.Gui.Text.prototype.GetText = function ()
{
	return this.Html.value;
}

Gwt.Gui.Text.prototype.SetText = function (Text)
{
	this.Html.value = Text;
}

Gwt.Gui.Text.prototype.SetMaxLength = function (Value)
{	
	this.Html.maxLength = Value;
}

Gwt.Gui.Text.prototype.Reset = function ()
{
	this.SetText ("");
}

Gwt.Gui.Text.prototype.SetAlign = function (Value)
{
    switch (Value)
    {
        case Gwt.Gui.ALIGN_LEFT:
            this.align = Gwt.Gui.ALIGN_LEFT;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Left;
            break;
        
        case Gwt.Gui.ALIGN_CENTER:
            this.align = Gwt.Gui.ALIGN_CENTER;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Center;
            break;
        
        case Gwt.Gui.ALIGN_RIGHT:
            this.align = Gwt.Gui.ALIGN_RIGHT;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Right;
            break;
        
        default:
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Justify;
            break;
    }
}
//Ends Gwt::Gui::Text
//##################################################################################################


//Class Gwt::Gui::HBox
Gwt.Gui.HBox = function (Margin)
{
        Gwt.Gui.Frame.call (this);
	
        this.MarginElements = null;
        this.Alignment = null;
	
        this.InitHBox (Margin);
}

Gwt.Gui.HBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.HBox.prototype.constructor = Gwt.Gui.HBox

Gwt.Gui.HBox.prototype.FinalizeHbox = function ()
{
        this.MarginElements = null;
        this.Alignment = null;
        
        this.FinalizeFrame ();
}

Gwt.Gui.HBox.prototype.InitHBox = function (Margin)
{
        this.SetClassName ("Gwt_Gui_HBox");
        this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
	this.SetAlignment (Gwt.Gui.ALIGN_TOP);
        
        this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
}

Gwt.Gui.HBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.HBox.prototype.Add = function (Element)
{
    this.GetChilds ().push (Element);
    this.GetHtml ().appendChild (Element.GetHtml ());
        
    if (Element instanceof Gwt.Gui.VBox)
    {
        var vboxs = [];
        for (var i = 0; i < this.GetChilds ().length; i++)
        {
            if (this.GetChilds ()[i] instanceof Gwt.Gui.VBox)
            {
                vboxs.push (this.GetChilds ()[i]);
            }
        }

        for (var j = 0; j < vboxs.length; j++)
        {
            vboxs[j].SetWidth (this.GetWidth () / vboxs.length);
            vboxs[j].SetHeight (this.GetHeight ());
        }
    }
    else
    {
        Element.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
		
        if (Element.GetHtml () === this.GetHtml ().firstChild)
        {
            Element.SetMargin (0);
        }
        
        else if (Element.GetHtml () === this.GetHtml ().lastChild)
        {
            Element.SetMarginLeft (this.GetMarginElements ());
        }
        
        if (Element.GetExpand ()) Element.SetHeight (this.GetHeight ()*0.99);
        
        if (!Element.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_TOP:
                    Element.SetMarginTop (0);
                    break;
		   
                case Gwt.Gui.ALIGN_CENTER:
                    Element.SetMarginTop ((this.GetHeight () - Element.GetHeight ())/2);
                    break;
		
                case Gwt.Gui.ALIGN_BOTTOM:
                    Element.SetMarginTop (this.GetHeight () - (Element.GetHeight () + Element.GetBorder()*2));
                    break;
		
                default:
                    throw TypeError("Invalid HBox Alignment Value");
                    break;
            }
        }       
    }
}

Gwt.Gui.HBox.prototype.SetAlignment = function(Alignment)
{
    switch(Alignment)
    {
	case Gwt.Gui.ALIGN_CENTER:
	    this.Alignment = Gwt.Gui.ALIGN_CENTER;
	    break;
	
	case Gwt.Gui.ALIGN_TOP:
	    this.Alignment = Gwt.Gui.ALIGN_TOP;
	    break;
	
	case Gwt.Gui.ALIGN_BOTTOM:
	    this.Alignment = Gwt.Gui.ALIGN_BOTTOM;
	    break;
	
	default:
	    throw TypeError("Invalid HBox Alignment Value");
	    break;
    }
}

Gwt.Gui.HBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}

Gwt.Gui.HBox.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.HBox.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    var elements = this.GetChilds ();
    var vboxs = [];
    var others = [];
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp instanceof Gwt.Gui.VBox)
        {
            vboxs.push (tmp);
        }
        else
        {
            others.push (tmp);
        }
    }
    
    var SpaceOcuped = 0;
    for (var k = 0; k < others.length; k++)
    {
        var tmp = others[k];
        SpaceOcuped += tmp.GetWidth ();
    }
            
    for (var j = 0; j < vboxs.length; j++)
    {
        var tmp = vboxs[j];
        tmp.SetWidth (((this.GetWidth () - SpaceOcuped) / vboxs.length));
    }
}

Gwt.Gui.HBox.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    var elements = this.GetChilds ();
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        
        if (tmp.GetExpand ()) tmp.SetHeight (this.GetHeight ()*0.99);
		
        if (!tmp.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_TOP:
                    tmp.SetMarginTop (0);
                    break;
                        
                case Gwt.Gui.ALIGN_CENTER:
                    tmp.SetMarginTop ((this.GetHeight () - tmp.GetHeight ())/2);
                    break;
                        
                case Gwt.Gui.ALIGN_RIGHT:
                    tmp.SetMarginTop (this.GetHeight() - (tmp.GetHeight () + tmp.GetBorder()*2));
                    break;
                        
                default:
                    throw TypeError("Invalid HBox Alignment Value");
                    break;
            }
        }
    }
}
//Ends Gwt::Gui::HBox
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Image = function (Image)
{
	Gwt.Gui.Frame.call (this);
	
	this.InitImage (Image);
}

Gwt.Gui.Image.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Image.prototype.constructor = Gwt.Gui.Image;

Gwt.Gui.Image.prototype.FinalizeImage = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Image.prototype.InitImage = function (Image)
{
	this.SetHtml ("img");
	this.SetClassName ("Gwt_Gui_Image");
	
	this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
	this.SetImage (Image || Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"default_image.svg");
	this.SetSelectable ("none");
}

Gwt.Gui.Image.prototype.SetImage = function (Image)
{
	this.Html.src = Image;
}
//Ends Gwt::Gui::Image
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Avatar
Gwt.Gui.Avatar = function ()
{
	Gwt.Gui.Image.call (this);
	
	this.InitAvatar ();
}

Gwt.Gui.Avatar.prototype = new Gwt.Gui.Image ();
Gwt.Gui.Avatar.prototype.constructor = Gwt.Gui.Avatar;

Gwt.Gui.Avatar.prototype.FinalizeAvatar = function ()
{
	this.FinalizeImage ();
}

Gwt.Gui.Avatar.prototype.InitAvatar = function (Avatar)
{
	this.SetClassName ("Gwt_Gui_Avatar");
	this.SetImage (Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.camera.switch.svg");
	this.SetSize (96, 96);
}
//Ends Gwt::Gui::Avatar
//##################################################################################################
//#########################################################################################################################################
//# class Gwt::Gui::Item
Gwt.Gui.Item = function (Text, Value)
{
    Gwt.Gui.Frame.call (this);
	
    this.Text = null;
    this.Value = null;
	
    this.InitItem (Text, Value);
}

Gwt.Gui.Item.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Item.prototype.constructor = Gwt.Gui.Item;

Gwt.Gui.Item.prototype.FinalizeItem = function ()
{
    this.Text = null;
    this.Value = null;
	
    this.FinalizeFrame ();
}

Gwt.Gui.Item.prototype.InitItem = function (Text, Value)
{
    this.SetClassName ("Gwt_Gui_Item");
	
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Value = Value;
	
    this.SetHeight (24);
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBorderColor (background_color);
    this.SetBorder (0);
    this.SetBackgroundColor (background_color);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorderRadius (0);
	
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseOver.bind (this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind (this));
	
    this.Add (this.Text);
}

Gwt.Gui.Item.prototype.GetValue = function ()
{
    return this.Value;
}

Gwt.Gui.Item.prototype.GetText = function ()
{
    return this.Text.GetText();
}

Gwt.Gui.Item.prototype.MouseOver = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0.25);
    this.SetBackgroundColor (background_color);
}

Gwt.Gui.Item.prototype.MouseOut = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}

Gwt.Gui.Item.prototype.Reset = function ()
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}
//Ends Gwt::Gui::Item
//####################################################################################################################################




//# class Gwt::Gui::SelectDialogBox
//###################################################################################################
Gwt.Gui.SelectDialogBox = function ()
{
    Gwt.Gui.Dialog.call (this);
    this.items = null;
    this.LayoutDialog = null;
    this.Container = null;
	
    this.InitSelectDialogBox ();
}

Gwt.Gui.SelectDialogBox.prototype = new Gwt.Gui.Dialog ();
Gwt.Gui.SelectDialogBox.prototype.constructor = Gwt.Gui.SelectDialogBox;

Gwt.Gui.SelectDialogBox.prototype.FinalizeSelectDialogBox = function ()
{
    this.LayoutDialog.FinalizeVBox();
    this.LayoutDialog = null;
    
    this.Container.FinalizeVBox();
    this.Container = null;
    
    this.items = null;
    
    this.FinalizeDialog ();
}

Gwt.Gui.SelectDialogBox.prototype.InitSelectDialogBox = function ()
{
    this.SetClassName ("Gwt_Gui_Select_dialog_box");
    this.LayoutDialog = new Gwt.Gui.VBox (this.DialogBox, 0);
    this.LayoutDialog.SetSize (this.DialogBox.GetWidth ()*0.95, this.DialogBox.GetHeight ()*0.95);
    var top = (this.DialogBox.GetHeight()-this.LayoutDialog.GetHeight())/2;
    var left = (this.DialogBox.GetWidth()-this.LayoutDialog.GetWidth())/2;
    this.LayoutDialog.SetPosition (top, left);
	
    this.Container = new Gwt.Gui.VBox (3);
    this.Container.AddEvent (Gwt.Gui.Event.Mouse.Wheel, this.EventScroll.bind(this));
    this.Container.SetSize (this.LayoutDialog.GetWidth (), 0);
	
    this.DialogBox.Add (this.LayoutDialog);
    this.LayoutDialog.Add (this.Container);
}

Gwt.Gui.SelectDialogBox.prototype.AddItem = function (item)
{
	item.SetWidth (this.Container.GetWidth ());
        this.Container.SetHeight (this.Container.GetHeight () + item.GetHeight () + this.Container.GetMarginElements());
        this.Container.Add (item);
        this.items++;
	
}

Gwt.Gui.SelectDialogBox.prototype.EventScroll = function (event)
{
    var deltaY = event.deltaY;
	
    var posTop = this.Container.GetPositionTop();
    var posLeft = this.Container.GetPositionLeft();
    
    var isScroll = this.Container.GetHeight () > this.LayoutDialog.GetHeight ();
    var itemsPlus = this.items-9;
    
    var maxScroll = 0;
    
    if (itemsPlus > 0)
    {
        maxScroll = -27*itemsPlus;
    }
	
    if (deltaY < 0 && isScroll && posTop < 0)
    {
        posTop += 27;
    }
    else if (deltaY > 0 && isScroll && posTop > maxScroll)
    {
	posTop -= 27;
    }
    else
    {
        posTop = posTop;
    }
	
    this.Container.SetPosition (posLeft, posTop);
}

//Ends Gwt::Gui::SelectboxDialogBox
//##################################################################################################




//###################################################################################################
//# class Gwt::Gui::SelectBox
Gwt.Gui.SelectBox = function (Placeholder, options)
{
    Gwt.Gui.Frame.call (this);
	
    this.StaticText = null;
    this.SelectDialogBox = null;
    this.Placeholder = null;
    this.Options = null;
    this.Text=null;
    this.Value=null;
	
    this.InitSelectBox (Placeholder, options);
}


Gwt.Gui.SelectBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.SelectBox.prototype.constructor = Gwt.Gui.SelectBox;


Gwt.Gui.SelectBox.prototype.FinalizeSelectBox = function ()
{
    if(this.SelectDialogBox !== null)
    {
        this.SelectDialogBox.FinalizeSelectDialogBox ();
    }
    this.SelectDialogBox = null;
    
    this.StaticText = null;
    this.Placeholder = null;
    this.Options = null;
	
    this.FinalizeFrame ();
}


Gwt.Gui.SelectBox.prototype.InitSelectBox = function (Placeholder, options)
{
    this.SetClassName ("Gwt_Gui_Select_Box");
    this.SetExpand (true);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.ShowDialog.bind(this));
    this.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.ShowDialog.bind(this));
    this.Placeholder = Placeholder;
    this.StaticText = new Gwt.Gui.StaticText (this.Placeholder);
	
    this.Add (this.StaticText);
	
    this.Options = [];
    
    options = [{"text": this.Placeholder, "value": ""}].concat(options);
    for (var i = 0; i < options.length; i++)
    {
        if (i === 0)
        {
            this.Options [i] = new Gwt.Gui.Item (this.Placeholder, "");
        }
        else
        {
            this.Options [i] = new Gwt.Gui.Item (options[i].text, options[i].value);
        }
	this.Options [i].AddEvent (Gwt.Gui.Event.Mouse.Click, this.SetValueListener.bind(this, Event, options[i].text, options[i].value));
    }
    
    this.SetValue("");
}

Gwt.Gui.SelectBox.prototype.ShowDialog = function (event)
{
    //event.stopPropagation ();
    if (event.type === Gwt.Gui.Event.Keyboard.KeyPress || event.type === Gwt.Gui.Event.Mouse.Click)
    {
        if (event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
	{
            this.SelectDialogBox = new Gwt.Gui.SelectDialogBox ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
        else if (event.type === Gwt.Gui.Event.Mouse.Click)
        {
            this.SelectDialogBox = new Gwt.Gui.SelectDialogBox ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
    }
}

Gwt.Gui.SelectBox.prototype.SetText = function (Text)
{
    this.Text = Text;
    this.StaticText.SetText (this.Text);
}

Gwt.Gui.SelectBox.prototype.SetValueListener = function (Event, Text, Value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	if(this.Options [i].GetValue () === Value)
	{
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);
            
            this.SetText(Text);
            this.Value=Value;
	}
	else
	{
            this.Options [i].SetBackgroundImage ("");
	}
    }
}

Gwt.Gui.SelectBox.prototype.SetValue = function (value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	if(this.Options [i].GetValue () === value)
	{
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);

            this.SetText(this.Options[i].GetText());
            this.Value=this.Options[i].GetValue();
	}
	else
	{
            this.Options [i].SetBackgroundImage ("");
	}
    }
}
//Ends Gwt::Gui::Selectbox
//##################################################################################################


//################################################################################################
//Class Gwt::Gui::Static_Text
Gwt.Gui.StaticText = function (Text)
{
	Gwt.Gui.Frame.call (this);
	
	this.Text = null;
	this.InitStaticText (Text);
}

Gwt.Gui.StaticText.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.StaticText.prototype.constructor = Gwt.Gui.StaticText;

Gwt.Gui.StaticText.prototype.FinalizeStaticText = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.StaticText.prototype.InitStaticText = function (Text)
{
	this.SetClassName ("Gwt_Gui_Static_Text");
	this.Text = Text || "Default Text";
	this.SetText (this.Text);
        this.SetExpand (true);
	this.SetFontSize (11);
        this.SetHeight (22);
        this.SetPaddingTop (2);
	this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
	//this.SetTextShadow (0, 0, 1, new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray));
	this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
	this.SetSelectable (Gwt.Gui.Contrib.UserSelect.None);
	this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
}

Gwt.Gui.StaticText.prototype.SetText = function (Text)
{
	this.Text = Text;
	this.Html.textContent = this.Text;
}

Gwt.Gui.StaticText.prototype.TextAlign = function (Value)
{
	if (Value === Gwt.Gui.Contrib.TextAlign.Left || Value === Gwt.Gui.Contrib.TextAlign.Center || Value === Gwt.Gui.Contrib.TextAlign.Right || Value === Gwt.Gui.Contrib.TextAlign.Justify)
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		throw TypeError("Invalid Text Alignment Value");
	}
}

Gwt.Gui.StaticText.prototype.SetTextAlignment = function (Value)
{
	if (Value === Gwt.Gui.Contrib.TextAlign.Left || Value === Gwt.Gui.Contrib.TextAlign.Center || Value === Gwt.Gui.Contrib.TextAlign.Right || Value === Gwt.Gui.Contrib.TextAlign.Justify)
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		throw TypeError("Invalid Text Alignment Value");
	}
}

Gwt.Gui.StaticText.prototype.GetText = function ()
{
	return this.Text;
}

Gwt.Gui.StaticText.prototype.GetLength = function()
{
    return this.Text.length;
}

Gwt.Gui.StaticText.prototype.Reset = function ()
{
	this.SetText ("Default Text");
}
//Ends Gwt::Gui::Static_Text
//##################################################################################################
//###############################################################################################################################################
//Class Gwt::Gui::VBox
Gwt.Gui.VBox = function (Margin)
{
	Gwt.Gui.Frame.call (this);
	
	this.MarginElements = null;
	this.Alignment = null;
	
	this.InitVBox (Margin);
}

Gwt.Gui.VBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.VBox.prototype.constructor = Gwt.Gui.VBox;

Gwt.Gui.VBox.prototype.FinalizeVBox = function ()
{
	this.MarginElements = null;
	this.Alignment = null;
	
	this.FinalizeFrame ();
}

Gwt.Gui.VBox.prototype.InitVBox = function (Margin)
{
	this.SetClassName ("Gwt_Gui_VBox");
	this.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
	this.SetAlignment (Gwt.Gui.ALIGN_LEFT);
	
	this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
}

Gwt.Gui.VBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.VBox.prototype.Add = function (Element)
{
    this.GetChilds ().push (Element);
    this.GetHtml ().appendChild (Element.GetHtml ());
	
    if (Element instanceof Gwt.Gui.HBox)
    {
        var HBoxs = [];
        var Others = [];
        for (var i = 0; i < this.GetChilds ().length; i++)
        {
            if (this.GetChilds ()[i] instanceof Gwt.Gui.HBox)
            {
                HBoxs.push (this.GetChilds ()[i]);
            }
            else
            {
                Others.push (this.GetChilds ()[i]);
            }
        }
	
        var SpaceOcuped = 0;
        for (var k = 0; k < Others.length; k++)
        {
            SpaceOcuped += Others[k].GetHeight();
        }
            
        for (var j = 0; j < HBoxs.length; j++)
        {
            HBoxs[j].SetWidth (this.GetWidth ());
            HBoxs[j].SetHeight (((this.GetHeight () - SpaceOcuped) / HBoxs.length));
        }
    }
    else
    {
        Element.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
		
        if (Element.GetHtml () === this.GetHtml ().firstChild)
        {
            Element.SetMarginTop (0);
        }
        
        else if (Element.GetHtml () === this.GetHtml ().lastChild)
        {
            Element.SetMarginTop (this.GetMarginElements ());
        }
		
        if (Element.GetExpand ()) Element.SetWidth (this.GetWidth ()*0.99);
		
        if (!Element.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_LEFT:
                    Element.SetMarginLeft (0);
                    break;
		   
                case Gwt.Gui.ALIGN_CENTER:
                    Element.SetMarginLeft ((this.GetWidth() - Element.GetWidth())/2);
                    break;
		
                case Gwt.Gui.ALIGN_RIGHT:
                    Element.SetMarginLeft (this.GetWidth() - (Element.GetWidth() + Element.GetBorder()*2));
                    break;
		
                default:
                    throw TypeError("Invalid VBox Alignment Value");
                    break;
            }
        }
    }
}

Gwt.Gui.VBox.prototype.SetAlignment = function(Alignment)
{
    switch(Alignment)
    {
	case Gwt.Gui.ALIGN_CENTER:
	    this.Alignment = Gwt.Gui.ALIGN_CENTER;
	    break;
	
	case Gwt.Gui.ALIGN_LEFT:
	    this.Alignment = Gwt.Gui.ALIGN_LEFT;
	    break;
	
	case Gwt.Gui.ALIGN_RIGHT:
	    this.Alignment = Gwt.Gui.ALIGN_RIGHT;
	    break;
	
	default:
	    throw TypeError("Invalid VBox Alignment Value");
	    break;
    }
}

Gwt.Gui.VBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}

Gwt.Gui.VBox.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.VBox.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    var elements = this.GetChilds ();
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        
        if (tmp.GetExpand ()) tmp.SetWidth (this.GetWidth ()*0.99);
		
        if (!tmp.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_LEFT:
                    tmp.SetMarginLeft (0);
                    break;
                        
                case Gwt.Gui.ALIGN_CENTER:
                    tmp.SetMarginLeft ((this.GetWidth() - tmp.GetWidth())/2);
                    break;
                        
                case Gwt.Gui.ALIGN_RIGHT:
                    tmp.SetMarginLeft (this.GetWidth() - (tmp.GetWidth() + tmp.GetBorder()*2));
                    break;
                        
                default:
                    throw TypeError("Invalid VBox Alignment Value");
                    break;
            }
        }
    }
}

Gwt.Gui.VBox.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    var elements = this.GetChilds ();
    var hboxs = [];
    var others = [];
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp instanceof Gwt.Gui.HBox)
        {
            hboxs.push (tmp);
        }
        else
        {
            others.push (tmp);
        }
    }
    
    var SpaceOcuped = 0;
    for (var k = 0; k < others.length; k++)
    {
        var tmp = others[k];
        SpaceOcuped += tmp.GetHeight();
    }
            
    for (var j = 0; j < hboxs.length; j++)
    {
        var tmp = hboxs[j];
        tmp.SetHeight (((this.GetHeight () - SpaceOcuped) / hboxs.length));
    }
}
//Ends Gwt::Gui::VBox
//##################################################################################################

    //Class Gwt::Gui::Slider
Gwt.Gui.Slider = function (Slots)
{
    Gwt.Gui.Frame.call (this);
    
    this.Slots = null;
    this.Panel = null;
    this.ArrowLeft = null;
    this.ArrowRight = null;
    this.Viewer = null;
    this.Slide = null;
    
    this.InitSlider (Slots);
}

Gwt.Gui.Slider.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Slider.prototype.constructor = Gwt.Gui.Slider;

Gwt.Gui.Slider.prototype.FinalizeSlider = function ()
{
    this.Slots = null;
    this.Panel = null;
    this.ArrowLeft = null;
    this.ArrowRight = null;
    this.Viewer = null;
    this.Slide = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Slider.prototype.InitSlider = function (Slots)
{
    this.SetClassName ("Gwt_Gui_Slider");
    
    this.Slots = new Array (typeof(Slots) === "undefined"? 1 : Slots);
    
    this.Panel = new Gwt.Gui.Frame ();
    
    this.ArrowLeft = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.left.svg", "");
    this.ArrowLeft.SetWidth (28);
    this.ArrowLeft.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideRight.bind (this));
    
    this.ArrowRight = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "");
    this.ArrowRight.SetWidth (28);
    this.ArrowRight.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideLeft.bind (this));
    
    this.Viewer = new Gwt.Gui.Frame ();
    
    this.Slide = new Gwt.Gui.HBox ();
    
    this._Add (this.Viewer);
    this._Add (this.Panel);
}

Gwt.Gui.Slider.prototype.GetSlots = function ()
{
    return this.Slots;
}

Gwt.Gui.Slider.prototype._Add = function (Widget)
{
    Widget.Parent = this;
    this.Add (Widget);
}

Gwt.Gui.Slider.prototype.Setup = function ()
{
    this.Panel.SetSize (this.GetWidth (), 28);
    this.Viewer.SetSize (this.GetWidth (), (this.GetHeight () - 28));
    
    var Hbox = new Gwt.Gui.HBox (0);
    var Col1 = new Gwt.Gui.VBox (0);
    var Col2 = new Gwt.Gui.VBox (0);
    
    Hbox.SetSize (this.Panel.GetWidth(), 28);
    Col1.SetHeight (28);
    Col2.SetHeight (28);
    Col2.SetAlignment (Gwt.Gui.ALIGN_RIGHT);
    
    Hbox.Add (Col1);
    Hbox.Add (Col2);
    
    this.Panel.Add (Hbox);
    Col1.Add (this.ArrowLeft);
    Col2.Add (this.ArrowRight);
    
    this.Slide.SetSize (this.Viewer.GetWidth ()*this.GetSlots ().length, this.Viewer.GetHeight ());
 
    this.Viewer.Add (this.Slide);
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       var Tmp = new Gwt.Gui.VBox ();
       this.GetSlots ()[i] = Tmp;
    }
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       this.Slide.Add (this.GetSlots ()[i]);
    }
}

Gwt.Gui.Slider.prototype.SlideLeft = function ()
{
     if (-this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth() )
     {
        this.Slide.SetPosition (this.Slide.GetPositionLeft () - this.Viewer.GetWidth (), 0);
     }
}

Gwt.Gui.Slider.prototype.SlideRight = function ()
{
     if (this.Slide.GetPositionLeft() < 0 && this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth())
     {
        this.Slide.SetPosition (this.Slide.GetPositionLeft () + this.Viewer.GetWidth (), 0);
     }
}

Gwt.Gui.Slider.prototype.AddSlotWidget = function (Slot, Widget)
{
    this.GetSlots ()[Slot].Add (Widget);
}

//Ends Gwt::Gui::Slider
//##################################################################################################

//##################################################################################################
//Class Gwt::Gui::Desktop
Gwt.Gui.Clock = function ()
{
	Gwt.Gui.Frame.call (this);
	
	this.resource = null;
	this.seconds = null;
	this.minutes = null;
	this.hours = null;
	this.seconds_bar = null;
	this.minutes_bar = null;
	this.hours_bar = null;
	this.center = null;
	this.seconds_interval = null;
	
	this.InitClock ();
}

Gwt.Gui.Clock.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Clock.prototype.constructor = Gwt.Gui.Clock;

Gwt.Gui.Clock.prototype.FinalizeClock = function ()
{
	this.resource = null;
	this.seconds = null;
	this.minutes = null;
	this.hours = null;
	this.seconds_bar = null;
	this.minutes_bar = null;
	this.hours_bar = null;
	this.center = null;
	this.seconds_interval = null;
	
	this.FinalizeFrame ();
}

Gwt.Gui.Clock.prototype.InitClock = function ()
{
	this.SetClassName ("Gwt_Gui_Clock");
	this.SetSize (200, 200);
	
	this.resource = new XMLHttpRequest ();
	this.resource.open ("GET", Gwt.Core.Contrib.Images+"clock.svg", true);
	this.resource.overrideMimeType("image/svg+xml");
	this.resource.onreadystatechange = this.Ready.bind(this);
	this.resource.send ("");
}

Gwt.Gui.Clock.prototype.Ready = function ()
{
	if (this.resource.readyState == 4 && this.resource.status == 200)
	{
		this.Html.appendChild (this.resource.responseXML.documentElement);
		var date = new Date ();
		this.seconds = date.getSeconds ();
		this.minutes = date.getMinutes ();
		this.hours = date.getHours ();
	
		this.seconds_bar = this.Html.firstChild.getElementById("seconds");
		this.minutes_bar = this.Html.firstChild.getElementById("minutes");
		this.hours_bar = this.Html.firstChild.getElementById("hours");
	
		this.center = {'x': this.Html.firstChild.getAttribute ("width")/2, 'y': this.Html.firstChild.getAttribute ("height")/2};
	
		this.seconds_bar.setAttribute ("transform", "rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");
		this.seconds_interval = setInterval (this.UpdateSeconds.bind(this), 1000);
	
		this.minutes_bar.setAttribute ("transform", "rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");
	
		this.hours_bar.setAttribute ("transform", "rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");
	}
}

Gwt.Gui.Clock.prototype.UpdateSeconds = function ()
{
	this.seconds += 1;
	this.seconds_bar.setAttribute ("transform", "rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");
	
	if(this.seconds == 60)
	{
		this.seconds = 0;
		this.UpdateMinutes ();
	}
}

Gwt.Gui.Clock.prototype.UpdateMinutes = function ()
{
	this.minutes += 1;
	this.minutes_bar.setAttribute ("transform", "rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");
	
	if (this.minutes == 60)
	{
		this.minutes = 0;
		this.UpdateHours ();
	}
}

Gwt.Gui.Clock.prototype.UpdateHours = function ()
{
	this.hours += 1;	
	this.hours_bar.setAttribute ("transform", "rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");
	
	if (this.hours == 24)
	{
		this.hours = 0;
	}
}
//Ends Gwt::Gui::Clock
//##################################################################################################
//##################################################################################################
//Class Gwt::Gui::ButtonSvUpDl
Gwt.Gui.ButtonSvUpDl = function ()
{
    Gwt.Gui.Button.call (this, Gwt.Core.Contrib.Images+"appbar.cabinet.in.svg", "Guardar");
    
    this.Update = null;
    
    this.InitButtonSvUpDl ();
}

Gwt.Gui.ButtonSvUpDl.prototype = new Gwt.Gui.Button ();
Gwt.Gui.ButtonSvUpDl.prototype.constructor = Gwt.Gui.ButtonSvUpDl;

Gwt.Gui.ButtonSvUpDl.prototype.FinalizeButtonSvUpDl = function ()
{
    this.Update = null;
    this.FinalizeButton ();
}

Gwt.Gui.ButtonSvUpDl.prototype.InitButtonSvUpDl = function ()
{
    this.SetWidth (95);
    this.SetText ("Guardar");
    this.AddEvent (Gwt.Gui.Event.Mouse.Mousemove, this.CtrlSvUpDl.bind (this));
    this.AddEvent (Gwt.Gui.Event.Mouse.Mouseout, this.CtrlReset.bind (this));
    
    this.Update = false;
}

Gwt.Gui.ButtonSvUpDl.prototype.CtrlSvUpDl = function (event)
{
    if (!this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
    else if (this.Update && !event.ctrlKey)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
    else if (this.Update && event.ctrlKey)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/application-exit.svg");
    	this.SetWidth (90);
        this.SetText ("Eliminar");
    }
}

Gwt.Gui.ButtonSvUpDl.prototype.CtrlReset = function (enable_disable)
{
    if (!this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
    else
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
}

Gwt.Gui.ButtonSvUpDl.prototype.SetUpdate = function (enable_disable)
{
    this.Update = enable_disable;
    
    if (this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
    else
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
}
//Ends Gwt::Gui::Button_sv_up_dl
//##################################################################################################

//##################################################################################################
//Class Gwt::Gui::Button_on_off
Gwt.Gui.ButtonOnOff = function ()
{
	Gwt.Gui.Frame.call (this);
	this.Graphic = null;
	this.InitButtonOnOff ();
	this.Status = 0;
}

Gwt.Gui.ButtonOnOff.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.ButtonOnOff.prototype.constructor = Gwt.Gui.ButtonOnOff;

Gwt.Gui.ButtonOnOff.prototype.FinalizeButtonOnOff = function ()
{
	this.Graphic = null;
	this.FinalizeFrame ();
}

Gwt.Gui.ButtonOnOff.prototype.InitButtonOnOff = function ()
{
	this.SetClassName ("Gwt_Gui_Button_on_off");
	this.SetSize (48,24);
	this.SetBorder(1);
	this.SetOutLine (Gwt.Gui.Contrib.OutLine.None);
	var colorborder = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
	colorborder.SetAlpha (0.5);
	this.SetBorderColor(colorborder);
	var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
	colorbackground.SetAlpha (0.25);
	this.SetBackgroundColor(colorbackground);
	this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);
	this.SetBorderRadius(24);
	
	this.Graphic = new Gwt.Graphic.Svg.Canvas ();
        this.Graphic.SetSize (24, 24);
	this.Graphic.SetViewBox (0, 0, this.Graphic.GetWidth(), this.Graphic.GetHeight());
		
	this.Circle = new Gwt.Graphic.Svg.Circle ();
	this.Circle.SetFill ("Azure");
	this.Circle.SetCx (12);
	this.Circle.SetCy (12);
	
	this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Click.bind(this));
	
	this.Graphic.Add (this.Circle);
	this.Add (this.Graphic);

}

Gwt.Gui.ButtonOnOff.prototype.Click = function ()
{
		
	if (this.Status === 0)
	{
		//Habia un pequeño bug porque el metodo SetPosition(Y, X) recibia los argumentos trocados
		//X era Y y Y era X, como ya lo arreglé tenga cuidado la declaración de SetPosition(X, Yser) es la correcta;
		this.Graphic.SetPosition (24,0);
		var colorbackground = new Gwt.Gui.Contrib.Color (0,102,255);
		colorbackground.SetAlpha (0.3);
		this.SetBackgroundColor(colorbackground);
		this.Status = 1;
	}
	else
	{
		this.Graphic.SetPosition (0,0);
		var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
		colorbackground.SetAlpha (0.25);
		this.SetBackgroundColor(colorbackground);
		this.Status = 0;
	}
}


//Ends Gwt::Gui::ButtonOnOff
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::IconControl
Gwt.Gui.IconControl = function (Icon, Control)
{
    Gwt.Gui.Frame.call (this);
    
    this.Icon = null;
    this.Control = null;
    
    this.InitIconControl (Icon, Control);
}

Gwt.Gui.IconControl.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.IconControl.prototype.constructor = Gwt.Gui.IconControl;

Gwt.Gui.IconControl.prototype.FinalizeIconControl = function ()
{
    this.Icon = null;
    this.Control = null;
    this.FinalizeFrame ();
}

Gwt.Gui.IconControl.prototype.InitIconControl = function (Icon, Control)
{
    this.SetClassName ("Gwt_Gui_Icon_Control");
    
    this.Icon = new Gwt.Gui.Image(Icon || Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.notification.star.svg");
    this.Icon.SetSize(22, 22);
    this.Icon.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Icon.SetMarginRight (5);
    this.Icon.SetValign (Gwt.Gui.Contrib.Valign.Top);
    
    this.Control = Control || new Gwt.Gui.StaticText ("Text Default");
    this.Control.SetWidth (this.GetWidth () - (this.Icon.GetWidth () + this.Icon.GetMarginRight ()));
    this.Control.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    
    this.SetHeight (24);
    this.SetExpand (true);    
    this.Add (this.Icon);
    this.Add (this.Control);
}

Gwt.Gui.IconControl.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    this.Icon.SetWidth (22);
    this.Control.SetWidth (this.GetWidth () - (this.Icon.GetWidth () + this.Icon.GetMarginRight ()));
}

Gwt.Gui.IconControl.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    this.Icon.SetHeight (22);
    this.Control.SetHeight (24);
}
//Ends Gwt::Gui::IconEntry
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::IconEntry
Gwt.Gui.IconEntry = function (Icon, Placeholder)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.Entry(Placeholder));
    
    this.InitIconEntry ();
}

Gwt.Gui.IconEntry.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconEntry.prototype.constructor = Gwt.Gui.IconEntry;

Gwt.Gui.IconEntry.prototype.FinalizeIconEntry = function ()
{
    this.FinalizeIconControl ();
}

Gwt.Gui.IconEntry.prototype.InitIconEntry = function ()
{
    this.SetClassName ("Gwt_Gui_Icon_Entry");
}
//Ends Gwt::Gui::IconEntry
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::IconSelectBox
Gwt.Gui.IconSelectBox = function (Icon, Placeholder, Options)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.SelectBox(Placeholder, Options));
    
    this.InitIconSelectBox ();
}

Gwt.Gui.IconSelectBox.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconSelectBox.prototype.constructor = Gwt.Gui.IconSelectBox;

Gwt.Gui.IconSelectBox.prototype.FinalizeIconSelectBox = function ()
{
    this.FinalizeIconSelectBox ();
}

Gwt.Gui.IconSelectBox.prototype.InitIconSelectBox = function ()
{
    this.SetClassName ("Gwt_Gui_Icon_Select_Box");
}
//Ends Gwt::Gui::IconSelectBox
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Date = function (placeholder)
{
        Gwt.Gui.Frame.call (this);
        this.year = null;
        this.month = null;
        this.day = null;
        this.InitDate (placeholder);
}

Gwt.Gui.Date.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Date.prototype.constructor = Gwt.Gui.Date;

Gwt.Gui.Date.prototype.FinalizeDate = function (placeholder)
{
    this.year.FinalizeSelectBox ();
    this.year = null;
    this.month.FinalizeSelectBox ();
    this.mont = null;
    this.day.FinalizeSelectBox ();
    this.day = null;
    this.FinalizeFrame ();
}

Gwt.Gui.Date.prototype.InitDate = function (placeholder)
{
    this.SetClassName ("Gwt_Gui_Date");
    this.SetSize (190, 24);

    var y = new Date().getFullYear();
    var range = (y-150);
    var years_items = [];
    for (var i=y; i>=range; i--)
    {
        years_items.push ({"text": i, "value": i});
    }
    this.year = new Gwt.Gui.SelectBox ("Año", years_items);
    this.year.SetWidth (64);
    
    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    var months_items = [];
    for (var i=1; i<=12; i++)
    {
        months_items.push ({"text": months[i-1], "value": i});
    }
    this.month = new Gwt.Gui.SelectBox ("Mes", months_items);
    this.month.SetWidth (48);
    
    var days_items = [];
    for (var i=1; i<=31; i++)
    {
        if (i<10)
        {
            days_items.push ({"text": "0".concat(i), "value": i});
        }
        else
        {
            days_items.push ({"text": String(i), "value": i});
        }
    }
    
    this.day = new Gwt.Gui.SelectBox ("Día", days_items);
    this.day.SetWidth (48);

    this.container = new Gwt.Gui.HBox (0);
    this.container.SetSize (160,24);

    this.Add (this.container);
    this.container.Add (this.day);
    this.container.Add (this.month);
    this.container.Add (this.year);
}

Gwt.Gui.Date.prototype.GetDate = function ()
{
    return "%D-%M-%Y".replace ("%D", this.day.GetValue()).replace ("%M", this.month.GetValue()).replace ("%Y", this.year.GetValue());
}

Gwt.Gui.Date.prototype.SetDate = function (year, month, day)
{
    if (typeof(year) === "string")
    {
        try{
            var string_date = year.split ("-");
            this.day.SetValue (Number(string_date[0]));
            this.month.SetValue (Number(string_date[1]));
            this.year.SetValue (Number(string_date[2]));
        }
        catch (e)
        {
            console.log ("No se puede convertir la fecha de string a date");   
        }
    }
    else if (typeof(year)==="number", typeof(month)==="number", typeof(day)==="number")
    {
        this.day.SetValue (day);
        this.month.SetValue (month);
        this.year.SetValue (year);
    }
}

Gwt.Gui.Date.prototype.Reset = function ()
{
	this.day.Reset ();
	this.month.Reset ();
	this.year.Reset ();
}

Gwt.Gui.Date.prototype.Now = function ()
{
	var d = new Date ();
	this.SetDate (d.getFullYear(), d.getMonth()+1, d.getDate());
}

Gwt.Gui.Date.prototype.GetString = function ()
{
	return this.year.GetValue()+"-"+this.month.GetValue()+"-"+this.day.GetValue();
}
//Ends Gwt::Gui::Image
//##################################################################################################


//Gwt::Graphic
//###########################################################################################################
Gwt.Graphic = new Object ();
//###########################################################################################################
//End Gwt::Graphic::Svg
//Gwt::Graphic::Svg
//###########################################################################################################
//environments constants
Gwt.Graphic.Svg = new Object ();
Gwt.Graphic.Svg.Contrib = new Object ();

Gwt.Graphic.Svg.Contrib.AspectRatio =
{
    XMinYMin : "xMimYMin",
    XMidYMid : "xMidYMid",
    XMaxYMax : "xMaxYMax",
    XMinYMid : "xMinYMid",
    XMidYMin : "xMidYMin",
    XMidYMax : "xMidYMax",
    XMaxYMid : "xMaxYMid",
    XMinYMax : "xMinYMax",
    XMaxYMin : "xMaxYMin",
}

Gwt.Graphic.Svg.Contrib.ZoomAndPan =
{
    Magnify : "magnify",
    Disable : "disable",
}

Gwt.Graphic.Svg.Contrib.StrokeLineCap =
{
    Butt : "butt",
    Round : "round",
    Square : "square",
}
//###########################################################################################################
//Gwt::Graphic::Conf

//##################################################################################################
//Class Gwt::Graphics::Svg::Graphic
Gwt.Graphic.Svg.Graphic = function ()
{
    this.Html = null;
    this.Width = null;
    this.Height = null;
    this.Fill = null;
    this.FillOpacity = null;
    this.Stroke = null;
    this.StrokeOpacity = null;
    this.StrokeWidth = null;
    this.StrokeLineCap = null;
    this.StrokeDashArray = null;
    
    this.InitGraphic ();
}

Gwt.Graphic.Svg.Graphic.prototype.InitGraphic = function ()
{
    this.Html = document.createElement ("svg");
    
    this.SetWidth (100);
    this.SetHeight (100);
}

Gwt.Graphic.Svg.Graphic.prototype.FinalizeGraphic = function ()
{
    this.Html = null;

    this.Width = null;
    this.Height = null;
}

Gwt.Graphic.Svg.Graphic.prototype.Add = function (element)
{
    this.Html.appendChild (element.Html);
}

Gwt.Graphic.Svg.Graphic.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.Html.setAttribute ("width", this.Width+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.GetWidth = function ()
{
    return this.Width;
}

Gwt.Graphic.Svg.Graphic.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.Html.setAttribute ("height", this.Height+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.GetHeight = function ()
{
    return this.Height;
}

Gwt.Graphic.Svg.Graphic.prototype.SetSize = function (Width, Height)
{
    this.SetWidth (Width);
    this.SetHeight (Height);
}

Gwt.Graphic.Svg.Graphic.prototype.SetFill = function (Fill)
{
    this.Fill = Fill;
    this.Html.setAttribute ("fill", this.Fill);
}

Gwt.Graphic.Svg.Graphic.prototype.SetFillOpacity = function (FillOpacity)
{
    this.FillOpacity = FillOpacity;
    this.Html.setAttribute ("fill-opacity", this.FillOpacity);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStroke = function (Stroke)
{
    this.Stroke = Stroke;
    this.Html.setAttribute ("stroke", this.Stroke);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeOpacity = function (StrokeOpacity)
{
    this.StrokeOpacity = StrokeOpacity;
    this.Html.setAttribute ("stroke-opacity", this.StrokeOpacity);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeWidth = function (StrokeWidth)
{
    this.StrokeWidth = StrokeWidth;
    this.Html.setAttribute ("stroke-width", this.StrokeWidth+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeLineCap = function (StrokeLineCap)
{
    this.StrokeLineCap = StrokeLineCap;
    this.Html.setAttribute ("stroke-linecap", this.StrokeLineCap);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeDashArray = function (StrokeDashArray)
{
    this.StrokeDashArray = StrokeDashArray;
    this.Html.setAttribute ("stroke-dasharray", this.StrokeDashArray);
}
//##################################################################################################
//End Gwt::Graphic::Svg::Graphic

//##################################################################################################
//Class Gwt::Graphics::Svg::Canvas
Gwt.Graphic.Svg.Canvas = function ()
{
    Gwt.Gui.Frame.call (this);
    this.X = null;
    this.Y = null;
    this.ViewBoxMinX = null;
    this.ViewBoxMinY = null;
    this.ViewBoxWidth = null;
    this.ViewBoxHeight = null;
    this.PreserveAspectRatio = null;
    this.ZoomAndPan = null;
    this.Xmlns = null;
    this.XmlnsXlink = null;
    this.XmlSpace = null;
    
    
    this.InitCanvas ();
}

Gwt.Graphic.Svg.Canvas.prototype = new Gwt.Gui.Frame ();
Gwt.Graphic.Svg.Canvas.prototype.constructor = Gwt.Graphic.Svg.Canvas;

Gwt.Graphic.Svg.Canvas.prototype.InitCanvas = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "svg");
    this.SetX (0);
    this.SetY (0);
    this.SetWidth (100);
    this.SetHeight (100);
    this.SetViewBox (0, 0, this.GetWidth(), this.GetHeight());
    this.SetPreserveAspectRatio (Gwt.Graphic.Svg.Contrib.AspectRatio.XMaxYMax);
    this.SetZoomAndPan (Gwt.Graphic.Svg.Contrib.ZoomAndPan.Disable);
    this.SetXmlns ("http://www.w3.org/2000/svg", "http://www.w3.org/1999/xlink", "preserve");
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Relative);
}

Gwt.Graphic.Svg.Canvas.prototype.FinalizeCanvas = function ()
{
    this.FinalizeSvgGraphic ();
    this.X = null;
    this.Y = null;
    this.ViewBoxMinX = null;
    this.ViewBoxMinY = null;
    this.ViewBoxWidth = null;
    this.ViewBoxHeight = null;
    this.PreserveAspectRatio = null;
    this.ZoomAndPan = null;
    this.Xmlns = null;
    this.XmlnsXlink = null;
    this.XmlSpace = null;
}

Gwt.Graphic.Svg.Canvas.prototype.SetX = function (X)
{
    this.X = X;
    this.Html.setAttribute ("x", this.X+"px");
}

Gwt.Graphic.Svg.Canvas.prototype.GetX = function ()
{
    return this.X;
}

Gwt.Graphic.Svg.Canvas.prototype.SetY = function (Y)
{
    this.Y = Y;
    this.Html.setAttribute ("Y", this.Y+"px");
}

Gwt.Graphic.Svg.Canvas.prototype.GetY = function ()
{
    return this.Y;
}

Gwt.Graphic.Svg.Canvas.prototype.SetViewBox = function (Minx, Miny, Width, Height)
{
    this.ViewBoxMinX = Minx;
    this.ViewBoxMinY = Miny;
    this.ViewBoxWidth = Width;
    this.ViewBoxHeight = Height;
    
    this.Html.setAttribute ("viewBox", this.ViewBoxMinX+", "+this.ViewBoxMinX+", "+this.ViewBoxWidth+", "+this.ViewBoxHeight);
}

Gwt.Graphic.Svg.Canvas.prototype.SetPreserveAspectRatio = function (AspectRatio)
{
    this.PreserveAspectRatio = AspectRatio;
    
    this.Html.setAttribute ("preserveAspectRatio", this.PreserveAspectRatio);
}

Gwt.Graphic.Svg.Canvas.prototype.SetZoomAndPan = function (ZoomAndPan)
{
    this.ZoomAndPan = ZoomAndPan;
    
    this.Html.setAttribute ("zoomAndPan", this.ZoomAndPan);
}

Gwt.Graphic.Svg.Canvas.prototype.SetXmlns = function (Xmlns, XmlnsXlink, XmlSpace)
{
    this.Xmlns  = Xmlns;
    this.XmlnsXlink = XmlnsXlink;
    this.XmlSpace = XmlSpace;
    
    this.Html.setAttribute ("xmlns", this.Xmlns);
    this.Html.setAttribute ("xmlns:xlink", this.XmlnsXlink);
    this.Html.setAttribute ("xml:space", this.XmlSpace);
}
//Ends Gwt::Graphic::Svg::Canvas 
//##################################################################################################

//##################################################################################################
//Class Gwt::Graphics::Svg::Rect
Gwt.Graphic.Svg.Rect = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.X = null;
    this.Y = null;
    this.Rx = null;
    this.Ry = null;
 
    this.InitRect ();
}

Gwt.Graphic.Svg.Rect.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Rect.prototype.constructor = Gwt.Graphic.Svg.Rect;

Gwt.Graphic.Svg.Rect.prototype.InitRect = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "rect");
    this.SetX (0);
    this.SetY (0);
    this.SetSize (100, 100);
}

Gwt.Graphic.Svg.Rect.prototype.SetX = function (X)
{
    this.X = X;
    this.Html.setAttribute ("x", this.X+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetX = function ()
{
    return this.X;
}

Gwt.Graphic.Svg.Rect.prototype.SetY = function (Y)
{
    this.Y = Y;
    this.Html.setAttribute ("Y", this.Y+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetY = function ()
{
    return this.Y;
}

Gwt.Graphic.Svg.Rect.prototype.SetRx = function (Rx)
{
    this.Rx = Rx;
    this.Html.setAttribute ("rx", this.Rx+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRx = function ()
{
    return this.Rx;
}

Gwt.Graphic.Svg.Rect.prototype.SetRy = function (Ry)
{
    this.Ry = Ry;
    this.Html.setAttribute ("ry", this.Ry+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRy = function ()
{
    return this.Ry;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Rect

//##################################################################################################
//Class Gwt::Graphics::Circle
Gwt.Graphic.Svg.Circle = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Cx = null;
    this.Cy = null;
    this.R = null;
 
    this.InitCircle ();
}

Gwt.Graphic.Svg.Circle.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Circle.prototype.constructor = Gwt.Graphic.Svg.Circle;

Gwt.Graphic.Svg.Circle.prototype.InitCircle = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "circle");
    this.SetCx (0);
    this.SetCy (0);
    this.SetR (10);
}

Gwt.Graphic.Svg.Circle.prototype.SetCx = function (Cx)
{
    this.Cx = Cx;
    this.Html.setAttribute ("cx", this.Cx+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetCx = function ()
{
    return this.Cx;
}

Gwt.Graphic.Svg.Circle.prototype.SetCy = function (Cy)
{
    this.Cy = Cy;
    this.Html.setAttribute ("cy", this.Cy+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetCy = function ()
{
    return this.Cy;
}

Gwt.Graphic.Svg.Circle.prototype.SetR = function (R)
{
    this.R = R;
    this.Html.setAttribute ("r", this.R+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetR = function ()
{
    return this.R;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Circle

//##################################################################################################
//Class Gwt::Graphics::Svg::Ellipse
Gwt.Graphic.Svg.Ellipse = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Cx = null;
    this.Cy = null;
    this.Rx = null;
    this.Ry = null;
 
    this.InitEllipse ();
}

Gwt.Graphic.Svg.Ellipse.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Ellipse.prototype.constructor = Gwt.Graphic.Svg.Ellipse;

Gwt.Graphic.Svg.Ellipse.prototype.InitEllipse = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "ellipse");
    this.SetCx (0);
    this.SetCy (0);
    this.SetRx (0);
    this.SetRy (0);
}

Gwt.Graphic.Svg.Ellipse.prototype.SetCx = function (Cx)
{
    this.Cx = Cx;
    this.Html.setAttribute ("cx", this.Cx+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetCx = function ()
{
    return this.Cx;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetCy = function (Cy)
{
    this.Cy = Cy;
    this.Html.setAttribute ("cy", this.Cy+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetCy = function ()
{
    return this.Cy;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetRx = function (Rx)
{
    this.Rx = Rx;
    this.Html.setAttribute ("rx", this.Rx+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetRx = function ()
{
    return this.Rx;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetRy = function (Ry)
{
    this.Ry = Ry;
    this.Html.setAttribute ("ry", this.Ry+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetRy = function ()
{
    return this.Ry;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Ellipse

//##################################################################################################
//Class Gwt::Graphics::Line
Gwt.Graphic.Svg.Line = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.X1 = null;
    this.Y1 = null;
    this.X2 = null;
    this.Y2 = null;
 
    this.InitLine ();
}

Gwt.Graphic.Svg.Line.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Line.prototype.constructor = Gwt.Graphic.Svg.Line;

Gwt.Graphic.Svg.Line.prototype.InitLine = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "line");
    this.SetP1 (0, 0);
    this.SetP2 (10, 10);
}

Gwt.Graphic.Svg.Line.prototype.SetX1 = function (X1)
{
    this.X1 = X1;
    this.Html.setAttribute ("x1", this.X1+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetX1 = function ()
{
    return this.X1;
}

Gwt.Graphic.Svg.Line.prototype.SetY1 = function (Y1)
{
    this.Y1 = Y1;
    this.Html.setAttribute ("y1", this.Y1+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetY1 = function ()
{
    return this.Y1;
}

Gwt.Graphic.Svg.Line.prototype.SetX2 = function (X2)
{
    this.X2 = X2;
    this.Html.setAttribute ("x2", this.X2+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetX2 = function ()
{
    return this.X2;
}

Gwt.Graphic.Svg.Line.prototype.SetY2 = function (Y2)
{
    this.Y2 = Y2;
    this.Html.setAttribute ("y2", this.Y2+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetY2 = function ()
{
    return this.Y2;
}

Gwt.Graphic.Svg.Line.prototype.SetP1 = function (P1X, P1Y)
{
    this.SetX1 (P1X);
    this.SetY1 (P1Y);
}

Gwt.Graphic.Svg.Line.prototype.SetP2 = function (P2X, P2Y)
{
    this.SetX2 (P2X);
    this.SetY2 (P2Y);
}
//##########################################################################################################
//Gwt::Graphic::Svg::Line

//##################################################################################################
//Class Gwt::Graphics::Svg::Polygon
Gwt.Graphic.Svg.Polygon = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Points = null;
    this.FillRule = null;
 
    this.InitPolygon ();
}

Gwt.Graphic.Svg.Polygon.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Polygon.prototype.constructor = Gwt.Graphic.Svg.Polygon;

Gwt.Graphic.Svg.Polygon.prototype.InitPolygon = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "polygon");
}

Gwt.Graphic.Svg.Polygon.prototype.SetPoints = function (Points)
{
    this.Points = Points;
    this.Html.setAttribute ("points", this.Points);
}

Gwt.Graphic.Svg.Polygon.prototype.GetPoints = function ()
{
    return this.Points;
}

Gwt.Graphic.Svg.Polygon.prototype.SetFillRule = function (FillRule)
{
    this.FillRule = FillRule;
    this.Html.setAttribute ("fill-rule", this.FillRule);
}
//##########################################################################################################
//Gwt::Graphic::Svg::Polygon

//##################################################################################################
//Class Gwt::Graphics::Svg::Polyline
Gwt.Graphic.Svg.Polyline = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Points = null;
 
    this.InitPolygon ();
}

Gwt.Graphic.Svg.Polyline.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Polyline.prototype.constructor = Gwt.Graphic.Svg.Polyline;

Gwt.Graphic.Svg.Polyline.prototype.InitPolyline = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "polyline");
}

Gwt.Graphic.Svg.Polyline.prototype.SetPoints = function (Points)
{
    this.Points = Points;
    this.Html.setAttribute ("points", this.Points);
}

Gwt.Graphic.Svg.Polyline.prototype.GetPoints = function ()
{
    return this.Points;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Polyline

//##################################################################################################
//Class Gwt::Graphics::Svg::Path
Gwt.Graphic.Svg.Path = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.D = null;
    this.M = null;
    this.L = null;
    this.H = null;
    this.V = null;
    this.C = null;
    this.S = null;
    this.Q = null;
    this.T = null;
    this.A = null;
    this.Z = null;
 
    this.InitPath ();
}

Gwt.Graphic.Svg.Path.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Path.prototype.constructor = Gwt.Graphic.Svg.Path;

Gwt.Graphic.Svg.Path.prototype.InitPath = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "path");
}

Gwt.Graphic.Svg.Path.prototype.SetD = function (D)
{
    this.D = D;
    this.Html.setAttribute ("d", this.D);
}

Gwt.Graphic.Svg.Path.prototype.GetD = function ()
{
    return this.D;
}

Gwt.Graphic.Svg.Path.prototype.SetM = function (M)
{
    this.M = "M"+M;
}

Gwt.Graphic.Svg.Path.prototype.GetM = function ()
{
    return this.M;
}

Gwt.Graphic.Svg.Path.prototype.SetL = function (L)
{
    this.L = "L"+L;
}

Gwt.Graphic.Svg.Path.prototype.GetL = function ()
{
    return this.L;
}

Gwt.Graphic.Svg.Path.prototype.SetH = function (H)
{
    this.H = "H"+H;
}

Gwt.Graphic.Svg.Path.prototype.GetH = function ()
{
    return this.H;
}

Gwt.Graphic.Svg.Path.prototype.SetV = function (V)
{
    this.V = "V"+V;
}

Gwt.Graphic.Svg.Path.prototype.GetV = function ()
{
    return this.V;
}

Gwt.Graphic.Svg.Path.prototype.SetC = function (C)
{
    this.C = "C"+C;
}

Gwt.Graphic.Svg.Path.prototype.GetC = function ()
{
    return this.C;
}

Gwt.Graphic.Svg.Path.prototype.SetS = function (S)
{
    this.S = "S"+S;
}

Gwt.Graphic.Svg.Path.prototype.GetS = function ()
{
    return this.S;
}

Gwt.Graphic.Svg.Path.prototype.SetQ = function (Q)
{
    this.Q = "Q"+Q;
}

Gwt.Graphic.Svg.Path.prototype.GetQ = function ()
{
    return this.Q;
}

Gwt.Graphic.Svg.Path.prototype.SetT = function (T)
{
    this.T = "T"+T;
}

Gwt.Graphic.Svg.Path.prototype.GetT = function ()
{
    return this.T;
}

Gwt.Graphic.Svg.Path.prototype.SetA = function (A)
{
    this.A = "A"+A;
}

Gwt.Graphic.Svg.Path.prototype.GetA = function ()
{
    return this.A;
}

Gwt.Graphic.Svg.Path.prototype.SetZ = function ()
{
    this.Z = "Z";
}

Gwt.Graphic.Svg.Path.prototype.UnsetZ = function ()
{
    this.A = "";
}

Gwt.Graphic.Svg.Path.prototype.GetZ = function ()
{
    return this.Z;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Path

//##################################################################################################
//Class Gwt::Graphics::Arc
Gwt.Graphic.Svg.Arc = function ()
{
    Gwt.Graphic.Svg.Path.call (this);
    this.X1 = null;
    this.Y1 = null;
    this.X2 = null;
    this.Y2 = null;
    this.CenterX = null;
    this.CenterY = null;
    this.Radius = null;
    this.InitArc ();
}

Gwt.Graphic.Svg.Arc.prototype = new Gwt.Graphic.Svg.Path ();
Gwt.Graphic.Svg.Arc.prototype.constructor = Gwt.Graphic.Svg.Arc;

Gwt.Graphic.Svg.Arc.prototype.InitArc = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "path");
}

Gwt.Graphic.Svg.Arc.prototype.PolarToCartesian = function (centerX, centerY, angleInDegrees)
{
    var angleInRadians = (angleInDegrees-90) * (Math.PI / 180.0);

    return {
        x: (centerX + (this.Radius * Math.cos(angleInRadians))),
        y: (centerY + (this.Radius * Math.sin(angleInRadians)))
    };
}

Gwt.Graphic.Svg.Arc.prototype.DescribeArc = function (X, Y, Radius, StartAngle, EndAngle)
{
    this.CenterX = X;
    this.CenterY = Y;
    this.Radius = Radius;
    
    var start = this.PolarToCartesian(X, Y, EndAngle);
    this.X1 = start.x;
    this.Y1 = start.y;
    
    var end = this.PolarToCartesian(X, Y, StartAngle);
    this.X2 = end.x;
    this.Y2 = end.y;

    var arcSweep = EndAngle - StartAngle <= 180 ? "0" : "1";
    
    this.SetM ([this.X1, this.Y1].join (" "));
    this.SetA ([this.Radius, this.Radius, 0, arcSweep, 0, this.X2, this.Y2].join (" "));
    this.SetL ([this.CenterX, this.CenterY].join (" "));
    this.SetZ ();
    this.SetD ([this.GetM (), this.GetA (), this.GetL (), this.GetZ()]. join (" "));
}
//##########################################################################################################
//Gwt::Graphic::Svg::Arc

window.addEventListener("load", init);

function init (event)
{
	desktop.open();
	gcontrol.open();
        gusers.open();
	
	/*if (typeof(session_env) != "undefined")
	{
		clearTimeout (session_env);
		session_env = null;
	}
	
	if (sessionStorage.hasOwnProperty ("session"))
	{
		switch (sessionStorage.getItem ("session"))
		{
			case "created":
				login.open ();
				break;
	
			case "block":
				block_session ();
				break;
				
			case "active":
				start_session ();
		}
	}
	else 
	{
		sessionStorage.setItem ("session", "created");
		login.open ();
	}*/
}

function start_up_env (user)
{
	login.close ();
	new Gwt.Core.Request ("/backend/sys/", {'action': "start_up_env", 'username': user}, function (data) {	sessionStorage.setItem ("session", "active"); sessionStorage.setItem ('group', data.response.group); sessionStorage.setItem ("user", data.response.user); start_session();});
}

function start_session (data)
{

	
	lancelot.open ();
	
	document.onmousemove = renueve_session;
	document.onkeypress = renueve_session;
	
	if (typeof(session_env) != "undefined")
	{
		clearTimeout (session_env);
	}
	session_env = setTimeout (block_session, 60000);
}

function block_session ()
{
	sessionStorage.setItem ("session", "block");
	lancelot.close ();
	block.open ();
	if (typeof(session_env) != "undefined")
	{
		clearTimeout (session_env);
	}
	session_env = setTimeout (close_session, 60000);
}

function unlock_session ()
{
	clearTimeout (session_env);
	session_env = null;
	block.close ();
	login.open ();
}

function renueve_session ()
{
	if (sessionStorage.hasOwnProperty ("session"))
	{
		if (sessionStorage.getItem ("session") != "block")
		{
			clearTimeout (session_env);
			session_env = setTimeout (block_session, 60000);
		}
	}
}

function close_session ()
{
	clearTimeout(session_env);
	session_env = null;
	new Gwt.Core.Request ("/backend/auth/", {'action': "logout"}, function (data) {console.log(data);});
	sessionStorage.clear ();
	block.close ();
	login.open ();
}desktop = (function ()
{
var instance;
	
function desktop ()
{
	Gwt.Gui.Frame.call (this);
	document.body.appendChild (this.Html);
	this.SetClassName ("Gwt_Gui_Desktop");
	this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
	this.SetMargin (0);
	this.SetPadding (0);
	this.SetBackgroundImage (Gwt.Core.Contrib.Images+"dark1.jpeg");
	this.SetBackgroundAttachment (Gwt.Gui.Contrib.BackgroundAttachment.Fixed);
	this.SetBackgroundClip (Gwt.Gui.Contrib.BackgroundClip.ContentBox);
	this.SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat, Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
	this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
	this.SetBorder (0);
	
	//new Gwt.Core.Request ("/backend/open_pool/", function () {}, {});
}
	
desktop.prototype = new Gwt.Gui.Frame ();
desktop.prototype.constructor = desktop;
	
desktop.prototype.Show = function (app)
{
	this.Add (app);
}
		
return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new desktop ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.show = function (app)
	{
		instance.Show (app);
	}
}
})();
login = (function ()
{
var instance;

function login () 
{
    Gwt.Gui.Window.call (this);
	
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH - 50, Gwt.Gui.SCREEN_DEVICE_HEIGHT - 50);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
	
    this.imageLogin = new Gwt.Gui.Image(Gwt.Core.Contrib.Images+"connecting_world.svg");
    this.imageLogin.SetSize (500, 350);
    this.imageLogin.SetPosition (170, 180);
    this.imageLogin.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
	
    this.title_label = new Gwt.Gui.StaticText ("Login");
    this.id_type_select = new Gwt.Gui.SelectBox ("Tipo de Documento", [{"text": "Tarjeta de Identidad", "value": "T.I"}, {"text": "Cédula de Ciudadanía", "value": "C.C"}, {"text": "Registro Civil", "value": "R.C"}, {"text": "Cédula Extranjera", "value": "C.E"}, {"text": "Pasaporte", "value": "PS"}, {"text": "Libreta Militar", "value": "L.M"}, {"text": "Registro de Defunción", "value": "R.D"}, {"text": "Carnét de Salud", "value": "C.S"}, {"text": "Registro Mercantil", "value": "R.M"}]);
    this.username_entry = new Gwt.Gui.Entry ("Número de Documento");
    this.username_entry.SetFocus ();
    this.password_entry = new Gwt.Gui.Entry ("Contraseña");
    this.password_entry.ChangeToPassword ();
    this.password_entry.SetMaxLength (4);
	
    this.send_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "Entrar");
    this.send_button.SetWidth (80);
    this.send_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.send.bind (this));
	
    this.controls_container = new Gwt.Gui.VBox ();
    this.controls_container.SetSize (180, 170);
	
    this.controls_container.SetPosition ((this.GetWidth()*70)/100, ((this.GetHeight()*50)/100)-(this.controls_container.GetHeight()/2));
	
    this.Add (this.imageLogin);
    this.Add (this.controls_container);
	
    this.controls_container.Add (this.title_label);
    this.controls_container.Add (this.id_type_select);
    this.controls_container.Add (this.username_entry);
    this.controls_container.Add (this.password_entry);
    this.controls_container.Add (this.send_button);
}

login.prototype = new Gwt.Gui.Window ();
login.prototype.constructor = login;

login.prototype.send = function ()
{
    if (this.username_entry.GetText () !== "" && this.password_entry.GetText () !== "")
    {
	var password = new jsSHA(this.password_entry.GetText (), "TEXT").getHash ("SHA-256", "HEX");
	new Gwt.Core.Request ("/backend/auth/", {'username': this.username_entry.GetText (), 'password': password}, this.response.bind(this));
    }
    else
    {
	console.log ("Datos vacíos");
    }
}

login.prototype.response = function (data)
{
    if (data.status === "success")
    {
        if (Boolean (Number (data.response)))
	{
            start_up_env (this.username_entry.GetText ());
	}
    }
    else
    {
	console.log (data);
    }
}
	
return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
	{
            instance = new login ();
            instance.Open ();
	}
	else
	{
            console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
	}
    }
		
    this.close = function ()
    {
	if (instance !== undefined)
	{
            instance.Close ();
            instance = undefined;
	} 
    }
}
})();
block = (function ()
{ 
var instance;

function block ()
{
    Gwt.Gui.Window.call (this, "Sessión Bloqueada");

    this.SetSize (250,300);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
	
    var date = new Date ();

    var days = [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    this.clock = new Gwt.Gui.Clock ();
            
    this.date = new Gwt.Gui.StaticText ("%d, %m %n, %y".replace ("%d", days[date.getDay ()]).replace ("%m", months[date.getMonth ()]).replace ("%n", date.getDate ()).replace ("%y", date.getFullYear ()));
    this.date.SetWidth (180);
    this.date.TextAlign ("center");
	
    this.unlock_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"document-decrypt.svg", "Desbloquear");
    this.unlock_button.SetWidth (120);
	
    this.layout = new Gwt.Gui.VBox();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
	
    this.Add(this.layout);
    this.SetBorderSpacing (12);
    this.layout.Add(this.clock);
    this.layout.Add(this.date);
    this.layout.Add(this.unlock_button);
		
    this.unlock_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.unlock.bind(this));
}

block.prototype = new Gwt.Gui.Window ();
block.prototype.constructor = block;	

block.prototype.unlock = function ()
{
    unlock_session ();
}
	
return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new block ();
            instance.Open ();
        }
        else
        {
            console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
        }
    }
	
    this.close = function ()
    {
        if (instance !== undefined)
        {
            instance.Close ();
            instance = undefined;
        } 
    }
}
	
})();
test = ( function ()
{
var instance;

function test () 
{
	Gwt.Gui.Window.call (this);
	
	this.SetSize (256, 256);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    
	this.file1 = new Gwt.Gui.File ();
	this.file1.AddEvent (Gwt.Gui.Event.Form.Change, this.send.bind(this));
	this.file1.SetPosition (25, 10);
	
	/*
    this.graphic = new Gwt.Graphic.Svg.Canvas ();
    this.graphic.SetSize (this.GetWidth(), this.GetHeight ());
	this.graphic.SetViewBox (0, 0, this.graphic.GetWidth(), this.graphic.GetHeight());
	
	this.rect1 = new Gwt.Graphic.Svg.Rect ();
	this.rect1.SetFill ("Red");
	
	this.circle1 = new Gwt.Graphic.Svg.Circle ();
	this.circle1.SetFill ("Blue");
	this.circle1.SetCx (10);
	this.circle1.SetCy (10);
	
	this.ellipse1 = new Gwt.Graphic.Svg.Ellipse ();
	this.ellipse1.SetCx (30);
	this.ellipse1.SetCy (30);
	this.ellipse1.SetRx (25);
	this.ellipse1.SetRy (25);
	this.ellipse1.SetFill ("Green");
	
	this.line1 = new Gwt.Graphic.Svg.Line ();
	this.line1.SetStroke ("Yellow");
	this.line1.SetStrokeWidth (10);
	
	this.arc1 = new Gwt.Graphic.Svg.Arc ();
	this.arc1.DescribeArc (100, 100, 100, -30, 190);
	this.arc1.SetFill ("White");
	this.arc1.SetStroke ("Black");
	this.arc1.SetStrokeWidth (1);
	*/
	
	this.buttonoff = new Gwt.Gui.ButtonOnOff ();
	this.buttonoff.SetPosition (25, 25);
	
	this.Add (this.file1);
    this.Add (this.buttonoff);
	
	/*this.graphic.Add (this.rect1);
	this.graphic.Add (this.circle1);
	this.graphic.Add (this.ellipse1);
	this.graphic.Add (this.line1);
	this.graphic.Add (this.arc1);*/

}

test.prototype = new Gwt.Gui.Window ();
test.prototype.constructor = test;

test.prototype.send = function ()
{
	var data = {"user_info": {"document": "1098671330", "document_type": "c.c"}, "userfile": this.file1.GetData ()};
	new Gwt.Core.Request ("/backend/upload_file/", this.response.bind (this), data);
	
}

test.prototype.response = function (data)
{
	console.log (data);
}

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new test ();
			instance.Open ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
		
	this.close = function ()
	{
		if (instance !== undefined)
		{
			instance.Close ();
			instance = undefined;
		} 
	}
}
})();
cuentas = (function ()
{
var instance;


function cuentas()
{
    Gwt.Gui.Window.call (this);
    this.SetSize (200, 170);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    
    this.title_label = new Gwt.Gui.StaticText ("Cuentas");
    //this.title_label.SetWidth ();
    this.code = new Gwt.Gui.Entry ("Código");
    this.name = new Gwt.Gui.Entry ("Nombre");
    this.save_button = new Gwt.Gui.ButtonSvUpDl ();
    
    this.layout = new Gwt.Gui.VBox ();
	
    this.Add (this.layout);
    this.SetBorderSpacing (12);
    
    this.layout.Add (this.title_label);
    this.layout.Add (this.code);
    this.layout.Add (this.name);
    this.layout.Add (this.save_button);
    
    //this.save_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.action.bind (this));
    //this.code.attach_event (Gwt.Gui.Event.Keyboard.KeyUp, this.check_id.bind (this));
	
    this.update = false;
    this.id_update_delete = null;
}

cuentas.prototype = new Gwt.Gui.Window ();
cuentas.prototype.constructor = cuentas;
/*
cuentas.prototype.action = function (event)
{
    var row;
    if (!this.update)
    {
		if(this.code.get_text () !== "" && this.name.get_text () !== "")
		{
		    this.table.create (new row_cuenta (null, this.code.get_text (), this.name.get_text ()));
		    this.code.set_text ("");
		    this.name.set_text ("");
		}
	}
	else
	{
		if (!event.ctrlKey)
		{
		    row = new row_cuenta (this.id_update_delete, this.code.get_text (), this.name.get_text ());
		    this.table.update (row);
		    this.code.set_text ("");
		    this.name.set_text ("");
		    this.id_update_delete = null;
		    this.save_button.set_update (false);
		    this.update = false;
		}
		else
		{
		    row = new row_cuenta (this.id_update_delete, this.code.GetText (), this.name.GetText ());
		    this.table.delete (row);
		    this.id_update_delete = null;
		    this.code.set_text ("");
		    this.name.set_text ("");
		    this.save_button.set_update (false);
		    this.update = false;
		}
	}
}

cuentas.prototype.check_id = function (event)
{
    //console.log (event);
    if (event.keyCode != 17)
    {
		var row = new row_cuenta (this.id_update_delete, this.code.get_text (), this.name.get_text ());
		this.table.select (row, this.check_id_response.bind(this));
    }
}

cuentas.prototype.check_id_response = function (rows)
{
    if (rows instanceof Array)
    {
		if (rows.length === 0)
		{
		    this.name.set_text ("");
		    this.save_button.set_update (false);
		    this.update = false;
		}
	
		else
		{
		    for (var i=0; i<rows.length; i++)
		    {
		        if (rows[i].code === this.code.get_text())
		        {
		            this.name.set_text (rows[i].name);
				    this.id_update_delete = rows[i].id;
				    this.save_button.set_update (true);
				    this.update = true;
				    break;
				}
		    }
		}
    }
}
*/
return new function ()
{
	this.open = function()
	{
		if(instance === undefined)
		{
		    instance = new cuentas();
		    instance.Open ();
		}
		else
		{
		    console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.close = function ()
	{
		if(instance !== undefined)
		{
			instance.Close();
			instance = undefined;
		}
	}
}
})();
gusers = ( function ()
{
var instance;

function gusers () 
{
	Gwt.Gui.Window.call (this, "Usuarios");
	
	this.SetSize (256, 440);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER);

	this.layout = new Gwt.Gui.VBox ();
        this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
	this.Add (this.layout);
	this.SetBorderSpacing (12);
	
	this.avatar = new Gwt.Gui.Avatar ();
        this.title = new Gwt.Gui.StaticText ("Datos:");
        this.doc_type = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.notification.star.svg", "Tipo de Documento", [{"text": "Tarjeta de Identidad", "value": "T.I"}, {"text": "Cédula de Ciudadanía", "value": "C.C"}, {"text": "Registro Civil", "value": "R.C"}, {"text": "Cédula Extranjera", "value": "C.E"}, {"text": "Pasaporte", "value": "PS"}, {"text": "Libreta Militar", "value": "L.M"}, {"text": "Registro de Defunción", "value": "R.D"}, {"text": "Carnét de Salud", "value": "C.S"}, {"text": "Registro Mercantil", "value": "R.M"}, {"text": "Certificado de Defunción", "value": "C.D"}]);
        this.doc_num = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.notification.svg", "Número de Documento");
        this.name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.user.tie.svg", "Nombre");
        this.last_name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.user.add.svg", "Apellidos");
        this.phone = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.phone.svg", "Teléfono");
        this.email = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.email.minimal.svg", "Correo Electrónico");
        this.address = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.home.location.round.svg", "Dirección de Residencia");
        
	this.layout.Add (this.avatar);
        this.layout.Add (this.title);
        this.layout.Add (this.doc_type);
        this.layout.Add (this.doc_num);
        this.layout.Add (this.name);
        this.layout.Add (this.last_name);
        this.layout.Add (this.phone);
        this.layout.Add (this.email);
        this.layout.Add (this.address);
}

gusers.prototype = new Gwt.Gui.Window ();
gusers.prototype.constructor = gusers;

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new gusers ();
			instance.Open ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
		
	this.close = function ()
	{
		if (instance !== undefined)
		{
			instance.Close ();
			instance = undefined;
		} 
	}
}
})();
cedeg = (function ()
{
    var instance;

    function row_cuentas (id, code, name)
    {
         return {"id": id, "code": code, "name": name};
    }

    function row_records (id, cuenta, parcial, debe, haber)
    {
        return {"cuenta": cuenta, "parcial": parcial, "debe": debe, "haber": haber};
    }

    function record_widget (width, height)
    {
        Gwt.Gui.HBox.call (this, 0);
        this.SetClassName ("record_widget");
        this.SetSize (width, height);
    
        this.code = new Gwt.Gui.Entry ("Código");
        this.name = new Gwt.Gui.StaticText ("Nombre");
        this.partial = new Gwt.Gui.Entry ("Parcial");
        this.debe = new Gwt.Gui.Entry ("Debe");
        this.haber = new Gwt.Gui.Entry ("Haber");
    
        this.col1 = new Gwt.Gui.VBox (0);
        this.col2 = new Gwt.Gui.VBox (0);
        this.col3 = new Gwt.Gui.VBox (0);
        this.col4 = new Gwt.Gui.VBox (0);
        this.col5 = new Gwt.Gui.VBox (0);
        
        this.Add (this.col1);
        this.Add (this.col2);
        this.Add (this.col3);
        this.Add (this.col4);
        this.Add (this.col5);
        
        this.col1.Add (this.code);
        this.col2.Add (this.name);
        this.col3.Add (this.partial);
        this.col4.Add (this.debe);
        this.col5.Add (this.haber);
    
        this.cuenta_existe = false;
        this.cuenta_db = new row_cuentas (null, this.code.GetText (), "");
    
        this.code.AddEvent (Gwt.Gui.Event.Keyboard.KeyUp, this.check_id.bind (this));
    }

    record_widget.prototype = new Gwt.Gui.HBox ();
    record_widget.prototype.constructor = record_widget;

    record_widget.prototype.finalize_record_widget = function ()
    {
        this.code.FinalizeEntry();
        this.code = null;
        
        this.name.FinalizeStaticText();
        this.name = null;
        
        this.partial.FinalizeEntry();
        this.partial = null;
        
        this.debe.FinalizeEntry();
        this.debe = null;
        
        this.haber.FinalizeEntry();
        this.haber = null;
        
        this.col1.FinalizeVBox();
        this.col1 = null;
        
        this.col2.FinalizeVBox();
        this.col2 = null;
        
        this.col3.FinalizeVBox();
        this.col3 = null;
        
        this.col4.FinalizeVBox();
        this.col4 = null;
        
        this.col5.FinalizeVBox();
        this.col5 = null;
        
        this.cuenta_existe = null;
    }
    
    record_widget.prototype.Reset = function ()
    {
        this.code.Reset ();
        this.name.SetText ("Nombre");
        this.partial.Reset ();
        this.debe.Reset ();
        this.haber.Reset ();
    }

    record_widget.prototype.is_savable = function ()
    {
        if (this.cuenta_existe && this.partial.GetText () !== "" && (this.haber.GetText () !== "" || this.debe.GetText () !== ""))
        {
            return true;
        }
        return false;
    }

    record_widget.prototype.check_id = function (event)
    {
        if (event.keyCode !== 17)
        {
            var row = new row_cuentas (null, this.code.GetText (), this.name.GetText ());
        }
    }

    record_widget.prototype.check_id_response = function (rows)
    {
        if (rows instanceof Array)
        {
            if (rows.length === 0)
            {
                this.cuenta_db.id = null;
                this.cuenta_db.name = "";
                this.cuenta_existe = false;
                //Gui reset
                this.name.SetText ("Nombre");
                this.partial.Reset ();
                this.debe.Reset ();
                this.haber.Reset ();
            }
            else
            {
                for (var i=0; i<rows.length; i++)
                {
                    if (rows[i].code === this.code.GetText())
                    {
                        this.id = rows[i].id;
                        this.cuenta_db.id = rows[i].id;
                        this.cuenta_db.code = rows[i].code;
                        this.cuenta_db.name = rows[i].name;
                        this.name.SetText (this.cuenta_db.name);
                        this.cuenta_existe = true;
                        break;
                    }
                }
            }
        }
    }

    record_widget.prototype.get_data = function ()
    {
        return new row_records (null, this.cuenta_db, this.partial.GetText(), this.debe.GetText(), this.haber.GetText ());
    }

    record_widget.prototype.copy = function (obj)
    {
        this.code.SetText (obj.cuenta.code);
        this.name.SetText (obj.cuenta.name);
        this.partial.SetText (obj.parcial);
        this.debe.SetText (obj.debe);
        this.haber.SetText (obj.haber);
    }
    
    function row_cedeg (id, number, city, date, holder, cost, bank, cheque, acount, concept, records)
    {
        
        return {
            "id": id,
            "number": Number(number),
            "city": city,
            "date": date,
            "holder": holder,
            "cost": cost,
            "bank": bank,
            "cheque": cheque,
            "acount": acount,
            "concept": concept,
            "records": records
        };
    }

    function cedeg()
    {
        Gwt.Gui.Window.call (this, "Comprobante De Egreso");
        
        this.layout = null;
        this.number = null;
        this.city = null;
        this.date = null;
        this.holder = null;
        this.cost = null;
        this.bank = null;
        this.cheque = null;
        this.acount = null;
        this.concept = null;
        this.records = null;
        this.slider = null;
        this.save_button = null;
        this.update = null;
        this.id_update_delete = null;
        
        this.init_cedeg ();
    }

    cedeg.prototype = new Gwt.Gui.Window ();
    cedeg.prototype.constructor = cedeg;
    
    cedeg.prototype.finalize_cedeg = function ()
    {
        this.layout.FinalizeVBox ();
        this.layout = null;
        
        this.number.FinalizeEntry ();
        this.number = null;
        
        this.city.FinalizeEntry ();
        this.city = null;
        
        this.date.FinalizeDate ();
        this.date = null;
        
        this.holder.FinalizeEntry ();
        this.holder = null;
        
        this.cost.FinalizeEntry ();
        this.cost = null;
        
        this.bank.FinalizeEntry ();
        this.bank = null;
        
        this.cheque.FinalizeEntry ();
        this.cheque = null;
        
        this.acount.FinalizeEntry ();
        this.acount = null;
        
        this.concept.FinalizeText ();
        this.concept = null;
        
        this.slider.FinalizeSlider ();
        this.slider = null;
        
        this.save_button.FinalizeButtonSvUpDl ();
        this.save_button = null;
        
        this.update = null;
        this.id_update_delete = null;
        
        for(var i = 0; i < this.records.length; i++)
        {
            this.records[i].finalize_record_widget();
            this.records[i] = null;
        }
        
        this.records = null;
    }
    
    cedeg.prototype.init_cedeg = function ()
    {
        this.SetSize (450, 450);
        this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
         
        this.layout = new Gwt.Gui.VBox ();
        this.Add (this.layout);
        this.SetBorderSpacing (6);
     
        this.slider = new Gwt.Gui.Slider (3);
        this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ()*0.85);
        this.slider.Setup ();
    
        this.save_button = new Gwt.Gui.ButtonSvUpDl ();
        this.save_button.AddEvent ("click", this.action.bind (this));
        
        this.number = new Gwt.Gui.Entry ("Número");
        this.number.AddEvent ("keyup", this.check_id.bind (this));
        this.city = new Gwt.Gui.Entry ("Lugar");
        this.date = new Gwt.Gui.Date ("Creación");
        this.date.Now ();
        this.holder = new Gwt.Gui.Entry ("A Favor De");
        this.cost = new Gwt.Gui.Entry ("Valor");
        this.bank = new Gwt.Gui.Entry ("Banco");
        this.cheque = new Gwt.Gui.Entry ("Cheque");
        this.acount = new Gwt.Gui.Entry ("Cuenta");
        this.concept = new Gwt.Gui.Text ("Concepto");
        this.records = [];
        this.update = false;
        
        this.layout.Add (this.slider);
        this.layout.Add (this.save_button);
        
        for (var i = 0; i < 15; i++)
        {
            this.records[i] = new record_widget (this.slider.GetWidth (), 24);
        }
         
        this.slider.AddSlotWidget (0, this.number);
        this.slider.AddSlotWidget (0, this.city);
        this.slider.AddSlotWidget (0, this.date);
        this.slider.AddSlotWidget (0, this.holder);
        this.slider.AddSlotWidget (0, this.cost);
        this.slider.AddSlotWidget (0, this.bank);
        this.slider.AddSlotWidget (0, this.cheque);
        this.slider.AddSlotWidget (0, this.acount);
        this.slider.AddSlotWidget (1, this.concept);
        
        for (var i=0; i<this.records.length; i++)
        {
            if (i<=5)
            {
                this.slider.AddSlotWidget (1, this.records[i]);
            }
            else
            {
                this.slider.AddSlotWidget (2, this.records[i]);
            }
        }
    }
    
    cedeg.prototype.check_id = function (event)
    {
        if (event.keyCode !== 17)
        {
            var row = new row_cedeg (this.id_update_delete, this.number.GetText (), this.city.GetText (), this.date.get_string (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), null);
        }
    }
    
    cedeg.prototype.check_id_response = function (rows)
    {
        if (rows instanceof Array)
        {
            if (rows.length === 0)
            {
                this.city.Reset ();
                this.date.now ();
                this.holder.Reset ();
                this.cost.Reset ();
                this.bank.Reset ();
                this.cheque.Reset ();
                this.acount.Reset ();
                this.concept.Reset ();
            }       
            for (var i=0; i<this.records.length; i++)
            {
                this.records[i].Reset ();
            }
              
            this.save_button.SetUpdate (false);
            this.update = false;
        }
        else
        {
            for (var i=0; i<rows.length; i++)
            {
                this.city.SetText (rows[i].city);
                this.date.set_date (rows[i].date);
                this.holder.SetText (rows[i].holder);
                this.cost.SetText (rows[i].cost);
                this.bank.SetText (rows[i].bank);
                this.cheque.SetText (rows[i].cheque);
                this.acount.SetText (rows[i].acount);
                this.concept.SetText (rows[i].concept);
                    
                for (var j=0; j<rows[i].records.length; j++)
                {
                    this.records[j].copy (rows[i].records[j]);
                }
                    
                this.id_update_delete = rows[i].id;
                this.save_button.SetUpdate (true);
                this.update = true;
                break;
            }
        }
    } 

    cedeg.prototype.action = function ()
    {
        if (!this.update)
        {
            if(this.number.GetText () !== "" && this.holder.GetText () !== "" && this.cost.GetText () !== "")
            {
                var records = [];
                for (var i=0; i<this.records.length; i++)
                {
                    if (this.records[i].is_savable ())
                    {
                        records[i]=this.records[i].get_data ();
                    }
                }
                var row = new row_cedeg (null, this.number.GetText (), this.city.GetText (), this.date.get_date (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), records);
            }
        }
        else
        {
            if (!event.ctrlKey)
            {
                var row = new row_cedeg (this.id_update_delete, this.number.GetText (), this.city.GetText (), this.date.get_date (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), this.records);
            
                this.id_update_delete = null;
                this.save_button.SetUpdate (false);
                this.update = false;
            }
            else
            {
                var row = new row_cedeg (this.id_update_delete, this.number.GetText (), this.city.GetText (), this.date.get_date (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), this.records);
		
                this.id_update_delete = null;
                this.save_button.SetUpdate (false);
                this.update = false;
            }
        }
    
        this.city.Reset ();
        this.date.now ();
        this.holder.Reset ();
        this.cost.Reset ();
        this.bank.Reset ();
        this.cheque.Reset ();
        this.acount.Reset ();
        this.concept.Reset ();
        
        for (var i=0; i<this.records.length; i++)
        {
            this.records[i].Reset ();
        }
    }

    return new function ()
    {
        this.open = function()
        {
            if(instance === undefined)
            {
                instance = new cedeg ();
                instance.Open ();
            }
            else
            {
                console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
            }
        }
	
        this.close = function ()
        {
            if(instance !== undefined)
            {
                instance.finalize_cedeg();
                instance.Close();
                instance = undefined;
            }
        }
    }
})();
gcontrol = ( function ()
{
var instance;

function gcontrol () 
{
	Gwt.Gui.Frame.call (this, "Usuarios");
	
	this.SetSize (244, 48);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER, Gwt.Gui.WIN_POS_BOTTOM);
        
        this.layout = new Gwt.Gui.HBox(48);
        this.layout.SetHeight(this.GetHeight());
        this.Add (this.layout);
        
        this.arrow = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.arrow.left.svg");
        this.layout.Add(this.arrow);
    
        this.circle = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.3d.collada.svg");
        this.layout.Add(this.circle);
        
        this.sqrt = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.app.remove.svg");
        this.layout.Add(this.sqrt);
 
        desktop.show (this);
}

gcontrol.prototype = new Gwt.Gui.Frame ();
gcontrol.prototype.constructor = gcontrol;

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new gcontrol ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
                
	}
		
	this.close = function ()
	{
            
		if (instance !== undefined)
		{
			instance.Close ();
			instance = undefined;
		} 
                
	}
}
})();

>>>>>>> upstream/master
