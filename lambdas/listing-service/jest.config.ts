/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    clearMocks: true,
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    testMatch: ['tests/**/*.test.ts']
};
