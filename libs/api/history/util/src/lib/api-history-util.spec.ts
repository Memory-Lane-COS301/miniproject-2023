import { apiHistoryUtil } from './api-history-util';
import { expect } from '@jest/globals';

describe('apiHistoryUtil', () => {
  it('should work', () => {
    expect(apiHistoryUtil()).toEqual('api-history-util');
  });
});
