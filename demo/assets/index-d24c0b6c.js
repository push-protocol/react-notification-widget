import{b as V,g as qt,r as Er}from"./index-08116de4.js";function xr(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const a=Object.getOwnPropertyDescriptor(r,o);a&&Object.defineProperty(e,o,a.get?a:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var Je={},T={};Object.defineProperty(T,"__esModule",{value:!0});var Yt=T.getLocalStorage=nn=T.getLocalStorageOrThrow=tn=T.getCrypto=en=T.getCryptoOrThrow=Zt=T.getLocation=Xt=T.getLocationOrThrow=Gt=T.getNavigator=jt=T.getNavigatorOrThrow=Jt=T.getDocument=Qt=T.getDocumentOrThrow=Kt=T.getFromWindowOrThrow=Vt=T.getFromWindow=void 0;function K(e){let t;return typeof window<"u"&&typeof window[e]<"u"&&(t=window[e]),t}var Vt=T.getFromWindow=K;function ne(e){const t=K(e);if(!t)throw new Error(`${e} is not defined in Window`);return t}var Kt=T.getFromWindowOrThrow=ne;function kr(){return ne("document")}var Qt=T.getDocumentOrThrow=kr;function Tr(){return K("document")}var Jt=T.getDocument=Tr;function Sr(){return ne("navigator")}var jt=T.getNavigatorOrThrow=Sr;function Nr(){return K("navigator")}var Gt=T.getNavigator=Nr;function Ar(){return ne("location")}var Xt=T.getLocationOrThrow=Ar;function Br(){return K("location")}var Zt=T.getLocation=Br;function Lr(){return ne("crypto")}var en=T.getCryptoOrThrow=Lr;function Rr(){return K("crypto")}var tn=T.getCrypto=Rr;function Pr(){return ne("localStorage")}var nn=T.getLocalStorageOrThrow=Pr;function Mr(){return K("localStorage")}Yt=T.getLocalStorage=Mr;Object.defineProperty(Je,"__esModule",{value:!0});var rn=Je.getWindowMetadata=void 0;const ht=T;function Or(){let e,t;try{e=ht.getDocumentOrThrow(),t=ht.getLocationOrThrow()}catch{return null}function n(){const f=e.getElementsByTagName("link"),h=[];for(let y=0;y<f.length;y++){const _=f[y],b=_.getAttribute("rel");if(b&&b.toLowerCase().indexOf("icon")>-1){const d=_.getAttribute("href");if(d)if(d.toLowerCase().indexOf("https:")===-1&&d.toLowerCase().indexOf("http:")===-1&&d.indexOf("//")!==0){let m=t.protocol+"//"+t.host;if(d.indexOf("/")===0)m+=d;else{const v=t.pathname.split("/");v.pop();const w=v.join("/");m+=w+"/"+d}h.push(m)}else if(d.indexOf("//")===0){const m=t.protocol+d;h.push(m)}else h.push(d)}}return h}function r(...f){const h=e.getElementsByTagName("meta");for(let y=0;y<h.length;y++){const _=h[y],b=["itemprop","property","name"].map(d=>_.getAttribute(d)).filter(d=>d?f.includes(d):!1);if(b.length&&b){const d=_.getAttribute("content");if(d)return d}}return""}function o(){let f=r("name","og:site_name","og:title","twitter:title");return f||(f=e.title),f}function a(){return r("description","og:description","twitter:description","keywords")}const i=o(),l=a(),u=t.origin,s=n();return{description:l,url:u,icons:s,name:i}}rn=Je.getWindowMetadata=Or;var Ir=globalThis&&globalThis.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var r=Array(e),o=0,t=0;t<n;t++)for(var a=arguments[t],i=0,l=a.length;i<l;i++,o++)r[o]=a[i];return r},Dr=function(){function e(t,n,r){this.name=t,this.version=n,this.os=r,this.type="browser"}return e}(),$r=function(){function e(t){this.version=t,this.type="node",this.name="node",this.os=V.platform}return e}(),Ur=function(){function e(t,n,r,o){this.name=t,this.version=n,this.os=r,this.bot=o,this.type="bot-device"}return e}(),Fr=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),Wr=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),zr=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,Hr=/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,gt=3,qr=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FBAV\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["searchbot",zr]],pt=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Yr(e){return e?mt(e):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new Wr:typeof navigator<"u"?mt(navigator.userAgent):Qr()}function Vr(e){return e!==""&&qr.reduce(function(t,n){var r=n[0],o=n[1];if(t)return t;var a=o.exec(e);return!!a&&[r,a]},!1)}function mt(e){var t=Vr(e);if(!t)return null;var n=t[0],r=t[1];if(n==="searchbot")return new Fr;var o=r[1]&&r[1].split(/[._]/).slice(0,3);o?o.length<gt&&(o=Ir(o,Jr(gt-o.length))):o=[];var a=o.join("."),i=Kr(e),l=Hr.exec(e);return l&&l[1]?new Ur(n,a,i,l[1]):new Dr(n,a,i)}function Kr(e){for(var t=0,n=pt.length;t<n;t++){var r=pt[t],o=r[0],a=r[1],i=a.exec(e);if(i)return o}return null}function Qr(){var e=typeof V<"u"&&V.version;return e?new $r(V.version.slice(1)):null}function Jr(e){for(var t=[],n=0;n<e;n++)t.push("0");return t}function je(e){return Yr(e)}function Ee(){const e=je();return e&&e.os?e.os:void 0}function on(){const e=Ee();return e?e.toLowerCase().includes("android"):!1}function an(){const e=Ee();return e?e.toLowerCase().includes("ios")||e.toLowerCase().includes("mac")&&navigator.maxTouchPoints>1:!1}function jr(){return Ee()?on()||an():!1}function ln(){const e=je();return e&&e.name?e.name.toLowerCase()==="node":!1}function Gr(){return!ln()&&!!cn()}const Xr=Vt,Zr=Kt,eo=Qt,to=Jt,no=jt,cn=Gt,ro=Xt,oo=Zt,ao=en,io=tn,lo=nn,xe=Yt;function co(){return rn()}function uo(e){if(typeof e!="string")throw new Error(`Cannot safe json parse value of type ${typeof e}`);try{return JSON.parse(e)}catch{return e}}function so(e){return typeof e=="string"?e:JSON.stringify(e)}const un=uo,sn=so;function fn(e,t){const n=sn(t),r=xe();r&&r.setItem(e,n)}function fo(e){let t=null,n=null;const r=xe();return r&&(n=r.getItem(e)),t=n&&un(n),t}function _o(e){const t=xe();t&&t.removeItem(e)}const dn="WALLETCONNECT_DEEPLINK_CHOICE";function ho(e,t){const n=encodeURIComponent(e);return t.universalLink?`${t.universalLink}/wc?uri=${n}`:t.deepLink?`${t.deepLink}${t.deepLink.endsWith(":")?"//":"/"}wc?uri=${n}`:""}function go(e){const t=e.href.split("?")[0];fn(dn,Object.assign(Object.assign({},e),{href:t}))}function _n(e,t){return e.filter(n=>n.name.toLowerCase().includes(t.toLowerCase()))[0]}function po(e,t){let n=e;return t&&(n=t.map(r=>_n(e,r)).filter(Boolean)),n}const hn="https://registry.walletconnect.com";function mo(){return hn+"/api/v2/wallets"}function vo(){return hn+"/api/v2/dapps"}function gn(e,t="mobile"){var n;return{name:e.name||"",shortName:e.metadata.shortName||"",color:e.metadata.colors.primary||"",logo:(n=e.image_url.sm)!==null&&n!==void 0?n:"",universalLink:e[t].universal||"",deepLink:e[t].native||""}}function wo(e,t="mobile"){return Object.values(e).filter(n=>!!n[t].universal||!!n[t].native).map(n=>gn(n,t))}const yo=Object.freeze(Object.defineProperty({__proto__:null,detectEnv:je,detectOS:Ee,formatIOSMobile:ho,formatMobileRegistry:wo,formatMobileRegistryEntry:gn,getClientMeta:co,getCrypto:io,getCryptoOrThrow:ao,getDappRegistryUrl:vo,getDocument:to,getDocumentOrThrow:eo,getFromWindow:Xr,getFromWindowOrThrow:Zr,getLocal:fo,getLocalStorage:xe,getLocalStorageOrThrow:lo,getLocation:oo,getLocationOrThrow:ro,getMobileLinkRegistry:po,getMobileRegistryEntry:_n,getNavigator:cn,getNavigatorOrThrow:no,getWalletRegistryUrl:mo,isAndroid:on,isBrowser:Gr,isIOS:an,isMobile:jr,isNode:ln,mobileLinkChoiceKey:dn,removeLocal:_o,safeJsonParse:un,safeJsonStringify:sn,saveMobileLinkInfo:go,setLocal:fn},Symbol.toStringTag,{value:"Module"})),bo=qt(yo);var fe={},Co=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},pn={},H={},Eo={}.toString,Ge=Array.isArray||function(e){return Eo.call(e)=="[object Array]"},xo=Ge;function ko(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},e.foo()===42}catch{return!1}}E.TYPED_ARRAY_SUPPORT=ko();var vt=E.TYPED_ARRAY_SUPPORT?2147483647:1073741823;function E(e,t,n){return!E.TYPED_ARRAY_SUPPORT&&!(this instanceof E)?new E(e,t,n):typeof e=="number"?mn(this,e):Ro(this,e,t,n)}E.TYPED_ARRAY_SUPPORT&&(E.prototype.__proto__=Uint8Array.prototype,E.__proto__=Uint8Array,typeof Symbol<"u"&&Symbol.species&&E[Symbol.species]===E&&Object.defineProperty(E,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}));function Xe(e){if(e>=vt)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+vt.toString(16)+" bytes");return e|0}function To(e){return e!==e}function j(e,t){var n;return E.TYPED_ARRAY_SUPPORT?(n=new Uint8Array(t),n.__proto__=E.prototype):(n=e,n===null&&(n=new E(t)),n.length=t),n}function mn(e,t){var n=j(e,t<0?0:Xe(t)|0);if(!E.TYPED_ARRAY_SUPPORT)for(var r=0;r<t;++r)n[r]=0;return n}function So(e,t){var n=wn(t)|0,r=j(e,n),o=r.write(t);return o!==n&&(r=r.slice(0,o)),r}function $e(e,t){for(var n=t.length<0?0:Xe(t.length)|0,r=j(e,n),o=0;o<n;o+=1)r[o]=t[o]&255;return r}function No(e,t,n,r){if(n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");var o;return n===void 0&&r===void 0?o=new Uint8Array(t):r===void 0?o=new Uint8Array(t,n):o=new Uint8Array(t,n,r),E.TYPED_ARRAY_SUPPORT?o.__proto__=E.prototype:o=$e(e,o),o}function Ao(e,t){if(E.isBuffer(t)){var n=Xe(t.length)|0,r=j(e,n);return r.length===0||t.copy(r,0,0,n),r}if(t){if(typeof ArrayBuffer<"u"&&t.buffer instanceof ArrayBuffer||"length"in t)return typeof t.length!="number"||To(t.length)?j(e,0):$e(e,t);if(t.type==="Buffer"&&Array.isArray(t.data))return $e(e,t.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function vn(e,t){t=t||1/0;for(var n,r=e.length,o=null,a=[],i=0;i<r;++i){if(n=e.charCodeAt(i),n>55295&&n<57344){if(!o){if(n>56319){(t-=3)>-1&&a.push(239,191,189);continue}else if(i+1===r){(t-=3)>-1&&a.push(239,191,189);continue}o=n;continue}if(n<56320){(t-=3)>-1&&a.push(239,191,189),o=n;continue}n=(o-55296<<10|n-56320)+65536}else o&&(t-=3)>-1&&a.push(239,191,189);if(o=null,n<128){if((t-=1)<0)break;a.push(n)}else if(n<2048){if((t-=2)<0)break;a.push(n>>6|192,n&63|128)}else if(n<65536){if((t-=3)<0)break;a.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((t-=4)<0)break;a.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw new Error("Invalid code point")}return a}function wn(e){if(E.isBuffer(e))return e.length;if(typeof ArrayBuffer<"u"&&typeof ArrayBuffer.isView=="function"&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;typeof e!="string"&&(e=""+e);var t=e.length;return t===0?0:vn(e).length}function Bo(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);++o)t[o+n]=e[o];return o}function Lo(e,t,n,r){return Bo(vn(t,e.length-n),e,n,r)}function Ro(e,t,n,r){if(typeof t=="number")throw new TypeError('"value" argument must not be a number');return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer?No(e,t,n,r):typeof t=="string"?So(e,t):Ao(e,t)}E.prototype.write=function(t,n,r){n===void 0?(r=this.length,n=0):r===void 0&&typeof n=="string"?(r=this.length,n=0):isFinite(n)&&(n=n|0,isFinite(r)?r=r|0:r=void 0);var o=this.length-n;if((r===void 0||r>o)&&(r=o),t.length>0&&(r<0||n<0)||n>this.length)throw new RangeError("Attempt to write outside buffer bounds");return Lo(this,t,n,r)};E.prototype.slice=function(t,n){var r=this.length;t=~~t,n=n===void 0?r:~~n,t<0?(t+=r,t<0&&(t=0)):t>r&&(t=r),n<0?(n+=r,n<0&&(n=0)):n>r&&(n=r),n<t&&(n=t);var o;if(E.TYPED_ARRAY_SUPPORT)o=this.subarray(t,n),o.__proto__=E.prototype;else{var a=n-t;o=new E(a,void 0);for(var i=0;i<a;++i)o[i]=this[i+t]}return o};E.prototype.copy=function(t,n,r,o){if(r||(r=0),!o&&o!==0&&(o=this.length),n>=t.length&&(n=t.length),n||(n=0),o>0&&o<r&&(o=r),o===r||t.length===0||this.length===0)return 0;if(n<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(o<0)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),t.length-n<o-r&&(o=t.length-n+r);var a=o-r,i;if(this===t&&r<n&&n<o)for(i=a-1;i>=0;--i)t[i+n]=this[i+r];else if(a<1e3||!E.TYPED_ARRAY_SUPPORT)for(i=0;i<a;++i)t[i+n]=this[i+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+a),n);return a};E.prototype.fill=function(t,n,r){if(typeof t=="string"){if(typeof n=="string"?(n=0,r=this.length):typeof r=="string"&&(r=this.length),t.length===1){var o=t.charCodeAt(0);o<256&&(t=o)}}else typeof t=="number"&&(t=t&255);if(n<0||this.length<n||this.length<r)throw new RangeError("Out of range index");if(r<=n)return this;n=n>>>0,r=r===void 0?this.length:r>>>0,t||(t=0);var a;if(typeof t=="number")for(a=n;a<r;++a)this[a]=t;else{var i=E.isBuffer(t)?t:new E(t),l=i.length;for(a=0;a<r-n;++a)this[a+n]=i[a%l]}return this};E.concat=function(t,n){if(!xo(t))throw new TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return j(null,0);var r;if(n===void 0)for(n=0,r=0;r<t.length;++r)n+=t[r].length;var o=mn(null,n),a=0;for(r=0;r<t.length;++r){var i=t[r];if(!E.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(o,a),a+=i.length}return o};E.byteLength=wn;E.prototype._isBuffer=!0;E.isBuffer=function(t){return!!(t!=null&&t._isBuffer)};H.alloc=function(e){var t=new E(e);return t.fill(0),t};H.from=function(e){return new E(e)};var M={},Ze,Po=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];M.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};M.getSymbolTotalCodewords=function(t){return Po[t]};M.getBCHDigit=function(e){for(var t=0;e!==0;)t++,e>>>=1;return t};M.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');Ze=t};M.isKanjiModeEnabled=function(){return typeof Ze<"u"};M.toSJIS=function(t){return Ze(t)};var ke={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(n){if(typeof n!="string")throw new Error("Param is not a string");var r=n.toLowerCase();switch(r){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+n)}}e.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},e.from=function(r,o){if(e.isValid(r))return r;try{return t(r)}catch{return o}}})(ke);function yn(){this.buffer=[],this.length=0}yn.prototype={get:function(e){var t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(var n=0;n<t;n++)this.putBit((e>>>t-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){var t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var Mo=yn,wt=H;function de(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=wt.alloc(e*e),this.reservedBit=wt.alloc(e*e)}de.prototype.set=function(e,t,n,r){var o=e*this.size+t;this.data[o]=n,r&&(this.reservedBit[o]=!0)};de.prototype.get=function(e,t){return this.data[e*this.size+t]};de.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n};de.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var Oo=de,bn={};(function(e){var t=M.getSymbolSize;e.getRowColCoords=function(r){if(r===1)return[];for(var o=Math.floor(r/7)+2,a=t(r),i=a===145?26:Math.ceil((a-13)/(2*o-2))*2,l=[a-7],u=1;u<o-1;u++)l[u]=l[u-1]-i;return l.push(6),l.reverse()},e.getPositions=function(r){for(var o=[],a=e.getRowColCoords(r),i=a.length,l=0;l<i;l++)for(var u=0;u<i;u++)l===0&&u===0||l===0&&u===i-1||l===i-1&&u===0||o.push([a[l],a[u]]);return o}})(bn);var Cn={},Io=M.getSymbolSize,yt=7;Cn.getPositions=function(t){var n=Io(t);return[[0,0],[n-yt,0],[0,n-yt]]};var En={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},e.from=function(o){return e.isValid(o)?parseInt(o,10):void 0},e.getPenaltyN1=function(o){for(var a=o.size,i=0,l=0,u=0,s=null,c=null,f=0;f<a;f++){l=u=0,s=c=null;for(var h=0;h<a;h++){var y=o.get(f,h);y===s?l++:(l>=5&&(i+=t.N1+(l-5)),s=y,l=1),y=o.get(h,f),y===c?u++:(u>=5&&(i+=t.N1+(u-5)),c=y,u=1)}l>=5&&(i+=t.N1+(l-5)),u>=5&&(i+=t.N1+(u-5))}return i},e.getPenaltyN2=function(o){for(var a=o.size,i=0,l=0;l<a-1;l++)for(var u=0;u<a-1;u++){var s=o.get(l,u)+o.get(l,u+1)+o.get(l+1,u)+o.get(l+1,u+1);(s===4||s===0)&&i++}return i*t.N2},e.getPenaltyN3=function(o){for(var a=o.size,i=0,l=0,u=0,s=0;s<a;s++){l=u=0;for(var c=0;c<a;c++)l=l<<1&2047|o.get(s,c),c>=10&&(l===1488||l===93)&&i++,u=u<<1&2047|o.get(c,s),c>=10&&(u===1488||u===93)&&i++}return i*t.N3},e.getPenaltyN4=function(o){for(var a=0,i=o.data.length,l=0;l<i;l++)a+=o.data[l];var u=Math.abs(Math.ceil(a*100/i/5)-10);return u*t.N4};function n(r,o,a){switch(r){case e.Patterns.PATTERN000:return(o+a)%2===0;case e.Patterns.PATTERN001:return o%2===0;case e.Patterns.PATTERN010:return a%3===0;case e.Patterns.PATTERN011:return(o+a)%3===0;case e.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(a/3))%2===0;case e.Patterns.PATTERN101:return o*a%2+o*a%3===0;case e.Patterns.PATTERN110:return(o*a%2+o*a%3)%2===0;case e.Patterns.PATTERN111:return(o*a%3+(o+a)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}e.applyMask=function(o,a){for(var i=a.size,l=0;l<i;l++)for(var u=0;u<i;u++)a.isReserved(u,l)||a.xor(u,l,n(o,u,l))},e.getBestMask=function(o,a){for(var i=Object.keys(e.Patterns).length,l=0,u=1/0,s=0;s<i;s++){a(s),e.applyMask(s,o);var c=e.getPenaltyN1(o)+e.getPenaltyN2(o)+e.getPenaltyN3(o)+e.getPenaltyN4(o);e.applyMask(s,o),c<u&&(u=c,l=s)}return l}})(En);var Te={},W=ke,ge=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],pe=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Te.getBlocksCount=function(t,n){switch(n){case W.L:return ge[(t-1)*4+0];case W.M:return ge[(t-1)*4+1];case W.Q:return ge[(t-1)*4+2];case W.H:return ge[(t-1)*4+3];default:return}};Te.getTotalCodewordsCount=function(t,n){switch(n){case W.L:return pe[(t-1)*4+0];case W.M:return pe[(t-1)*4+1];case W.Q:return pe[(t-1)*4+2];case W.H:return pe[(t-1)*4+3];default:return}};var xn={},Se={},kn=H,ae=kn.alloc(512),ve=kn.alloc(256);(function(){for(var t=1,n=0;n<255;n++)ae[n]=t,ve[t]=n,t<<=1,t&256&&(t^=285);for(n=255;n<512;n++)ae[n]=ae[n-255]})();Se.log=function(t){if(t<1)throw new Error("log("+t+")");return ve[t]};Se.exp=function(t){return ae[t]};Se.mul=function(t,n){return t===0||n===0?0:ae[ve[t]+ve[n]]};(function(e){var t=H,n=Se;e.mul=function(o,a){for(var i=t.alloc(o.length+a.length-1),l=0;l<o.length;l++)for(var u=0;u<a.length;u++)i[l+u]^=n.mul(o[l],a[u]);return i},e.mod=function(o,a){for(var i=t.from(o);i.length-a.length>=0;){for(var l=i[0],u=0;u<a.length;u++)i[u]^=n.mul(a[u],l);for(var s=0;s<i.length&&i[s]===0;)s++;i=i.slice(s)}return i},e.generateECPolynomial=function(o){for(var a=t.from([1]),i=0;i<o;i++)a=e.mul(a,[1,n.exp(i)]);return a}})(xn);var bt=H,Tn=xn,Do=Er().Buffer;function et(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}et.prototype.initialize=function(t){this.degree=t,this.genPoly=Tn.generateECPolynomial(this.degree)};et.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");var n=bt.alloc(this.degree),r=Do.concat([t,n],t.length+this.degree),o=Tn.mod(r,this.genPoly),a=this.degree-o.length;if(a>0){var i=bt.alloc(this.degree);return o.copy(i,a),i}return o};var $o=et,Sn={},q={},tt={};tt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var I={},Nn="[0-9]+",Uo="[A-Z $%*+\\-./:]+",ce="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";ce=ce.replace(/u/g,"\\u");var Fo="(?:(?![A-Z0-9 $%*+\\-./:]|"+ce+`)(?:.|[\r
]))+`;I.KANJI=new RegExp(ce,"g");I.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");I.BYTE=new RegExp(Fo,"g");I.NUMERIC=new RegExp(Nn,"g");I.ALPHANUMERIC=new RegExp(Uo,"g");var Wo=new RegExp("^"+ce+"$"),zo=new RegExp("^"+Nn+"$"),Ho=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");I.testKanji=function(t){return Wo.test(t)};I.testNumeric=function(t){return zo.test(t)};I.testAlphanumeric=function(t){return Ho.test(t)};(function(e){var t=tt,n=I;e.NUMERIC={id:"Numeric",bit:1<<0,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:1<<1,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:1<<2,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:1<<3,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(a,i){if(!a.ccBits)throw new Error("Invalid mode: "+a);if(!t.isValid(i))throw new Error("Invalid version: "+i);return i>=1&&i<10?a.ccBits[0]:i<27?a.ccBits[1]:a.ccBits[2]},e.getBestModeForData=function(a){return n.testNumeric(a)?e.NUMERIC:n.testAlphanumeric(a)?e.ALPHANUMERIC:n.testKanji(a)?e.KANJI:e.BYTE},e.toString=function(a){if(a&&a.id)return a.id;throw new Error("Invalid mode")},e.isValid=function(a){return a&&a.bit&&a.ccBits};function r(o){if(typeof o!="string")throw new Error("Param is not a string");var a=o.toLowerCase();switch(a){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+o)}}e.from=function(a,i){if(e.isValid(a))return a;try{return r(a)}catch{return i}}})(q);(function(e){var t=M,n=Te,r=ke,o=q,a=tt,i=Ge,l=1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0,u=t.getBCHDigit(l);function s(y,_,b){for(var d=1;d<=40;d++)if(_<=e.getCapacity(d,b,y))return d}function c(y,_){return o.getCharCountIndicator(y,_)+4}function f(y,_){var b=0;return y.forEach(function(d){var m=c(d.mode,_);b+=m+d.getBitsLength()}),b}function h(y,_){for(var b=1;b<=40;b++){var d=f(y,b);if(d<=e.getCapacity(b,_,o.MIXED))return b}}e.from=function(_,b){return a.isValid(_)?parseInt(_,10):b},e.getCapacity=function(_,b,d){if(!a.isValid(_))throw new Error("Invalid QR Code version");typeof d>"u"&&(d=o.BYTE);var m=t.getSymbolTotalCodewords(_),v=n.getTotalCodewordsCount(_,b),w=(m-v)*8;if(d===o.MIXED)return w;var p=w-c(d,_);switch(d){case o.NUMERIC:return Math.floor(p/10*3);case o.ALPHANUMERIC:return Math.floor(p/11*2);case o.KANJI:return Math.floor(p/13);case o.BYTE:default:return Math.floor(p/8)}},e.getBestVersionForData=function(_,b){var d,m=r.from(b,r.M);if(i(_)){if(_.length>1)return h(_,m);if(_.length===0)return 1;d=_[0]}else d=_;return s(d.mode,d.getLength(),m)},e.getEncodedBits=function(_){if(!a.isValid(_)||_<7)throw new Error("Invalid QR Code version");for(var b=_<<12;t.getBCHDigit(b)-u>=0;)b^=l<<t.getBCHDigit(b)-u;return _<<12|b}})(Sn);var An={},Ue=M,Bn=1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0,qo=1<<14|1<<12|1<<10|1<<4|1<<1,Ct=Ue.getBCHDigit(Bn);An.getEncodedBits=function(t,n){for(var r=t.bit<<3|n,o=r<<10;Ue.getBCHDigit(o)-Ct>=0;)o^=Bn<<Ue.getBCHDigit(o)-Ct;return(r<<10|o)^qo};var Ln={},Yo=q;function G(e){this.mode=Yo.NUMERIC,this.data=e.toString()}G.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};G.prototype.getLength=function(){return this.data.length};G.prototype.getBitsLength=function(){return G.getBitsLength(this.data.length)};G.prototype.write=function(t){var n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),t.put(o,10);var a=this.data.length-n;a>0&&(r=this.data.substr(n),o=parseInt(r,10),t.put(o,a*3+1))};var Vo=G,Ko=q,Le=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function X(e){this.mode=Ko.ALPHANUMERIC,this.data=e}X.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};X.prototype.getLength=function(){return this.data.length};X.prototype.getBitsLength=function(){return X.getBitsLength(this.data.length)};X.prototype.write=function(t){var n;for(n=0;n+2<=this.data.length;n+=2){var r=Le.indexOf(this.data[n])*45;r+=Le.indexOf(this.data[n+1]),t.put(r,11)}this.data.length%2&&t.put(Le.indexOf(this.data[n]),6)};var Qo=X,Jo=H,jo=q;function Z(e){this.mode=jo.BYTE,this.data=Jo.from(e)}Z.getBitsLength=function(t){return t*8};Z.prototype.getLength=function(){return this.data.length};Z.prototype.getBitsLength=function(){return Z.getBitsLength(this.data.length)};Z.prototype.write=function(e){for(var t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)};var Go=Z,Xo=q,Zo=M;function ee(e){this.mode=Xo.KANJI,this.data=e}ee.getBitsLength=function(t){return t*13};ee.prototype.getLength=function(){return this.data.length};ee.prototype.getBitsLength=function(){return ee.getBitsLength(this.data.length)};ee.prototype.write=function(e){var t;for(t=0;t<this.data.length;t++){var n=Zo.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}};var ea=ee,Fe={},ta={get exports(){return Fe},set exports(e){Fe=e}};(function(e){var t={single_source_shortest_paths:function(n,r,o){var a={},i={};i[r]=0;var l=t.PriorityQueue.make();l.push(r,0);for(var u,s,c,f,h,y,_,b,d;!l.empty();){u=l.pop(),s=u.value,f=u.cost,h=n[s]||{};for(c in h)h.hasOwnProperty(c)&&(y=h[c],_=f+y,b=i[c],d=typeof i[c]>"u",(d||b>_)&&(i[c]=_,l.push(c,_),a[c]=s))}if(typeof o<"u"&&typeof i[o]>"u"){var m=["Could not find a path from ",r," to ",o,"."].join("");throw new Error(m)}return a},extract_shortest_path_from_predecessor_list:function(n,r){for(var o=[],a=r;a;)o.push(a),n[a],a=n[a];return o.reverse(),o},find_path:function(n,r,o){var a=t.single_source_shortest_paths(n,r,o);return t.extract_shortest_path_from_predecessor_list(a,o)},PriorityQueue:{make:function(n){var r=t.PriorityQueue,o={},a;n=n||{};for(a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);return o.queue=[],o.sorter=n.sorter||r.default_sorter,o},default_sorter:function(n,r){return n.cost-r.cost},push:function(n,r){var o={value:n,cost:r};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(ta);(function(e){var t=q,n=Vo,r=Qo,o=Go,a=ea,i=I,l=M,u=Fe;function s(m){return unescape(encodeURIComponent(m)).length}function c(m,v,w){for(var p=[],x;(x=m.exec(w))!==null;)p.push({data:x[0],index:x.index,mode:v,length:x[0].length});return p}function f(m){var v=c(i.NUMERIC,t.NUMERIC,m),w=c(i.ALPHANUMERIC,t.ALPHANUMERIC,m),p,x;l.isKanjiModeEnabled()?(p=c(i.BYTE,t.BYTE,m),x=c(i.KANJI,t.KANJI,m)):(p=c(i.BYTE_KANJI,t.BYTE,m),x=[]);var S=v.concat(w,p,x);return S.sort(function(k,N){return k.index-N.index}).map(function(k){return{data:k.data,mode:k.mode,length:k.length}})}function h(m,v){switch(v){case t.NUMERIC:return n.getBitsLength(m);case t.ALPHANUMERIC:return r.getBitsLength(m);case t.KANJI:return a.getBitsLength(m);case t.BYTE:return o.getBitsLength(m)}}function y(m){return m.reduce(function(v,w){var p=v.length-1>=0?v[v.length-1]:null;return p&&p.mode===w.mode?(v[v.length-1].data+=w.data,v):(v.push(w),v)},[])}function _(m){for(var v=[],w=0;w<m.length;w++){var p=m[w];switch(p.mode){case t.NUMERIC:v.push([p,{data:p.data,mode:t.ALPHANUMERIC,length:p.length},{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.ALPHANUMERIC:v.push([p,{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.KANJI:v.push([p,{data:p.data,mode:t.BYTE,length:s(p.data)}]);break;case t.BYTE:v.push([{data:p.data,mode:t.BYTE,length:s(p.data)}])}}return v}function b(m,v){for(var w={},p={start:{}},x=["start"],S=0;S<m.length;S++){for(var k=m[S],N=[],B=0;B<k.length;B++){var A=k[B],Y=""+S+B;N.push(Y),w[Y]={node:A,lastCount:0},p[Y]={};for(var D=0;D<x.length;D++){var P=x[D];w[P]&&w[P].node.mode===A.mode?(p[P][Y]=h(w[P].lastCount+A.length,A.mode)-h(w[P].lastCount,A.mode),w[P].lastCount+=A.length):(w[P]&&(w[P].lastCount=A.length),p[P][Y]=h(A.length,A.mode)+4+t.getCharCountIndicator(A.mode,v))}}x=N}for(D=0;D<x.length;D++)p[x[D]].end=0;return{map:p,table:w}}function d(m,v){var w,p=t.getBestModeForData(m);if(w=t.from(v,p),w!==t.BYTE&&w.bit<p.bit)throw new Error('"'+m+'" cannot be encoded with mode '+t.toString(w)+`.
 Suggested mode is: `+t.toString(p));switch(w===t.KANJI&&!l.isKanjiModeEnabled()&&(w=t.BYTE),w){case t.NUMERIC:return new n(m);case t.ALPHANUMERIC:return new r(m);case t.KANJI:return new a(m);case t.BYTE:return new o(m)}}e.fromArray=function(v){return v.reduce(function(w,p){return typeof p=="string"?w.push(d(p,null)):p.data&&w.push(d(p.data,p.mode)),w},[])},e.fromString=function(v,w){for(var p=f(v,l.isKanjiModeEnabled()),x=_(p),S=b(x,w),k=u.find_path(S.map,"start","end"),N=[],B=1;B<k.length-1;B++)N.push(S.table[k[B]].node);return e.fromArray(y(N))},e.rawSplit=function(v){return e.fromArray(f(v,l.isKanjiModeEnabled()))}})(Ln);var Et=H,Ne=M,Re=ke,na=Mo,ra=Oo,oa=bn,aa=Cn,We=En,ze=Te,ia=$o,we=Sn,la=An,ca=q,Pe=Ln,ua=Ge;function sa(e,t){for(var n=e.size,r=aa.getPositions(t),o=0;o<r.length;o++)for(var a=r[o][0],i=r[o][1],l=-1;l<=7;l++)if(!(a+l<=-1||n<=a+l))for(var u=-1;u<=7;u++)i+u<=-1||n<=i+u||(l>=0&&l<=6&&(u===0||u===6)||u>=0&&u<=6&&(l===0||l===6)||l>=2&&l<=4&&u>=2&&u<=4?e.set(a+l,i+u,!0,!0):e.set(a+l,i+u,!1,!0))}function fa(e){for(var t=e.size,n=8;n<t-8;n++){var r=n%2===0;e.set(n,6,r,!0),e.set(6,n,r,!0)}}function da(e,t){for(var n=oa.getPositions(t),r=0;r<n.length;r++)for(var o=n[r][0],a=n[r][1],i=-2;i<=2;i++)for(var l=-2;l<=2;l++)i===-2||i===2||l===-2||l===2||i===0&&l===0?e.set(o+i,a+l,!0,!0):e.set(o+i,a+l,!1,!0)}function _a(e,t){for(var n=e.size,r=we.getEncodedBits(t),o,a,i,l=0;l<18;l++)o=Math.floor(l/3),a=l%3+n-8-3,i=(r>>l&1)===1,e.set(o,a,i,!0),e.set(a,o,i,!0)}function Me(e,t,n){var r=e.size,o=la.getEncodedBits(t,n),a,i;for(a=0;a<15;a++)i=(o>>a&1)===1,a<6?e.set(a,8,i,!0):a<8?e.set(a+1,8,i,!0):e.set(r-15+a,8,i,!0),a<8?e.set(8,r-a-1,i,!0):a<9?e.set(8,15-a-1+1,i,!0):e.set(8,15-a-1,i,!0);e.set(r-8,8,1,!0)}function ha(e,t){for(var n=e.size,r=-1,o=n-1,a=7,i=0,l=n-1;l>0;l-=2)for(l===6&&l--;;){for(var u=0;u<2;u++)if(!e.isReserved(o,l-u)){var s=!1;i<t.length&&(s=(t[i]>>>a&1)===1),e.set(o,l-u,s),a--,a===-1&&(i++,a=7)}if(o+=r,o<0||n<=o){o-=r,r=-r;break}}}function ga(e,t,n){var r=new na;n.forEach(function(s){r.put(s.mode.bit,4),r.put(s.getLength(),ca.getCharCountIndicator(s.mode,e)),s.write(r)});var o=Ne.getSymbolTotalCodewords(e),a=ze.getTotalCodewordsCount(e,t),i=(o-a)*8;for(r.getLengthInBits()+4<=i&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);for(var l=(i-r.getLengthInBits())/8,u=0;u<l;u++)r.put(u%2?17:236,8);return pa(r,e,t)}function pa(e,t,n){for(var r=Ne.getSymbolTotalCodewords(t),o=ze.getTotalCodewordsCount(t,n),a=r-o,i=ze.getBlocksCount(t,n),l=r%i,u=i-l,s=Math.floor(r/i),c=Math.floor(a/i),f=c+1,h=s-c,y=new ia(h),_=0,b=new Array(i),d=new Array(i),m=0,v=Et.from(e.buffer),w=0;w<i;w++){var p=w<u?c:f;b[w]=v.slice(_,_+p),d[w]=y.encode(b[w]),_+=p,m=Math.max(m,p)}var x=Et.alloc(r),S=0,k,N;for(k=0;k<m;k++)for(N=0;N<i;N++)k<b[N].length&&(x[S++]=b[N][k]);for(k=0;k<h;k++)for(N=0;N<i;N++)x[S++]=d[N][k];return x}function ma(e,t,n,r){var o;if(ua(e))o=Pe.fromArray(e);else if(typeof e=="string"){var a=t;if(!a){var i=Pe.rawSplit(e);a=we.getBestVersionForData(i,n)}o=Pe.fromString(e,a||40)}else throw new Error("Invalid data");var l=we.getBestVersionForData(o,n);if(!l)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=l;else if(t<l)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+l+`.
`);var u=ga(t,n,o),s=Ne.getSymbolSize(t),c=new ra(s);return sa(c,t),fa(c),da(c,t),Me(c,n,0),t>=7&&_a(c,t),ha(c,u),isNaN(r)&&(r=We.getBestMask(c,Me.bind(null,c,n))),We.applyMask(r,c),Me(c,n,r),{modules:c,version:t,errorCorrectionLevel:n,maskPattern:r,segments:o}}pn.create=function(t,n){if(typeof t>"u"||t==="")throw new Error("No input text");var r=Re.M,o,a;return typeof n<"u"&&(r=Re.from(n.errorCorrectionLevel,Re.M),o=we.from(n.version),a=We.from(n.maskPattern),n.toSJISFunc&&Ne.setToSJISFunction(n.toSJISFunc)),ma(t,o,r,a)};var Rn={},nt={};(function(e){function t(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");var r=n.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+n);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(a){return[a,a]}))),r.length===6&&r.push("F","F");var o=parseInt(r.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+r.slice(0,6).join("")}}e.getOptions=function(r){r||(r={}),r.color||(r.color={});var o=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,a=r.width&&r.width>=21?r.width:void 0,i=r.scale||4;return{width:a,scale:a?4:i,margin:o,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},e.getScale=function(r,o){return o.width&&o.width>=r+o.margin*2?o.width/(r+o.margin*2):o.scale},e.getImageWidth=function(r,o){var a=e.getScale(r,o);return Math.floor((r+o.margin*2)*a)},e.qrToImageData=function(r,o,a){for(var i=o.modules.size,l=o.modules.data,u=e.getScale(i,a),s=Math.floor((i+a.margin*2)*u),c=a.margin*u,f=[a.color.light,a.color.dark],h=0;h<s;h++)for(var y=0;y<s;y++){var _=(h*s+y)*4,b=a.color.light;if(h>=c&&y>=c&&h<s-c&&y<s-c){var d=Math.floor((h-c)/u),m=Math.floor((y-c)/u);b=f[l[d*i+m]?1:0]}r[_++]=b.r,r[_++]=b.g,r[_++]=b.b,r[_]=b.a}}})(nt);(function(e){var t=nt;function n(o,a,i){o.clearRect(0,0,a.width,a.height),a.style||(a.style={}),a.height=i,a.width=i,a.style.height=i+"px",a.style.width=i+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(a,i,l){var u=l,s=i;typeof u>"u"&&(!i||!i.getContext)&&(u=i,i=void 0),i||(s=r()),u=t.getOptions(u);var c=t.getImageWidth(a.modules.size,u),f=s.getContext("2d"),h=f.createImageData(c,c);return t.qrToImageData(h.data,a,u),n(f,s,c),f.putImageData(h,0,0),s},e.renderToDataURL=function(a,i,l){var u=l;typeof u>"u"&&(!i||!i.getContext)&&(u=i,i=void 0),u||(u={});var s=e.render(a,i,u),c=u.type||"image/png",f=u.rendererOpts||{};return s.toDataURL(c,f.quality)}})(Rn);var Pn={},va=nt;function xt(e,t){var n=e.a/255,r=t+'="'+e.hex+'"';return n<1?r+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function Oe(e,t,n){var r=e+t;return typeof n<"u"&&(r+=" "+n),r}function wa(e,t,n){for(var r="",o=0,a=!1,i=0,l=0;l<e.length;l++){var u=Math.floor(l%t),s=Math.floor(l/t);!u&&!a&&(a=!0),e[l]?(i++,l>0&&u>0&&e[l-1]||(r+=a?Oe("M",u+n,.5+s+n):Oe("m",o,0),o=0,a=!1),u+1<t&&e[l+1]||(r+=Oe("h",i),i=0)):o++}return r}Pn.render=function(t,n,r){var o=va.getOptions(n),a=t.modules.size,i=t.modules.data,l=a+o.margin*2,u=o.color.light.a?"<path "+xt(o.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",s="<path "+xt(o.color.dark,"stroke")+' d="'+wa(i,a,o.margin)+'"/>',c='viewBox="0 0 '+l+" "+l+'"',f=o.width?'width="'+o.width+'" height="'+o.width+'" ':"",h='<svg xmlns="http://www.w3.org/2000/svg" '+f+c+' shape-rendering="crispEdges">'+u+s+`</svg>
`;return typeof r=="function"&&r(null,h),h};var ya=Co,He=pn,Mn=Rn,ba=Pn;function rt(e,t,n,r,o){var a=[].slice.call(arguments,1),i=a.length,l=typeof a[i-1]=="function";if(!l&&!ya())throw new Error("Callback required as last argument");if(l){if(i<2)throw new Error("Too few arguments provided");i===2?(o=n,n=t,t=r=void 0):i===3&&(t.getContext&&typeof o>"u"?(o=r,r=void 0):(o=r,r=n,n=t,t=void 0))}else{if(i<1)throw new Error("Too few arguments provided");return i===1?(n=t,t=r=void 0):i===2&&!t.getContext&&(r=n,n=t,t=void 0),new Promise(function(s,c){try{var f=He.create(n,r);s(e(f,t,r))}catch(h){c(h)}})}try{var u=He.create(n,r);o(null,e(u,t,r))}catch(s){o(s)}}fe.create=He.create;fe.toCanvas=rt.bind(null,Mn.render);fe.toDataURL=rt.bind(null,Mn.renderToDataURL);fe.toString=rt.bind(null,function(e,t,n){return ba.render(e,n)});var Ca=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||n.forEach(function(o){e.addRange(o)}),t&&t.focus()}},Ea=Ca,kt={"text/plain":"Text","text/html":"Url",default:"Text"},xa="Copy to clipboard: #{key}, Enter";function ka(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function Ta(e,t){var n,r,o,a,i,l,u=!1;t||(t={}),n=t.debug||!1;try{o=Ea(),a=document.createRange(),i=document.getSelection(),l=document.createElement("span"),l.textContent=e,l.ariaHidden="true",l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(c){if(c.stopPropagation(),t.format)if(c.preventDefault(),typeof c.clipboardData>"u"){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var f=kt[t.format]||kt.default;window.clipboardData.setData(f,e)}else c.clipboardData.clearData(),c.clipboardData.setData(t.format,e);t.onCopy&&(c.preventDefault(),t.onCopy(c.clipboardData))}),document.body.appendChild(l),a.selectNodeContents(l),i.addRange(a);var s=document.execCommand("copy");if(!s)throw new Error("copy command was unsuccessful");u=!0}catch(c){n&&console.error("unable to copy using execCommand: ",c),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(f){n&&console.error("unable to copy using clipboardData: ",f),n&&console.error("falling back to prompt"),r=ka("message"in t?t.message:xa),window.prompt(r,e)}}finally{i&&(typeof i.removeRange=="function"?i.removeRange(a):i.removeAllRanges()),l&&document.body.removeChild(l),o()}return u}var Sa=Ta,C,ie,ot,On,Tt,at,In,U={},Ae=[],Na=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function $(e,t){for(var n in t)e[n]=t[n];return e}function Dn(e){var t=e.parentNode;t&&t.removeChild(e)}function F(e,t,n){var r,o=arguments,a={};for(r in t)r!=="key"&&r!=="ref"&&(a[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(n!=null&&(a.children=n),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)a[r]===void 0&&(a[r]=e.defaultProps[r]);return ye(e,a,t&&t.key,t&&t.ref,null)}function ye(e,t,n,r,o){var a={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:o};return o==null&&(a.__v=a),C.vnode&&C.vnode(a),a}function $n(){return{}}function _e(e){return e.children}function O(e,t){this.props=e,this.context=t}function ue(e,t){if(t==null)return e.__?ue(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?ue(e):null}function Un(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return Un(e)}}function me(e){(!e.__d&&(e.__d=!0)&&ie.push(e)&&!ot++||Tt!==C.debounceRendering)&&((Tt=C.debounceRendering)||On)(Aa)}function Aa(){for(var e;ot=ie.length;)e=ie.sort(function(t,n){return t.__v.__b-n.__v.__b}),ie=[],e.some(function(t){var n,r,o,a,i,l,u;t.__d&&(l=(i=(n=t).__v).__e,(u=n.__P)&&(r=[],(o=$({},i)).__v=o,a=it(u,i,o,n.__n,u.ownerSVGElement!==void 0,null,r,l??ue(i)),Wn(r,i),a!=l&&Un(i)))})}function Fn(e,t,n,r,o,a,i,l,u){var s,c,f,h,y,_,b,d=n&&n.__k||Ae,m=d.length;if(l==U&&(l=a!=null?a[0]:m?ue(n,0):null),s=0,t.__k=z(t.__k,function(v){if(v!=null){if(v.__=t,v.__b=t.__b+1,(f=d[s])===null||f&&v.key==f.key&&v.type===f.type)d[s]=void 0;else for(c=0;c<m;c++){if((f=d[c])&&v.key==f.key&&v.type===f.type){d[c]=void 0;break}f=null}if(h=it(e,v,f=f||U,r,o,a,i,l,u),(c=v.ref)&&f.ref!=c&&(b||(b=[]),f.ref&&b.push(f.ref,null,v),b.push(c,v.__c||h,v)),h!=null){var w;if(_==null&&(_=h),v.__d!==void 0)w=v.__d,v.__d=void 0;else if(a==f||h!=l||h.parentNode==null){e:if(l==null||l.parentNode!==e)e.appendChild(h),w=null;else{for(y=l,c=0;(y=y.nextSibling)&&c<m;c+=2)if(y==h)break e;e.insertBefore(h,l),w=l}t.type=="option"&&(e.value="")}l=w!==void 0?w:h.nextSibling,typeof t.type=="function"&&(t.__d=l)}else l&&f.__e==l&&l.parentNode!=e&&(l=ue(f))}return s++,v}),t.__e=_,a!=null&&typeof t.type!="function")for(s=a.length;s--;)a[s]!=null&&Dn(a[s]);for(s=m;s--;)d[s]!=null&&le(d[s],d[s]);if(b)for(s=0;s<b.length;s++)zn(b[s],b[++s],b[++s])}function z(e,t,n){if(n==null&&(n=[]),e==null||typeof e=="boolean")t&&n.push(t(null));else if(Array.isArray(e))for(var r=0;r<e.length;r++)z(e[r],t,n);else n.push(t?t(typeof e=="string"||typeof e=="number"?ye(null,e,null,null,e):e.__e!=null||e.__c!=null?ye(e.type,e.props,e.key,null,e.__v):e):e);return n}function Ba(e,t,n,r,o){var a;for(a in n)a==="children"||a==="key"||a in t||be(e,a,null,n[a],r);for(a in t)o&&typeof t[a]!="function"||a==="children"||a==="key"||a==="value"||a==="checked"||n[a]===t[a]||be(e,a,t[a],n[a],r)}function St(e,t,n){t[0]==="-"?e.setProperty(t,n):e[t]=typeof n=="number"&&Na.test(t)===!1?n+"px":n??""}function be(e,t,n,r,o){var a,i,l,u,s;if(o?t==="className"&&(t="class"):t==="class"&&(t="className"),t==="style")if(a=e.style,typeof n=="string")a.cssText=n;else{if(typeof r=="string"&&(a.cssText="",r=null),r)for(u in r)n&&u in n||St(a,u,"");if(n)for(s in n)r&&n[s]===r[s]||St(a,s,n[s])}else t[0]==="o"&&t[1]==="n"?(i=t!==(t=t.replace(/Capture$/,"")),l=t.toLowerCase(),t=(l in e?l:t).slice(2),n?(r||e.addEventListener(t,Nt,i),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,Nt,i)):t!=="list"&&t!=="tagName"&&t!=="form"&&t!=="type"&&t!=="size"&&!o&&t in e?e[t]=n??"":typeof n!="function"&&t!=="dangerouslySetInnerHTML"&&(t!==(t=t.replace(/^xlink:?/,""))?n==null||n===!1?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):n==null||n===!1&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function Nt(e){this.l[e.type](C.event?C.event(e):e)}function it(e,t,n,r,o,a,i,l,u){var s,c,f,h,y,_,b,d,m,v,w=t.type;if(t.constructor!==void 0)return null;(s=C.__b)&&s(t);try{e:if(typeof w=="function"){if(d=t.props,m=(s=w.contextType)&&r[s.__c],v=s?m?m.props.value:s.__:r,n.__c?b=(c=t.__c=n.__c).__=c.__E:("prototype"in w&&w.prototype.render?t.__c=c=new w(d,v):(t.__c=c=new O(d,v),c.constructor=w,c.render=Ra),m&&m.sub(c),c.props=d,c.state||(c.state={}),c.context=v,c.__n=r,f=c.__d=!0,c.__h=[]),c.__s==null&&(c.__s=c.state),w.getDerivedStateFromProps!=null&&(c.__s==c.state&&(c.__s=$({},c.__s)),$(c.__s,w.getDerivedStateFromProps(d,c.__s))),h=c.props,y=c.state,f)w.getDerivedStateFromProps==null&&c.componentWillMount!=null&&c.componentWillMount(),c.componentDidMount!=null&&c.__h.push(c.componentDidMount);else{if(w.getDerivedStateFromProps==null&&d!==h&&c.componentWillReceiveProps!=null&&c.componentWillReceiveProps(d,v),!c.__e&&c.shouldComponentUpdate!=null&&c.shouldComponentUpdate(d,c.__s,v)===!1||t.__v===n.__v&&!c.__){for(c.props=d,c.state=c.__s,t.__v!==n.__v&&(c.__d=!1),c.__v=t,t.__e=n.__e,t.__k=n.__k,c.__h.length&&i.push(c),s=0;s<t.__k.length;s++)t.__k[s]&&(t.__k[s].__=t);break e}c.componentWillUpdate!=null&&c.componentWillUpdate(d,c.__s,v),c.componentDidUpdate!=null&&c.__h.push(function(){c.componentDidUpdate(h,y,_)})}c.context=v,c.props=d,c.state=c.__s,(s=C.__r)&&s(t),c.__d=!1,c.__v=t,c.__P=e,s=c.render(c.props,c.state,c.context),t.__k=s!=null&&s.type==_e&&s.key==null?s.props.children:Array.isArray(s)?s:[s],c.getChildContext!=null&&(r=$($({},r),c.getChildContext())),f||c.getSnapshotBeforeUpdate==null||(_=c.getSnapshotBeforeUpdate(h,y)),Fn(e,t,n,r,o,a,i,l,u),c.base=t.__e,c.__h.length&&i.push(c),b&&(c.__E=c.__=null),c.__e=!1}else a==null&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=La(n.__e,t,n,r,o,a,i,u);(s=C.diffed)&&s(t)}catch(p){t.__v=null,C.__e(p,t,n)}return t.__e}function Wn(e,t){C.__c&&C.__c(t,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(r){r.call(n)})}catch(r){C.__e(r,n.__v)}})}function La(e,t,n,r,o,a,i,l){var u,s,c,f,h,y=n.props,_=t.props;if(o=t.type==="svg"||o,a!=null){for(u=0;u<a.length;u++)if((s=a[u])!=null&&((t.type===null?s.nodeType===3:s.localName===t.type)||e==s)){e=s,a[u]=null;break}}if(e==null){if(t.type===null)return document.createTextNode(_);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,_.is&&{is:_.is}),a=null,l=!1}if(t.type===null)y!==_&&e.data!=_&&(e.data=_);else{if(a!=null&&(a=Ae.slice.call(e.childNodes)),c=(y=n.props||U).dangerouslySetInnerHTML,f=_.dangerouslySetInnerHTML,!l){if(y===U)for(y={},h=0;h<e.attributes.length;h++)y[e.attributes[h].name]=e.attributes[h].value;(f||c)&&(f&&c&&f.__html==c.__html||(e.innerHTML=f&&f.__html||""))}Ba(e,_,y,o,l),f?t.__k=[]:(t.__k=t.props.children,Fn(e,t,n,r,t.type!=="foreignObject"&&o,a,i,U,l)),l||("value"in _&&(u=_.value)!==void 0&&u!==e.value&&be(e,"value",u,y.value,!1),"checked"in _&&(u=_.checked)!==void 0&&u!==e.checked&&be(e,"checked",u,y.checked,!1))}return e}function zn(e,t,n){try{typeof e=="function"?e(t):e.current=t}catch(r){C.__e(r,n)}}function le(e,t,n){var r,o,a;if(C.unmount&&C.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||zn(r,null,t)),n||typeof e.type=="function"||(n=(o=e.__e)!=null),e.__e=e.__d=void 0,(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(i){C.__e(i,t)}r.base=r.__P=null}if(r=e.__k)for(a=0;a<r.length;a++)r[a]&&le(r[a],t,n);o!=null&&Dn(o)}function Ra(e,t,n){return this.constructor(e,n)}function se(e,t,n){var r,o,a;C.__&&C.__(e,t),o=(r=n===at)?null:n&&n.__k||t.__k,e=F(_e,null,[e]),a=[],it(t,(r?t:n||t).__k=e,o||U,U,t.ownerSVGElement!==void 0,n&&!r?[n]:o?null:Ae.slice.call(t.childNodes),a,n||U,r),Wn(a,e)}function Hn(e,t){se(e,t,at)}function Pa(e,t){var n,r;for(r in t=$($({},e.props),t),arguments.length>2&&(t.children=Ae.slice.call(arguments,2)),n={},t)r!=="key"&&r!=="ref"&&(n[r]=t[r]);return ye(e.type,n,t.key||e.key,t.ref||e.ref,null)}function qn(e){var t={},n={__c:"__cC"+In++,__:e,Consumer:function(r,o){return r.children(o)},Provider:function(r){var o,a=this;return this.getChildContext||(o=[],this.getChildContext=function(){return t[n.__c]=a,t},this.shouldComponentUpdate=function(i){a.props.value!==i.value&&o.some(function(l){l.context=i.value,me(l)})},this.sub=function(i){o.push(i);var l=i.componentWillUnmount;i.componentWillUnmount=function(){o.splice(o.indexOf(i),1),l&&l.call(i)}}),r.children}};return n.Consumer.contextType=n,n.Provider.__=n,n}C={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&n.constructor.getDerivedStateFromError!=null&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),n.componentDidCatch!=null&&(r=!0,n.componentDidCatch(e)),r)return me(n.__E=n)}catch(o){e=o}throw e}},O.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=$({},this.state),typeof e=="function"&&(e=e(n,this.props)),e&&$(n,e),e!=null&&this.__v&&(t&&this.__h.push(t),me(this))},O.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),me(this))},O.prototype.render=_e,ie=[],ot=0,On=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,at=U,In=0;var Q,R,At,te=0,qe=[],Bt=C.__r,Lt=C.diffed,Rt=C.__c,Pt=C.unmount;function re(e,t){C.__h&&C.__h(R,e,te||t),te=0;var n=R.__H||(R.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function lt(e){return te=1,ct(Gn,e)}function ct(e,t,n){var r=re(Q++,2);return r.__c||(r.__c=R,r.__=[n?n(t):Gn(void 0,t),function(o){var a=e(r.__[0],o);r.__[0]!==a&&(r.__[0]=a,r.__c.setState({}))}]),r.__}function Yn(e,t){var n=re(Q++,3);!C.__s&&st(n.__H,t)&&(n.__=e,n.__H=t,R.__H.__h.push(n))}function ut(e,t){var n=re(Q++,4);!C.__s&&st(n.__H,t)&&(n.__=e,n.__H=t,R.__h.push(n))}function Vn(e){return te=5,Be(function(){return{current:e}},[])}function Kn(e,t,n){te=6,ut(function(){typeof e=="function"?e(t()):e&&(e.current=t())},n==null?n:n.concat(e))}function Be(e,t){var n=re(Q++,7);return st(n.__H,t)?(n.__H=t,n.__h=e,n.__=e()):n.__}function Qn(e,t){return te=8,Be(function(){return e},t)}function Jn(e){var t=R.context[e.__c],n=re(Q++,9);return n.__c=e,t?(n.__==null&&(n.__=!0,t.sub(R)),t.props.value):e.__}function jn(e,t){C.useDebugValue&&C.useDebugValue(t?t(e):e)}function Ma(e){var t=re(Q++,10),n=lt();return t.__=e,R.componentDidCatch||(R.componentDidCatch=function(r){t.__&&t.__(r),n[1](r)}),[n[0],function(){n[1](void 0)}]}function Oa(){qe.some(function(e){if(e.__P)try{e.__H.__h.forEach(Ye),e.__H.__h.forEach(Ve),e.__H.__h=[]}catch(t){return e.__H.__h=[],C.__e(t,e.__v),!0}}),qe=[]}function Ye(e){e.t&&e.t()}function Ve(e){var t=e.__();typeof t=="function"&&(e.t=t)}function st(e,t){return!e||t.some(function(n,r){return n!==e[r]})}function Gn(e,t){return typeof t=="function"?t(e):t}C.__r=function(e){Bt&&Bt(e),Q=0,(R=e.__c).__H&&(R.__H.__h.forEach(Ye),R.__H.__h.forEach(Ve),R.__H.__h=[])},C.diffed=function(e){Lt&&Lt(e);var t=e.__c;if(t){var n=t.__H;n&&n.__h.length&&(qe.push(t)!==1&&At===C.requestAnimationFrame||((At=C.requestAnimationFrame)||function(r){var o,a=function(){clearTimeout(i),cancelAnimationFrame(o),setTimeout(r)},i=setTimeout(a,100);typeof window<"u"&&(o=requestAnimationFrame(a))})(Oa))}},C.__c=function(e,t){t.some(function(n){try{n.__h.forEach(Ye),n.__h=n.__h.filter(function(r){return!r.__||Ve(r)})}catch(r){t.some(function(o){o.__h&&(o.__h=[])}),t=[],C.__e(r,n.__v)}}),Rt&&Rt(e,t)},C.unmount=function(e){Pt&&Pt(e);var t=e.__c;if(t){var n=t.__H;if(n)try{n.__.forEach(function(r){return r.t&&r.t()})}catch(r){C.__e(r,t.__v)}}};function ft(e,t){for(var n in t)e[n]=t[n];return e}function Ke(e,t){for(var n in e)if(n!=="__source"&&!(n in t))return!0;for(var r in t)if(r!=="__source"&&e[r]!==t[r])return!0;return!1}var Xn=function(e){var t,n;function r(o){var a;return(a=e.call(this,o)||this).isPureReactComponent=!0,a}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.shouldComponentUpdate=function(o,a){return Ke(this.props,o)||Ke(this.state,a)},r}(O);function Zn(e,t){function n(o){var a=this.props.ref,i=a==o.ref;return!i&&a&&(a.call?a(null):a.current=null),t?!t(this.props,o)||!i:Ke(this.props,o)}function r(o){return this.shouldComponentUpdate=n,F(e,ft({},o))}return r.prototype.isReactComponent=!0,r.displayName="Memo("+(e.displayName||e.name)+")",r.t=!0,r}var Mt=C.__b;function er(e){function t(n){var r=ft({},n);return delete r.ref,e(r,n.ref)}return t.prototype.isReactComponent=t.t=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t}C.__b=function(e){e.type&&e.type.t&&e.ref&&(e.props.ref=e.ref,e.ref=null),Mt&&Mt(e)};var Ot=function(e,t){return e?z(e).reduce(function(n,r,o){return n.concat(t(r,o))},[]):null},tr={map:Ot,forEach:Ot,count:function(e){return e?z(e).length:0},only:function(e){if((e=z(e)).length!==1)throw new Error("Children.only() expects only one child.");return e[0]},toArray:z},Ia=C.__e;function nr(e){return e&&((e=ft({},e)).__c=null,e.__k=e.__k&&e.__k.map(nr)),e}function Ce(){this.__u=0,this.o=null,this.__b=null}function rr(e){var t=e.__.__c;return t&&t.u&&t.u(e)}function or(e){var t,n,r;function o(a){if(t||(t=e()).then(function(i){n=i.default||i},function(i){r=i}),r)throw r;if(!n)throw t;return F(n,a)}return o.displayName="Lazy",o.t=!0,o}function J(){this.i=null,this.l=null}C.__e=function(e,t,n){if(e.then){for(var r,o=t;o=o.__;)if((r=o.__c)&&r.__c)return r.__c(e,t.__c)}Ia(e,t,n)},(Ce.prototype=new O).__c=function(e,t){var n=this;n.o==null&&(n.o=[]),n.o.push(t);var r=rr(n.__v),o=!1,a=function(){o||(o=!0,r?r(i):i())};t.__c=t.componentWillUnmount,t.componentWillUnmount=function(){a(),t.__c&&t.__c()};var i=function(){var l;if(!--n.__u)for(n.__v.__k[0]=n.state.u,n.setState({u:n.__b=null});l=n.o.pop();)l.forceUpdate()};n.__u++||n.setState({u:n.__b=n.__v.__k[0]}),e.then(a,a)},Ce.prototype.render=function(e,t){return this.__b&&(this.__v.__k[0]=nr(this.__b),this.__b=null),[F(O,null,t.u?null:e.children),t.u&&e.fallback]};var It=function(e,t,n){if(++n[1]===n[0]&&e.l.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.l.size))for(n=e.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.i=n=n[2]}};(J.prototype=new O).u=function(e){var t=this,n=rr(t.__v),r=t.l.get(e);return r[0]++,function(o){var a=function(){t.props.revealOrder?(r.push(o),It(t,e,r)):o()};n?n(a):a()}},J.prototype.render=function(e){this.i=null,this.l=new Map;var t=z(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var n=t.length;n--;)this.l.set(t[n],this.i=[1,0,this.i]);return e.children},J.prototype.componentDidUpdate=J.prototype.componentDidMount=function(){var e=this;e.l.forEach(function(t,n){It(e,n,t)})};var Da=function(){function e(){}var t=e.prototype;return t.getChildContext=function(){return this.props.context},t.render=function(n){return n.children},e}();function $a(e){var t=this,n=e.container,r=F(Da,{context:t.context},e.vnode);return t.s&&t.s!==n&&(t.v.parentNode&&t.s.removeChild(t.v),le(t.h),t.p=!1),e.vnode?t.p?(n.__k=t.__k,se(r,n),t.__k=n.__k):(t.v=document.createTextNode(""),Hn("",n),n.appendChild(t.v),t.p=!0,t.s=n,se(r,n,t.v),t.__k=t.v.__k):t.p&&(t.v.parentNode&&t.s.removeChild(t.v),le(t.h)),t.h=r,t.componentWillUnmount=function(){t.v.parentNode&&t.s.removeChild(t.v),le(t.h)},null}function ar(e,t){return F($a,{vnode:e,container:t})}var Dt=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;O.prototype.isReactComponent={};var ir=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103;function Qe(e,t,n){if(t.__k==null)for(;t.firstChild;)t.removeChild(t.firstChild);return se(e,t),typeof n=="function"&&n(),e?e.__c:null}function Ua(e,t,n){return Hn(e,t),typeof n=="function"&&n(),e?e.__c:null}var $t=C.event;function Ie(e,t){e["UNSAFE_"+t]&&!e[t]&&Object.defineProperty(e,t,{configurable:!1,get:function(){return this["UNSAFE_"+t]},set:function(n){this["UNSAFE_"+t]=n}})}C.event=function(e){$t&&(e=$t(e)),e.persist=function(){};var t=!1,n=!1,r=e.stopPropagation;e.stopPropagation=function(){r.call(e),t=!0};var o=e.preventDefault;return e.preventDefault=function(){o.call(e),n=!0},e.isPropagationStopped=function(){return t},e.isDefaultPrevented=function(){return n},e.nativeEvent=e};var Ut={configurable:!0,get:function(){return this.class}},Ft=C.vnode;C.vnode=function(e){e.$$typeof=ir;var t=e.type,n=e.props;if(t){if(n.class!=n.className&&(Ut.enumerable="className"in n,n.className!=null&&(n.class=n.className),Object.defineProperty(n,"className",Ut)),typeof t!="function"){var r,o,a;for(a in n.defaultValue&&n.value!==void 0&&(n.value||n.value===0||(n.value=n.defaultValue),delete n.defaultValue),Array.isArray(n.value)&&n.multiple&&t==="select"&&(z(n.children).forEach(function(i){n.value.indexOf(i.props.value)!=-1&&(i.props.selected=!0)}),delete n.value),n)if(r=Dt.test(a))break;if(r)for(a in o=e.props={},n)o[Dt.test(a)?a.replace(/[A-Z0-9]/,"-$&").toLowerCase():a]=n[a]}(function(i){var l=e.type,u=e.props;if(u&&typeof l=="string"){var s={};for(var c in u)/^on(Ani|Tra|Tou)/.test(c)&&(u[c.toLowerCase()]=u[c],delete u[c]),s[c.toLowerCase()]=c;if(s.ondoubleclick&&(u.ondblclick=u[s.ondoubleclick],delete u[s.ondoubleclick]),s.onbeforeinput&&(u.onbeforeinput=u[s.onbeforeinput],delete u[s.onbeforeinput]),s.onchange&&(l==="textarea"||l.toLowerCase()==="input"&&!/^fil|che|ra/i.test(u.type))){var f=s.oninput||"oninput";u[f]||(u[f]=u[s.onchange],delete u[s.onchange])}}})(),typeof t=="function"&&!t.m&&t.prototype&&(Ie(t.prototype,"componentWillMount"),Ie(t.prototype,"componentWillReceiveProps"),Ie(t.prototype,"componentWillUpdate"),t.m=!0)}Ft&&Ft(e)};var Fa="16.8.0";function lr(e){return F.bind(null,e)}function dt(e){return!!e&&e.$$typeof===ir}function cr(e){return dt(e)?Pa.apply(null,arguments):e}function ur(e){return!!e.__k&&(se(null,e),!0)}function sr(e){return e&&(e.base||e.nodeType===1&&e)||null}var fr=function(e,t){return e(t)};const Wa={useState:lt,useReducer:ct,useEffect:Yn,useLayoutEffect:ut,useRef:Vn,useImperativeHandle:Kn,useMemo:Be,useCallback:Qn,useContext:Jn,useDebugValue:jn,version:"16.8.0",Children:tr,render:Qe,hydrate:Qe,unmountComponentAtNode:ur,createPortal:ar,createElement:F,createContext:qn,createFactory:lr,cloneElement:cr,createRef:$n,Fragment:_e,isValidElement:dt,findDOMNode:sr,Component:O,PureComponent:Xn,memo:Zn,forwardRef:er,unstable_batchedUpdates:fr,Suspense:Ce,SuspenseList:J,lazy:or},za=Object.freeze(Object.defineProperty({__proto__:null,Children:tr,Component:O,Fragment:_e,PureComponent:Xn,Suspense:Ce,SuspenseList:J,cloneElement:cr,createContext:qn,createElement:F,createFactory:lr,createPortal:ar,createRef:$n,default:Wa,findDOMNode:sr,forwardRef:er,hydrate:Ua,isValidElement:dt,lazy:or,memo:Zn,render:Qe,unmountComponentAtNode:ur,unstable_batchedUpdates:fr,useCallback:Qn,useContext:Jn,useDebugValue:jn,useEffect:Yn,useErrorBoundary:Ma,useImperativeHandle:Kn,useLayoutEffect:ut,useMemo:Be,useReducer:ct,useRef:Vn,useState:lt,version:Fa},Symbol.toStringTag,{value:"Module"})),Ha=qt(za);function dr(e){return e&&typeof e=="object"&&"default"in e?e.default:e}var L=bo,_r=dr(fe),qa=dr(Sa),g=Ha;function Ya(e){_r.toString(e,{type:"terminal"}).then(console.log)}var Va=`:root {
  --animation-duration: 300ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.animated {
  animation-duration: var(--animation-duration);
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
}

.fadeOut {
  animation-name: fadeOut;
}

#walletconnect-wrapper {
  -webkit-user-select: none;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  user-select: none;
  width: 100%;
  z-index: 99999999999999;
}

.walletconnect-modal__headerLogo {
  height: 21px;
}

.walletconnect-modal__header p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  align-items: flex-start;
  display: flex;
  flex: 1;
  margin-left: 5px;
}

.walletconnect-modal__close__wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10000;
  background: white;
  border-radius: 26px;
  padding: 6px;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.walletconnect-modal__close__icon {
  position: relative;
  top: 7px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
}

.walletconnect-modal__close__line1 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
}

.walletconnect-modal__close__line2 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
  transform: rotate(90deg);
}

.walletconnect-qrcode__base {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: rgba(37, 41, 46, 0.95);
  height: 100%;
  left: 0;
  pointer-events: auto;
  position: fixed;
  top: 0;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  width: 100%;
  will-change: opacity;
  padding: 40px;
  box-sizing: border-box;
}

.walletconnect-qrcode__text {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 10px 0 20px 0;
  text-align: center;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .walletconnect-qrcode__text {
    font-size: 4vw;
  }
}

@media only screen and (max-width: 320px) {
  .walletconnect-qrcode__text {
    font-size: 14px;
  }
}

.walletconnect-qrcode__image {
  width: calc(100% - 30px);
  box-sizing: border-box;
  cursor: none;
  margin: 0 auto;
}

.walletconnect-qrcode__notification {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.1s ease-in-out;
  background: white;
  color: black;
  margin-bottom: -60px;
  opacity: 0;
}

.walletconnect-qrcode__notification.notification__show {
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__header {
    height: 130px;
  }
  .walletconnect-modal__base {
    overflow: auto;
  }
}

@media only screen and (min-device-width: 415px) and (max-width: 768px) {
  #content {
    max-width: 768px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 375px) and (max-width: 415px) {
  #content {
    max-width: 414px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 320px) and (max-width: 375px) {
  #content {
    max-width: 375px;
    box-sizing: border-box;
  }
}

@media only screen and (max-width: 320px) {
  #content {
    max-width: 320px;
    box-sizing: border-box;
  }
}

.walletconnect-modal__base {
  -webkit-font-smoothing: antialiased;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);
  font-family: ui-rounded, "SF Pro Rounded", "SF Pro Text", medium-content-sans-serif-font,
    -apple-system, BlinkMacSystemFont, ui-sans-serif, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 41px;
  padding: 24px 24px 22px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  overflow: visible;
  transform: translateY(-50%);
  top: 50%;
  max-width: 500px;
  margin: auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__base {
    padding: 24px 12px;
  }
}

.walletconnect-modal__base .hidden {
  transform: translateY(150%);
  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);
}

.walletconnect-modal__header {
  align-items: center;
  display: flex;
  height: 26px;
  left: 0;
  justify-content: space-between;
  position: absolute;
  top: -42px;
  width: 100%;
}

.walletconnect-modal__base .wc-logo {
  align-items: center;
  display: flex;
  height: 26px;
  margin-top: 15px;
  padding-bottom: 15px;
  pointer-events: auto;
}

.walletconnect-modal__base .wc-logo div {
  background-color: #3399ff;
  height: 21px;
  margin-right: 5px;
  mask-image: url("images/wc-logo.svg") center no-repeat;
  width: 32px;
}

.walletconnect-modal__base .wc-logo p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.walletconnect-modal__base h2 {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 0 0 19px 0;
  text-align: center;
  width: 100%;
}

.walletconnect-modal__base__row {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  height: 56px;
  justify-content: space-between;
  padding: 0 15px;
  position: relative;
  margin: 0px 0px 8px;
  text-align: left;
  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  text-decoration: none;
}

.walletconnect-modal__base__row:hover {
  background: rgba(60, 66, 82, 0.06);
}

.walletconnect-modal__base__row:active {
  background: rgba(60, 66, 82, 0.06);
  transform: scale(0.975);
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.walletconnect-modal__base__row__h3 {
  color: #25292e;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding-bottom: 3px;
}

.walletconnect-modal__base__row__right {
  align-items: center;
  display: flex;
  justify-content: center;
}

.walletconnect-modal__base__row__right__app-icon {
  border-radius: 8px;
  height: 34px;
  margin: 0 11px 2px 0;
  width: 34px;
  background-size: 100%;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-modal__base__row__right__caret {
  height: 18px;
  opacity: 0.3;
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 8px;
  will-change: opacity;
}

.walletconnect-modal__base__row:hover .caret,
.walletconnect-modal__base__row:active .caret {
  opacity: 0.6;
}

.walletconnect-modal__mobile__toggle {
  width: 80%;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 18px;
  background: #d4d5d9;
}

.walletconnect-modal__single_wallet {
  display: flex;
  justify-content: center;
  margin-top: 7px;
  margin-bottom: 18px;
}

.walletconnect-modal__single_wallet a {
  cursor: pointer;
  color: rgb(64, 153, 255);
  font-size: 21px;
  font-weight: 800;
  text-decoration: none !important;
  margin: 0 auto;
}

.walletconnect-modal__mobile__toggle_selector {
  width: calc(50% - 8px);
  background: white;
  position: absolute;
  border-radius: 5px;
  height: calc(100% - 8px);
  top: 4px;
  transition: all 0.2s ease-in-out;
  transform: translate3d(4px, 0, 0);
}

.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {
  transform: translate3d(calc(100% + 12px), 0, 0);
}

.walletconnect-modal__mobile__toggle a {
  font-size: 12px;
  width: 50%;
  text-align: center;
  padding: 8px;
  margin: 0;
  font-weight: 600;
  z-index: 1;
}

.walletconnect-modal__footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__footer {
    margin-top: 5vw;
  }
}

.walletconnect-modal__footer a {
  cursor: pointer;
  color: #898d97;
  font-size: 15px;
  margin: 0 auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__footer a {
    font-size: 14px;
  }
}

.walletconnect-connect__buttons__wrapper {
  max-height: 44vh;
}

.walletconnect-connect__buttons__wrapper__android {
  margin: 50% 0;
}

.walletconnect-connect__buttons__wrapper__wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 10px 0;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__buttons__wrapper__wrap {
    margin-top: 40px;
  }
}

.walletconnect-connect__button {
  background-color: rgb(64, 153, 255);
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: 500;
}

.walletconnect-connect__button__icon_anchor {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 8px;
  width: 42px;
  justify-self: center;
  flex-direction: column;
  text-decoration: none !important;
}

@media only screen and (max-width: 320px) {
  .walletconnect-connect__button__icon_anchor {
    margin: 4px;
  }
}

.walletconnect-connect__button__icon {
  border-radius: 10px;
  height: 42px;
  margin: 0;
  width: 42px;
  background-size: cover !important;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-connect__button__text {
  color: #424952;
  font-size: 2.7vw;
  text-decoration: none !important;
  padding: 0;
  margin-top: 1.8vw;
  font-weight: 600;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__button__text {
    font-size: 16px;
    margin-top: 12px;
  }
}

.walletconnect-search__input {
  border: none;
  background: #d4d5d9;
  border-style: none;
  padding: 8px 16px;
  outline: none;
  font-style: normal;
  font-stretch: normal;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  border-radius: 8px;
  width: calc(100% - 16px);
  margin: 0;
  margin-bottom: 8px;
}
`;typeof Symbol<"u"&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")));typeof Symbol<"u"&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function Ka(e,t){try{var n=e()}catch(r){return t(r)}return n&&n.then?n.then(void 0,t):n}var Qa="data:image/svg+xml,%3Csvg height='185' viewBox='0 0 300 185' width='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m61.4385429 36.2562612c48.9112241-47.8881663 128.2119871-47.8881663 177.1232091 0l5.886545 5.7634174c2.445561 2.3944081 2.445561 6.2765112 0 8.6709204l-20.136695 19.715503c-1.222781 1.1972051-3.2053 1.1972051-4.428081 0l-8.100584-7.9311479c-34.121692-33.4079817-89.443886-33.4079817-123.5655788 0l-8.6750562 8.4936051c-1.2227816 1.1972041-3.205301 1.1972041-4.4280806 0l-20.1366949-19.7155031c-2.4455612-2.3944092-2.4455612-6.2765122 0-8.6709204zm218.7677961 40.7737449 17.921697 17.546897c2.445549 2.3943969 2.445563 6.2764769.000031 8.6708899l-80.810171 79.121134c-2.445544 2.394426-6.410582 2.394453-8.85616.000062-.00001-.00001-.000022-.000022-.000032-.000032l-57.354143-56.154572c-.61139-.598602-1.60265-.598602-2.21404 0-.000004.000004-.000007.000008-.000011.000011l-57.3529212 56.154531c-2.4455368 2.394432-6.4105755 2.394472-8.8561612.000087-.0000143-.000014-.0000296-.000028-.0000449-.000044l-80.81241943-79.122185c-2.44556021-2.394408-2.44556021-6.2765115 0-8.6709197l17.92172963-17.5468673c2.4455602-2.3944082 6.4105989-2.3944082 8.8561602 0l57.3549775 56.155357c.6113908.598602 1.602649.598602 2.2140398 0 .0000092-.000009.0000174-.000017.0000265-.000024l57.3521031-56.155333c2.445505-2.3944633 6.410544-2.3945531 8.856161-.0002.000034.0000336.000068.0000673.000101.000101l57.354902 56.155432c.61139.598601 1.60265.598601 2.21404 0l57.353975-56.1543249c2.445561-2.3944092 6.410599-2.3944092 8.85616 0z' fill='%233b99fc'/%3E%3C/svg%3E",Ja="WalletConnect",ja=300,Ga="rgb(64, 153, 255)",hr="walletconnect-wrapper",Wt="walletconnect-style-sheet",gr="walletconnect-qrcode-modal",Xa="walletconnect-qrcode-close",pr="walletconnect-qrcode-text",Za="walletconnect-connect-button";function ei(e){return g.createElement("div",{className:"walletconnect-modal__header"},g.createElement("img",{src:Qa,className:"walletconnect-modal__headerLogo"}),g.createElement("p",null,Ja),g.createElement("div",{className:"walletconnect-modal__close__wrapper",onClick:e.onClose},g.createElement("div",{id:Xa,className:"walletconnect-modal__close__icon"},g.createElement("div",{className:"walletconnect-modal__close__line1"}),g.createElement("div",{className:"walletconnect-modal__close__line2"}))))}function ti(e){return g.createElement("a",{className:"walletconnect-connect__button",href:e.href,id:Za+"-"+e.name,onClick:e.onClick,rel:"noopener noreferrer",style:{backgroundColor:e.color},target:"_blank"},e.name)}var ni="data:image/svg+xml,%3Csvg fill='none' height='18' viewBox='0 0 8 18' width='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath clip-rule='evenodd' d='m.586301.213898c-.435947.33907-.5144813.967342-.175411 1.403292l4.87831 6.27212c.28087.36111.28087.86677 0 1.22788l-4.878311 6.27211c-.33907.436-.260536 1.0642.175412 1.4033.435949.3391 1.064219.2605 1.403289-.1754l4.87832-6.2721c.84259-1.08336.84259-2.60034 0-3.68367l-4.87832-6.27212c-.33907-.4359474-.96734-.514482-1.403289-.175412z' fill='%233c4252' fill-rule='evenodd'/%3E%3C/svg%3E";function ri(e){var t=e.color,n=e.href,r=e.name,o=e.logo,a=e.onClick;return g.createElement("a",{className:"walletconnect-modal__base__row",href:n,onClick:a,rel:"noopener noreferrer",target:"_blank"},g.createElement("h3",{className:"walletconnect-modal__base__row__h3"},r),g.createElement("div",{className:"walletconnect-modal__base__row__right"},g.createElement("div",{className:"walletconnect-modal__base__row__right__app-icon",style:{background:"url('"+o+"') "+t,backgroundSize:"100%"}}),g.createElement("img",{src:ni,className:"walletconnect-modal__base__row__right__caret"})))}function oi(e){var t=e.color,n=e.href,r=e.name,o=e.logo,a=e.onClick,i=window.innerWidth<768?(r.length>8?2.5:2.7)+"vw":"inherit";return g.createElement("a",{className:"walletconnect-connect__button__icon_anchor",href:n,onClick:a,rel:"noopener noreferrer",target:"_blank"},g.createElement("div",{className:"walletconnect-connect__button__icon",style:{background:"url('"+o+"') "+t,backgroundSize:"100%"}}),g.createElement("div",{style:{fontSize:i},className:"walletconnect-connect__button__text"},r))}var ai=5,De=12;function ii(e){var t=L.isAndroid(),n=g.useState(""),r=n[0],o=n[1],a=g.useState(""),i=a[0],l=a[1],u=g.useState(1),s=u[0],c=u[1],f=i?e.links.filter(function(p){return p.name.toLowerCase().includes(i.toLowerCase())}):e.links,h=e.errorMessage,y=i||f.length>ai,_=Math.ceil(f.length/De),b=[(s-1)*De+1,s*De],d=f.length?f.filter(function(p,x){return x+1>=b[0]&&x+1<=b[1]}):[],m=!t&&_>1,v=void 0;function w(p){o(p.target.value),clearTimeout(v),p.target.value?v=setTimeout(function(){l(p.target.value),c(1)},1e3):(o(""),l(""),c(1))}return g.createElement("div",null,g.createElement("p",{id:pr,className:"walletconnect-qrcode__text"},t?e.text.connect_mobile_wallet:e.text.choose_preferred_wallet),!t&&g.createElement("input",{className:"walletconnect-search__input",placeholder:"Search",value:r,onChange:w}),g.createElement("div",{className:"walletconnect-connect__buttons__wrapper"+(t?"__android":y&&f.length?"__wrap":"")},t?g.createElement(ti,{name:e.text.connect,color:Ga,href:e.uri,onClick:g.useCallback(function(){L.saveMobileLinkInfo({name:"Unknown",href:e.uri})},[])}):d.length?d.map(function(p){var x=p.color,S=p.name,k=p.shortName,N=p.logo,B=L.formatIOSMobile(e.uri,p),A=g.useCallback(function(){L.saveMobileLinkInfo({name:S,href:B})},[d]);return y?g.createElement(oi,{color:x,href:B,name:k||S,logo:N,onClick:A}):g.createElement(ri,{color:x,href:B,name:S,logo:N,onClick:A})}):g.createElement(g.Fragment,null,g.createElement("p",null,h.length?e.errorMessage:e.links.length&&!f.length?e.text.no_wallets_found:e.text.loading))),m&&g.createElement("div",{className:"walletconnect-modal__footer"},Array(_).fill(0).map(function(p,x){var S=x+1,k=s===S;return g.createElement("a",{style:{margin:"auto 10px",fontWeight:k?"bold":"normal"},onClick:function(){return c(S)}},S)})))}function li(e){var t=!!e.message.trim();return g.createElement("div",{className:"walletconnect-qrcode__notification"+(t?" notification__show":"")},e.message)}var ci=function(e){try{var t="";return Promise.resolve(_r.toString(e,{margin:0,type:"svg"})).then(function(n){return typeof n=="string"&&(t=n.replace("<svg",'<svg class="walletconnect-qrcode__image"')),t})}catch(n){return Promise.reject(n)}};function ui(e){var t=g.useState(""),n=t[0],r=t[1],o=g.useState(""),a=o[0],i=o[1];g.useEffect(function(){try{return Promise.resolve(ci(e.uri)).then(function(u){i(u)})}catch(u){Promise.reject(u)}},[]);var l=function(){var u=qa(e.uri);u?(r(e.text.copied_to_clipboard),setInterval(function(){return r("")},1200)):(r("Error"),setInterval(function(){return r("")},1200))};return g.createElement("div",null,g.createElement("p",{id:pr,className:"walletconnect-qrcode__text"},e.text.scan_qrcode_with_wallet),g.createElement("div",{dangerouslySetInnerHTML:{__html:a}}),g.createElement("div",{className:"walletconnect-modal__footer"},g.createElement("a",{onClick:l},e.text.copy_to_clipboard)),g.createElement(li,{message:n}))}function si(e){var t=L.isAndroid(),n=L.isMobile(),r=n?e.qrcodeModalOptions&&e.qrcodeModalOptions.mobileLinks?e.qrcodeModalOptions.mobileLinks:void 0:e.qrcodeModalOptions&&e.qrcodeModalOptions.desktopLinks?e.qrcodeModalOptions.desktopLinks:void 0,o=g.useState(!1),a=o[0],i=o[1],l=g.useState(!1),u=l[0],s=l[1],c=g.useState(!n),f=c[0],h=c[1],y={mobile:n,text:e.text,uri:e.uri,qrcodeModalOptions:e.qrcodeModalOptions},_=g.useState(""),b=_[0],d=_[1],m=g.useState(!1),v=m[0],w=m[1],p=g.useState([]),x=p[0],S=p[1],k=g.useState(""),N=k[0],B=k[1],A=function(){u||a||r&&!r.length||x.length>0||g.useEffect(function(){var D=function(){try{if(t)return Promise.resolve();i(!0);var P=Ka(function(){var oe=e.qrcodeModalOptions&&e.qrcodeModalOptions.registryUrl?e.qrcodeModalOptions.registryUrl:L.getWalletRegistryUrl();return Promise.resolve(fetch(oe)).then(function(wr){return Promise.resolve(wr.json()).then(function(yr){var br=yr.listings,Cr=n?"mobile":"desktop",he=L.getMobileLinkRegistry(L.formatMobileRegistry(br,Cr),r);i(!1),s(!0),B(he.length?"":e.text.no_supported_wallets),S(he);var _t=he.length===1;_t&&(d(L.formatIOSMobile(e.uri,he[0])),h(!0)),w(_t)})})},function(oe){i(!1),s(!0),B(e.text.something_went_wrong),console.error(oe)});return Promise.resolve(P&&P.then?P.then(function(){}):void 0)}catch(oe){return Promise.reject(oe)}};D()})};A();var Y=n?f:!f;return g.createElement("div",{id:gr,className:"walletconnect-qrcode__base animated fadeIn"},g.createElement("div",{className:"walletconnect-modal__base"},g.createElement(ei,{onClose:e.onClose}),v&&f?g.createElement("div",{className:"walletconnect-modal__single_wallet"},g.createElement("a",{onClick:function(){return L.saveMobileLinkInfo({name:x[0].name,href:b})},href:b,rel:"noopener noreferrer",target:"_blank"},e.text.connect_with+" "+(v?x[0].name:"")+" ›")):t||a||!a&&x.length?g.createElement("div",{className:"walletconnect-modal__mobile__toggle"+(Y?" right__selected":"")},g.createElement("div",{className:"walletconnect-modal__mobile__toggle_selector"}),n?g.createElement(g.Fragment,null,g.createElement("a",{onClick:function(){return h(!1),A()}},e.text.mobile),g.createElement("a",{onClick:function(){return h(!0)}},e.text.qrcode)):g.createElement(g.Fragment,null,g.createElement("a",{onClick:function(){return h(!0)}},e.text.qrcode),g.createElement("a",{onClick:function(){return h(!1),A()}},e.text.desktop))):null,g.createElement("div",null,f||!t&&!a&&!x.length?g.createElement(ui,Object.assign({},y)):g.createElement(ii,Object.assign({},y,{links:x,errorMessage:N})))))}var fi={choose_preferred_wallet:"Wähle bevorzugte Wallet",connect_mobile_wallet:"Verbinde mit Mobile Wallet",scan_qrcode_with_wallet:"Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",connect:"Verbinden",qrcode:"QR-Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"In die Zwischenablage kopieren",copied_to_clipboard:"In die Zwischenablage kopiert!",connect_with:"Verbinden mit Hilfe von",loading:"Laden...",something_went_wrong:"Etwas ist schief gelaufen",no_supported_wallets:"Es gibt noch keine unterstützten Wallet",no_wallets_found:"keine Wallet gefunden"},di={choose_preferred_wallet:"Choose your preferred wallet",connect_mobile_wallet:"Connect to Mobile Wallet",scan_qrcode_with_wallet:"Scan QR code with a WalletConnect-compatible wallet",connect:"Connect",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copy to clipboard",copied_to_clipboard:"Copied to clipboard!",connect_with:"Connect with",loading:"Loading...",something_went_wrong:"Something went wrong",no_supported_wallets:"There are no supported wallets yet",no_wallets_found:"No wallets found"},_i={choose_preferred_wallet:"Elige tu billetera preferida",connect_mobile_wallet:"Conectar a billetera móvil",scan_qrcode_with_wallet:"Escanea el código QR con una billetera compatible con WalletConnect",connect:"Conectar",qrcode:"Código QR",mobile:"Móvil",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Conectar mediante",loading:"Cargando...",something_went_wrong:"Algo salió mal",no_supported_wallets:"Todavía no hay billeteras compatibles",no_wallets_found:"No se encontraron billeteras"},hi={choose_preferred_wallet:"Choisissez votre portefeuille préféré",connect_mobile_wallet:"Se connecter au portefeuille mobile",scan_qrcode_with_wallet:"Scannez le QR code avec un portefeuille compatible WalletConnect",connect:"Se connecter",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copier",copied_to_clipboard:"Copié!",connect_with:"Connectez-vous à l'aide de",loading:"Chargement...",something_went_wrong:"Quelque chose a mal tourné",no_supported_wallets:"Il n'y a pas encore de portefeuilles pris en charge",no_wallets_found:"Aucun portefeuille trouvé"},gi={choose_preferred_wallet:"원하는 지갑을 선택하세요",connect_mobile_wallet:"모바일 지갑과 연결",scan_qrcode_with_wallet:"WalletConnect 지원 지갑에서 QR코드를 스캔하세요",connect:"연결",qrcode:"QR 코드",mobile:"모바일",desktop:"데스크탑",copy_to_clipboard:"클립보드에 복사",copied_to_clipboard:"클립보드에 복사되었습니다!",connect_with:"와 연결하다",loading:"로드 중...",something_went_wrong:"문제가 발생했습니다.",no_supported_wallets:"아직 지원되는 지갑이 없습니다",no_wallets_found:"지갑을 찾을 수 없습니다"},pi={choose_preferred_wallet:"Escolha sua carteira preferida",connect_mobile_wallet:"Conectar-se à carteira móvel",scan_qrcode_with_wallet:"Ler o código QR com uma carteira compatível com WalletConnect",connect:"Conectar",qrcode:"Código QR",mobile:"Móvel",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Ligar por meio de",loading:"Carregamento...",something_went_wrong:"Algo correu mal",no_supported_wallets:"Ainda não há carteiras suportadas",no_wallets_found:"Nenhuma carteira encontrada"},mi={choose_preferred_wallet:"选择你的钱包",connect_mobile_wallet:"连接至移动端钱包",scan_qrcode_with_wallet:"使用兼容 WalletConnect 的钱包扫描二维码",connect:"连接",qrcode:"二维码",mobile:"移动",desktop:"桌面",copy_to_clipboard:"复制到剪贴板",copied_to_clipboard:"复制到剪贴板成功！",connect_with:"通过以下方式连接",loading:"正在加载...",something_went_wrong:"出了问题",no_supported_wallets:"目前还没有支持的钱包",no_wallets_found:"没有找到钱包"},vi={choose_preferred_wallet:"کیف پول مورد نظر خود را انتخاب کنید",connect_mobile_wallet:"به کیف پول موبایل وصل شوید",scan_qrcode_with_wallet:"کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید",connect:"اتصال",qrcode:"کد QR",mobile:"سیار",desktop:"دسکتاپ",copy_to_clipboard:"کپی به کلیپ بورد",copied_to_clipboard:"در کلیپ بورد کپی شد!",connect_with:"ارتباط با",loading:"...بارگذاری",something_went_wrong:"مشکلی پیش آمد",no_supported_wallets:"هنوز هیچ کیف پول پشتیبانی شده ای وجود ندارد",no_wallets_found:"هیچ کیف پولی پیدا نشد"},zt={de:fi,en:di,es:_i,fr:hi,ko:gi,pt:pi,zh:mi,fa:vi};function wi(){var e=L.getDocumentOrThrow(),t=e.getElementById(Wt);t&&e.head.removeChild(t);var n=e.createElement("style");n.setAttribute("id",Wt),n.innerText=Va,e.head.appendChild(n)}function yi(){var e=L.getDocumentOrThrow(),t=e.createElement("div");return t.setAttribute("id",hr),e.body.appendChild(t),t}function mr(){var e=L.getDocumentOrThrow(),t=e.getElementById(gr);t&&(t.className=t.className.replace("fadeIn","fadeOut"),setTimeout(function(){var n=e.getElementById(hr);n&&e.body.removeChild(n)},ja))}function bi(e){return function(){mr(),e&&e()}}function Ci(){var e=L.getNavigatorOrThrow().language.split("-")[0]||"en";return zt[e]||zt.en}function Ei(e,t,n){wi();var r=yi();g.render(g.createElement(si,{text:Ci(),uri:e,onClose:bi(t),qrcodeModalOptions:n}),r)}function xi(){mr()}var vr=function(){return typeof V<"u"&&typeof V.versions<"u"&&typeof V.versions.node<"u"};function ki(e,t,n){console.log(e),vr()?Ya(e):Ei(e,t,n)}function Ti(){vr()||xi()}var Si={open:ki,close:Ti},Ht=Si;const Ai=xr({__proto__:null,default:Ht},[Ht]);export{Gr as a,fo as b,co as c,je as d,jr as e,Ht as f,oo as g,Ai as i,dn as m,_o as r,fn as s};
//# sourceMappingURL=index-d24c0b6c.js.map
