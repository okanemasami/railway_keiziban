/**
 * スレッド一覧の状態管理と操作を行うカスタムフック
 * 
 * 【このフックの役割】
 * - スレッド一覧データの取得・管理
 * - ページネーション（ページ分割）機能の制御
 * - スレッドクリック時の画面遷移処理
 * - 非同期処理（API通信）の状態管理
 * 
 * 【ページネーション機能の仕組み】
 * - 総データを10件ずつ5ページに分割（設定は constants で管理）
 * - 現在ページに基づいてAPIから適切な範囲のデータを取得
 * - ページ変更時は新しいAPIリクエストを送信
 * 
 * 【状態管理の設計思想】
 * UIコンポーネント（ThreadList）からビジネスロジックを分離し、
 * 再利用可能で保守しやすい形でデータ処理を抽象化
 */

// React フックをインポート
import { useState, useCallback } from 'react';

// React Router のナビゲーションフックをインポート
import { useNavigate } from 'react-router-dom';

// API サービス関数と型定義をインポート
import { getThreads, type Thread } from '../services/threadService';

// 他のカスタムフックをインポート
import { useAsyncState } from './useAsyncState';

// 定数をインポート
import { PAGINATION, ROUTES } from '../constants';

/**
 * スレッド一覧の状態管理と操作を行うカスタムフック
 * 
 * 【引数なしフック】
 * このフックは外部からパラメータを受け取らず、
 * 内部で独自の状態管理を行う
 * 
 * 【戻り値】
 * スレッドデータ、ページ状態、操作関数をまとめたオブジェクト
 */
export const useThreads = () => {
  // React Router のナビゲーション関数を取得
  const navigate = useNavigate();
  
  // ページ番号の状態管理
  // 【useState】ローカル状態として現在のページ番号を管理
  // 初期値は PAGINATION.INITIAL_PAGE (= 1)
  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.INITIAL_PAGE);
  
  // スレッドデータの非同期状態管理
  // 【Thread[] 型指定】スレッドオブジェクトの配列として型安全性を確保
  // 【初期値 []】空配列で初期化（データなし状態を表現）
  const { 
    data: threads,  // データを threads という名前で使用（分割代入のリネーム）
    loading,        // 読み込み中フラグ
    error,          // エラーメッセージ
    execute         // 非同期処理実行関数
  } = useAsyncState<Thread[]>([]);

  /**
   * 指定ページのスレッドデータを取得する関数
   * 
   * 【オフセット計算の説明】
   * オフセット = スキップするデータ件数
   * 例：2ページ目の場合 = (2-1) × 10 = 10件スキップして11件目から取得
   * 
   * 【引数】
   * @param pageNumber - 取得対象のページ番号（1〜5）
   */
  const fetchThreads = useCallback(async (pageNumber: number) => {
    // オフセット値の計算
    // (ページ番号 - 1) × 1ページあたりの件数 = スキップする件数
    const offset = (pageNumber - 1) * PAGINATION.ITEMS_PER_PAGE;
    
    // useAsyncState の execute を使用して非同期処理を実行
    await execute(
      // 実行する非同期処理（API呼び出し）
      async () => {
        // スレッドデータを取得
        const data = await getThreads(offset);
        
        // データの妥当性チェック
        // 【なぜこのチェックが必要？】
        // APIが予期しない形式のデータ（null、オブジェクト、文字列など）を
        // 返す可能性があるため、配列であることを確認
        if (!Array.isArray(data)) {
          throw new Error('データの形式が正しくありません');
        }
        
        return data; // 検証を通過したデータを返す
      },
      // エラー時のデフォルトメッセージ
      'スレッドデータの取得に失敗しました'
    );
  }, [execute]); // execute が変更された時のみ関数を再作成

  /**
   * ページ変更処理
   * 
   * 【処理の流れ】
   * 1. 現在ページ番号を更新
   * 2. 新しいページのデータを取得
   * 
   * 【非同期処理の注意点】
   * setCurrentPage は同期的に実行され、fetchThreads は非同期的に実行される
   * しかし、fetchThreadsは引数で渡されたpageNumberを使用するため、
   * setCurrentPageの完了を待つ必要はない
   */
  const handlePageChange = useCallback(async (pageNumber: number) => {
    setCurrentPage(pageNumber);        // 現在ページを更新
    await fetchThreads(pageNumber);    // 新しいページのデータを取得
  }, [fetchThreads]); // fetchThreads が変更された時のみ再作成

  /**
   * スレッドクリック時の遷移処理
   * 
   * 【動的ルートへの遷移】
   * ROUTES.THREAD_POSTS(threadId) で動的なURLを生成
   * 例：ROUTES.THREAD_POSTS('abc123') → '/threads/abc123/posts'
   * 
   * 【引数】
   * @param threadId - 遷移先のスレッドID
   */
  const handleThreadClick = useCallback((threadId: string) => {
    navigate(ROUTES.THREAD_POSTS(threadId)); // 投稿詳細画面への遷移
  }, [navigate]); // navigate が変更された時のみ再作成

  /**
   * 初期データ取得
   * 
   * 【初期化の役割】
   * アプリケーション起動時やコンポーネント初回表示時に
   * 最初のページ（1ページ目）のデータを取得
   * 
   * 【useCallback の必要性】
   * useEffect の依存配列に含めるため、無限ループを防ぐ
   */
  const initialize = useCallback(async () => {
    await fetchThreads(PAGINATION.INITIAL_PAGE); // 1ページ目のデータを取得
  }, [fetchThreads]); // fetchThreads が変更された時のみ再作成

  // このフックの戻り値
  // 呼び出し側のコンポーネント（ThreadList）で必要なすべての要素を提供
  return {
    // データ・状態
    threads,        // スレッドデータの配列（Thread[] | null）
    loading,        // 読み込み中フラグ（boolean）
    error,          // エラーメッセージ（string | null）
    currentPage,    // 現在のページ番号（number）
    
    // 操作関数
    handlePageChange,   // ページ変更処理
    handleThreadClick,  // スレッドクリック処理（画面遷移）
    initialize         // 初期データ読み込み
  };
}; 