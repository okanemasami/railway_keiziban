import { useCallback } from 'react'; // React標準: useCallback（関数のメモ化）
import { useAsyncState } from './useAsyncState'; // ユーザー定義: 非同期状態管理フック
import { createThread } from '../features/threads/api/threads'; // ユーザー定義: スレッド作成API
import type { Thread } from '../features/threads/types'; // ユーザー定義: スレッド型

interface CreateThreadHookReturn { // ユーザー定義: フックの戻り値型
  loading: boolean; // 読み込み中フラグ
  error: string | null; // エラーメッセージ
  createdThread: Thread | null; // 作成結果（Thread | null）
  createThread: (title: string) => Promise<void>; // 作成関数（引数: title, 戻り値: Promise<void>）
}

export const useCreateThread = (): CreateThreadHookReturn => { // ユーザー定義: スレッド作成フック
  const { data, loading, error, execute } = useAsyncState<Thread>(); // 非同期状態（data/loading/error）と execute を取得

  const handleCreateThread = useCallback(async (title: string): Promise<void> => { // 作成処理（引数: title, 戻り値: Promise<void>）
    await execute(() => createThread(title), 'スレッドの作成中にエラーが発生しました'); // 非同期実行（既定エラーメッセージ）
  }, [execute]); // 依存配列: execute 変更時のみ再生成

  return { // フックの戻り値
    loading, // 読み込み中フラグ
    error, // エラーメッセージ
    createdThread: data, // 作成結果（Thread | null）
    createThread: handleCreateThread, // 作成を実行する関数
  };
};