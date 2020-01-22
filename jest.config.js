module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts': 'ts-jest',
    },
    setupFiles: ['dotenv/config'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'html', 'text'],
    modulePathIgnorePatterns: ['.*/__mocks__/*'],
    coveragePathIgnorePatterns: ['./src/database/*'],
};
