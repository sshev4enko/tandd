import { ReferenceItem } from "./classes";

export default class Encyclopedia extends ReferenceItem {
    constructor(newTitle: string, newYear: number, public edition: number) {
        super(newTitle, newYear);
    }

    printItem() {
        super.printItem();
        console.log(`Edition: edition (${this.year}).`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}
