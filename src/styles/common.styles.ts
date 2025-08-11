export const commonStyles = { // ユーザー定義: 共通スタイルオブジェクト
  
  // ==================== レイアウト関連 ====================
  
  /**
   * メインコンテナのスタイル
   * 【適用対象】各ページ全体の外枠
   * 【効果】中央寄せ、最大幅制限、内側余白の設定
   */
  container: { // メインコンテナ
    padding: '20px', // 余白
    maxWidth: '800px', // 最大幅
    margin: '0 auto' // 中央揃え
  },
  
  // ==================== リスト関連 ====================
  
  /**
   * リスト要素（ul, ol）のリセットスタイル
   * 【目的】ブラウザデフォルトのリストスタイルを除去
   */
  list: { // リストのリセット
    listStyle: 'none' as const, // マーカー非表示
    padding: 0, // 余白リセット
    margin: 0 // 余白リセット
  },
  
  // ==================== カード・アイテム関連 ====================
  
  /**
   * カード型UI の基本スタイル
   * 【適用対象】スレッドアイテム、投稿アイテムなど
   * 【デザイン】白背景、薄いグレー枠線、角丸、適度な余白
   */
  card: { // カード
    border: '1px solid #ddd', // 枠線
    margin: '10px 0', // 外余白
    padding: '15px', // 内余白
    borderRadius: '8px', // 角丸
    backgroundColor: 'white' // 背景
  },
  
  /**
   * クリック可能なカードの追加スタイル
   * 【適用対象】クリックして詳細画面に遷移するカード
   * 【効果】ホバー効果とクリック可能であることを示すカーソル
   */
  cardClickable: { // クリック可能なカード
    cursor: 'pointer', // カーソル
    transition: 'all 0.2s ease' // トランジション
  },
  
  // ==================== ボタン関連 ====================
  
  /**
   * ボタンの基本スタイル
   * 【適用対象】すべてのボタン要素
   * 【デザイン】適度な余白、枠線なし、角丸、ポインターカーソル
   */
  button: { // ボタン基本
    padding: '10px 16px', // 余白
    border: 'none', // 枠線なし
    borderRadius: '4px', // 角丸
    cursor: 'pointer', // カーソル
    fontSize: '14px', // フォントサイズ
    fontWeight: 'normal' as const, // 太さ
    textDecoration: 'none', // 下線なし
    display: 'inline-block', // 表示形式
    textAlign: 'center' as const // 文字位置
  },
  
  /**
   * プライマリボタン（主要な操作）のスタイル
   * 【適用対象】「再試行」「決定」など重要なボタン
   * 【色】青色背景、白文字
   */
  buttonPrimary: { // プライマリボタン
    backgroundColor: '#007bff', // 背景色
    color: 'white' // 文字色
  },
  
  /**
   * セカンダリボタン（補助的な操作）のスタイル
   * 【適用対象】「戻る」「キャンセル」など補助的なボタン
   * 【色】グレー系背景、白文字
   */
  buttonSecondary: { // セカンダリボタン
    backgroundColor: '#6c757d', // 背景
    color: 'white' // 文字
  },
  
  /**
   * リンク風ボタンのスタイル
   * 【適用対象】パンくずナビのクリック可能項目など
   * 【見た目】通常のリンクのような青色下線テキスト
   */
  buttonLink: { // リンク風ボタン
    backgroundColor: 'transparent', // 透明背景
    color: '#007bff', // 文字色
    textDecoration: 'underline', // 下線
    border: 'none', // 枠線なし
    padding: 0, // 余白なし
    cursor: 'pointer' // カーソル
  },
  
  // ==================== テキスト関連 ====================
  
  /**
   * ページタイトルのスタイル
   * 【適用対象】各ページのメインタイトル（h1要素）
   * 【デザイン】大きなフォント、太字、濃いグレー、下部余白
   */
  title: { // ページタイトル
    margin: '0 0 10px 0', // 外余白
    fontSize: '24px', // フォントサイズ
    color: '#333', // 文字色
    fontWeight: 'bold' as const // 太字
  },
  
  /**
   * サブタイトルのスタイル
   * 【適用対象】スレッドタイトルなど（h2, h3要素）
   * 【デザイン】中程度のフォント、太字、青色（クリック可能を示唆）
   */
  subtitle: { // サブタイトル
    margin: '0 0 8px 0', // 外余白
    fontSize: '18px', // フォントサイズ
    color: '#007bff', // 文字色
    fontWeight: 'bold' as const // 太字
  },
  
  /**
   * メタ情報（補助的な情報）のスタイル
   * 【適用対象】作成日時、投稿数などの付加情報
   * 【デザイン】小さなフォント、薄いグレー文字
   */
  meta: { // メタ情報
    color: '#666', // 文字色
    fontSize: '14px', // サイズ
    margin: 0 // 外余白
  },
  
  /**
   * 本文コンテンツのスタイル
   * 【適用対象】投稿内容、説明文など
   * 【デザイン】読みやすい行間、改行保持、適度な下部余白
   */
  content: { // 本文
    margin: '0 0 10px 0', // 外余白
    lineHeight: '1.6', // 行間
    color: '#333', // 文字色
    whiteSpace: 'pre-wrap' as const // 改行/空白保持
  },
  
  // ==================== 状態表示関連 ====================
  
  /**
   * ローディング表示のスタイル
   * 【適用対象】「読み込み中...」などの待機メッセージ
   * 【デザイン】中央揃え、イタリック体、グレー文字
   */
  loading: { // ローディング表示
    textAlign: 'center' as const, // 中央揃え
    color: '#666', // 色
    fontStyle: 'italic' as const, // イタリック
    padding: '20px' // 内余白
  },
  
  /**
   * エラー表示のスタイル
   * 【適用対象】エラーメッセージの表示領域
   * 【デザイン】赤色系の背景と枠線で警告感を演出
   */
  error: { // エラー表示
    color: '#dc3545', // 文字色
    fontSize: '14px', // サイズ
    padding: '15px', // 内余白
    backgroundColor: '#f8d7da', // 背景
    border: '1px solid #f5c6cb', // 枠線
    borderRadius: '4px', // 角丸
    margin: '10px 0' // 外余白
  },
  
  /**
   * 空状態表示のスタイル
   * 【適用対象】「データがありません」などの空状態メッセージ
   * 【デザイン】中央揃え、イタリック体、控えめなグレー
   */
  empty: { // 空状態
    textAlign: 'center' as const, // 中央揃え
    color: '#6c757d', // 色
    fontStyle: 'italic' as const, // イタリック
    padding: '40px 20px' // 余白
  },
  
  // ==================== ナビゲーション関連 ====================
  
  /**
   * パンくずナビゲーションのスタイル
   * 【適用対象】「ホーム › カテゴリ › 商品」のような階層ナビ
   */
  breadcrumb: { // パンくず
    marginBottom: '20px', // 下余白
    fontSize: '14px' // サイズ
  },
  
  /**
   * パンくずナビゲーションの区切り文字スタイル
   * 【適用対象】「›」記号
   */
  breadcrumbSeparator: { // パンくず区切り
    margin: '0 8px', // 左右余白
    color: '#666' // 色
  },
  
  // ==================== ページネーション関連 ====================
  
  /**
   * ページネーション全体のコンテナスタイル
   */
  pagination: { // ページネーション
    textAlign: 'center' as const, // 中央揃え
    margin: '30px 0' // 外余白
  },
  
  /**
   * ページボタンを横並びにするコンテナ
   */
  paginationContainer: { // ページボタン並び
    display: 'inline-flex', // 横並び
    gap: '5px' // 間隔
  },
  
  /**
   * 個別のページボタンスタイル
   * 【適用対象】1, 2, 3, 4, 5 の各数字ボタン
   */
  pageButton: { // ページボタン
    padding: '10px 15px', // 余白
    border: '1px solid #dee2e6', // 枠線
    borderRadius: '5px', // 角丸
    backgroundColor: '#f8f9fa', // 背景
    color: '#333', // 文字色
    cursor: 'pointer', // カーソル
    fontSize: '14px' // サイズ
  },
  
  /**
   * アクティブ（現在選択中）なページボタンのスタイル
   * 【適用対象】現在表示中のページに対応するボタン
   */
  pageButtonActive: { // アクティブページボタン
    backgroundColor: '#007bff', // 背景
    color: 'white', // 文字色
    fontWeight: 'bold' as const // 太字
  },
  
  // ==================== 投稿表示関連 ====================
  
  /**
   * 投稿番号（1, 2, 3...）の表示スタイル
   * 【デザイン】青色の円形背景に白文字
   */
  postNumber: { // 投稿番号
    backgroundColor: '#007bff', // 背景
    color: 'white', // 文字色
    borderRadius: '50%', // 円形
    width: '32px', // 幅
    height: '32px', // 高さ
    display: 'flex', // 配置
    alignItems: 'center', // 中央揃え（縦）
    justifyContent: 'center', // 中央揃え（横）
    fontSize: '14px', // サイズ
    fontWeight: 'bold' as const, // 太字
    flexShrink: 0 // 縮小しない
  },
  
  /**
   * 投稿全体のコンテナスタイル
   * 【レイアウト】投稿番号と投稿内容を横並びで配置
   */
  postContainer: { // 投稿コンテナ（横並び）
    display: 'flex', // 横並び
    alignItems: 'flex-start', // 上揃え
    gap: '15px' // 間隔
  },
  
  /**
   * 投稿内容エリアのスタイル
   * 【役割】投稿番号以外の部分（本文、ID など）を包含
   */
  postContent: { // 投稿内容エリア
    flex: 1 // 幅いっぱいに拡張
  },
  
  /**
   * 投稿IDの表示スタイル
   * 【適用対象】各投稿の識別ID表示
   * 【デザイン】小さなフォント、薄いグレー文字
   */
  postId: { // 投稿ID
    fontSize: '12px', // フォントサイズ
    color: '#868e96', // 文字色
    marginTop: '8px' // 上余白
  }
  
} as const; // 読み取り専用