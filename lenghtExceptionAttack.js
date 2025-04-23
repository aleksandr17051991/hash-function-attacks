'use strict';

const crypto = require('crypto');

const hashMD5 = 'md5';
const hashSHA1 = 'sha1';
const secret = 'password';

function getHash(data, hashAlgorithm) {
  return crypto.createHash(hashAlgorithm).update(data).digest('hex');
}
