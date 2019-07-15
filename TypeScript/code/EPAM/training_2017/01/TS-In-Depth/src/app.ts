// TERMINAL:
//     npm i lodash
//     npm i @types/lodash

// import * as _ from "lodash";
// _.each()

showHello("greeting", "TypeScript");

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}
// -----------------------------------------------------------------------------------------------

// TASKS

// TASK - 15
import { Category } from "./enums";
import { Book, Logger, Author, Librarian, Magazine } from "./interfaces";
import { UniversityLibrarian, ReferenceItem } from "./classes";
import RefBook from "./encyclopedia";
import { purge, getBooksByCategoryPromise, logSearchResults } from "./lib/utility-functions";
import Shelf from "./shelf";




// ******************************** CONSOLE **************************************
// -------------------------------------------------------------------------------
// TASK - 01
// console.log(getAllBooks());

// const allBooks = getAllBooks();
// logFirstAvailable(allBooks);

// TASK - 02
// const javaScriptBooks: Array<string> = getBookTitleByCategory(Category.JavaScript);
// logBookTitles(javaScriptBooks);

// TASK - 03
// javaScriptBooks.forEach((val, idx, arr) => console.log(`${++idx} - ${val}`));
// console.log(getBookById(3));

// TASK - 04
// let myId = createCustomerId("Ann", 10);
// console.log(myId);
// let idGenerator: (a: string, b: number) => string;
// idGenerator = (name: string, id: number) => `${name}${id}`;
// idGenerator = createCustomerId;
// myId = idGenerator("Lisa", 33);
// console.log(myId);

// TASK - 05
// createCustomer("John");
// createCustomer("Boris", 55);
// createCustomer("Clarasana", 16, "New York");
// const res = getBookTitleByCategory();
// console.log(res);
// logFirstAvailable();

// const myBooks = checkoutBooks("Ann", 1, 2, 4);
// myBooks.forEach(title => console.log(title));

// TASK - 06
// const checkedOutBooks = getTitles(false);
// console.log(checkedOutBooks);

// TASK - 07
// const myBook: Book = {
//     id: 5,
//     title: "Colors, Backgrounds, and Gradients",
//     author: "Eric A. Meyer",
//     available: true,
//     category: Category.CSS,
//     // year: 2015,
//     // copies: 3
//     pages: 200,
//     markDamaged: (reason: string) => console.log(`Damaged!! - ${reason}`)
// };
// printBook(myBook);
// myBook.markDamaged("missing book cover");

// TASK - 08
// const logDamage: Logger = (reason: string) => console.log(reason);
// logDamage("coffee stains");

// TASK - 09
// const favoriteAuthor: Author = {
//     email: "Ann@gmail.com",
//     name: "Ann",
//     numBooksPublished: 3
// };
// const favoriteLibrarian: Librarian = {
//     email: "Boris@gmail.com",
//     name: "Boris",
//     department: "Classical",
//     assistCustomer: (name: string) => console.log(`Assist ${name}`)
// };

// TASK - 10
// const favoriteLibrarian = new UniversityLibrarian();
// favoriteLibrarian.name = "Ann";
// favoriteLibrarian.assistCustomer("Boris");

// TASK - 11
// const ref: ReferenceItem = new ReferenceItem("CHIP", 1985);
// ref.printItem();
// ref.publisher = "Random Publisher";
// console.log(ref.publisher);

// TASK - 12
// const refBook = new Encyclopedia("WorldPedia", 1200, 4);
// const refBook: Encyclopedia = new Encyclopedia("WorldPedia", 1200, 4);
// const refBook: ReferenceItem = new Encyclopedia("WorldPedia", 1200, 4);
// refBook.printItem();

// TASK - 13
// const refBook = new Encyclopedia("TitleHere", 1999, 8);
// refBook.printCitation();

// TASK - 16
// const refBook = new RefBook("TitleHere", 1999, 8);
// refBook.printCitation();

// TASK - 17
// const inventory: Array<Book> = [
//     { id: 10, title: "The C Programming Language", author: "K & R", available: true, category: Category.Software },
//     { id: 11, title: "Code Complete", author: "Steve McConnell", available: true, category: Category.Software },
//     { id: 12, title: "8-Bit Graphics with Cobol", author: "A. B.", available: true, category: Category.Software },
//     { id: 13, title: "Cool autoexec.bat Scripts!", author: "C. D.", available: true, category: Category.Software }

// ];
// const purgedBooks: Array<Book> = purge<Book>(inventory);
// console.log(purgedBooks);
// console.log(purge<number>([1, 2, 3, 4]));

// TASK - 18
// const bookShelf: Shelf<Book> = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));
// const firstBook: Book = bookShelf.getFirst();
// console.log(firstBook);

// const magazines: Array<Magazine> = [
//     { title: "Programming Language Monthly", publisher: "Code Mags" },
//     { title: "Literary Fiction Quarterly", publisher: "College Press" },
//     { title: "Five Points", publisher: "GSU" }
// ];
// const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
// magazines.forEach(mag => magazineShelf.add(mag));
// const firstMagazine: Magazine = magazineShelf.getFirst();
// console.log(firstMagazine);

// TASK - 19
// magazineShelf.printTitles();
// const mag = magazineShelf.find("Five Points");
// console.log(mag);

// TASK - 21
// favoriteLibrarian.assistFaculty = () => console.log("assistFaculty");
// favoriteLibrarian.teachCommunity = () => console.log("teachCommunity");

// TASK - 22
// console.log("begin");
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// console.log("end");

// TASK - 23
// console.log("begin");
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => {
//         console.log("Found titles");
//         console.log(titles);
//         return titles.length;
//     })
//     .then(numOfBooks => console.log(numOfBooks))
//     .catch(reason => console.log(reason));
// console.log("end");

// TASK - 24
console.log("Beginning search...");
// logSearchResults(Category.JavaScript)
//     .catch(reason => console.log(reason));
console.log("Search submitted...");





// ************************************************************************************************
// TESTS TESTS TESTS
const arr = { key: [10, 11, 12], key2: [40, 41, 42]};
// arr.foo = "hello";

for (let i in arr) {
   console.log(i); // выведет "0", "1", "2", "foo"
   let x = arr[i];
   console.log(x);
}

const isOnNow = () => ({} > new Date()) && ({} < new Date());
interface ITes {
    listId: string;
}
let item: ITes;
let listId: any;
const bbb = (item.listId == listId);
function getITes(): ITes {
    return { listId: "sssssss" };
}

// for (let i of arr) {
//    console.log(i); // выведет "3", "5", "7"
// }

// let bVal: boolean = false;
let bVal = getITes();
bVal = "sss";
