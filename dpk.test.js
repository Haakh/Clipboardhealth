const { deterministicPartitionKey, fetchCandidate, convertToString} = require("./dpk");

const HASH = "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862"
const NEW_LONG_HASH = "5045a95f933c5628d226f3f8e15eb4fc29c56ed1a907136ea4bd652e1d0d8a1199f2c7e398be123a894a726c8cbbecf740a9e774ea383927cd2f5bf5e4fd6601"
const LONG_KEY = HASH+HASH+HASH+HASH

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hash when given event with no partition key", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe(HASH);
  });

  it("Returns a new hash when given event with a partition key length > 256", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: LONG_KEY});
    expect(trivialKey).toBe(NEW_LONG_HASH);
  });
});

describe("fetchCandidate", () => {
  it("Returns key when event has a partition key", () => {
    const candidate = fetchCandidate({partitionKey: 'key'});
    expect(candidate).toBe("key");
  });

  it("Returns hash if event does not have a partition key", () => {
    const candidate = fetchCandidate({});
    expect(candidate).toBe(HASH);
  });
  
  it("Returns stringified value if event partition key is not a string", () => {
    const candidate = fetchCandidate({partitionKey: 123});
    expect(candidate).toBe('123');
  });
});

describe("convertToString", () => {
  it("Returns same string when string is passed", () => {
    const candidate = convertToString('123');
    expect(candidate).toBe("123");
  });

  it("Returns stringified value if non-string type is passed", () => {
    const candidate = convertToString(123);
    expect(candidate).toBe('123');
  });
});
