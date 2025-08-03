/**
 * 共通の状態表示コンポーネント集（作成者定義）
 * 
 * 【エクスポートするコンポーネント】
 * - Loading: (props: {message?: string}) => JSX.Element - データ読み込み中の表示
 * - ErrorDisplay: (props: {message: string, onRetry?: () => void}) => JSX.Element - エラー発生時の表示
 * - EmptyState: (props: {message: string}) => JSX.Element - データが存在しない時の表示
 * 
 * 【使用するReact標準機能】
 * - React: JSXの描画基盤
 * - JSX.Element: コンポーネントの戻り値型
 * 
 * 【使用する作成者定義機能】
 * - commonStyles: 共通スタイル定義
 */

// React標準ライブラリをインポート
import React from 'react';

// 作成者定義の共通スタイル定義をインポート
import { commonStyles } from '../../styles/common.styles';

/**
 * Loading コンポーネントのプロパティ型定義（作成者定義）
 * 
 * 【型定義の内容】
 * - message?: string - 表示メッセージ（省略可能、デフォルト値あり）
 */
interface LoadingProps {
  message?: string;
}

/**
 * ErrorDisplay コンポーネントのプロパティ型定義（作成者定義）
 * 
 * 【型定義の内容】
 * - message: string - エラーメッセージ（必須）
 * - onRetry?: () => void - 再試行ボタン押下時の処理（省略可能）
 */
interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

/**
 * EmptyState コンポーネントのプロパティ型定義（作成者定義）
 * 
 * 【型定義の内容】
 * - message: string - 空状態時のメッセージ（必須）
 */
interface EmptyProps {
  message: string;
}

/**
 * ローディング表示コンポーネント（作成者定義）
 * 
 * 【引数】
 * @param props: LoadingProps - コンポーネントのプロパティ
 *   - message?: string - 表示メッセージ（省略可能、デフォルト: '読み込み中...'）
 * 
 * 【戻り値】
 * JSX.Element - ローディング表示のReactコンポーネント
 * 
 * 【使用するReact標準機能】
 * - React.FC: 関数コンポーネントの型定義
 * - JSX: UI記述言語
 * 
 * 【使用するJavaScript標準機能】
 * - デフォルト引数: パラメータのデフォルト値設定
 * - 分割代入: オブジェクトからプロパティを抽出
 * 
 * 【使用する作成者定義機能】
 * - commonStyles.loading: ローディング用スタイル定義
 */
export const Loading: React.FC<LoadingProps> = ({ message = '読み込み中...' }) => (
  // HTML標準要素 div + 作成者定義スタイル commonStyles.loading
  // 内容: JavaScript標準 テンプレート展開で message を表示
  <div style={commonStyles.loading}>{message}</div>
);

/**
 * エラー表示コンポーネント
 * 
 * 【使用場面】
 * - API通信エラー時の表示
 * - データ取得失敗時の表示
 * - バリデーションエラー時の表示
 * 
 * 【機能】
 * - エラーメッセージの表示（赤色背景で目立たせる）
 * - 再試行ボタンの表示（onRetry が渡された場合のみ）
 * 
 * 【条件分岐レンダリング】
 * onRetry && (...) = onRetry が存在する場合のみ後続の要素を表示
 * JavaScript の論理演算子 && を利用した React の条件分岐パターン
 */
export const ErrorDisplay: React.FC<ErrorProps> = ({ message, onRetry }) => (
  <div>
    {/* エラーメッセージ部分 */}
    {/* error スタイル：赤色背景、赤色文字、パディング、角丸 */}
    <div style={commonStyles.error}>エラー: {message}</div>
    
    {/* 再試行ボタン（条件付き表示） */}
    {onRetry && (
      <button
        onClick={onRetry} // クリック時に渡された関数を実行
        style={{
          // スプレッド演算子で複数のスタイルオブジェクトを結合
          ...commonStyles.button,        // 基本ボタンスタイル
          ...commonStyles.buttonPrimary, // プライマリ色（青色）
          marginTop: '10px'              // エラーメッセージとの間にマージン
        }}
      >
        再試行 {/* ボタンテキスト */}
      </button>
    )}
  </div>
);

/**
 * 空状態表示コンポーネント
 * 
 * 【使用場面】
 * - 検索結果が0件の時
 * - データベースにデータが存在しない時
 * - フィルタリング後に該当項目がない時
 * 
 * 【UX（ユーザーエクスペリエンス）の観点】
 * 何もない状態を「エラー」ではなく「正常だが空」として適切に表現
 * ユーザーに現在の状況を分かりやすく伝える役割
 */
export const EmptyState: React.FC<EmptyProps> = ({ message }) => (
  // empty スタイル：中央揃え、グレー文字、イタリック体、大きめのパディング
  <div style={commonStyles.empty}>{message}</div>
); 