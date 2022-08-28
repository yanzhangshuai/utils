import { it, expect } from 'vitest';
import { assert } from './index';
it('assert', () => {
  expect(() => assert(false, 'error')).toThrowError('error');
  expect(assert(true, 'error')).toBeUndefined;
})