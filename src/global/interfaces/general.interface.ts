import { Category, Notes } from "@prisma/client";

export interface IserverPage<T = object> {
  params: Promise<T>;
  searchParams: Promise<Record<string, string>>;
}

export type FullNote = Notes & {
  category?: Category;
};

export type TsystemColors =
  | "primary"
  | "secondary"
  | "secondary-fade"
  | "third"
  | "third-fade"
  | "accent"
  | "danger"
  | "text-primary";
