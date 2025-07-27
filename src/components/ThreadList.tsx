import { useState, useEffect } from 'react';
import { getThreads, type Thread } from '../services/threadService';

export default function ThreadList() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 1から5ページまで

  const fetchThreads = async (pageNumber: number) => {
    try {
      setLoading(true);
      const offset = (pageNumber - 1) * 10; // ページ1 = offset 0, ページ2 = offset 10, ...
      const data = await getThreads(offset);
      console.log(`ページ ${pageNumber} のデータ:`, data);
      
      if (Array.isArray(data)) {
        setThreads(data);
      } else {
        console.error('期待されない形式のレスポンス:', data);
        setThreads([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchThreads(pageNumber);
  };

  useEffect(() => {
    fetchThreads(1);
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div>
      <h1>スレッド一覧</h1>
      {threads.length === 0 ? (
        <p>スレッドが見つかりません</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {threads.map((thread) => (
              <li 
                key={thread.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  margin: '10px 0', 
                  padding: '15px',
                  borderRadius: '5px'
                }}
              >
                <h3>{thread.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  作成日時: {new Date(thread.createdAt).toLocaleString('ja-JP')}
                </p>
              </li>
            ))}
          </ul>
          
          {/* ページネーション */}
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <div style={{ display: 'inline-flex', gap: '5px' }}>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    disabled={loading}
                    style={{
                      padding: '10px 15px',
                      backgroundColor: currentPage === pageNumber ? '#007bff' : '#f8f9fa',
                      color: currentPage === pageNumber ? 'white' : '#333',
                      border: '1px solid #dee2e6',
                      borderRadius: '5px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontWeight: currentPage === pageNumber ? 'bold' : 'normal'
                    }}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
            ページ {currentPage} / {totalPages} - 表示中: {threads.length}件
          </div>
        </>
      )}
    </div>
  );
}