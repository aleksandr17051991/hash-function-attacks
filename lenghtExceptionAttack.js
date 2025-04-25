'use strict';

const crypto = require('crypto');

const hashMD5 = 'md5',
  hashSHA1 = 'sha1';

const secret = 'qwerty1234567890';
const userMessage = 'user=Alex,amount=100';

function getHash(data, hashAlgorithm) {
  return crypto.createHash(hashAlgorithm).update(data).digest('hex');
}

// 1) user sent message with digital signature
const userSignature = getHash(secret + userMessage, hashSHA1);
console.log('user signature >>>', userSignature);

// 2) server recieved "message" and try to varify its user authenticity. Server knows "secret"
const serverVarifiedHash = getHash(secret + userMessage, hashSHA1);
console.log('Server varification hash >>>', serverVarifiedHash);
// Server compare hashes
console.log(
  serverVarifiedHash === userSignature
    ? '✅ Correct user!'
    : '❌ Error: verification failed'
);

// Scammer action:

// Want to send new message with additional info: knownOrigMsg + '&admin=true'
// Knows: knownSignature and knownOrigMsg
// Must guess: guessedSecretLength

const knownOrigMsg = userMessage;
const knownSignature = userSignature;
const appendInfo = '&admin=true';
let guessedSecretLength = 16;
