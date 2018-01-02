export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.splice(2, inventory.length);
}
