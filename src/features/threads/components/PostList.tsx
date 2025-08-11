import { useEffect } from 'react'; // React標準: useEffect（副作用）
import { useParams } from 'react-router-dom'; // React Router標準: URLパラメータ取得
import { usePosts } from '../hooks/usePosts'; // ユーザー定義: 投稿詳細用フック
import { Loading, ErrorDisplay, EmptyState } from '../../../shared/components/LoadingErrorDisplay'; // ユーザー定義: 状態表示コンポーネント
import { Breadcrumb } from '../../../shared/components/Breadcrumb'; // ユーザー定義: パンくずコンポーネント
import { commonStyles } from '../../../styles/common.styles'; // ユーザー定義: 共通スタイル

export default function PostList() { // 画面コンポーネント: 投稿一覧
  const { threadId } = useParams<{ threadId: string }>(); // URL から threadId を取得
  const { posts, threadTitle, loading, error, initialize, handleBackToThreadList } = usePosts(threadId); // ユーザー定義フックから状態と操作を取得

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
        <button
          onClick={handleBackToThreadList} // 一覧に戻る
          style={{ ...commonStyles.button, ...commonStyles.buttonPrimary, marginTop: '20px' }}
        >
          ← スレッド一覧に戻る
        </button>
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
      <div style={{ marginBottom: '30px' }}>
        <h1 style={commonStyles.title}>{threadTitle}</h1> {/* スレッドタイトル */}
        <div style={commonStyles.meta}>投稿数: {posts.length}件</div> {/* 投稿数 */}
      </div>
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

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button onClick={handleBackToThreadList} style={{ ...commonStyles.button, ...commonStyles.buttonSecondary }}>
          ← スレッド一覧に戻る
        </button>
      </div>
    </div>
  );
}

