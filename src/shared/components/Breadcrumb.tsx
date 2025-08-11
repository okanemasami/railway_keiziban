import React from 'react'; // React標準: JSXレンダリング
import { commonStyles } from '../../styles/common.styles'; // ユーザー定義: 共通スタイル

interface BreadcrumbItem { // パンくず項目
  label: string; // 表示名
  onClick?: () => void; // クリック時の処理
  isActive?: boolean; // 現在地フラグ
}

interface BreadcrumbProps { // プロパティ型
  items: BreadcrumbItem[]; // 表示する項目配列
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => ( // パンくずナビゲーション
  <nav style={commonStyles.breadcrumb}>
    {items.map((item, index) => (
      <React.Fragment key={index}> {/* 断片要素で区切り */}
        {item.onClick ? (
          <button onClick={item.onClick} style={commonStyles.buttonLink}> {/* クリック可能な項目 */}
            {item.label}
          </button>
        ) : (
          <span style={{ color: item.isActive ? '#333' : '#666', fontWeight: item.isActive ? 'bold' : 'normal' }}> {/* 現在地表示 */}
            {item.label}
          </span>
        )}
        {index < items.length - 1 && <span style={commonStyles.breadcrumbSeparator}>›</span>} {/* 区切り */}
      </React.Fragment>
    ))}
  </nav>
);

