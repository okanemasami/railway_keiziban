import { useEffect, useState, useCallback } from 'react'; // React標準: useEffect（副作用）
import { useParams } from 'react-router-dom'; // React Router標準: URLパラメータ取得
import { usePosts } from '../hooks/usePosts'; // ユーザー定義: 投稿詳細用フック
import { Loading, ErrorDisplay, EmptyState } from '../../../shared/components/LoadingErrorDisplay'; // ユーザー定義: 状態表示コンポーネント
import { Breadcrumb } from '../../../shared/components/Breadcrumb'; // ユーザー定義: パンくずコンポーネント
import { commonStyles } from '../../../styles/common.styles'; // ユーザー定義: 共通スタイル
import { useCreatePost } from '../hooks/useCreatePost';

export default function PostList() { // 画面コンポーネント: 投稿一覧
  const { threadId } = useParams<{ threadId: string }>(); // URL から threadId を取得
  const { posts, threadTitle, loading, error, initialize, handleBackToThreadList } = usePosts(threadId); // ユーザー定義フックから状態と操作を取得

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newPost, setNewPost] = useState('');
  const { createPost, loading: creating } = useCreatePost(threadId);

  const openComposer = useCallback(() => setIsComposerOpen(true), []);
  const closeComposer = useCallback(() => {
    setIsComposerOpen(false);
    setNewPost('');
  }, []);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost(e.target.value), []);
  const handleSubmit = useCallback(async () => {
    if (!threadId) return;
    const trimmed = newPost.trim();
    if (!trimmed) return;
    await createPost(trimmed);
    setNewPost('');
    setIsComposerOpen(false);
    await initialize();
  }, [threadId, newPost, createPost, initialize]);

  useEffect(() => {
    initialize(); // 初期データの読み込み
  }, [initialize]); // initialize 変更時のみ再実行

  if (loading) { // 読み込み中
    return (
      <div style={commonStyles.container}>
        <Loading message="投稿を読み込み中..." /> {/* ローディング表示 */}
      </div>
    );
  }

  if (error) { // エラー時
    return (
      <div style={commonStyles.container}>
        <ErrorDisplay message={error} onRetry={initialize} /> {/* エラー表示＋再試行 */}
      </div>
    );
  }

  const breadcrumbItems = [ // パンくずデータ
    { label: 'スレッド一覧', onClick: handleBackToThreadList }, // 一覧へ戻る
    { label: threadTitle, isActive: true }, // 現在のスレッド
  ];

  return (
    <div style={commonStyles.container}>
      <Breadcrumb items={breadcrumbItems} /> {/* パンくず */}
      <div style={{ marginBottom: '10px' }}>
        <h1 style={commonStyles.title}>{threadTitle}</h1> {/* スレッドタイトル */}
        <div style={commonStyles.meta}>投稿数: {posts.length}件</div> {/* 投稿数 */}
      </div>
      {!isComposerOpen && (
        <div style={{ marginBottom: '20px' }}>
          <span
            onClick={openComposer}
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', userSelect: 'none' }}
            title="スレッドに新規投稿"
          >
            スレッドに新規投稿
          </span>
        </div>
      )}
      {isComposerOpen && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>新規投稿</div>
          <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '200%' }}>
            <textarea
              value={newPost}
              onChange={handleChange}
              rows={8}
              placeholder="投稿内容を入力"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}
              disabled={creating}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button onClick={closeComposer} disabled={creating} style={{ ...commonStyles.button, ...commonStyles.buttonSecondary }}>キャンセル</button>
              <button onClick={handleSubmit} disabled={creating} style={{ ...commonStyles.button, ...commonStyles.buttonPrimary }}>送信</button>
            </div>
          </div>
        </div>
      )}
      {posts.length === 0 ? ( // データなし
        <EmptyState message="まだ投稿がありません" /> // 空状態
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {posts.map((post, index) => ( // 投稿をカードで表示
            <article key={post.id} style={commonStyles.card}>
              <div style={commonStyles.postContainer}>
                <div style={commonStyles.postNumber}>{index + 1}</div> {/* 通し番号 */}
                <div style={commonStyles.postContent}>
                  <p style={commonStyles.content}>{post.post}</p> {/* 本文 */}
                  <div style={commonStyles.postId}>ID: {post.id}</div> {/* 投稿ID */}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      
    </div>
  );
}

