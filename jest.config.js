module.exports = {
  roots: ['<rootDir>/lib'],
  testMatch: ['**/__test__/**/*.(spec).ts'],
  verbose: true,
  moduleFileExtensions: ['js', 'ts'],
  preset: 'ts-jest',
  collectCoverageFrom: ['lib/**/*.ts'],
  coverageThreshold: {
    global: {
      statements: 78,
      branches: 40,
      functions: 78,
      lines: 80
    }
  }
}
