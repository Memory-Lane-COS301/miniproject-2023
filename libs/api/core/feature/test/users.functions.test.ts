import { describe, test } from '@jest/globals';

describe('Tesing Cloud Function: getUser', () => {
    const getUserRequest = {
        data: {
          user: {
            userId: "0104fa66-5a7b-429c-aedd-acab833be72e"
          }
        },
      };
  test(`geting user with ID = ${getUserRequest.data.user.userId} \n using endPoint`, async () => {
  
    const res = await fetch('http://127.0.0.1:5005/demo-project/us-central1/getUser', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(getUserRequest),
    });
    const getUserResponse = (await res.json()).result;
    console.debug(getUserResponse);
    expect(getUserResponse.username).toBe('Dena52');
  });
});
