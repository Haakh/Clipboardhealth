const crypto = require("crypto");

const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

function fetchCandidate (event) {
  let candidate;

  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = createHash(data);
  }

  return typeof candidate === "string" ? candidate : JSON.stringify(candidate)
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = fetchCandidate(event)
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate)
  }
  
  return candidate;
};

module.exports.fetchCandidate = fetchCandidate