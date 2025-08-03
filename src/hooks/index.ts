/**
 * カスタムフックのエクスポート用ファイル（作成者定義）
 * 
 * 【エクスポートするフック】
 * - useAsyncState: <T>(initialData?: T | null) => AsyncState<T> & AsyncActions<T> - 非同期状態管理フック
 * - useThreads: () => ThreadsHookReturn - スレッド一覧管理フック
 * - usePosts: (threadId: string | undefined) => PostsHookReturn - 投稿詳細管理フック
 * 
 * 【使用するTypeScript標準機能】
 * - export: モジュールのエクスポート
 * - 名前付きエクスポート: 複数のフックを個別にエクスポート
 * 
 * 【使用する作成者定義フック】
 * - useAsyncState: 非同期状態管理フック
 * - useThreads: スレッド一覧管理フック
 * - usePosts: 投稿詳細管理フック
 */

// 作成者定義フック useAsyncState をエクスポート（非同期状態管理）
export { useAsyncState } from './useAsyncState';

// 作成者定義フック useThreads をエクスポート（スレッド一覧管理）
export { useThreads } from './useThreads';

// 作成者定義フック usePosts をエクスポート（投稿詳細管理）
export { usePosts } from './usePosts'; 