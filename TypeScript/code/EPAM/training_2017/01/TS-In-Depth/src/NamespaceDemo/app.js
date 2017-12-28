/// <reference path="utility-functions.ts" />
var util = Utility.Fees;
// const fee = Utility.Fees.CalculateLateFee(3);
var fee = util.CalculateLateFee(3);
console.log(fee);
