import { PostWithDate } from "./types";

export const paginate = (items: PostWithDate[], pageNumber: number, pageSize: number): PostWithDate[] => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
 };
