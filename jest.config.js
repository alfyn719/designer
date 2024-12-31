/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  // rootDir: __dirname,
  roots: [
    '<rootDir>/packages',
    '<rootDir>/designer',
  ],
  projects: [
    '<rootDir>/packages/pipeline',
  ],

  // 待验证
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,ts,tsx}',
    '<rootDir>/designer/**/*.{js,ts,tsx}',
    '!<rootDir>/designer/**/node_modules/**',
    '!<rootDir>/packages/**/node_modules/**',
    '!<rootDir>/node_modules/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json'],
}
