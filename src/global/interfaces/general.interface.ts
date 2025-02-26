export interface IserverPage<T = {}> {
  params: Promise<T>;
  searchParams: Record<string, string>;
}
