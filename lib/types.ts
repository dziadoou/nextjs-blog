import { ParsedUrlQuery } from "querystring";

export interface Post {
  id: number;
  userId: number;
  body: string;
  title: string;
}

export interface PostWithDate {
  id: string;
  userId: number;
  body: string;
  title: string;
  date: string;
}

export interface PostId {
  params: ParsedUrlQuery;
}