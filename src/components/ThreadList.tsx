/**
 * スレッド一覧表示コンポーネント
 * 
 * 【このコンポーネントの役割】
 * - 掲示板のスレッド（話題）一覧を表示するメイン画面
 * - ページネーション（ページ分割）機能付きでスレッドを表示
 * - スレッドクリック時の詳細画面への遷移を制御
 * - ローディング・エラー・空状態の表示を管理
 * 
 * 【UI構成】
 * 1. ページタイトル「スレッド一覧」
 * 2. スレッドのリスト（カード形式）
 * 3. ページネーション（1,2,3,4,5ページのボタン）
 * 4. 状態に応じた表示（読み込み中、エラー、データなし）
 */

// React フックの読み込み
// useEffect: コンポーネントの表示時に処理を実行するフック
// useCallback: 関数を最適化（メモ化）するフック
import { useEffect, useCallback } from 'react';

// カスタムフック（独自作成したフック）の読み込み
import { useThreads } from '../hooks/useThreads';

// 再利用可能な共通UIコンポーネントの読み込み
import { Loading, ErrorDisplay, EmptyState } from './common/LoadingErrorDisplay';
import { Pagination } from './common/Pagination';

// スタイルとユーティリティ関数の読み込み
import { commonStyles } from '../styles/common.styles';
import { formatDate } from '../utils/dateUtils';
import { UI } from '../constants';

/**
 * スレッド一覧表示コンポーネント
 * 
 * 【関数コンポーネントの基本構造】
 * 1. 必要なフック・データの初期化
 * 2. イベントハンドラー（ユーザー操作に対する処理）の定義
 * 3. 副作用（useEffect）の設定
 * 4. 条件分岐による表示内容の決定
 * 5. JSXのreturn
 */
export default function ThreadList() {
  // カスタムフック useThreads からスレッド関連の状態と操作関数を取得
  // 【分割代入】オブジェクトから必要な値だけを個別の変数として取り出す記法
  const {
    threads,           // スレッドデータの配列
    loading,           // 読み込み中かどうかのフラグ（boolean）
    error,             // エラーメッセージ（string | null）
    currentPage,       // 現在表示中のページ番号
    handlePageChange,  // ページ変更時の処理関数
    handleThreadClick, // スレッドクリック時の処理関数
    initialize        // 初期データ読み込み関数
  } = useThreads();

  /**
   * スレッドアイテムのマウスホバー効果（マウスを乗せた時の効果）
   * 
   * 【useCallbackの目的】
   * 関数を「メモ化」して、不要な再作成を防ぐ
   * → パフォーマンス向上とReactの再レンダリング最適化
   * 
   * 【引数の解説】
   * e: React.MouseEvent<HTMLLIElement> = liタグでのマウスイベント情報
   * 
   * 【処理内容】
   * マウスが要素上に乗った時に、背景色と枠線色をホバー用の色に変更
   */
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    // e.currentTarget = イベントが設定された要素（この場合はli要素）
    // .style = その要素のCSSスタイルを直接操作
    e.currentTarget.style.backgroundColor = UI.HOVER_COLORS.BACKGROUND; // 背景色を薄いグレーに
    e.currentTarget.style.borderColor = UI.HOVER_COLORS.BORDER;         // 枠線色を青色に
  }, []); // 依存配列が空 = この関数は1回だけ作成され、再作成されない

  /**
   * スレッドアイテムのマウスリーブ効果（マウスが離れた時の効果）
   * 
   * 【処理内容】
   * マウスが要素から離れた時に、背景色と枠線色を通常の色に戻す
   */
  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = UI.DEFAULT_COLORS.BACKGROUND; // 背景色を白色に戻す
    e.currentTarget.style.borderColor = UI.DEFAULT_COLORS.BORDER;         // 枠線色を薄いグレーに戻す
  }, []); // 依存配列が空 = この関数は1回だけ作成され、再作成されない

  /**
   * 副作用（Side Effect）の設定
   * 
   * 【useEffectとは？】
   * コンポーネントのライフサイクル（生成・更新・破棄）に合わせて処理を実行するフック
   * 
   * 【この useEffect の役割】
   * コンポーネントが初回レンダリング（画面に表示）された時に、
   * 初期データ（スレッド一覧）を読み込む
   * 
   * 【依存配列 [initialize] の意味】
   * initialize 関数が変更された時のみ、この useEffect を再実行する
   * 通常は初回レンダリング時の1回のみ実行される
   */
  useEffect(() => {
    initialize(); // スレッドデータの初期読み込みを実行
  }, [initialize]);

  // 【条件分岐による表示制御】
  // React では、条件に応じて異なるJSXを返すことで表示内容を切り替える

  // 読み込み中の場合：ローディング表示
  if (loading) {
    return <Loading />; // 共通のローディングコンポーネントを表示
  }

  // エラーが発生した場合：エラー表示
  if (error) {
    // onRetry={initialize}: 「再試行」ボタンが押された時に初期化処理を実行
    return <ErrorDisplay message={error} onRetry={initialize} />;
  }

  // 正常な場合：メインコンテンツを表示
  return (
    <div>
      {/* ページタイトル */}
      <h1 style={commonStyles.title}>スレッド一覧</h1>
      
      {/* スレッドデータの存在チェック */}
      {/* !threads: threadsがnull/undefined の場合 */}
      {/* threads.length === 0: 空配列の場合 */}
      {!threads || threads.length === 0 ? (
        // データが存在しない場合：空状態表示
        <EmptyState message="スレッドが見つかりません" />
      ) : (
        // データが存在する場合：スレッド一覧とページネーションを表示
        <>
          {/* <> と </> は React.Fragment の省略記法 */}
          {/* 複数の要素を1つのコンポーネントとして返す時に使用 */}
          
          {/* スレッド一覧のリスト表示 */}
          <ul style={commonStyles.list}>
            {/* threads.map(): 配列の各要素（thread）に対してJSXを生成 */}
            {/* 【mapメソッド】配列の各要素を変換して新しい配列を作成する関数 */}
            {threads.map((thread) => (
              // 各スレッドアイテムのli要素
              <li 
                key={thread.id} // React で配列を描画する際に必要な一意のkey
                style={{
                  // スプレッド演算子（...）で複数のスタイルオブジェクトを結合
                  ...commonStyles.card,        // 基本的なカードスタイル
                  ...commonStyles.cardClickable // クリック可能な要素のスタイル
                }}
                // イベントハンドラーの設定
                onClick={() => handleThreadClick(thread.id)} // クリック時：詳細画面へ遷移
                onMouseEnter={handleMouseEnter}              // マウスホバー時：色変更
                onMouseLeave={handleMouseLeave}              // マウスリーブ時：色戻し
              >
                {/* スレッドタイトル表示 */}
                <h3 style={commonStyles.subtitle}>
                  {thread.title} → {/* → 矢印でクリック可能であることを示唆 */}
                </h3>
                
                {/* スレッド作成日時表示 */}
                <p style={commonStyles.meta}>
                  作成日時: {formatDate(thread.createdAt)} {/* 日付を日本語形式でフォーマット */}
                </p>
              </li>
            ))}
          </ul>
          
          {/* ページネーション（ページ切り替え）コンポーネント */}
          <Pagination
            currentPage={currentPage}        // 現在のページ番号
            onPageChange={handlePageChange}  // ページ変更時の処理関数
            disabled={loading}               // 読み込み中はボタンを無効化
          />
        </>
      )}
    </div>
  );
}