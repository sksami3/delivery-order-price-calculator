import NodeCache from 'node-cache';

// Initialize the cache with a TTL of 300 seconds (5 minutes)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // Cache for 5 minutes

// Function to set a value in the cache
export const setCache = (key: string, value: any): void => {
  cache.set(key, value);
};

// Function to get a value from the cache
export const getCache = (key: string): any => {
  return cache.get(key);
};

// Function to delete a value from the cache
export const deleteCache = (key: string): void => {
  cache.del(key);
};
