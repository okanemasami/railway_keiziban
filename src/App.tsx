/**
 * Reactアプリケーションのメインコンポーネント（最上位コンポーネント）
 * 
 * 【このファイルの役割】
 * - アプリケーション全体の構造を定義する「親」となるコンポーネント
 * - URL（アドレス）に応じて、どの画面を表示するかを決める「ルーター」の設定
 * - すべての子コンポーネントを包括する「コンテナ」の役割
 * 
 * 【SPA（Single Page Application）について】
 * SPA = 1つのHTMLファイルで複数の画面を切り替えるウェブアプリの仕組み
 * 従来のウェブサイトとは違い、ページ遷移時に画面全体を再読み込みしない
 * → 高速で滑らかなユーザー体験を実現
 */

// CSSスタイルファイルの読み込み
// './App.css' = 同じディレクトリにあるApp.cssファイルを適用
import './App.css'

// React Router（ルーティングライブラリ）の必要なコンポーネントを読み込み
// 【React Routerとは？】URLの変更に応じて表示するコンポーネントを切り替える仕組み
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// アプリケーションで使用する各画面コンポーネントの読み込み
import ThreadList from './components/ThreadList' // スレッド一覧画面
import PostList from './components/PostList'     // 投稿詳細画面

// 共通スタイル定義の読み込み
import { commonStyles } from './styles/common.styles'

/**
 * アプリケーションのメイン関数コンポーネント
 * 
 * 【関数コンポーネントとは？】
 * React 16.8以降で推奨される形式のコンポーネント作成方法
 * 「function キーワード + return文でJSXを返す」シンプルな構造
 * 
 * 【JSXとは？】
 * JavaScript + XML の略。HTMLのような記法でReactコンポーネントを記述する構文
 * 実際はJavaScriptにコンパイル（変換）されて実行される
 */
function App() {
  return (
    // Router: アプリケーション全体をルーティング機能で包む最上位コンポーネント
    // 【BrowserRouter as Router】BrowserRouterに「Router」という短い名前を付けて使用
    <Router>
      {/* アプリケーション全体のコンテナDiv */}
      {/* style={commonStyles.container}: 共通スタイルの適用 */}
      <div style={commonStyles.container}>
        {/* Routes: 複数のルート（URL → コンポーネントの対応）をまとめるコンテナ */}
        <Routes>
          {/* Route: 個別のルート定義。pathとelementでURL→コンポーネントの対応を設定 */}
          
          {/* ホーム画面（スレッド一覧）のルート設定 */}
          {/* path="/" = ルートURL（例：https://example.com/）でアクセスした時 */}
          {/* element={<ThreadList />} = ThreadListコンポーネントを表示 */}
          <Route path="/" element={<ThreadList />} />
          
          {/* 投稿詳細画面のルート設定 */}
          {/* path="/threads/:threadId/posts" = 動的ルート（:threadIdは変数） */}
          {/* 例："/threads/abc123/posts" → threadId="abc123"として取得可能 */}
          {/* element={<PostList />} = PostListコンポーネントを表示 */}
          <Route path="/threads/:threadId/posts" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  )
}

// このコンポーネントを他のファイルから使用できるようにエクスポート
// 【export default】このファイルのメイン要素として外部に公開
export default App
