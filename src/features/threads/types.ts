/**
 * スレッド/投稿機能で使用する型定義
 */

export interface Thread {
  id: string;
  title: string;
  createdAt: string;
}

export interface Post {
  id: string;
  post: string;
}

export interface PostsResponse {
  threadId: string;
  posts: Post[];
}

export interface ApiError {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
}

