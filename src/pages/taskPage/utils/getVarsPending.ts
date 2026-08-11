export function getVarPending(
  isPending: boolean,
  varField: unknown,
  dataField: unknown,
) {
  return isPending && varField !== undefined && varField !== dataField;
}
