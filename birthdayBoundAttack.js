'use strict';

const crypto = require('crypto');

const hashMD5 = 'md5';
const hashSHA1 = 'sha1';

let attempts = 0;
const hashStorage = {};

function getHash(data, hashAlgorithm) {
  return crypto
    .createHash(hashAlgorithm)
    .update(data)
    .digest('hex')
    .substring(0, 8); // cut hash to reduce number of attemptions !!!
}

function getRandomStr() {
  return crypto.randomBytes(8).toString('hex');
}

function startBirthdayBound(hashAlgorithm) {
  while (true) {
    const randStr = getRandomStr();
    const currentHash = getHash(randStr, hashAlgorithm);

    if (hashStorage[currentHash] && hashStorage[currentHash] !== randStr) {
      console.log('✅ Success!!! Birthday Bound Attack has done!');
      console.log(`⏱ Attempts: ${attempts}`);
      console.log(`🟢 First string - '${hashStorage[currentHash]}'`);
      console.log(`🟢 Second string - '${randStr}'`);
      console.log(`🎯  Matching Hash: '${currentHash}'`);
      break;
    } else {
      hashStorage[currentHash] = randStr;
    }

    if (attempts % 10000 === 0 && attempts > 0) {
      console.log(`PASS ✅ : "${attempts}" strings`);
    }

    attempts++;
  }
}

startBirthdayBound(hashMD5);
