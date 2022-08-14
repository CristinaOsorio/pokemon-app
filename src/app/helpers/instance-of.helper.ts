export function instanceOf<T>(data: any): data is T {
  return 'name' in data;
}