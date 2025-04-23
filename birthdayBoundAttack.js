'use strict';

const crypto = require('crypto');

const hashAlgorithm = 'md5';
const attempts = 0;
const hashLibrary = {};

function getHash(data) {
  return crypto.createHash(hashAlgorithm).update(data).digest('hex');
}
console.log('hash >>>', getHash('Hello'));

function getRandomStr() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
}
console.log('random number - hex', getRandomStr());

function startBirthdayBound() {
  while (true) {
    const randStr = getRandomStr();
    const currentHash = getHash(randStr);

    if (hashLibrary[currentHash] && hashLibrary[currentHash] !== randStr) {
      console.log('✅ Success!!! Birthday Bound Atttack has done!');
      console.log(`🟢 First string - '${hashLibrary[currentHash]}'`);
      console.log(`🟢 Second string - '${randStr}'`);
      console.log(`🔓 Matching Hash: '${currentHash}'`);
      break;
    } else {
      hashLibrary[currentHash] = randStr;
    }

    attempts++;
  }
}
