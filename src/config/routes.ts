export const ROUTES = { // ルーティング定数（ユーザー定義）
  HOME: '/', // ホーム（スレッド一覧）のパス
  THREAD_POSTS: (threadId: string) => `/threads/${threadId}/posts`, // 投稿一覧の動的パス生成関数
  CREATE_THREAD: '/threads/new', // スレッド作成画面
} as const; // 読み取り専用

