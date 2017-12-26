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


// TASKS
enum Category { JavaScript, CSS, HTML, TypeScript, Angular2 }

interface DamageLogger {
    (reason: string): void;
}

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

function getAllBooks(): Book[] {
    const books = [
            { id: 1, title: "Refactoring JavaScript", author: "Evan Burchard", available: true, category: Category.JavaScript},
            { id: 2, title: "JavaScript Testing", author: "Liang Yuxian Eugene", available: false, category: Category.JavaScript },
            { id: 3, title: "CSS Secrets", author: "Lea Verou", available: true, category: Category.CSS },
            { id: 4, title: "Mastering JavaScript Object-Oriented Programming", author: "Andrea Chiarelli", available: true, category: Category.JavaScript }
        ];

    return books;
}

function logFirstAvailable(books: Array<any> = getAllBooks()): void {
    const numberOfBooks: number = books.length;
    let firstAvailable: string = "";

    for (let currentBook of books) {
        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`First Available: ${firstAvailable}`);
}

function getBookTitleByCategory(categoryFilter: Category = Category.JavaScript): Array<string> {
    console.log(`Getting books in category: ${Category[categoryFilter]}`);

    const allBooks: Array<any> = getAllBooks();
    const filteredTitles: string[] = [];

    for (let currentBook of allBooks) {
        if (currentBook.category === categoryFilter) {
            filteredTitles.push(currentBook.title);
        }
    }

    return filteredTitles;
}

function logBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}

function getBookById(id: number): Book | undefined {
    const allBooks = getAllBooks();

    return allBooks.find(book => book.id === id);
}

function createCustomerId(name: string, id: number): string {
    return `${name}${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Creating customer ${name}`);

    if (age) {
        console.log(`Age: ${age}`);
    }

    if (city) {
        console.log(`City: ${city}`);
    }
}

function checkoutBooks(customer: string, ...bookIds: number[]): string[] {
    console.log(`Checking out books for ${customer}`);

    const bookTitles: string[] = [];
    for (let id of bookIds) {
        let book = getBookById(id);
        if (book && book.available) {
            bookTitles.push(book.title);
        }
    }

    return bookTitles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(property: any): string[] {
    const allBooks = getAllBooks();
    const bookTitles: string[] = [];

    if (typeof(property) === "string") {
        for (let book of allBooks) {
            if (book.author === property) {
                bookTitles.push(book.title);
            }
        }
    }

    if (typeof(property) === "boolean") {
        for (let book of allBooks) {
            if (book.available === property) {
                bookTitles.push(book.title);
            }
        }
    }

    return bookTitles;
}

function printBook(book: Book): void {
    console.log(`"${book.title}" by ${book.author}`);
}

class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(name: string): void {
        console.log(`${this.name} is assist ${name}.`);
    }
}




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
// const logDamage: DamageLogger = (reason: string) => console.log(reason);
// logDamage("coffee stains");

// TASK - 09
const favoriteAuthor: Author = {
    email: "Ann@gmail.com",
    name: "Ann",
    numBooksPublished: 3
};
// const favoriteLibrarian: Librarian = {
//     email: "Boris@gmail.com",
//     name: "Boris",
//     department: "Classical",
//     assistCustomer: (name: string) => console.log(`Assist ${name}`)
// };

// TASK - 10
const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = "Ann";
favoriteLibrarian.assistCustomer("Boris");


