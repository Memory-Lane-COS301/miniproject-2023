import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
};

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: "node",
};
