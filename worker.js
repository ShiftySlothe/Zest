const fs = require("fs");

// Todo
// Contain equal
// Check return type of functions (number of times called etc)
// Promises
const expect = (received) => ({
  toBe: (expected) => {
    if (received !== expected) {
      throw new Error(`Expected ${expected} but received ${received}.`);
    }
    return true;
  },
  not: () => {
    return !received;
  },
  toBeGreaterThan: (expected) => {
    if (received <= expected) {
      throw new Error(`Expected ${recieved} to be greater than ${expected}.`);
    }
    return true;
  },
  toBeGreaterThanOrEqualTo: (expected) => {
    if (received < expected) {
      throw new Error(
        `Expected ${recieved} to be greater than or equal to${expected}.`
      );
    }
    return true;
  },
  toBeLessThan: (expected) => {
    if (received >= expected) {
      throw new Error(`Expected ${recieved} to be less than ${expected}.`);
    }
    return true;
  },
  toBeLessThanOrEqualTo: (expected) => {
    if (received > expected) {
      throw new Error(
        `Expected ${recieved} to be less than or equal to${expected}.`
      );
    }
    return true;
  },
  toBeUndefined: () => {
    if (received !== undefined) {
      throw new Error(`Expected ${recieved} to be undefined.`);
    }
    return true;
  },
  toBeNull: () => {
    if (received !== null) {
      throw new Error(`Expected ${recieved} to be null.`);
    }
    return true;
  },
  toBeNaN: () => {
    if (received !== NaN) {
      throw new Error(`Expected ${recieved} to be NaN.`);
    }
    return true;
  },
  toBeTruthy: () => {
    if (!received) {
      throw new Error(`Expected ${recieved} to be truthy.`);
    }
    return true;
  },
  toBeFalsy: (expected) => {
    if (received <= expected) {
      throw new Error(`Expected ${recieved} to be greater than ${expected}.`);
    }
    return true;
  },
  toBeInstanceOf: (expected) => {
    if (!received instanceof expected) {
      throw new Error(`Expected ${recieved} to be instance of ${expected}.`);
    }
    return true;
  },
  toContain: (expected) => {
    if (!received.includes(expected)) {
      throw new Error(`Expected ${recieved} to contain of ${expected}.`);
    }
    return true;
  },
  toMatchRegex: (expected) => {
    if (!expected.test(received)) {
      throw new Error(`Expected ${recieved} to match ${expected}.`);
    }
    return true;
  },
  toEqual: (expected) => {
    if (!received == expected) {
      throw new Error(`Expected ${recieved} to equal ${expected}.`);
    }
    return true;
  },
  toStrictEqual: (expected) => {
    if (!received === expected) {
      throw new Error(`Expected ${recieved} to strict equal ${expected}.`);
    }
    return true;
  },
  toThrow: () => {
    try {
      received();
      throw new Error(`Expected ${recieved} to throw error.`);
    } catch {
      return true;
    }
  },
});

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");
  const testResult = {
    success: false,
    errorMessage: null,
  };
  try {
    const describeFns = [];
    let currentDescribeFn;
    const describe = (name, fn) => describeFns.push([name, fn]);
    const it = (name, fn) => currentDescribeFn.push([name, fn]);
    eval(code);
    console.log(describeFns);
    for (const [name, fn] of describeFns) {
      currentDescribeFn = [];
      testName = name;
      fn();

      currentDescribeFn.forEach(([name, fn]) => {
        testName += " " + name;
        fn();
      });
    }
    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = testName + ": " + error.message;
  }
  return testResult;
};
