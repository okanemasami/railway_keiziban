/**
 * 投稿詳細の状態管理と操作を行うカスタムフック（作成者定義）
 * 
 * 【引数】
 * @param threadId: string | undefined - 表示対象のスレッドID（URLパラメータから取得）
 * 
 * 【戻り値】
 * {
 *   posts: Post[] - 投稿データの配列
 *   threadTitle: string - スレッドのタイトル
 *   loading: boolean - 読み込み中フラグ
 *   error: string | null - エラーメッセージ
 *   initialize: () => Promise<void> - 初期データ読み込み関数
 *   handleBackToThreadList: () => void - スレッド一覧への戻る処理
 * }
 * 
 * 【使用するReact標準機能】
 * - useCallback: 関数のメモ化
 * 
 * 【使用するReact Router標準機能】
 * - useNavigate: プログラムによる画面遷移
 * 
 * 【使用する作成者定義機能】
 * - useAsyncState: 非同期状態管理フック
 * - getThreadPosts: 投稿データ取得API関数
 * - getThreadTitle: スレッドタイトル取得API関数
 * - ROUTES: ルートパス定数
 */

// React標準フックをインポート
import { useCallback } from 'react';

// React Router標準フックをインポート
import { useNavigate } from 'react-router-dom';

// 作成者定義のAPI関数と型定義をインポート
import { getThreadPosts, getThreadTitle, type Post } from '../services/threadService';

// 作成者定義のカスタムフックをインポート
import { useAsyncState } from './useAsyncState';

// 作成者定義の定数をインポート
import { ROUTES } from '../constants';

/**
 * このフックで管理するデータの型定義（作成者定義）
 * 
 * 【型定義の内容】
 * - posts: Post[] - 投稿データの配列（Post型は作成者定義）
 * - threadTitle: string - スレッドのタイトル
 */
interface PostsData {
  posts: Post[];
  threadTitle: string;
}

/**
 * 投稿詳細の状態管理と操作を行うカスタムフック（作成者定義）
 * 
 * 【引数】
 * @param threadId: string | undefined - 表示対象のスレッドID（URLパラメータから取得）
 * 
 * 【戻り値】
 * 上記のヘッダーで定義されたオブジェクト
 */
export const usePosts = (threadId: string | undefined) => {
  // React Router標準フック useNavigate でナビゲーション関数を取得
  // 引数: なし, 戻り値: (path: string) => void - 画面遷移実行関数
  const navigate = useNavigate();
  
  // 作成者定義フック useAsyncState で非同期状態管理
  // 引数: なし, 戻り値: {data, loading, error, execute}
  const { 
    data,     // PostsData | null - 投稿データとスレッドタイトル
    loading,  // boolean - 読み込み中フラグ
    error,    // string | null - エラーメッセージ
    execute   // (asyncFn: () => Promise<PostsData>, errorMsg?: string) => Promise<void> - 非同期処理実行関数
  } = useAsyncState<PostsData>();

  /**
   * 投稿データとスレッドタイトルを並行取得する関数（作成者定義）
   * 
   * 【引数】
   * なし（threadIdはクロージャで参照）
   * 
   * 【戻り値】
   * Promise<PostsData> - 投稿データとスレッドタイトルを含むオブジェクト
   * 
   * 【使用するReact標準フック】
   * - useCallback: 関数のメモ化（threadId変更時のみ再作成）
   * 
   * 【使用するJavaScript標準機能】
   * - Promise.all: 複数の非同期処理を並行実行
   * - throw: エラーを投げる
   * - await: 非同期処理の完了を待機
   * 
   * 【使用する作成者定義関数】
   * - getThreadPosts: 投稿データ取得API関数
   * - getThreadTitle: スレッドタイトル取得API関数
   */
  const fetchPostsAndTitle = useCallback(async () => {
    // JavaScript標準 if文でthreadIdの存在チェック
    if (!threadId) {
      // JavaScript標準 throw文でエラーを投げる
      throw new Error('スレッドIDが指定されていません');
    }

    // JavaScript標準 Promise.all で複数の非同期処理を並行実行
    // JavaScript標準 配列の分割代入 [変数1, 変数2] = 配列
    const [postsResponse, title] = await Promise.all([
      getThreadPosts(threadId, 0), // 作成者定義関数: 投稿データを取得（引数: threadId, offset）
      getThreadTitle(threadId)     // 作成者定義関数: スレッドタイトルを取得（引数: threadId）
    ]);

    // JavaScript標準 オブジェクトリテラルで戻り値を作成
    return {
      posts: postsResponse.posts, // APIレスポンスから投稿配列を抽出
      threadTitle: title          // 取得したスレッドタイトル
    };
  }, [threadId]); // 依存配列: threadId変更時のみ関数を再作成

  /**
   * データを初期化（取得）する関数（作成者定義）
   * 
   * 【引数】
   * なし
   * 
   * 【戻り値】
   * Promise<void> - 処理完了を示すPromise
   * 
   * 【使用するReact標準フック】
   * - useCallback: 関数のメモ化（execute, fetchPostsAndTitle変更時のみ再作成）
   * 
   * 【使用するJavaScript標準機能】
   * - await: 非同期処理の完了を待機
   * 
   * 【使用する作成者定義関数】
   * - execute: 非同期状態管理実行関数（useAsyncState由来）
   * - fetchPostsAndTitle: 投稿データとタイトル取得関数
   */
  const initialize = useCallback(async () => {
    // 作成者定義関数 execute（useAsyncState由来）で非同期処理を実行
    // 引数1: 実行する非同期処理関数, 引数2: エラー時のデフォルトメッセージ
    await execute(
      fetchPostsAndTitle,                      // 作成者定義関数: 投稿データとタイトル取得
      '投稿の取得中にエラーが発生しました'    // エラー時のデフォルトメッセージ
    );
  }, [execute, fetchPostsAndTitle]); // 依存配列: execute, fetchPostsAndTitle変更時のみ再作成

  /**
   * スレッド一覧への戻る処理（作成者定義）
   * 
   * 【引数】
   * なし
   * 
   * 【戻り値】
   * void - 戻り値なし
   * 
   * 【使用するReact標準フック】
   * - useCallback: 関数のメモ化（navigate変更時のみ再作成）
   * 
   * 【使用するReact Router標準機能】
   * - navigate: 画面遷移実行関数（useNavigate由来）
   * 
   * 【使用する作成者定義定数】
   * - ROUTES.HOME: ホーム画面のルートパス
   */
  const handleBackToThreadList = useCallback(() => {
    // React Router標準機能 navigate でルートパスに遷移
    // 引数: string（遷移先パス）, 戻り値: void
    navigate(ROUTES.HOME); // 作成者定義定数: '/' （ルートパス）に遷移
  }, [navigate]); // 依存配列: navigate変更時のみ再作成（通常は変更されない）

  /**
   * フックの戻り値（作成者定義）
   * 
   * 【戻り値の内容】
   * - posts: Post[] - 投稿配列（データなしの場合は空配列）
   * - threadTitle: string - スレッドタイトル（データなしの場合は空文字）
   * - loading: boolean - 読み込み中フラグ（useAsyncState由来）
   * - error: string | null - エラーメッセージ（useAsyncState由来）
   * - initialize: () => Promise<void> - 初期データ読み込み関数
   * - handleBackToThreadList: () => void - スレッド一覧への戻る処理
   */
  return {
    // JavaScript標準 論理OR演算子 || でデフォルト値を設定
    posts: data?.posts || [],           // データなしの場合は空配列
    threadTitle: data?.threadTitle || '', // データなしの場合は空文字
    
    // useAsyncState由来の状態値
    loading,  // 読み込み中フラグ
    error,    // エラーメッセージ
    
    // 作成者定義の操作関数
    initialize,              // 初期データ読み込み
    handleBackToThreadList   // スレッド一覧への戻る処理
  };
}; 