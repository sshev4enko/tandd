// TypeScript - lesson1
//**************************************
//
// tsc -init                           | Create tsconfig.json file.
// tsc -w   (tsc --watch)              | Start compilation in watch mode.
//



interface Person {
    name: string;
    age: number;
};

interface Street {
    name: string;
    houseNumber: number;
    isRenamed: boolean;
}

abstract class Operator {
    abstract sayHello(): void;
};

// Classes - members are public by default !!
class Greater extends Operator {
    constructor(i: number = 0) {
        super(); // Explicit call to the super class constructor is mandatory !!
    }

    private emptyMethodArrow: () => void;

    private location: string = "default value";

    public sayHello(): number { // ?? Override return type from interface.
        console.log(`Hello ${this.location} you !`);
        return 1001;
    }

    // Optional properties.
    optionalProp?: number; // Public by default !!

    person: Person = { age: 3.4, name: "nn" };

    static origin: Greater = new Greater(99);
};

// Advanced Types: Union & Intersection  //////////////////////////////////////////////////////////
function testUnion(arr: (Person & Street)[]) {
    let res = `Result: ${arr[0].name} , ${arr[0].age} , ${arr[0].houseNumber}`
}

function testIntersection(obj: Person | Street) {
    let res = `Result: ${obj.name} , NO .houseNumber prop` // ${obj.houseNumber}`
}
///////////////////////////////////////////////////////////////////////////////////////////////////


// Modules, "." can be used as separator for sub modules  /////////////////////////////////////////
module Geometry {
    export class Square {
      constructor(public sideLength: number = 0) {
      }
      area() {
        return Math.pow(this.sideLength, 2);
      }
    }
}

let geometry = new Geometry.Square(5);
///////////////////////////////////////////////////////////////////////////////////////////////////


function countLines(text?: (string | null)[]): number {
    let count = 0;

    if (text) {
        for (const line of text) {
            if (line && line.length !== 0) {
                ++count;
            }
        }
    }
    return count;
}
let c1 = countLines([ "one", "two", "three" ])
let c2 = countLines([ "one", null, "three" ])
let c3 = countLines()


function sortByName(p: (Person | Street)[]) {
    var result = p.slice(0);
    result.sort((x, y) => {
        return x.name.localeCompare(y.name);
    });
    return result;
}
sortByName([{name: "Sergii", age: 12}]);




function tryTypeScript(): void {
    // Any
    let notSure: any = 4.545;
    notSure = "may be a string as well";

    // Arrays
    let list: number[] = [ 1, 2, 3 ];

    // Enumerations
    enum Color { Red, Green, Blue, Unknown = 555 };
    let color: Color = Color.Unknown;

    // Lambda ("arrow-function")
    let funct1 = (i: number): number => { return i * i; };
    let funct2 = (i: number) => i * i;
    let funct3 = () => undefined; // void ??
    let funct4 = (): void => {}; // void ??

    // Only the parameters' types are important, names are not important.
    let mySearch: SearchFunc;
    mySearch = (src: string, sub: string) => { return src.search(sub) != -1; };
}
tryTypeScript();

// Interfaces can also describe a function type.
interface SearchFunc {
    (source: string, subString: string): boolean;
}

//#region Generics
interface Pair<T> {
    item1: T;
    item2: T;
}
let pair1: Pair<boolean> = { item1: true, item2: false };
let pair2: Pair<number>  = { item1: 1, item2: 2 };
//#endregion
