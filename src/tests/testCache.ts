import { setCache, getCache, deleteCache } from '../utils/cache';

// Test setting and getting a value
setCache('testKey', 'testValue');
const cachedValue = getCache('testKey');
console.log('Cached Value:', cachedValue); // Should print: "Cached Value: testValue"

// Test deleting a value
deleteCache('testKey');
const deletedValue = getCache('testKey');
console.log('Deleted Value:', deletedValue); // Should print: "Deleted Value: undefined"
