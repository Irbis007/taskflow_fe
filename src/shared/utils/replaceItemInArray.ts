export function replaceItemInArray<T>(array: T[], item: T, idx: number): T[] {
  return [...array.slice(0, idx), item, ...array.slice(idx + 1, array.length)];
}
