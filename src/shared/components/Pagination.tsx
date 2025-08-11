import React from 'react'; // React標準: JSXレンダリング
import { commonStyles } from '../../styles/common.styles'; // ユーザー定義: 共通スタイル
import { PAGINATION } from '../../config/pagination'; // ユーザー定義: ページ数などの設定
import { Button } from './Button';

interface PaginationProps { // プロパティ型
  currentPage: number; // 現在ページ
  onPageChange: (pageNumber: number) => void; // 変更時のコールバック
  disabled?: boolean; // 無効化フラグ
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, disabled = false }) => ( // ページネーション
  <div style={commonStyles.pagination}>
    <div style={commonStyles.paginationContainer}>
      {Array.from({ length: PAGINATION.TOTAL_PAGES }, (_, index) => { // 総ページ数ぶんのボタンを生成
        const pageNumber = index + 1; // 表示用ページ番号（1始まり）
        return (
          <Button
            key={pageNumber}
            variant="page"
            active={currentPage === pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={disabled}
            style={{ padding: '10px 15px' }}
          >
            {pageNumber}
          </Button>
        );
      })}
    </div>
  </div>
);

