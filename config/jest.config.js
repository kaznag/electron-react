module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '../src',
  moduleNameMapper: {
    '.+\\.(css|style|less|sass|scss)$': '<rootDir>/../node_modules/jest-css-modules'
  }
};
