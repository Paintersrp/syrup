export function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function deplural(str) {
  return str.slice(0, -1);
}
