import './App.css' // 画面全体のCSS

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // React Router標準: ルーター要素

import ThreadList from './features/threads/components/ThreadList' // ユーザー定義: スレッド一覧画面
import PostList from './features/threads/components/PostList' // ユーザー定義: 投稿一覧画面
import CreateThread from './features/threads/components/CreateThread' // ユーザー定義: スレッド作成画面
import { ROUTES } from './constants' // ユーザー定義: ルーティング定数

import { commonStyles } from './styles/common.styles' // ユーザー定義: 共通スタイル

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
function App() { // アプリの最上位コンポーネント
  return (
    <Router> {/* ルーティングコンテナ */}
      <div style={commonStyles.container}> {/* 共通コンテナスタイル */}
        <Routes> {/* ルート定義の集合 */}
          <Route path={ROUTES.HOME} element={<ThreadList />} /> {/* ホーム=スレッド一覧 */}
          <Route path={ROUTES.THREAD_POSTS(':threadId')} element={<PostList />} /> {/* 投稿一覧（動的ID） */}
          <Route path={ROUTES.CREATE_THREAD} element={<CreateThread />} /> {/* スレッド作成 */}
        </Routes>
      </div>
    </Router>
  )
}

// このコンポーネントを他のファイルから使用できるようにエクスポート
// 【export default】このファイルのメイン要素として外部に公開
export default App // デフォルトエクスポート
