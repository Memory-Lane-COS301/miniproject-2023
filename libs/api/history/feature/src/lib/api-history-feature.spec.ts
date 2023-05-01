import { apiHistoryFeature } from './api-history-feature';
import { expect } from '@jest/globals';

describe('apiHistoryFeature', () => {
  it('should work', () => {
    expect(apiHistoryFeature()).toEqual('api-history-feature');
  });
});
