module.exports = {
  rootDir: '.',
  transform: {
    '^.+\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test//*.spec.ts'],
  testEnvironment: 'node'
}