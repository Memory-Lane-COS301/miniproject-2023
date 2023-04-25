import { describe, test } from '@jest/globals';

const mockData = {
  //change according to seeded data
  userId: '0104fa66-5a7b-429c-aedd-acab833be72e',
  username: 'Dessie.Lebsack@yahoo.com',
  title: 'Summer Holiday',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  imgUrl: 'https://bit.ly/3MCrcnB',
};

describe('Tesing Cloud Function: createMemory', () => {
  test(`Creating Memory for userID = ${mockData.userId} \n using endPoint`, async () => {
    const createMemoryRequest = {
      data: {
        memory: {
          username: mockData.username,
          userId: mockData.userId,
          title: mockData.title,
          description: mockData.description,
          imgUrl: mockData.imgUrl,
        },
      },
    };

    const res = await fetch('http://127.0.0.1:5005/demo-project/us-central1/createMemory', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(createMemoryRequest),
    });
    const createMemoryResponse = (await res.json()).result.memory;
    console.debug("createMemoryResponse: ",createMemoryResponse);
    expect(createMemoryResponse.userId).toBe(mockData.userId); 
    expect(createMemoryResponse.alive).toBe(true);
    expect(createMemoryResponse.remainingTime).toBe(86400);
    expect(createMemoryResponse.commentsCount).toBe(0);
  });
  test(`Creating Memory for user that does not exist using endPoint`, async () => {
    const createMemoryRequest = {
      data: {
        memory: {
          username: mockData.username,
          userId: "12437",
          title: mockData.title,
          description: mockData.description,
          imgUrl: mockData.imgUrl,
        },
      },
    };

    const res = await fetch('http://127.0.0.1:5005/demo-project/us-central1/createMemory', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(createMemoryRequest),
    });
    const createMemoryResponse = (await res.json());
    const errorResponse = {
      error: {
      message: "User not found",
      status: "NOT_FOUND"
      }
    }
    console.debug(createMemoryResponse);
    expect(createMemoryResponse).toEqual(errorResponse);
  });
});
