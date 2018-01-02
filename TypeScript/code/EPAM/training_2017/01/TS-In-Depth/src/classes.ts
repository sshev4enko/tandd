import * as Interfaces from "./interfaces";
import { sealed, logger, writable } from "./decorators";

@sealed("UniversityLibrarian")
@logger
class UniversityLibrarian implements Interfaces.Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(name: string): void {
        console.log(`${this.name} is assist ${name}.`);
    }

    @writable(true)
    assistFaculty() {
        console.log("Assisting faculty");
    }

    @writable(false)
    teachCommunity() {
        console.log("Teaching community");
    }
}

abstract class ReferenceItem {
    // title: string;
    // year: number;

    private _publisher: string;

    static department: string = "Research Dep";

    // constructor(newTitle: string, newYear: number) {
    //     console.log(`Creating a new ReferenceItem...`);
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    constructor(public readonly title: string, protected year: number) {
        console.log(`Creating a new ReferenceItem...`);
    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    printItem(): void { // public by default
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    abstract printCitation(): void;
}

export { UniversityLibrarian, ReferenceItem };
