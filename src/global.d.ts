export {}; // Fixes compile error

declare global {
  interface Dictionary<T> {
    [key: string]: T;
  }
}
