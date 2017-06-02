'use strict';
importScripts('./sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'mandala-generator'
};

// pre-cache our key assets
self.toolbox.precache([
  './index.html',
  './index.js'
]);

self.toolbox.router.default = self.toolbox.cacheFirst;