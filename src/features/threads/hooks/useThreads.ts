import { useState, useCallback } from 'react'; // React標準: useState（状態管理）, useCallback（関数のメモ化）
import { useNavigate } from 'react-router-dom'; // React Router標準: 画面遷移用フック
import { getThreads } from '../../threads/api/threads'; // ユーザー定義: スレッド一覧取得API呼び出し関数
import type { Thread } from '../types'; // ユーザー定義: スレッド型（型注釈のみ）
import { useAsyncState } from '../../../hooks/useAsyncState'; // ユーザー定義: 非同期状態管理フック
import { PAGINATION } from '../../../config/pagination'; // ユーザー定義: ページネーション設定定数
import { ROUTES } from '../../../config/routes'; // ユーザー定義: ルーティング定数

export const useThreads = () => { // ユーザー定義: スレッド一覧用カスタムフックの宣言/エクスポート
  const navigate = useNavigate(); // React Router標準: navigate 関数を取得（画面遷移に使用）

  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.INITIAL_PAGE); // 現在のページ番号状態（初期値は設定から）

  const {
    data: threads, // 取得済みスレッド一覧（Thread[] | null）
    loading, // 読み込み中フラグ（boolean）
    error, // エラーメッセージ（string | null）
    execute, // 非同期処理実行関数（(fn, defaultMsg) => Promise<void>）
  } = useAsyncState<Thread[]>([]); // ユーザー定義: 非同期状態管理（初期データは空配列）

  const fetchThreads = useCallback(async (pageNumber: number) => { // 指定ページのスレッド一覧を取得（戻り値: Promise<void>）
    const offset = (pageNumber - 1) * PAGINATION.ITEMS_PER_PAGE; // オフセット計算（(ページ-1)*件数）
    await execute( // 非同期処理を実行（内部でloading/error/dataを管理）
      async () => {
        const data = await getThreads(offset); // API呼び出し: 指定オフセットでスレッド一覧を取得
        if (!Array.isArray(data)) { // 応答の妥当性チェック（配列でなければエラー）
          throw new Error('データの形式が正しくありません'); // ユーザー向けエラーメッセージ
        }
        return data; // 正常時: スレッド配列を返却（useAsyncState が data に格納）
      },
      'スレッドデータの取得に失敗しました' // 既定のエラーメッセージ
    );
  }, [execute]); // 依存配列: execute が変わる場合のみ関数を再生成

  const handlePageChange = useCallback(async (pageNumber: number) => { // ページ変更ハンドラ（戻り値: Promise<void>）
    setCurrentPage(pageNumber); // 現在ページを更新
    await fetchThreads(pageNumber); // 新しいページのデータを取得
  }, [fetchThreads]); // 依存配列: fetchThreads に依存

  const handleThreadClick = useCallback((threadId: string) => { // スレッドクリック時の遷移（戻り値: void）
    navigate(ROUTES.THREAD_POSTS(threadId)); // ルート定数からURLを生成して遷移
  }, [navigate]); // 依存配列: navigate に依存

  const initialize = useCallback(async () => { // 初期化処理（初回表示時などに実行）
    await fetchThreads(PAGINATION.INITIAL_PAGE); // 初期ページのデータを取得
  }, [fetchThreads]); // 依存配列: fetchThreads に依存

  return { // フックの戻り値（画面側で利用）
    threads, // スレッド一覧（Thread[] | null）
    loading, // 読み込み中フラグ
    error, // エラーメッセージ
    currentPage, // 現在のページ番号
    handlePageChange, // ページ変更ハンドラ
    handleThreadClick, // スレッド選択時の遷移ハンドラ
    initialize, // 初期取得関数
  }; // オブジェクトを返却
}; // フック定義の終了

