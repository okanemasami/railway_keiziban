/**
 * 共通スタイル定義ファイル（作成者定義）
 * 
 * 【エクスポートするスタイルオブジェクト】
 * commonStyles: {
 *   container: CSSProperties - メインコンテナスタイル
 *   card: CSSProperties - カード型UIスタイル
 *   button: CSSProperties - ボタンスタイル
 *   title: CSSProperties - タイトルスタイル
 *   loading: CSSProperties - ローディング表示スタイル
 *   error: CSSProperties - エラー表示スタイル
 *   breadcrumb: CSSProperties - パンくずナビスタイル
 *   pagination: CSSProperties - ページネーションスタイル
 *   // 他多数のUIスタイル定義
 * }
 * 
 * 【使用するTypeScript標準機能】
 * - export const: 定数のエクスポート
 * - as const: 読み取り専用型の指定
 * 
 * 【使用するCSS標準機能】
 * - プロパティ: padding, margin, color, backgroundColor など
 * - 値: px単位、色コード、flexboxプロパティ など
 */

/**
 * 共通スタイル定義オブジェクト（作成者定義）
 * 
 * 【オブジェクトの内容】
 * レイアウト系、UI要素系、テキスト系、状態表示系、機能別スタイルを含む
 * 
 * 【TypeScript標準機能】
 * as const: オブジェクトを読み取り専用として型推論を厳密化
 */
export const commonStyles = {
  
  // ==================== レイアウト関連 ====================
  
  /**
   * メインコンテナのスタイル
   * 【適用対象】各ページ全体の外枠
   * 【効果】中央寄せ、最大幅制限、内側余白の設定
   */
  container: {
    padding: '20px',          // 内側の余白：上下左右20px
    maxWidth: '800px',        // 最大幅：800px（大画面でも適度な幅を保つ）
    margin: '0 auto'          // 外側余白：上下0、左右auto（水平中央揃え）
  },
  
  // ==================== リスト関連 ====================
  
  /**
   * リスト要素（ul, ol）のリセットスタイル
   * 【目的】ブラウザデフォルトのリストスタイルを除去
   */
  list: {
    listStyle: 'none' as const, // リストマーカー（• や 1. など）を非表示
    padding: 0,                 // デフォルトの内側余白をリセット
    margin: 0                   // デフォルトの外側余白をリセット
  },
  
  // ==================== カード・アイテム関連 ====================
  
  /**
   * カード型UI の基本スタイル
   * 【適用対象】スレッドアイテム、投稿アイテムなど
   * 【デザイン】白背景、薄いグレー枠線、角丸、適度な余白
   */
  card: {
    border: '1px solid #ddd',   // 枠線：1px、実線、薄いグレー（#ddd = RGB(221,221,221)）
    margin: '10px 0',           // 外側余白：上下10px、左右0
    padding: '15px',            // 内側余白：全方向15px
    borderRadius: '8px',        // 角丸：8px（現代的な見た目）
    backgroundColor: 'white'    // 背景色：白色
  },
  
  /**
   * クリック可能なカードの追加スタイル
   * 【適用対象】クリックして詳細画面に遷移するカード
   * 【効果】ホバー効果とクリック可能であることを示すカーソル
   */
  cardClickable: {
    cursor: 'pointer',            // マウスカーソル：ポインター（手のマーク）
    transition: 'all 0.2s ease'  // トランジション：全プロパティを0.2秒でスムーズに変化
  },
  
  // ==================== ボタン関連 ====================
  
  /**
   * ボタンの基本スタイル
   * 【適用対象】すべてのボタン要素
   * 【デザイン】適度な余白、枠線なし、角丸、ポインターカーソル
   */
  button: {
    padding: '10px 16px',               // 内側余白：上下10px、左右16px
    border: 'none',                     // 枠線：なし（ブラウザデフォルトを除去）
    borderRadius: '4px',                // 角丸：4px
    cursor: 'pointer',                  // カーソル：ポインター
    fontSize: '14px',                   // フォントサイズ：14px
    fontWeight: 'normal' as const,      // フォント太さ：通常
    textDecoration: 'none',             // テキスト装飾：なし（下線を除去）
    display: 'inline-block',            // 表示形式：インラインブロック
    textAlign: 'center' as const        // テキスト位置：中央揃え
  },
  
  /**
   * プライマリボタン（主要な操作）のスタイル
   * 【適用対象】「再試行」「決定」など重要なボタン
   * 【色】青色背景、白文字
   */
  buttonPrimary: {
    backgroundColor: '#007bff',  // 背景色：青色（Bootstrap のプライマリ色）
    color: 'white'               // 文字色：白色
  },
  
  /**
   * セカンダリボタン（補助的な操作）のスタイル
   * 【適用対象】「戻る」「キャンセル」など補助的なボタン
   * 【色】グレー系背景、白文字
   */
  buttonSecondary: {
    backgroundColor: '#6c757d',  // 背景色：グレー色
    color: 'white'               // 文字色：白色
  },
  
  /**
   * リンク風ボタンのスタイル
   * 【適用対象】パンくずナビのクリック可能項目など
   * 【見た目】通常のリンクのような青色下線テキスト
   */
  buttonLink: {
    backgroundColor: 'transparent', // 背景色：透明（背景なし）
    color: '#007bff',               // 文字色：青色
    textDecoration: 'underline',    // テキスト装飾：下線
    border: 'none',                 // 枠線：なし
    padding: 0,                     // 内側余白：なし
    cursor: 'pointer'               // カーソル：ポインター
  },
  
  // ==================== テキスト関連 ====================
  
  /**
   * ページタイトルのスタイル
   * 【適用対象】各ページのメインタイトル（h1要素）
   * 【デザイン】大きなフォント、太字、濃いグレー、下部余白
   */
  title: {
    margin: '0 0 10px 0',        // 外側余白：上0、右0、下10px、左0
    fontSize: '24px',            // フォントサイズ：24px（大きめ）
    color: '#333',               // 文字色：濃いグレー（黒に近い）
    fontWeight: 'bold' as const  // フォント太さ：太字
  },
  
  /**
   * サブタイトルのスタイル
   * 【適用対象】スレッドタイトルなど（h2, h3要素）
   * 【デザイン】中程度のフォント、太字、青色（クリック可能を示唆）
   */
  subtitle: {
    margin: '0 0 8px 0',         // 外側余白：下8px
    fontSize: '18px',            // フォントサイズ：18px
    color: '#007bff',            // 文字色：青色（リンクと同じ色でクリック可能を示唆）
    fontWeight: 'bold' as const  // フォント太さ：太字
  },
  
  /**
   * メタ情報（補助的な情報）のスタイル
   * 【適用対象】作成日時、投稿数などの付加情報
   * 【デザイン】小さなフォント、薄いグレー文字
   */
  meta: {
    color: '#666',     // 文字色：中程度のグレー（目立ちすぎない）
    fontSize: '14px',  // フォントサイズ：14px（小さめ）
    margin: 0          // 外側余白：なし
  },
  
  /**
   * 本文コンテンツのスタイル
   * 【適用対象】投稿内容、説明文など
   * 【デザイン】読みやすい行間、改行保持、適度な下部余白
   */
  content: {
    margin: '0 0 10px 0',         // 外側余白：下10px
    lineHeight: '1.6',            // 行間：1.6倍（読みやすさ向上）
    color: '#333',                // 文字色：濃いグレー
    whiteSpace: 'pre-wrap' as const // 空白と改行の扱い：改行とスペースを保持
  },
  
  // ==================== 状態表示関連 ====================
  
  /**
   * ローディング表示のスタイル
   * 【適用対象】「読み込み中...」などの待機メッセージ
   * 【デザイン】中央揃え、イタリック体、グレー文字
   */
  loading: {
    textAlign: 'center' as const, // テキスト位置：中央揃え
    color: '#666',                // 文字色：グレー
    fontStyle: 'italic' as const, // フォントスタイル：イタリック体（斜体）
    padding: '20px'               // 内側余白：全方向20px
  },
  
  /**
   * エラー表示のスタイル
   * 【適用対象】エラーメッセージの表示領域
   * 【デザイン】赤色系の背景と枠線で警告感を演出
   */
  error: {
    color: '#dc3545',               // 文字色：赤色（Bootstrap の danger 色）
    fontSize: '14px',               // フォントサイズ：14px
    padding: '15px',                // 内側余白：全方向15px
    backgroundColor: '#f8d7da',     // 背景色：薄い赤色
    border: '1px solid #f5c6cb',    // 枠線：濃い目の薄い赤色
    borderRadius: '4px',            // 角丸：4px
    margin: '10px 0'                // 外側余白：上下10px
  },
  
  /**
   * 空状態表示のスタイル
   * 【適用対象】「データがありません」などの空状態メッセージ
   * 【デザイン】中央揃え、イタリック体、控えめなグレー
   */
  empty: {
    textAlign: 'center' as const, // テキスト位置：中央揃え
    color: '#6c757d',             // 文字色：中程度のグレー
    fontStyle: 'italic' as const, // フォントスタイル：イタリック体
    padding: '40px 20px'          // 内側余白：上下40px、左右20px（大きめの余白）
  },
  
  // ==================== ナビゲーション関連 ====================
  
  /**
   * パンくずナビゲーションのスタイル
   * 【適用対象】「ホーム › カテゴリ › 商品」のような階層ナビ
   */
  breadcrumb: {
    marginBottom: '20px', // 下部余白：20px（後続コンテンツとの間隔）
    fontSize: '14px'      // フォントサイズ：14px（小さめ）
  },
  
  /**
   * パンくずナビゲーションの区切り文字スタイル
   * 【適用対象】「›」記号
   */
  breadcrumbSeparator: {
    margin: '0 8px', // 左右余白：8px（区切り文字の前後にスペース）
    color: '#666'    // 文字色：グレー（目立ちすぎない）
  },
  
  // ==================== ページネーション関連 ====================
  
  /**
   * ページネーション全体のコンテナスタイル
   */
  pagination: {
    textAlign: 'center' as const, // テキスト位置：中央揃え
    margin: '30px 0'              // 外側余白：上下30px（大きめの間隔）
  },
  
  /**
   * ページボタンを横並びにするコンテナ
   */
  paginationContainer: {
    display: 'inline-flex', // 表示形式：インラインフレックス（横並び）
    gap: '5px'              // 子要素間の間隔：5px
  },
  
  /**
   * 個別のページボタンスタイル
   * 【適用対象】1, 2, 3, 4, 5 の各数字ボタン
   */
  pageButton: {
    padding: '10px 15px',           // 内側余白：上下10px、左右15px
    border: '1px solid #dee2e6',    // 枠線：薄いグレー
    borderRadius: '5px',            // 角丸：5px
    backgroundColor: '#f8f9fa',     // 背景色：薄いグレー
    color: '#333',                  // 文字色：濃いグレー
    cursor: 'pointer',              // カーソル：ポインター
    fontSize: '14px'                // フォントサイズ：14px
  },
  
  /**
   * アクティブ（現在選択中）なページボタンのスタイル
   * 【適用対象】現在表示中のページに対応するボタン
   */
  pageButtonActive: {
    backgroundColor: '#007bff',     // 背景色：青色（選択状態を示す）
    color: 'white',                 // 文字色：白色（背景との対比）
    fontWeight: 'bold' as const     // フォント太さ：太字（強調）
  },
  
  // ==================== 投稿表示関連 ====================
  
  /**
   * 投稿番号（1, 2, 3...）の表示スタイル
   * 【デザイン】青色の円形背景に白文字
   */
  postNumber: {
    backgroundColor: '#007bff',     // 背景色：青色
    color: 'white',                 // 文字色：白色
    borderRadius: '50%',            // 角丸：50%（完全な円形）
    width: '32px',                  // 幅：32px
    height: '32px',                 // 高さ：32px（幅と同じで正円）
    display: 'flex',                // 表示形式：フレックス
    alignItems: 'center',           // 垂直位置：中央揃え
    justifyContent: 'center',       // 水平位置：中央揃え
    fontSize: '14px',               // フォントサイズ：14px
    fontWeight: 'bold' as const,    // フォント太さ：太字
    flexShrink: 0                   // フレックス縮小：なし（サイズ固定）
  },
  
  /**
   * 投稿全体のコンテナスタイル
   * 【レイアウト】投稿番号と投稿内容を横並びで配置
   */
  postContainer: {
    display: 'flex',          // 表示形式：フレックス（横並び）
    alignItems: 'flex-start', // 垂直位置：上揃え
    gap: '15px'               // 子要素間の間隔：15px
  },
  
  /**
   * 投稿内容エリアのスタイル
   * 【役割】投稿番号以外の部分（本文、ID など）を包含
   */
  postContent: {
    flex: 1 // フレックス伸縮：1（利用可能な幅を全て使用）
  },
  
  /**
   * 投稿IDの表示スタイル
   * 【適用対象】各投稿の識別ID表示
   * 【デザイン】小さなフォント、薄いグレー文字
   */
  postId: {
    fontSize: '12px',   // フォントサイズ：12px（小さめ）
    color: '#868e96',   // 文字色：薄いグレー（目立ちすぎない）
    marginTop: '8px'    // 上部余白：8px（本文との間隔）
  }
  
} as const; // 定数として固定（変更不可） 