module.exports = {
  roots: ['<rootDir>/lib'],
  testMatch: ['**/__test__/**/*.(spec).ts'],
  verbose: true,
  moduleFileExtensions: ['js', 'ts'],
  preset: 'ts-jest',
  collectCoverageFrom: ['lib/**/*.ts'],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    }
  }
}
