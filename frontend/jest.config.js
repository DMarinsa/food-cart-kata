module.exports = {
  preset: 'ts-jest',
  globalSetup: './jest-global-setup.js',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['jest-canvas-mock', '<rootDir>/tests/setupFramework.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      diagnostics: false,
    },
  },
};
