const crypto = require('crypto');

const TRIVIAL_PARTITION_KEY = '0';

exports.MAX_PARTITION_KEY_LENGTH = 256;

exports.encryptKey = candidate => {
  return crypto.createHash('sha3-512').update(candidate).digest('hex');
};

const parseKeyAsString = candidate =>
  typeof candidate !== 'string' ? JSON.stringify(candidate) : candidate;

const getKey = event => {
  if (!event) {
    return null;
  }

  return event.partitionKey
    ? parseKeyAsString(event.partitionKey)
    : exports.encryptKey(JSON.stringify(event));
};

const ensureKeyIsValid = key => {
  if (key.length > exports.MAX_PARTITION_KEY_LENGTH) {
    return exports.encryptKey(key);
  }

  return key;
};

exports.deterministicPartitionKey = event => {
  const candidate = getKey(event) || TRIVIAL_PARTITION_KEY;

  return ensureKeyIsValid(candidate);
};
