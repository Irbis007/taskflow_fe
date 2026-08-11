export function compareArrays(
  a: number[] | string[] | undefined | null,
  b: number[] | string[] | undefined | null,
): boolean {
  if ((a === undefined && b === undefined) || (a === null && b === null))
    return true;
  if (!!a && !!b) {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();

    return sortedA.every((el, i) => el === sortedB[i]);
  }
  return false;
}
