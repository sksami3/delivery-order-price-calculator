/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};