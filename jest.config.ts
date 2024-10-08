export default {
  setupFiles: ['../jest.polyfills.js'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/fileMock.js',
  },
  rootDir: 'src',
  testEnvironmentOptions: {
    customExportConditions: [''],
  }
};
