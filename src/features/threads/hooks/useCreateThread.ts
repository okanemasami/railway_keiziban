import { useCallback } from 'react'; // React標準: useCallback をインポート（関数のメモ化）
import { useAsyncState } from '../../../hooks/useAsyncState'; // ユーザー定義: 非同期状態管理フックをインポート
import { createThread } from '../../threads/api/threads'; // ユーザー定義: スレッド作成API呼び出し関数をインポート
import type { Thread } from '../types'; // ユーザー定義: スレッド型（型注釈のみ利用）

interface CreateThreadHookReturn { // ユーザー定義: フックの戻り値の型定義
  loading: boolean; // 読み込み中フラグ（boolean）
  error: string | null; // エラーメッセージ（エラーなしは null）
  createdThread: Thread | null; // 作成に成功したスレッド（未作成は null）
  createThread: (title: string) => Promise<void>; // スレッド作成関数（引数: title, 戻り値: Promise<void>）
}

export const useCreateThread = (): CreateThreadHookReturn => { // ユーザー定義: スレッド作成用カスタムフックの宣言とエクスポート
  const { data, loading, error, execute } = useAsyncState<Thread>(); // ユーザー定義: 非同期状態（data/loading/error）と execute を取得

  const handleCreateThread = useCallback(async (title: string): Promise<void> => { // React標準: useCallback で作成関数をメモ化（引数: title, 戻り値: Promise<void>）
    await execute(() => createThread(title), 'スレッドの作成中にエラーが発生しました'); // ユーザー定義: execute に API 呼び出しを渡して実行（エラー時の既定メッセージ）
  }, [execute]); // 依存配列: execute 変更時のみ関数を再生成

  return { // フックの戻り値（画面側で利用する値と関数）
    loading, // 読み込み中フラグ
    error, // エラーメッセージ
    createdThread: data, // 最新の作成結果（Thread | null）
    createThread: handleCreateThread, // 呼び出し側が利用する作成関数
  }; // オブジェクトを返す
}; // フック定義の終了

