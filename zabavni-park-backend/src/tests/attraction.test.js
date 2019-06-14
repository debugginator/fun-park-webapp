var expect = require('chai').expect;

describe('attraction tests', function() {

  // before(async function () {
  //   createDatabase();
  // });

  describe('getAttraction(id)', function () {
    it('should display attraction with id, from the database', function () {
      fetch("localhost:3001/atrakcija").then(console.log);

      // // 1. ARRANGE
      // var x = 5;
      // var y = 1;
      // var sum1 = x + x;

      // 2. ACT
      // var sum2 = addTwoNumbers(x, y);

      // 3. ASSERT
      // expect(sum2).to.be.equal(sum1);

    });
  });
});