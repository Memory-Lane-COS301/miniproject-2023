import { apiHistoryDataAccess } from './api-history-data-access';
import { expect } from '@jest/globals';

describe('apiHistoryDataAccess', () => {
  it('should work', () => {
    expect(apiHistoryDataAccess()).toEqual('api-history-data-access');
  });
});
