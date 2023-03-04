// CACHING:
// https://developer.mozilla.org/en-US/docs/Web/API/caches

// cache API needs to store a Response object,

async function getFromCache(cacheName, urlString) {
  // file -> folder relationship
  // caches is like a filing cabinet
  // cache is a specific folder

  const cache = await caches.open(cacheName); // get the cache folder called indicators from the cache filing cabinet
  const cachedResponse = await cache.match(urlString); // in that folder, find me the matching file with a key of urlString
  if (cachedResponse) {
    // this is currently a Response, the same object that was originally saved in the first place
    const cachedData = await cachedResponse.json(); // we parse the response and make a JS object out of it

    // from this point on, cachedData is exactly the same data that would get from a fresh API call.. with the addition
    // of an .expiration property
    const cachedExpiry = new Date(cachedData.expiration); // "hydrate" this date string back into a date object
    // for ease of comparison, against the now variable
    const now = new Date();
    if (cachedExpiry > now) {
      // still a fresh value
      return cachedData;
    } else {
      // if found something but it is stale aka expired
      // remove from the cache
      cache.delete(urlString);
    }
  }
  return null;
}

async function saveToCache(cacheName, urlString, data) {
  // same as above, filing cabinet, folder, file relationship
  const cache = await caches.open(cacheName);
  const fiveMinuteExpiry = 5 * 60 * 1000;
  const random3MinBuffer = Math.random() * 3 * 60 * 1000;
  const expiration = new Date(Date.now() + fiveMinuteExpiry + random3MinBuffer);
  // this is going from a JS date object, to a simple string for better storage as plain text
  data.expiration = expiration.toUTCString();
  // create a response containing a JSON version of our data, because axios already de-jsoned it for us
  // want it to be in plain text, to make sure the cache stores it without problems
  cache.put(urlString, new Response(JSON.stringify(data)));
}

export { getFromCache, saveToCache };
