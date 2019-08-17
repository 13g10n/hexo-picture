const assert = require('assert');
const Utils = require('../lib/utils');

const fileExtensionsTestCases = [
  { input: '', expectedResult: '', description: 'should return empty string for empty filename' },
  { input: '.filename', expectedResult: '', description: 'should return empty string for hidden file' },
  { input: 'filename', expectedResult: '', description: 'should return empty string for file without extension' },
  { input: 'filename.txt', expectedResult: 'txt', description: 'should return extension for regular file' },
  { input: 'filename.with.dots.txt', expectedResult: 'txt', description: 'should return extension for file with dots' }
];

describe('Utils', () => {
  describe('getFileExtension', () => {
    fileExtensionsTestCases.forEach((testCase) => {
      it(testCase.description, () => {
        assert.equal(Utils.getFileExtension(testCase.input), testCase.expectedResult);
      });
    });
  });
});
