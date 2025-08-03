/**
 * パンくずナビゲーションコンポーネント（作成者定義）
 * 
 * 【引数】
 * @param props: BreadcrumbProps - コンポーネントのプロパティ
 *   - items: BreadcrumbItem[] - パンくずナビゲーションの項目配列
 * 
 * 【戻り値】
 * JSX.Element - パンくずナビゲーションのReactコンポーネント
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
 * パンくずナビゲーションの各項目を表すインターフェース（型定義）
 * 
 * 【TypeScript インターフェースとは？】
 * オブジェクトの「形」を定義する仕組み
 * どのようなプロパティを持つべきかを事前に決めておく
 * → 型安全性（タイプミスやデータ不整合を防ぐ）を向上
 */
interface BreadcrumbItem {
  label: string;           // 表示するテキスト（例：「ホーム」「商品一覧」）
  onClick?: () => void;    // クリック時の処理（?付きで省略可能）
  isActive?: boolean;      // アクティブ状態（現在地）かどうか（?付きで省略可能、デフォルトfalse）
}

/**
 * Breadcrumbコンポーネントのプロパティ（受け取るデータ）の型定義
 */
interface BreadcrumbProps {
  items: BreadcrumbItem[]; // パンくず項目の配列（BreadcrumbItem型の配列）
}

/**
 * パンくずナビゲーションコンポーネント
 * 
 * 【React.FC とは？】
 * React Function Component の略
 * 関数コンポーネントであることを TypeScript に伝える型注釈
 * <BreadcrumbProps> で受け取るプロパティの型を指定
 * 
 * 【分割代入 { items }】
 * props.items の代わりに、直接 items として使用可能
 * コードが簡潔になり、可読性が向上
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  // nav タグ：ナビゲーション領域を示すセマンティック HTML タグ
  // 【セマンティックHTMLとは？】意味を持つHTMLタグを適切に使用すること
  // → アクセシビリティ（障害者支援技術）やSEOの向上
  <nav style={commonStyles.breadcrumb}>
    {/* items.map(): 配列の各要素（item）を JSX に変換 */}
    {/* (item, index): item=各パンくず項目、index=配列内の位置 */}
    {items.map((item, index) => (
      // React.Fragment: 複数の要素を1つのコンポーネントとして扱う
      // 【なぜ Fragment が必要？】
      // JSX では return 内に複数の要素を直接並べることができない
      // Fragment を使うことで、余分な DOM 要素を作らずに複数要素をグループ化
      <React.Fragment key={index}>
        
        {/* 条件分岐：クリック可能 or 表示のみ */}
        {item.onClick ? (
          // onClick が存在する場合：クリック可能なボタンとして表示
          <button
            onClick={item.onClick}      // クリック時の処理を設定
            style={commonStyles.buttonLink} // リンク風ボタンのスタイル（下線付き青文字）
          >
            {item.label} {/* ボタンのテキスト */}
          </button>
        ) : (
          // onClick が存在しない場合：通常のテキストとして表示
          <span style={{ 
            // 三項演算子による条件分岐スタイル
            // item.isActive ? A : B = isActiveがtrue の場合 A、false の場合 B
            color: item.isActive ? '#333' : '#666',           // アクティブ時は濃いグレー、非アクティブ時は薄いグレー
            fontWeight: item.isActive ? 'bold' : 'normal'     // アクティブ時は太字、非アクティブ時は通常
          }}>
            {item.label} {/* スパンのテキスト */}
          </span>
        )}
        
        {/* 区切り文字（› 記号）の表示 */}
        {/* 条件：現在の項目が最後でない場合のみ表示 */}
        {/* index < items.length - 1 = 配列の最後の要素でない場合 */}
        {index < items.length - 1 && (
          <span style={commonStyles.breadcrumbSeparator}>›</span>
        )}
        
      </React.Fragment>
    ))}
  </nav>
); 