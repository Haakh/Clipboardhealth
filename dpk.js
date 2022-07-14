const crypto = require("crypto");

const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

function convertToString (value) {
  if (typeof value === "string") {
    return value
  }

  return JSON.stringify(value)
}

function fetchCandidate (event) {
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate;

  if (event.partitionKey) {
    candidate = convertToString(event.partitionKey)

    if(candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = createHash(candidate)
    }
  } else {
    const data = convertToString(event);
    candidate = createHash(data);
  }

  return candidate
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = fetchCandidate(event)
  }
  
  return candidate;
};

module.exports.fetchCandidate = fetchCandidate
module.exports.convertToString = convertToString