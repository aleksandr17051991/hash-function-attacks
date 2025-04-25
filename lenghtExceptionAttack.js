'use strict';

const crypto = require('crypto');
const { get } = require('https');

const hashMD5 = 'md5';
const hashSHA1 = 'sha1';

const secret = 'password';
const userMessage = 'user=Alex,amount=100';

function getHash(data, hashAlgorithm) {
  return crypto.createHash(hashAlgorithm).update(data).digest('hex');
}

// 1) user sent message with digital signature
const userSignature = getHash(secret + userMessage, hashSHA1);
console.log('user signature >>>', userSignature);

// 2) server recieved "message" and try to varify its user authenticity. Server know "secret"
const serverVarifiedHash = getHash(secret + userMessage, hashSHA1);
// Server compare hashes
console.log(
  serverVarifiedHash === userSignature
    ? 'Correct user!'
    : 'Error: verification failed'
);
