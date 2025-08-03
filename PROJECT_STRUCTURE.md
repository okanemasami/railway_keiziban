# Railway Keiziban - プロジェクト構造

## リファクタリング後の構造

```
src/
├── components/
│   ├── common/           # 共通コンポーネント
│   │   ├── LoadingErrorDisplay.tsx
│   │   ├── Pagination.tsx
│   │   ├── Breadcrumb.tsx
│   │   └── index.ts
│   ├── ThreadList.tsx    # スレッド一覧
│   └── PostList.tsx      # 投稿詳細
├── hooks/                # カスタムフック
│   ├── useAsyncState.ts  # 非同期状態管理
│   ├── useThreads.ts     # スレッド関連
│   ├── usePosts.ts       # 投稿関連
│   └── index.ts
├── services/             # API通信
│   └── threadService.ts
├── styles/               # スタイル定義
│   └── common.styles.ts
├── utils/                # ユーティリティ
│   ├── errorUtils.ts
│   ├── dateUtils.ts
│   └── index.ts
├── constants/            # 定数
│   └── index.ts
└── App.tsx
```

## 主要な改善点

### 1. **アーキテクチャ改善**
- カスタムフックによるロジック分離
- 共通コンポーネントの抽出
- 単一責任原則の適用

### 2. **保守性向上**
- 定数の外部化
- ユーティリティ関数の共通化
- 型安全性の強化

### 3. **パフォーマンス最適化**
- useCallback/useMemoの適用
- 不要な再レンダリングの削減
- 効率的な状態管理

### 4. **開発者体験向上**  
- 一貫したエラーハンドリング
- 再利用可能なコンポーネント
- 明確な責任分離

## 技術スタック
- React 19.1.0
- TypeScript
- React Router DOM
- Vite 