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
