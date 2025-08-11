export const CACHE = { // キャッシュ設定（ユーザー定義）
  THREAD_TITLE_PREFIX: 'thread_title_', // スレッドタイトル格納時のキー接頭辞
  EXPIRE_TIME: 3600000, // 有効期限（ms）。3600000ms = 1時間
} as const; // 読み取り専用

