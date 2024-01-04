export default {
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**'],
  coverageReporters: ['html'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/utils'],
  verbose: true,
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json'],
  transform: { '\\.[jt]sx?$': 'babel-jest' },
};
