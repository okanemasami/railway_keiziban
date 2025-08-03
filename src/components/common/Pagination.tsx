/**
 * ページネーション（ページ分割）コンポーネント（作成者定義）
 * 
 * 【引数】
 * @param props: PaginationProps - コンポーネントのプロパティ
 *   - currentPage: number - 現在表示中のページ番号（1〜5）
 *   - onPageChange: (pageNumber: number) => void - ページ変更時のコールバック関数
 *   - disabled?: boolean - ボタンの無効化フラグ（省略可能、デフォルト false）
 * 
 * 【戻り値】
 * JSX.Element - ページネーションのReactコンポーネント
 * 
 * 【使用するReact標準機能】
 * - React: JSXの描画基盤
 * - JSX.Element: コンポーネントの戻り値型
 * 
 * 【使用する作成者定義機能】
 * - commonStyles: 共通スタイル定義
 * - PAGINATION: ページネーション設定定数
 */

// React標準ライブラリをインポート
import React from 'react';

// 作成者定義の共通スタイルとページネーション設定をインポート
import { commonStyles } from '../../styles/common.styles';
import { PAGINATION } from '../../constants'; // 作成者定義: TOTAL_PAGES = 5 が定義されている

/**
 * Pagination コンポーネントのプロパティ型定義（作成者定義）
 * 
 * 【型定義の内容】
 * - currentPage: number - 現在表示中のページ番号（1〜5）
 * - onPageChange: (pageNumber: number) => void - ページ変更時のコールバック関数
 * - disabled?: boolean - ボタンの無効化フラグ（省略可能、デフォルト false）
 */
interface PaginationProps {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  disabled?: boolean;
}

/**
 * ページネーションコンポーネント
 * 
 * 【関数の引数について】
 * { currentPage, onPageChange, disabled = false }
 * ↑これは「分割代入 + デフォルト引数」の組み合わせ
 * disabled が渡されない場合は自動的に false が設定される
 */
export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  onPageChange, 
  disabled = false // デフォルト値：false（ボタン有効状態）
}) => (
  // 全体のコンテナ
  <div style={commonStyles.pagination}>
    {/* ボタンを横並びにするコンテナ */}
    <div style={commonStyles.paginationContainer}>
      
      {/* ページボタンの動的生成 */}
      {/* Array.from() を使用して指定数のボタンを生成 */}
      {Array.from({ length: PAGINATION.TOTAL_PAGES }, (_, index) => {
        // Array.from の第1引数：{ length: 5 } = 長さ5の配列を作成
        // 第2引数：(_, index) => {...} = 各要素を変換する関数
        // _ は使用しない第1引数（配列の各要素、この場合は undefined）
        // index は配列のインデックス（0, 1, 2, 3, 4）
        
        const pageNumber = index + 1; // インデックスを1始まりのページ番号に変換（1, 2, 3, 4, 5）
        
        return (
          // 各ページボタン
          <button
            key={pageNumber}                    // React の key（一意識別子）
            onClick={() => onPageChange(pageNumber)} // クリック時：親コンポーネントに選択されたページ番号を通知
            disabled={disabled}                 // ローディング中などでボタンを無効化
            style={{
              // 基本スタイルと条件分岐スタイルを結合
              ...commonStyles.pageButton,       // 基本的なページボタンスタイル
              
              // 三項演算子による条件分岐スタイル
              // 現在ページの場合は activeStyle を適用、そうでなければ空オブジェクト
              ...(currentPage === pageNumber ? commonStyles.pageButtonActive : {}),
              
              // カーソルの表示制御
              // disabled が true の場合は「禁止マーク」、false の場合は「ポインター（手のマーク）」
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {pageNumber} {/* ボタンに表示する数字（1, 2, 3, 4, 5）*/}
          </button>
        );
      })}
      
    </div>
  </div>
); 