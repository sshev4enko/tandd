"use strict";
// TypeScript - lesson1
//**************************************
//
// tsc -init                           | Create tsconfig.json file.
// tsc -w   (tsc --watch)              | Start compilation in watch mode.
//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
;
var Operator = /** @class */ (function () {
    function Operator() {
    }
    return Operator;
}());
;
// Classes - members are public by default !!
var Greater = /** @class */ (function (_super) {
    __extends(Greater, _super);
    function Greater(i) {
        if (i === void 0) { i = 0; }
        var _this = _super.call(this) || this;
        _this.location = "default value";
        _this.person = { age: 3.4, name: "nn" };
        return _this;
    }
    Greater.prototype.sayHello = function () {
        console.log("Hello " + this.location + " you !");
        return 1001;
    };
    Greater.origin = new Greater(99);
    return Greater;
}(Operator));
;
// Advanced Types: Union & Intersection  //////////////////////////////////////////////////////////
function testUnion(arr) {
    var res = "Result: " + arr[0].name + " , " + arr[0].age + " , " + arr[0].houseNumber;
}
function testIntersection(obj) {
    var res = "Result: " + obj.name + " , NO .houseNumber prop"; // ${obj.houseNumber}`
}
///////////////////////////////////////////////////////////////////////////////////////////////////
// Modules, "." can be used as separator for sub modules  /////////////////////////////////////////
var Geometry;
(function (Geometry) {
    var Square = /** @class */ (function () {
        function Square(sideLength) {
            if (sideLength === void 0) { sideLength = 0; }
            this.sideLength = sideLength;
        }
        Square.prototype.area = function () {
            return Math.pow(this.sideLength, 2);
        };
        return Square;
    }());
    Geometry.Square = Square;
})(Geometry || (Geometry = {}));
var geometry = new Geometry.Square(5);
///////////////////////////////////////////////////////////////////////////////////////////////////
function countLines(text) {
    var count = 0;
    if (text) {
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var line = text_1[_i];
            if (line && line.length !== 0) {
                ++count;
            }
        }
    }
    return count;
}
var c1 = countLines(["one", "two", "three"]);
var c2 = countLines(["one", null, "three"]);
var c3 = countLines();
function sortByName(p) {
    var result = p.slice(0);
    result.sort(function (x, y) {
        return x.name.localeCompare(y.name);
    });
    return result;
}
sortByName([{ name: "Sergii", age: 12 }]);
function tryTypeScript() {
    // Any
    var notSure = 4.545;
    notSure = "may be a string as well";
    // Arrays
    var list = [1, 2, 3];
    // Enumerations
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
        Color[Color["Unknown"] = 555] = "Unknown";
    })(Color || (Color = {}));
    ;
    var color = Color.Unknown;
    // Lambda ("arrow-function")
    var funct1 = function (i) { return i * i; };
    var funct2 = function (i) { return i * i; };
    var funct3 = function () { return undefined; }; // void ??
    var funct4 = function () { }; // void ??
    // Only the parameters' types are important, names are not important.
    var mySearch;
    mySearch = function (src, sub) { return src.search(sub) != -1; };
}
tryTypeScript();
var pair1 = { item1: true, item2: false };
var pair2 = { item1: 1, item2: 2 };
//#endregion
//# sourceMappingURL=main.js.map