/// <reference path="utility-functions.ts" />

// TASK - 14

import util = Utility.Fees;

// const fee = Utility.Fees.CalculateLateFee(3);
const fee = util.CalculateLateFee(3);
console.log(`FEE = ${fee}`);


// COMPILATION:
// tsc --outFile bundle.js app.ts --target ES5