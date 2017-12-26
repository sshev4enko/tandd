// ******************************
// *     INFO SS
// *    
// *    npm install -g tslint
// * npm install -g tslint
// * npm install -g tslint
// ******************************








showHello("greeting", "TypeScript");

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}


// TASK - 01
enum Category { JavaScript, CSS, HTML, TypeScript }



function getAllBooks() {
    let books: Array<any> = [
        { title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
        { title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
        { title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
        { title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
        ];

    return books;
}

function logFirstAvailable(books: Array<any>): void {
    const numberOfBooks: number = books.length;
    let firstAvailable: string = "";

    for (let currentBook of books) { 
        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`firstAvailable: ${firstAvailable}`);
}


function getBookTitleByCategory(categoryFilter: Category): Array<string> {
    console.log(`Getting books in category: ${Category[categoryFilter]}`);

    // TODO SS
    const allBooks = getAllBooks();

    return [""];
}

function logBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}


// TERMINAL:
//     npm i lodash
//     npm i @types/lodash

// import * as _ from "lodash";
// _.each()



// ******************************** CONSOLE **************************************
//---------------------------------------------------------------------------------
// // TASK - 01
// console.log(getAllBooks());

// const allBooks = getAllBooks();
// logFirstAvailable(allBooks);

// TASK - 02
const javaScriptBooks: Array<string> = getBookTitleByCategory(Category.JavaScript);
logBookTitles(javaScriptBooks);
