export default function sum(a, b) {
  if (typeof a !== "number" || typeof b !== "number")
    throw TypeError("not validate args");
  /* ваш код */
  return a + b;
}
