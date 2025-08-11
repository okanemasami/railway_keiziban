import { fetchWithErrorHandling } from '../../../shared/lib/http'; // ユーザー定義: 共通HTTPユーティリティ
import { localCache } from '../../../shared/lib/cache'; // ユーザー定義: シンプルなローカルキャッシュ
import { CACHE } from '../../../constants'; // ユーザー定義: キャッシュ設定（キー接頭辞/TTL）
import type { Thread, PostsResponse, ApiError } from '../types'; // ユーザー定義: 型定義（Thread, PostsResponse, ApiError）

const API_CONFIG = { // 定数: APIエンドポイント設定
  BASE_URL: 'https://railway.bulletinboard.techtrain.dev/threads', // ベースURL
} as const; // 読み取り専用化

export async function getThreads(offsetValue: number): Promise<Thread[]> { // スレッド一覧取得（offset指定）
  const url = `${API_CONFIG.BASE_URL}?offset=${offsetValue}`; // クエリを付与してURL生成
  const threadsData = await fetchWithErrorHandling<Thread[]>(url); // 共通HTTPでGET実行
  if (!Array.isArray(threadsData)) { // 応答の妥当性チェック
    throw new Error('APIから予期しない形式のデータが返されました'); // ユーザー向けエラー
  }
  return threadsData; // スレッド配列を返却
}

export async function getThreadPosts(threadId: string, offset: number): Promise<PostsResponse> { // 投稿一覧取得
  const url = `${API_CONFIG.BASE_URL}/${threadId}/posts?offset=${offset}`; // パス+クエリを生成
  const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }); // fetch標準APIでGET
  if (!response.ok) { // HTTPエラー時の処理
    const errorData: ApiError = await response.json(); // APIエラーの詳細を取得
    switch (response.status) { // ステータスで分岐
      case 404:
        throw new Error(errorData.ErrorMessageJP || 'そのスレッドは存在しません。'); // 404用メッセージ
      case 400:
        throw new Error(errorData.ErrorMessageJP || 'バリデーションエラー'); // 400用メッセージ
      case 500:
        throw new Error(errorData.ErrorMessageJP || 'サーバでエラーが発生しました。'); // 500用メッセージ
      default:
        throw new Error(`エラー: ${response.status}`); // 汎用メッセージ
    }
  }
  return response.json(); // 正常時: JSONを返却（PostsResponse）
}

export async function getThreadTitle(threadId: string): Promise<string> { // スレッドタイトル取得（キャッシュ付き）
  const cacheKey = `${CACHE.THREAD_TITLE_PREFIX}${threadId}`; // キー生成
  const cached = localCache.get(cacheKey); // キャッシュ取得
  if (cached) return cached; // 命中時は即返却

  const threads = await fetchWithErrorHandling<Thread[]>(`${API_CONFIG.BASE_URL}?offset=0`); // 一覧取得（先頭ページ）
  const thread = threads.find((t) => t.id === threadId); // 対象IDを検索
  const title = thread?.title || 'スレッド'; // 見つからなければ既定値
  if (thread) {
    localCache.set(cacheKey, title, CACHE.EXPIRE_TIME); // ヒット時のみキャッシュ保存（TTL付き）
  }
  return title; // タイトルを返却
}

export async function createThread(title: string): Promise<Thread> { // スレッド作成
  const url = API_CONFIG.BASE_URL; // POST先URL
  const newThread = await fetchWithErrorHandling<Thread>(url, { // 共通HTTPでPOST実行
    method: 'POST', // メソッド指定
    body: { title }, // ボディ（タイトルのみ）
  });
  return newThread; // 生成されたスレッドを返却
}

/*
export async function createPost(post: string): Promise<Post> { // スレッド作成
  const url = API_CONFIG.BASE_URL; // POST先URL
  const newPost = await fetchWithErrorHandling<Post>(url, { // 共通HTTPでPOST実行
    method: 'POST', // メソッド指定
    body: { post }, // ボディ（タイトルのみ）
  });
  return newPost; // 生成されたスレッドを返却
} */