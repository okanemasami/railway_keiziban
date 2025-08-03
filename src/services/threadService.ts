// 作成者定義の定数をインポート
import { CACHE } from '../constants';

/**
 * スレッド情報を表すインターフェース（作成者定義）
 * 
 * 【型定義の内容】
 * - id: string - スレッドの一意識別子
 * - title: string - スレッドのタイトル
 * - createdAt: string - スレッド作成日時（ISO文字列形式）
 */
export interface Thread {
  id: string;
  title: string;
  createdAt: string;
}

/**
 * 投稿情報を表すインターフェース（作成者定義）
 * 
 * 【型定義の内容】
 * - id: string - 投稿の一意識別子
 * - post: string - 投稿内容
 */
export interface Post {
  id: string;
  post: string;
}

/**
 * 投稿取得APIのレスポンス形式（作成者定義）
 * 
 * 【型定義の内容】
 * - threadId: string - 対象スレッドID
 * - posts: Post[] - 投稿データの配列（Post型は作成者定義）
 */
export interface PostsResponse {
  threadId: string;
  posts: Post[];
}

/**
 * APIエラーレスポンスの形式（作成者定義）
 * 
 * 【型定義の内容】
 * - ErrorCode: number - エラーコード
 * - ErrorMessageJP: string - 日本語エラーメッセージ
 * - ErrorMessageEN: string - 英語エラーメッセージ
 */
export interface ApiError {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
}

/**
 * API設定とエラーメッセージの定数
 */
const API_CONFIG = {
  BASE_URL: 'https://railway.bulletinboard.techtrain.dev/threads',
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const;

const ERROR_MESSAGES = {
  HTTP_ERROR: 'サーバーとの通信でエラーが発生しました',
  INVALID_RESPONSE: 'APIから予期しない形式のデータが返されました',
  FETCH_FAILED: 'スレッドデータの取得に失敗しました',
  POSTS_FETCH_FAILED: '投稿データの取得に失敗しました',
  THREAD_TITLE_FETCH_FAILED: 'スレッドタイトルの取得に失敗しました'
} as const;

/**
 * 共通のHTTPリクエスト処理
 */
const fetchWithErrorHandling = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: API_CONFIG.HEADERS
  });

  if (!response.ok) {
    throw new Error(`${ERROR_MESSAGES.HTTP_ERROR} (Status: ${response.status})`);
  }

  return response.json();
};

/**
 * スレッドデータを取得するAPI関数
 */
export async function getThreads(offsetValue: number): Promise<Thread[]> {
  const url = `${API_CONFIG.BASE_URL}?offset=${offsetValue}`;

  try {
    const threadsData = await fetchWithErrorHandling<Thread[]>(url);
    
    if (!Array.isArray(threadsData)) {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
    }
    
    return threadsData;

  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_FAILED, error);
    throw error;
  }
}

/**
 * 投稿一覧を取得するAPI関数（作成者定義）
 * 
 * 【引数】
 * @param threadId: string - 対象スレッドの一意識別子
 * @param offset: number - 取得開始位置（ページネーション用）
 * 
 * 【戻り値】
 * Promise<PostsResponse> - 投稿データとスレッドIDを含むレスポンス
 * 
 * 【使用するWeb API標準機能】
 * - fetch: HTTPリクエストの実行
 * - Response.ok: レスポンス成功判定
 * - Response.json(): JSONレスポンスの解析
 * - Response.status: HTTPステータスコード取得
 * 
 * 【使用するJavaScript標準機能】
 * - try-catch: エラーハンドリング
 * - switch: 条件分岐（ステータスコード別処理）
 * - console.error(): エラーログ出力
 * - テンプレートリテラル: URL文字列構築
 * - throw: エラーの投げ上げ
 * - 論理OR演算子（||）: デフォルト値設定
 * 
 * 【使用する作成者定義定数】
 * - API_CONFIG.BASE_URL: APIベースURL
 * - API_CONFIG.HEADERS: HTTPリクエストヘッダー
 * - ERROR_MESSAGES.POSTS_FETCH_FAILED: エラーメッセージ
 * 
 * 【使用する作成者定義型】
 * - ApiError: APIエラーレスポンスの型定義
 */
export async function getThreadPosts(threadId: string, offset: number): Promise<PostsResponse> {
  const url = `${API_CONFIG.BASE_URL}/${threadId}/posts?offset=${offset}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: API_CONFIG.HEADERS
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      
      switch (response.status) {
        case 404:
          throw new Error(errorData.ErrorMessageJP || 'そのスレッドは存在しません。');
        case 400:
          throw new Error(errorData.ErrorMessageJP || 'バリデーションエラー');
        case 500:
          throw new Error(errorData.ErrorMessageJP || 'サーバでエラーが発生しました。');
        default:
          throw new Error(`エラー: ${response.status}`);
      }
    }

    return response.json();

  } catch (error) {
    console.error(ERROR_MESSAGES.POSTS_FETCH_FAILED, error);
    throw error;
  }
}

/**
 * キャッシュ管理ユーティリティ
 */
const cacheUtils = {
  /**
   * キャッシュキーを生成
   */
  generateKey: (threadId: string): string => `${CACHE.THREAD_TITLE_PREFIX}${threadId}`,
  
  /**
   * キャッシュからデータを取得
   */
  get: (key: string): string | null => localStorage.getItem(key),
  
  /**
   * キャッシュにデータを保存（有効期限付き）
   */
  set: (key: string, value: string): void => {
    localStorage.setItem(key, value);
    setTimeout(() => localStorage.removeItem(key), CACHE.EXPIRE_TIME);
  }
};

/**
 * スレッドタイトルを取得する関数（キャッシュ機能付き）
 */
export async function getThreadTitle(threadId: string): Promise<string> {
  const cacheKey = cacheUtils.generateKey(threadId);
  const cached = cacheUtils.get(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const threads = await fetchWithErrorHandling<Thread[]>(`${API_CONFIG.BASE_URL}?offset=0`);
    const thread = threads.find(t => t.id === threadId);
    const title = thread?.title || 'スレッド';
    
    if (thread) {
      cacheUtils.set(cacheKey, title);
    }
    
    return title;

  } catch (error) {
    console.error(ERROR_MESSAGES.THREAD_TITLE_FETCH_FAILED, error);
    throw error;
  }
}