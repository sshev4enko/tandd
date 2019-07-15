import { Category } from "./../enums";
import { Book } from "./../interfaces";

interface LibMgrCallback {
    (err: Error, titles: string[]): void;
}

export function getBooksByCategory() {

}

export function logCategorySearch() {

}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundBooks: string[] = getBookTitleByCategory(category);

            if (foundBooks.length > 0) {
                // resolve.
            } else {

            }
        }, 2000);
    });

    return p;
}

export async function logSearchResults(category: Category) {
    let foundBooks = await getBooksByCategoryPromise(category);
    console.log(foundBooks);

    return await foundBooks;
}

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.splice(2, inventory.length);
}

export function getAllBooks(): Book[] {
    const books = [
            { id: 1, title: "Refactoring JavaScript", author: "Evan Burchard", available: true, category: Category.JavaScript},
            { id: 2, title: "JavaScript Testing", author: "Liang Yuxian Eugene", available: false, category: Category.JavaScript },
            { id: 3, title: "CSS Secrets", author: "Lea Verou", available: true, category: Category.CSS },
            { id: 4, title: "Mastering JavaScript Object-Oriented Programming", author: "Andrea Chiarelli", available: true, category: Category.JavaScript }
        ];

    return books;
}

export function logFirstAvailable(books: Array<any> = getAllBooks()): void {
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

export function getBookTitleByCategory(categoryFilter: Category = Category.JavaScript): Array<string> {
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

export function logBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}

export function getBookById(id: number): Book | undefined {
    const allBooks = getAllBooks();

    return allBooks.find(book => book.id === id);
}

export function createCustomerId(name: string, id: number): string {
    return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Creating customer ${name}`);

    if (age) {
        console.log(`Age: ${age}`);
    }

    if (city) {
        console.log(`City: ${city}`);
    }
}

export function checkoutBooks(customer: string, ...bookIds: number[]): string[] {
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

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(property: any): string[] {
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

export function printBook(book: Book): void {
    console.log(`"${book.title}" by ${book.author}`);
}
