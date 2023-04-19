import { describe, test } from '@jest/globals';
import { mock } from 'node:test';

const mockData = {
  //change according to seeded data
  userId: '0104fa66-5a7b-429c-aedd-acab833be72e',
  username: 'Dena52',
  surname: "Champlin",
  email: "Dena_Champlin@gmail.com",
  profileImgUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/508.jpg"
};

describe('Tesing Cloud Function: getUser', () => {
  test(`getting user with username = ${mockData.username} \n using endPoint`, async () => {
    const getUserRequest = {
        data:{
            user: {
                username: "Dena52"
            }
        }
    };

    const res = await fetch('http://127.0.0.1:5005/demo-project/us-central1/getUser', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(getUserRequest),
    });
    const getUserResponse = (await res.json()).result.user;
    console.debug("getUserResponse: ",getUserResponse);
    expect(getUserResponse.userId).toBe(mockData.userId); 
    expect(getUserResponse.username).toBe(mockData.username);
    expect(getUserResponse.email).toBe(mockData.email);
    expect(getUserResponse.profileImgUrl).toBe(mockData.profileImgUrl);
  });
  test(`Getting user with invalid username, using endPoint`, async () => {
    const getUserRequest = {
      data: {
        user: {
          username: "An Invalid username",
        },
      },
    };

    const res = await fetch('http://127.0.0.1:5005/demo-project/us-central1/getUser', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(getUserRequest),
    });
    const getUserResponse = (await res.json());
    const errorResponse = {
        error: {
            message: "Could not retrieve user. Info: Error: User not found",
            status: "NOT_FOUND"
        }
    }
    console.debug(getUserResponse);
    expect(getUserResponse).toEqual(errorResponse);
  });
});
