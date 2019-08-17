'use strict';

/**
 * Extract extension from file name
 * @param {string} filename File name or path
 * @returns {string} File extension
 */
function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

/**
 * Get file name or path without file extension
 * @param {string} filePath File name or path
 * @param {string} fileExtention File extension
 * @returns {string} File name or path
 */
function getFileBase(filePath, fileExtention) {
  return filePath.substr(0, filePath.length - fileExtention.length - 1);
}

/**
 * Build media query
 * @param {string} query Query keyword
 * @param {string} value Query value
 * @returns {string} Query string
 */
function buildQuery(query, value) {
  return `(${query}: ${value})`;
}

module.exports = {
  getFileExtension,
  getFileBase,
  buildQuery
};
