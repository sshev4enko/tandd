var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function CalculateLateFee(daysLate) {
            return daysLate * .25;
        }
        Fees.CalculateLateFee = CalculateLateFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function MaxBooksAllowed(age) {
        return age < 12 ? 3 : 10;
    }
    Utility.MaxBooksAllowed = MaxBooksAllowed;
    function privateFunc() {
        console.log("privateFunc");
    }
})(Utility || (Utility = {}));
/// <reference path="utility-functions.ts" />
var util = Utility.Fees;
// const fee = Utility.Fees.CalculateLateFee(3);
var fee = util.CalculateLateFee(3);
console.log("FEE = " + fee);
// COMPILATION:
// tsc --outFile bundle.js app.ts --target ES5 
