import React from 'react'; // React標準: JSXレンダリング
import { commonStyles } from '../../styles/common.styles'; // ユーザー定義: 共通スタイル

interface LoadingProps { message?: string } // プロパティ: ローディング文言
interface ErrorProps { message: string; onRetry?: () => void } // プロパティ: エラー文言/再試行
interface EmptyProps { message: string } // プロパティ: 空状態文言

export const Loading: React.FC<LoadingProps> = ({ message = '読み込み中...' }) => ( // ローディング表示
  <div style={commonStyles.loading}>{message}</div> // 中央揃えのメッセージ
);

export const ErrorDisplay: React.FC<ErrorProps> = ({ message, onRetry }) => ( // エラー表示
  <div>
    <div style={commonStyles.error}>エラー: {message}</div> {/* エラーメッセージ枠 */}
    {onRetry && (
      <button onClick={onRetry} style={{ ...commonStyles.button, ...commonStyles.buttonPrimary, marginTop: '10px' }}>
        再試行
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<EmptyProps> = ({ message }) => ( // 空状態表示
  <div style={commonStyles.empty}>{message}</div>
);

