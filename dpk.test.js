const { deterministicPartitionKey, fetchCandidate } = require("./dpk");

const HASH = "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862"

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns Candidate key when event has a partition key", () => {
    const candidate = fetchCandidate({partitionKey: 'key'});
    expect(candidate).toBe("key");
  });

  it("Returns Candidate hash if event does not have a partition key", () => {
    const candidate = fetchCandidate({});
    expect(candidate).toBe(HASH);
  });
  
  it("Returns stringified Candidate if event partition key is not a string", () => {
    const candidate = fetchCandidate({partitionKey: 123});
    expect(candidate).toBe('123');
  });
});
