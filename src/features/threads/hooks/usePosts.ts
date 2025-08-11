import { useCallback } from 'react'; // React標準: useCallback（関数のメモ化）
import { useNavigate } from 'react-router-dom'; // React Router標準: 画面遷移用フック
import { getThreadPosts, getThreadTitle } from '../../threads/api/threads'; // ユーザー定義: 投稿取得/タイトル取得API呼び出し関数
import type { Post } from '../types'; // ユーザー定義: 投稿型（型注釈のみ）
import { useAsyncState } from '../../../hooks/useAsyncState'; // ユーザー定義: 非同期状態管理フック
import { ROUTES } from '../../../config/routes'; // ユーザー定義: ルーティング定数

interface PostsData { // ユーザー定義: このフックが扱うデータ構造
  posts: Post[]; // 投稿配列
  threadTitle: string; // スレッドタイトル
}

export const usePosts = (threadId: string | undefined) => { // ユーザー定義: 投稿詳細用カスタムフックの宣言/エクスポート（引数: threadId）
  const navigate = useNavigate(); // React Router標準: navigate 関数を取得

  const { data, loading, error, execute } = useAsyncState<PostsData>(); // ユーザー定義: 非同期状態（data/loading/error）と execute を取得

  const fetchPostsAndTitle = useCallback(async () => { // 投稿一覧とタイトルを並行取得（戻り値: Promise<PostsData>）
    if (!threadId) { // スレッドIDの存在チェック
      throw new Error('スレッドIDが指定されていません'); // ユーザー向けエラーメッセージ
    }
    const [postsResponse, title] = await Promise.all([ // JavaScript標準: Promise.all で並行実行
      getThreadPosts(threadId, 0), // ユーザー定義: 投稿一覧を取得（offset=0）
      getThreadTitle(threadId), // ユーザー定義: スレッドタイトルを取得
    ]);
    return { posts: postsResponse.posts, threadTitle: title }; // まとめて返却（useAsyncState が data に格納）
  }, [threadId]); // 依存配列: threadId に依存

  const initialize = useCallback(async () => { // 初期取得（戻り値: Promise<void>）
    await execute(fetchPostsAndTitle, '投稿の取得中にエラーが発生しました'); // ユーザー定義: execute で非同期実行（既定エラーメッセージ）
  }, [execute, fetchPostsAndTitle]); // 依存配列: execute, fetchPostsAndTitle に依存

  const handleBackToThreadList = useCallback(() => { // スレッド一覧へ戻る（戻り値: void）
    navigate(ROUTES.HOME); // ルート定数からURLを生成して遷移
  }, [navigate]); // 依存配列: navigate に依存

  return { // フックの戻り値（画面側で利用）
    posts: data?.posts || [], // 投稿配列（未取得時は空配列）
    threadTitle: data?.threadTitle || '', // スレッドタイトル（未取得時は空文字）
    loading, // 読み込み中フラグ
    error, // エラーメッセージ
    initialize, // 初期取得関数
    handleBackToThreadList, // 戻る操作のハンドラ
  }; // オブジェクトを返却
}; // フック定義の終了

