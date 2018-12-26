if (self.CavalryLogger) { CavalryLogger.start_js(["7haw2"]); }

__d("VideoFeedFastPreloadController",["DOMQuery","Run"],(function(a,b,c,d,e,f){var g=0,h={preload:function(c){g<2&&(c=b("DOMQuery").scry(c,"video")[0],c instanceof a.HTMLVideoElement&&(g||b("Run").onBeforeUnload(function(){return h.reset()}),c.preload="auto",g+=1))},reset:function(){g=0}};h.reset();e.exports=h}),null);
__d("MaybeNativePromise",["Promise"],(function(a,b,c,d,e,f){"use strict";c=a.Promise||b("Promise");b("Promise").resolve();e.exports=c}),null);
__d("VideoAkamaiRequestHelper",["URI"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a){return a.toLowerCase().indexOf("akamai")!==-1}function g(a){var b=a.startByte;a=a.endByte;if(b!=void 0&&!(b===0&&a==void 0)){b="bytes="+b+"-"+(a==void 0?"":a);return{Range:b}}return null}function c(a){var c=new(b("URI"))(a);c=c.getQueryData();var d=c.startByte;c=c.endByte;return g({baseUrl:a,startByte:d,endByte:c})}e.exports={isAkamai:a,getRequestHeaders:g,getRequestHeadersFromUrl:c}}),null);
__d("VideoPlayerShakaExperimentsConfig",["VideoPlayerShakaExperimentsPayload"],(function(a,b,c,d,e,f){"use strict";e.exports=b("VideoPlayerShakaExperimentsPayload").experiments}),null);
__d("VideoPlayerShakaParsedContextualConfig",["EventEmitter","FBLogger","VideoPlayerShakaContextualConfig"],(function(a,b,c,d,e,f){__p&&__p();var g;c=babelHelpers.inherits(a,b("EventEmitter"));g=c&&c.prototype;function a(){"use strict";g.constructor.call(this),this.$VideoPlayerShakaParsedContextualConfig1=null,this.$VideoPlayerShakaParsedContextualConfig2={},this.parseConfig()}a.prototype.getGlobalConfig=function(){"use strict";return this.$VideoPlayerShakaParsedContextualConfig2};a.prototype.getStaticConfig=function(){"use strict";return b("VideoPlayerShakaContextualConfig").staticConfig};a.prototype.getRawContextualConfig=function(){"use strict";return this.$VideoPlayerShakaParsedContextualConfig1};a.prototype.parseConfig=function(){"use strict";this.$VideoPlayerShakaParsedContextualConfig3(),this.$VideoPlayerShakaParsedContextualConfig4(),this.emit("configChange")};a.prototype.$VideoPlayerShakaParsedContextualConfig3=function(){"use strict";if(!b("VideoPlayerShakaContextualConfig").rawContextualConfig)return;try{this.$VideoPlayerShakaParsedContextualConfig1=JSON.parse(b("VideoPlayerShakaContextualConfig").rawContextualConfig)}catch(a){b("FBLogger")("VideoPlayerShakaParsedContextualConfig").warn("Failed to parse raw config")}};a.prototype.$VideoPlayerShakaParsedContextualConfig4=function(){"use strict";this.$VideoPlayerShakaParsedContextualConfig2=Object.assign({},b("VideoPlayerShakaContextualConfig").staticConfig),this.$VideoPlayerShakaParsedContextualConfig1&&this.$VideoPlayerShakaParsedContextualConfig1.defaults.forEach(function(a){return this.$VideoPlayerShakaParsedContextualConfig2[a.name]=a.value}.bind(this))};e.exports=new a()}),null);
__d("VideoPlayerShakaGlobalConfig",["VideoPlayerShakaExperimentsConfig","VideoPlayerShakaParsedContextualConfig"],(function(a,b,c,d,e,f){a={getBool:function(a,c){var d=b("VideoPlayerShakaParsedContextualConfig").getGlobalConfig();return d&&d[a]!==void 0?d[a]==="true"||d[a]===!0:typeof b("VideoPlayerShakaExperimentsConfig")[a]==="boolean"?b("VideoPlayerShakaExperimentsConfig")[a]:c},getNumber:function(a,c){var d=b("VideoPlayerShakaParsedContextualConfig").getGlobalConfig();return d&&d[a]!==void 0?Number(d[a]):typeof b("VideoPlayerShakaExperimentsConfig")[a]==="number"?b("VideoPlayerShakaExperimentsConfig")[a]:c},getString:function(a,c){var d=b("VideoPlayerShakaParsedContextualConfig").getGlobalConfig();return d&&d[a]!==void 0?String(d[a]):typeof b("VideoPlayerShakaExperimentsConfig")[a]==="string"?b("VideoPlayerShakaExperimentsConfig")[a]:c}};e.exports=a}),null);
__d("VideoPlayerShakaError",["VideoPlayerShakaGlobalConfig"],(function(a,b,c,d,e,f){"use strict";a={translateError:function(a,c,d){var e=b("VideoPlayerShakaGlobalConfig").getBool("fix_shaka_xhr_error_status",!0)?a.errorRawTransportStatus:a.errorCode;a={name:a.errorType,message:a.errorMsg,type:d,url:c,status:e};return a},createTimeoutError:function(a){a={name:"timeout",message:"timeout",type:"net",url:a,status:0};return a}};e.exports=a}),null);
__d("VideoDashPrefetchCache",["regeneratorRuntime","Promise","BanzaiODS","Deferred","MaybeNativePromise","Run","URI","VideoAkamaiRequestHelper","VideoPlayerPrefetchExperiments","VideoPlayerShakaError","VideoPlayerShakaGlobalConfig","XHRRequest","getCrossOriginTransport","requireWeak"],(function(a,b,c,d,e,f){__p&&__p();var g=null;b("requireWeak")("VideoPlayerShakaBandwidthEstimator",function(a){return g=a});var h=null;b("requireWeak")("VideoStreamingTaskQueueProvider",function(a){return h=a});function i(a){return a.audio.length+a.video.length+a.manifest.length}function j(a,c){b("BanzaiODS").bumpEntityKey("www_video_playback","prefetch."+a,c)}function k(a){var b="aborted",c={status:0},d=new Error("Prefetch request aborted.");return Object.assign(d,{type:b,url:a,xhr:c})}function l(a){var c=a.getURI(),d=c.toString();if(b("VideoAkamaiRequestHelper").isAkamai(d)){var e=b("VideoAkamaiRequestHelper").getRequestHeadersFromUrl(d);d=c.removeQueryData(["bytestart","byteend"]);a.setURI(d);e&&Object.keys(e).forEach(function(b){a.setRequestHeader(b,e[b])})}return a}var m=null,n=new Map();function o(a){a=new(b("URI"))(a);a=a.getDomain();return a.endsWith("fbcdn.net")&&!a.startsWith("interncache")&&!a.endsWith("ak.fbcdn.net")}function p(a,c){c===void 0&&(c=!1);return c&&o(a)?b("getCrossOriginTransport").withCredentials:b("getCrossOriginTransport")}function q(a){return o(a.url)}function r(a,b,c){return{response:a.slice(b.start+0,b.end+1),responseTime:c}}function s(a){__p&&__p();var c=new(b("URI"))(a);if(c.getDomain()){c=c.removeQueryData(["oh"]);c=c.removeQueryData("__gda__");var d=Object.keys(c.getQueryData());for(var e=0;e<d.length;e++){var f=d[e];f.startsWith("_nc")&&(c=c.removeQueryData(f))}return c.toString()}return a}function t(){"use strict";this.$2=new Map(),this.$9=new Map(),this.$1=new Map(),this.$3=[],this.$4=[],this.$5=0,this.$6=b("VideoPlayerPrefetchExperiments").maxPrefetchVideosNum,this.$7=b("VideoPlayerPrefetchExperiments").consolidateFragmentedPrefetchRequest}t.prototype.$10=function(a,c){__p&&__p();c===void 0&&(c=!1);var d=a,e=new(b("XHRRequest"))(d).setMethod("GET").setResponseType("arraybuffer").setTransportBuilder(p(d,c));l(e);var f=new(b("MaybeNativePromise"))(function(c,g){e.setErrorHandler(function(a){this.$11(e),g(b("VideoPlayerShakaError").translateError(a,d,"preload"))}.bind(this)),e.setResponseHandler(function(a){e.response=a,this.$11(e),c(e)}.bind(this)),e.setAbortHandler(function(){if(b("VideoPlayerPrefetchExperiments").fixPrefetchCacheAbort){this.$11(e);var c=k(a);g(c)}else g(f,new Error("Request promise aborted"))}.bind(this))}.bind(this));this.$12(a,f);this.$3.push(e);this.$8?this.$8.push(e):e.send();return f};t.prototype.genPrefetchMpdNow=function(a){"use strict";__p&&__p();return b("regeneratorRuntime").async(function(b){while(1)switch(b.prev=b.next){case 0:if(!this.has(a)){b.next=2;break}return b.abrupt("return",null);case 2:return b.abrupt("return",this.$10(a));case 3:case"end":return b.stop()}},null,this)};t.prototype.$13=function(a,b,c){__p&&__p();b===void 0&&(b=!1);c===void 0&&(c=null);var d=[];for(var e=0;e<a.length;e++){var f=t.createQueryStringURL(a[e]);this.has(f)||(d.push(this.$10(f,b).then(function(a){j("received",1);return a})),c!=null&&this.$2.set(f,c))}j("sent",d.length);return d};t.prototype.$14=function(a){"use strict";__p&&__p();var c=t.getConsolidatedURL(a);if(c==null)return this.$13(a);var d=new(b("XHRRequest"))(c).setMethod("GET").setResponseType("arraybuffer").setTransportBuilder(p(c));l(d);var e=Date.now(),f=[];for(var g=0;g<a.length;g++){var h=t.createQueryStringURL(a[g]),i=new(b("Deferred"))();this.has(h)||this.$12(h,i.getPromise());f.push(i)}d.setErrorHandler(function(e){this.$11(d);for(var a=0;a<f.length;a++)f[a].reject(b("VideoPlayerShakaError").translateError(e,c,"preload"))}.bind(this));d.setResponseHandler(function(c){var g=Date.now()-e;for(var b=0;b<a.length;b++){var h=f[b],i=a[b];h.resolve(r(c,i,g))}this.$11(d)}.bind(this));d.setAbortHandler(function(){for(var b=0;b<a.length;b++){var c=f[b];c.reject(new Error("Request aborted."))}});this.$3.push(d);d.send();j("consolidated.sent",1);j("sent",f.length);h=f.map(function(a){return a.getPromise().then(function(a){j("received",1);return a})});b("Promise").all(h).then(function(){return j("consolidated.received",1)});return h};t.prototype.$15=function(a){"use strict";__p&&__p();var c=a.useCredentials,d=a.connectionQualityLevel;this.$5++;var e=this.$7&&!c;b("VideoPlayerPrefetchExperiments").enableGlobalSchedulerForPrefetch&&(this.$8=[]);var f=e?this.$14(a.video):this.$13(a.video,c,d);e=e?this.$14(a.audio):this.$13(a.audio,c,d);d=this.$13(a.manifest,c);var g=f.concat(e,d);if(this.$8){var i=this.$8||[];this.$8=null;var j=""+a.videoID;c={name:"prefetch task, "+j,run:function(){j&&n["delete"](j);i.forEach(function(a){return a.send()});return b("MaybeNativePromise").all(g).then(function(){})["catch"](function(){})},cancel:function(){}};h?(b("VideoPlayerPrefetchExperiments").switchPrefetchTaskToHighPriWhenPlayed&&j&&n.set(j,c),h.getQueue("video").enqueue(c,b("VideoPlayerPrefetchExperiments").prefetchPriority),this.$16()):(c.run(),b("MaybeNativePromise").all(g).then(function(){return this.$16()}.bind(this))["catch"](function(){return this.$16()}.bind(this)))}else b("MaybeNativePromise").all(g).then(function(){return this.$16()}.bind(this))["catch"](function(){return this.$16()}.bind(this))};t.prototype.$12=function(a,c){"use strict";a=s(a),this.$1.values().next().done&&b("Run").onLeave(function(){for(var a=0;a<this.$3.length;a++)this.$3[a].abort();this.$3=[];this.$4=[];this.$5=0;this.$1.clear()}.bind(this)),this.$1.set(a,c)};t.prototype.$11=function(a){"use strict";a=this.$3.indexOf(a);a>-1&&this.$3.splice(a,1)};t.prototype.$16=function(){"use strict";this.$5--;var a=this.$4.shift();a&&this.$15(a)};t.prototype.has=function(a){"use strict";a=s(a);return this.$1.has(a)};t.prototype.getConnectionQualityLevel=function(a){"use strict";return this.$2.get(a)};t.prototype.getAndDelete=function(a){"use strict";a=s(a);var b=this.$1.get(a);b?j("cache.hit",1):j("cache.miss",1);this.$1["delete"](a);j("retrieve",1);return b};t.prototype.$17=function(a){"use strict";a=s(a);a=this.$1.get(a);return a};t.prototype.queueRequestBatch=function(a){"use strict";this.$6===0||this.$5<this.$6?this.$15(a):(j("queued",i(a)),this.$4.push(a))};t.prototype.setCachedRepresentations=function(a,b){"use strict";this.$9.set(a,b)};t.prototype.getCachedRepresentations=function(a){"use strict";return this.$9.get(a)};t.getCachedRepresentations=function(a){"use strict";return t.getInstance().getCachedRepresentations(a)};t.getInstance=function(){"use strict";m===null&&(m=new t());return m};t.createQueryStringURL=function(a){"use strict";var c=a.url,d=a.start;a=a.end;d!==null&&d!==void 0&&a!==null&&a!==void 0&&(c=new(b("URI"))(c).addQueryData({bytestart:d,byteend:a}));return c.toString()};t.getConsolidatedURL=function(a){"use strict";__p&&__p();var b="",c=Infinity,d=0;for(var e=0;e<a.length;e++){var f=a[e],g=f.url,h=f.start;f=f.end;if(g==null||h==null||f==null)return null;if(b==="")b=g;else if(b!==g)return null;c=Math.min(c,h);d=Math.max(d,f)}return t.createQueryStringURL({url:b,start:c,end:d})};t.getPrefetchInfoFromRepresentation=function(a){"use strict";return a.segments.map(function(b){return{url:a.url,start:b.start,end:b.end}})};t.getVideoRepresentationFromRepresentations=function(a,c){"use strict";__p&&__p();var d=a.find(function(a){return a.representation_id.endsWith("d")});!c&&g&&(c=g.getBandwidth());if(!c)return d;var e=b("VideoPlayerShakaGlobalConfig").getNumber("client_prefetch_bandwidth_aggressiveness",1);for(var f=0;f<a.length;f++){var h=a[f],i=d&&d.bandwidth||0;if(i>h.bandwidth)continue;else c>h.bandwidth/e&&(d=h)}return d};t.loadVideoGivenAllRepresentations=function(a,b,c){"use strict";__p&&__p();if(t.isAutoplayBandwidthRestrained())return;var d=[],e=[];b.audio.length>0&&(d=t.getPrefetchInfoFromRepresentation(b.audio[0]),d.length>0&&e.push(b.audio[0].representation_id));var f=[];b=t.getVideoRepresentationFromRepresentations(b.video,c);b&&(f=t.getPrefetchInfoFromRepresentation(b),f.length>0&&e.push(b.representation_id));c=t.getInstance();c.queueRequestBatch({audio:d,video:f,manifest:[],videoID:a,useCredentials:!1});c.setCachedRepresentations(a,e)};t.isAutoplayBandwidthRestrained=function(){"use strict";return!!g&&g.isAutoplayBandwidthRestrained()};t.loadVideo=function(a,c,d){"use strict";c=!!c;if(t.isAutoplayBandwidthRestrained())return;if(b("VideoPlayerPrefetchExperiments").disablePrefetchCache)return;var e=t.getInstance();a.manifest||(a.manifest=[]);e.queueRequestBatch({manifest:a.manifest.filter(q),video:a.video.filter(q),audio:a.audio.filter(q),videoID:a.videoID,useCredentials:c,connectionQualityLevel:d})};t.getCacheValue=function(a){"use strict";return t.getInstance().getAndDelete(a)};t.getConnectionQualityLevel=function(a){"use strict";return t.getInstance().getConnectionQualityLevel(a)};t.hasCacheValue=function(a){"use strict";return t.getInstance().has(a)};t.getPrefetchTaskByID=function(a){"use strict";a=n.get(a)||null;return a};e.exports=t}),null);
__d("VideoDisplayTimePlayButton",["CSS","DataStore","Event"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g={},h="_spinner";a={getClicked:function(a){return b("DataStore").get(a,"clicked",!1)},register:function(a,c){var d=a.id;g[d]=b("Event").listen(a,"click",function(){c&&(b("CSS").hide(a),b("CSS").show(c)),b("DataStore").set(a,"clicked",!0)});c&&(g[d+h]=b("Event").listen(c,"click",function(){c&&b("CSS").hide(c),b("CSS").show(a),b("DataStore").set(a,"clicked",!1)}))},unregister:function(a){a=a.id;Object.prototype.hasOwnProperty.call(g,a)&&g[a].remove();a=a+h;Object.prototype.hasOwnProperty.call(g,a)&&g[a].remove()}};e.exports=a}),null);
__d("VideosRenderingInstrumentation",["DataStore","VideoPlayerHTML5Experiments","performanceAbsoluteNow"],(function(a,b,c,d,e,f){var g={storeRenderTime:function(a){var c=b("VideoPlayerHTML5Experiments").useMonotonicallyIncreasingTimers?b("performanceAbsoluteNow")():Date.now();b("DataStore").set(a,"videos_rendering_instrumentation",c);return c},retrieveRenderTime:function(a){var c=b("DataStore").get(a,"videos_rendering_instrumentation",NaN);Number.isNaN(c)&&(c=g.storeRenderTime(a));return c}};e.exports=g}),null);
__d("intersectionObserverEntryIsIntersecting",[],(function(a,b,c,d,e,f){"use strict";function a(a){return a.isIntersecting!=null?a.isIntersecting:a.intersectionRatio>0||a.intersectionRect&&(a.intersectionRect.height>0||a.intersectionRect.width>0)}e.exports=a}),null);
__d("IntersectionObserverFallback",["FBLogger","TimeSlice","containsNode","getElementRect","performanceNow","setInterval","throttle"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=document.documentElement,h=[];function i(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left);a=Math.min(a.right,b.right);b=a-e;var f=d-c;return b>=0&&f>=0?{top:c,bottom:d,left:e,right:a,width:b,height:f}:void 0}function j(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function k(a){__p&&__p();this.time=a.time;this.target=a.target;this.rootBounds=a.rootBounds;this.boundingClientRect=a.boundingClientRect;this.intersectionRect=a.intersectionRect||j();this.isIntersecting=!!a.intersectionRect;a=this.boundingClientRect;a=a.width*a.height;var b=this.intersectionRect.width*this.intersectionRect.height;a?this.intersectionRatio=b/a:this.intersectionRatio=this.isIntersecting?1:0}function a(a,c){__p&&__p();this.THROTTLE_TIMEOUT=100;this.POLL_INTERVAL=null;this.$12=b("TimeSlice").guard(b("throttle")(function(){var a=this.$14(),c=a?this.$15():j();this.$6.forEach(function(d){var e=d.element,f=b("getElementRect")(e),g=this.$16(e),h=d.entry,i=a&&g&&!this.$2&&this.$17(e,c);d=d.entry=new k({time:b("performanceNow")(),target:e,boundingClientRect:f,rootBounds:c,intersectionRect:i});!h?this.$7.push(d):a&&g?this.$18(h,d)&&this.$7.push(d):h&&h.isIntersecting&&this.$7.push(d)}.bind(this));this.$7.length&&this.$1(this.takeRecords(),this)}.bind(this),this.THROTTLE_TIMEOUT),"IntersectionObserverFallback: checkForIntersections");this.$2=!1;try{window.top.document}catch(a){this.$2=!0}c=c||{};this.$1=a;this.$4=!1;this.$6=[];this.$7=[];this.$8=this.$9(c.rootMargin);this.thresholds=this.$10(c.threshold);this.root=c.root||null;this.rootMargin=this.$8.map(function(a){return a.value+a.unit}).join(" ")}a.prototype.$10=function(a){a=a||[0];Array.isArray(a)||(a=[a]);return a.sort().filter(function(a,b,c){return a!==c[b-1]})};a.prototype.$9=function(a){a=a||"0px";a=a.split(/\s+/).map(function(a){a=/^(-?\d*\.?\d+)(px|%)$/.exec(a);return{value:parseFloat(a[1]),unit:a[2]}});a[1]=a[1]||a[0];a[2]=a[2]||a[0];a[3]=a[3]||a[1];return a};a.prototype.$11=function(){this.$4||(this.$4=!0,this.$12(),this.POLL_INTERVAL?this.$5=b("setInterval")(this.$12,this.POLL_INTERVAL):(window.addEventListener("resize",this.$12),document.addEventListener("scroll",this.$12),"MutationObserver"in window&&(this.$3=new MutationObserver(this.$12),this.$3.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))};a.prototype.$13=function(){this.$4&&(this.$4=!1,this.$5&&(clearInterval(this.$5),this.$5=void 0),window.removeEventListener("resize",this.$12),document.removeEventListener("scroll",this.$12),this.$3&&(this.$3.disconnect(),this.$3=void 0))};a.prototype.$17=function(a,c){__p&&__p();var d=window.getComputedStyle(a);if(!d||d.display=="none")return void 0;d=b("getElementRect")(a);d=d;a=a.parentElement;var e=!1;while(!e){var f=null;a==this.root||a&&a.nodeType!=1?(e=!0,f=c):a&&window.getComputedStyle(a).overflow!="visible"&&(f=b("getElementRect")(a));if(f){d=i(f,d);if(!d)break}a=a&&a.parentElement}return d};a.prototype.$15=function(){var a;if(this.root)a=b("getElementRect")(this.root);else{var c=document.documentElement,d=document.body,e=c&&c.clientWidth||d&&d.clientWidth;c=c&&c.clientHeight||d&&d.clientHeight;a={top:0,left:0,right:e,width:e,bottom:c,height:c}}return this.$19(a)};a.prototype.$19=function(a){var b=this.$8.map(function(b,c){return b.unit=="px"?b.value:b.value*(c%2?a.width:a.height)/100});b={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3],width:0,height:0};b.width=b.right-b.left;b.height=b.bottom-b.top;return b};a.prototype.$18=function(a,b){__p&&__p();a=a&&a.isIntersecting?a.intersectionRatio||0:-1;b=b.isIntersecting?b.intersectionRatio||0:-1;if(a===b)return!1;for(var c=0;c<this.thresholds.length;c++){var d=this.thresholds[c];if(d==a||d==b||d<a!==d<b)return!0}return!1};a.prototype.$14=function(){return!this.root||b("containsNode")(g,this.root)};a.prototype.$16=function(a){var c=this.root||g;return b("containsNode")(c,a)};a.prototype.$20=function(){h.indexOf(this)<0&&h.push(this)};a.prototype.$21=function(){var a=h.indexOf(this);a!=-1&&h.splice(a,1)};a.prototype.observe=function(a){__p&&__p();if(!a){b("FBLogger")("io").warn("IntersectionObserverFallback target does not exist");return}if(this.$6.some(function(b){return b.element==a}))return;this.$20();this.$6.push({element:a,entry:null});this.$11();this.$12()};a.prototype.unobserve=function(a){this.$6=this.$6.filter(function(b){return b.element!=a}),this.$6.length||(this.$13(),this.$21())};a.prototype.disconnect=function(){this.$6=[],this.$13(),this.$21()};a.prototype.takeRecords=function(){var a=this.$7.slice();this.$7=[];return a};e.exports=a}),null);
__d("IntersectionObserver",["IntersectionObserverFallback"],(function(a,b,c,d,e,f){"use strict";a="IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype;e.exports=a?window.IntersectionObserver:b("IntersectionObserverFallback")}),null);