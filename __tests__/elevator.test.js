const assert = require('assert');
const { removeAdjacentDuplicates } = require('../src/elevator');

describe('removeAdjacentDuplicates', () => {
    it('should remove adjacent duplicates from an array', () => {
      const input = [1, 2, 2, 3, 3, 3, 4, 5, 5];
      const expectedOutput = [1, 2, 3, 4, 5];
      assert.deepEqual(removeAdjacentDuplicates(input), expectedOutput);
    });

    it('should not remove values from an array', () => {
      const input = [1, 2, 3, 4, 5];
      const expectedOutput = [1, 2, 3, 4, 5];
      assert.deepEqual(removeAdjacentDuplicates(input), expectedOutput);
    });
  });
  
  