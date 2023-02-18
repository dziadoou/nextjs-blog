import { getRandomDate } from "./getRandomDate";
import { Post, PostWithDate, PostId } from './types'

export const getPosts = async (): Promise<PostWithDate[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await response.json();
  const postsWithDates: PostWithDate[] = posts.map(post => ({...post, id: post.id.toString(), date: getRandomDate()}))
  postsWithDates.sort((a, b) => parseInt(b.date) - parseInt(a.date));
  return postsWithDates;
}

export const getPostIds = async (): Promise<PostId[]> => {
  const posts = await getPosts();

  return posts.map(({id}) => ({
      params: {
        id,
      },
  }));
}

export const getPostData = async (id: string): Promise<PostWithDate> => {
  const posts = await getPosts();
  const selectedPost = posts.find((post) => post.id === id)

  return {
    ...selectedPost,
  };
}
