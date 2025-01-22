import { setCache, getCache, deleteCache } from '../utils/cache';

describe('Cache Utility Functions', () => {
  test('should set, get, and delete cache values correctly', () => {
    setCache('testKey', 'testValue');
    expect(getCache('testKey')).toBe('testValue');

    deleteCache('testKey');
    expect(getCache('testKey')).toBeUndefined();
  });
});
