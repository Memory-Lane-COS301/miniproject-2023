import { describe, expect, test } from '@jest/globals';
import { createMemory } from './../src/functions/memories.functions';
import { MemoriesService } from '@mp/api/memories/feature';
import { ICreateMemoryRequest, ICreateMemoryResponse } from '@mp/api/memories/util';

describe('Tesing Cloud Function: memories.functions', () => {
  test('Creating Memory', () => {
    const memory = {
      userId: '97841uqejdf178rgab4',
      title: 'Summer Holiday',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imgUrl: 'https://bit.ly/3MCrcnB', 
    };
    const createMemoryRequest: ICreateMemoryRequest = {
      memory: memory,
    };
    const createMemoryResponse: ICreateMemoryRequest = {
      memory: memory,
    };
    createMemory(createMemoryRequest, createMemoryResponse);
  });
});
