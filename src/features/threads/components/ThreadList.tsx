import { useEffect, useCallback } from 'react'; // React標準: useEffect（副作用）, useCallback（関数のメモ化）
import { useThreads } from '../hooks/useThreads'; // ユーザー定義: スレッド一覧用フック
import { Loading, ErrorDisplay, EmptyState } from '../../../shared/components/LoadingErrorDisplay'; // ユーザー定義: 状態表示コンポーネント
import { Pagination } from '../../../shared/components/Pagination'; // ユーザー定義: ページネーションUI
import { commonStyles } from '../../../styles/common.styles'; // ユーザー定義: 共通スタイル
import { UI } from '../../../config/ui'; // ユーザー定義: UI定数（色など）
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';
import { Button } from '../../../shared/components/Button';

export default function ThreadList() { // 画面コンポーネント: スレッド一覧
  const { threads, loading, error, currentPage, handlePageChange, handleThreadClick, initialize } = useThreads(); // ユーザー定義フックから一覧状態と操作を取得
  const navigate = useNavigate();
  const handleCreateNavigate = useCallback(() => navigate(ROUTES.CREATE_THREAD), [navigate]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLLIElement>) => { // ホバー開始: 背景/枠線色を変更
    e.currentTarget.style.backgroundColor = UI.HOVER_COLORS.BACKGROUND; // 背景色
    e.currentTarget.style.borderColor = UI.HOVER_COLORS.BORDER; // 枠線色
  }, []); // 依存なし: 1度だけ作成

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLLIElement>) => { // ホバー終了: 元のスタイルに戻す
    e.currentTarget.style.backgroundColor = UI.DEFAULT_COLORS.BACKGROUND; // 背景色を戻す
    e.currentTarget.style.borderColor = UI.DEFAULT_COLORS.BORDER; // 枠線色を戻す
  }, []); // 依存なし

  useEffect(() => {
    initialize(); // 初期データの読み込み
  }, [initialize]); // initialize 変更時のみ再実行

  if (loading) { // 読み込み中
    return <Loading />; // ローディング表示
  }

  if (error) { // エラー時
    return <ErrorDisplay message={error} onRetry={initialize} />; // エラー表示＋再試行
  }

  return (
    <div>
      <h1 style={commonStyles.title}>スレッド一覧</h1> {/* 画面タイトル */}
      {!threads || threads.length === 0 ? ( // データなし
        <EmptyState message="スレッドが見つかりません" /> // 空状態表示
      ) : (
        <>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <Button variant="primary" onClick={handleCreateNavigate}>
              スレッドを投稿
            </Button>
          </div>
          <ul style={commonStyles.list}>
            {threads.map((thread) => ( // スレッドをリスト表示
              <li
                key={thread.id}
                style={{ ...commonStyles.card, ...commonStyles.cardClickable }}
                onClick={() => handleThreadClick(thread.id)} // クリックで詳細に遷移
                onMouseEnter={handleMouseEnter} // ホバー開始
                onMouseLeave={handleMouseLeave} // ホバー終了
              >
                <h3 style={commonStyles.subtitle}>{thread.title} →</h3>
              </li>
            ))}
          </ul>
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} disabled={loading} /> {/* ページネーション */}
        </>
      )}
    </div>
  );
}

