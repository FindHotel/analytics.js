Analytics.js - FindHotel Fork


This is a fork of the popular segment javascript sdk for tracking user events.


## Background

### Major differences between this fork and the official repo

a great a bulk of the work was done on packaging this a product FE developers can use out of the box.
There are probably many things that can be done in order to make this packaging better like using webkit and removing
unnecessary dependencies.

The other major different between this repo and the official one is that in this one the `Segment.io` integration
was changed to send data to our alooma endpoint.

### Steps to convert official repo to this repo

0. clone the repo https://github.com/rcline/analytics.js/tree/
notice the branch is `replacing-duojs-with-npm-build-and-updated-libraries` and this is not the
official repo, it's a pull request that wasn't yet merged to master.
https://github.com/segmentio/analytics.js/pull/514

1. build using `make analytics.js`

2. apply this set of changes:
```
--- analytics.js	2017-04-25 16:58:06.000000000 +0200
+++ analytics.js.1	2017-04-25 17:03:04.000000000 +0200
@@ -16083,7 +16083,7 @@

 var Segment = exports = module.exports = integration('Segment.io')
   .option('apiKey', '')
-  .option('apiHost', 'api.segment.io/v1')
+  .option('apiHost', 'localhost:8088/track') //change segment uri to our uri.

@@ -16176,7 +16175,7 @@
  */

 Segment.prototype.onpage = function(page) {
-  this.send('/p', page.json());
+  this.send('', page.json()); // we send all event  to root /
 };

 /**
@@ -16214,7 +16213,7 @@
   var json = track.json();
   // TODO: figure out why we need traits.
   delete json.traits;
-  this.send('/t', json);
+  this.send('', json); // we send all event  to root /
 };

 /**
@@ -16333,7 +16332,7 @@

   function sendAjax() {
     // Beacons are sent as a text/plain POST
-    var headers = { 'Content-Type': 'text/plain' };
+    var headers = { 'Content-Type': 'application/json' }; //content-type must be application/json for alooma
     send(url, msg, headers, function(err, res) {
       self.debug('ajax sent %o, received %o', msg, arguments);
       if (err) return fn(err);
```

That's it you are done, you can now send events to alooma using the segment SDK.

3. in order to produce a minimized version use `make analytics.min.js`, this can only called after completing step #2
or your changes will be overwritten.
## Usage:

1. init the analytics

```
analytics.initialize({"Segment.io":{ apiKey: '' }})
```

2. send events
```
analytics.page()
```

3. for full documentation please see:
https://segment.com/docs/sources/website/analytics.js/



## Known Caveats

1. The current alooma endpoint does not expose CORS correctly,

you can use the nginx-proxy directory to build a nginx proxy that bypasses this

```
cd nginx-proxy
docker build -t nginx-proxy .
docker run  -p 8088:8088 nginx-proxy
```


2. Instead of overriding the segment.io endpoint we could implement our own integration, although this doesn't seem necessary
