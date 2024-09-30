// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', 
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
};
