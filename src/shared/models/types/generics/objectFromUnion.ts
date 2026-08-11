export type ObjectFromUnion<Union extends string> = {
  [x in Union]: x;
};
