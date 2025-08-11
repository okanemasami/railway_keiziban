// カスタムフック: 非同期処理の状態管理を行う（ユーザー定義）

import { useState, useCallback } from 'react'; // React標準: useState（状態管理）, useCallback（関数のメモ化）

import { formatErrorMessage } from '../utils/errorUtils'; // ユーザー定義: エラーメッセージ整形ユーティリティ

interface AsyncState<T> { // ユーザー定義: 非同期状態（値/ローディング/エラー）
  data: T | null; // 取得値
  loading: boolean; // 読み込み中フラグ
  error: string | null; // エラーメッセージ
}

interface AsyncActions<T> { // ユーザー定義: 非同期操作（セッター/実行/リセット）
  setData: (data: T) => void; // 値を直接設定
  setLoading: (loading: boolean) => void; // 読み込み中の設定
  setError: (error: string | null) => void; // エラーの設定
  execute: (asyncFn: () => Promise<T>, defaultErrorMessage?: string) => Promise<void>; // 非同期実行
  reset: () => void; // 状態のリセット
}

export const useAsyncState = <T>(initialData: T | null = null): AsyncState<T> & AsyncActions<T> => { // ユーザー定義: 非同期状態管理フック
  
  // React標準フック useState でデータの状態管理
  // 引数: T | null（初期値）, 戻り値: [現在の値, 更新関数]
  const [data, setData] = useState<T | null>(initialData); // 値の状態
  
  // React標準フック useState でローディング状態の管理
  // 引数: boolean（初期値: false）, 戻り値: [現在の値, 更新関数]
  const [loading, setLoading] = useState(false); // 読み込み中状態
  
  // React標準フック useState でエラー状態の管理
  // 引数: string | null（初期値: null）, 戻り値: [現在の値, 更新関数]
  const [error, setError] = useState<string | null>(null); // エラー状態

  const execute = useCallback(async (
    asyncFn: () => Promise<T>, // 実行する非同期関数
    defaultErrorMessage = '処理中にエラーが発生しました' // 既定のエラーメッセージ
  ) => {
    // JavaScript標準 try-catch文でエラーハンドリング
    try {
      // 作成者定義関数 setLoading（React useState由来）でローディング開始
      setLoading(true); // ローディング開始
      // 作成者定義関数 setError（React useState由来）で前回のエラーをクリア
      setError(null); // 既存のエラーをクリア
      
      // JavaScript標準 await で非同期処理の完了を待機
      const result = await asyncFn(); // 非同期処理の実行
      
      // 作成者定義関数 setData（React useState由来）で取得データを状態に保存
      setData(result); // 結果を保存
      
    } catch (err) {
      // 作成者定義関数 formatErrorMessage でエラーメッセージを統一形式に変換
      const errorMessage = formatErrorMessage(err, defaultErrorMessage); // エラーメッセージを整形
      
      // 作成者定義関数 setError（React useState由来）でエラー状態を設定
      setError(errorMessage); // エラー状態を設定
      
      // 作成者定義関数 setData（React useState由来）でデータをクリア
      setData(null); // 失敗時は値をリセット
      
    } finally {
      // JavaScript標準 finally節（成功・失敗に関わらず実行）
      // 作成者定義関数 setLoading（React useState由来）でローディング終了
      setLoading(false); // ローディング終了
    }
  }, []); // 依存配列空: 関数は1回のみ作成

  const reset = useCallback(() => { // すべての状態を初期値に戻す
    setData(initialData); // 値を初期化
    setLoading(false); // ローディングを停止
    setError(null); // エラーをクリア
  }, [initialData]); // 依存配列: initialData 変更時のみ再生成

  return { // フックの戻り値（状態と操作関数）
    data, // 値
    loading, // 読み込み中
    error, // エラー
    setData, // 値の設定
    setLoading, // 読み込み中の設定
    setError, // エラーの設定
    execute, // 非同期実行
    reset, // リセット
  };
};