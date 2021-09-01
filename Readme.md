Analytics.js - FindHotel Fork


This is a fork of the popular segment javascript sdk for tracking user events.


## Background

### Major differences between this fork and the official repo

a great a bulk of the work was done on packaging this a product FE developers can use out of the box.
There are probably many things that can be done in order to make this packaging better like using webkit and removing
unnecessary dependencies.

The other major different between this repo and the official one is that in this one the `Segment.io` integration
was changed to send data to our alooma endpoint.

### Steps to build this repo

1. Build using `make analytics.js` - note this applies some changes to a subdependency via a git apply.
The changes it's applying are these: https://github.com/FindHotel/analytics.js/commit/bd670d1912a8e5b7d9b3146aacb1ac7fcad8eaa1#diff-eef26edac842c7b555a54ea995dc2cb533e6b2470f22631ee9f876ce15bfc2c5L5673 

1. Once inspected to work fine, build using `make analytics.min.js`

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
