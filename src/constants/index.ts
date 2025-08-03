/**
 * プロジェクト全体で使用する定数定義ファイル（作成者定義）
 * 
 * 【エクスポートする定数】
 * - PAGINATION: {TOTAL_PAGES: number, ITEMS_PER_PAGE: number, INITIAL_PAGE: number} - ページネーション設定
 * - ROUTES: {HOME: string, THREAD_POSTS: (threadId: string) => string} - ルートパス定数
 * - CACHE: {THREAD_TITLE_PREFIX: string, EXPIRE_TIME: number} - キャッシュ設定
 * 
 * 【使用するTypeScript標準機能】
 * - export const: 定数のエクスポート
 * - as const: 読み取り専用型の指定
 */

/**
 * ページネーション関連の設定値（作成者定義）
 * 
 * 【定数の内容】
 * - TOTAL_PAGES: number - 総ページ数（最大5ページまで表示）
 * - ITEMS_PER_PAGE: number - 1ページあたりの表示件数（10件ずつ表示）
 * - INITIAL_PAGE: number - 初期表示ページ（アプリ起動時は1ページ目を表示）
 */
export const PAGINATION = {
  TOTAL_PAGES: 5,
  ITEMS_PER_PAGE: 10,
  INITIAL_PAGE: 1
} as const; // TypeScript標準: 読み取り専用オブジェクト

/**
 * ルートパス定数（URL設定）
 * 
 * 【解説】
 * ルートパス = ウェブサイトのURL構造を定義
 * 例：「/threads/123/posts」= スレッドID 123の投稿一覧ページ
 */
export const ROUTES = {
  // ホーム画面（スレッド一覧）のURL：「/」
  // 【URL例】https://example.com/ 
  HOME: '/',
  
  // 投稿詳細画面のURL生成関数
  // 【使用例】ROUTES.THREAD_POSTS('abc123') → '/threads/abc123/posts'
  // 【引数】threadId = 表示したいスレッドの一意識別子（ID）
  THREAD_POSTS: (threadId: string) => `/threads/${threadId}/posts`
} as const;

/**
 * キャッシュ関連の設定値
 * 
 * 【解説】
 * キャッシュ = 一度取得したデータを一時保存して、再利用する仕組み
 * 【メリット】同じデータを何度もサーバーから取得する必要がなくなり、高速化される
 */
export const CACHE = {
  // スレッドタイトルをキャッシュする際のキー名の接頭辞
  // 【実際のキー例】'thread_title_abc123'（スレッドID abc123のタイトル）
  THREAD_TITLE_PREFIX: 'thread_title_',
  
  // キャッシュの有効期限：3600000ミリ秒 = 1時間
  // 【理由】1時間経過後は古いデータの可能性があるため、再取得する
  EXPIRE_TIME: 3600000 // 1時間 = 60分 × 60秒 × 1000ミリ秒
} as const;

/**
 * UI（ユーザーインターフェース）関連の定数
 * 
 * 【解説】
 * UI = ユーザーが操作する画面の見た目や動作に関する設定
 */
export const UI = {
  // 日付表示の言語設定：日本語ロケール
  // 【効果】「2024/1/15 14:30:00」のような日本式の日付表示になる
  DATE_LOCALE: 'ja-JP',
  
  // マウスホバー時（カーソルを乗せた時）の色設定
  HOVER_COLORS: {
    // 背景色：薄いグレー（#f8f9fa = RGB(248, 249, 250)）
    BACKGROUND: '#f8f9fa',
    // 枠線色：青色（#007bff = RGB(0, 123, 255)）
    BORDER: '#007bff'
  },
  
  // 通常時（何も操作していない時）の色設定
  DEFAULT_COLORS: {
    // 背景色：白色
    BACKGROUND: 'white',
    // 枠線色：薄いグレー（#ddd = RGB(221, 221, 221)）
    BORDER: '#ddd'
  }
} as const; 