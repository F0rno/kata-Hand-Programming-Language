const { readMemoryAddresse } = require('../src/kata');

describe("Hand Programming Language", function () {
  describe('Read memory addresses', function() {
    it("should read 0 when we read the initial addresse", function () {
      var result = readMemoryAddresse();
      expect(result).toBe(0);
     });
  })
});
