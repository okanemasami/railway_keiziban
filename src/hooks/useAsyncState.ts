/**
 * 非同期処理の状態管理を行うカスタムフック（作成者定義）
 * 
 * 【このフックの目的】
 * API通信などの非同期処理で必要な「データ・ローディング・エラー」の
 * 3つの状態を統一的に管理する仕組みを提供
 * 
 * 【引数】
 * @param initialData: T | null - データの初期値（省略時は null）
 * 
 * 【戻り値】
 * AsyncState<T> & AsyncActions<T> - 状態と操作関数を含むオブジェクト
 * 
 * 【使用するReact標準機能】
 * - useState: 状態管理
 * - useCallback: 関数のメモ化
 * 
 * 【使用する作成者定義機能】
 * - formatErrorMessage: エラーメッセージの統一形式への変換
 */

// React標準フックをインポート
import { useState, useCallback } from 'react';

// 作成者定義のエラー処理ユーティリティをインポート
import { formatErrorMessage } from '../utils/errorUtils';

/**
 * 非同期処理の状態を表すインターフェース（作成者定義）
 * 
 * 【型定義の内容】
 * - data: T | null - 取得したデータ（初期値や失敗時は null）
 * - loading: boolean - 読み込み中かどうかのフラグ
 * - error: string | null - エラーメッセージ（エラーなしの場合は null）
 */
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * 非同期処理を制御するアクション関数群を表すインターフェース（作成者定義）
 * 
 * 【関数の定義】
 * - setData: (data: T) => void - データを直接設定
 * - setLoading: (loading: boolean) => void - ローディング状態を設定
 * - setError: (error: string | null) => void - エラー状態を設定
 * - execute: (asyncFn: () => Promise<T>, defaultErrorMessage?: string) => Promise<void> - 非同期処理を実行
 * - reset: () => void - すべての状態を初期化
 */
interface AsyncActions<T> {
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  execute: (asyncFn: () => Promise<T>, defaultErrorMessage?: string) => Promise<void>;
  reset: () => void;
}

/**
 * 非同期処理の状態管理を行うカスタムフック（作成者定義）
 * 
 * 【引数】
 * @param initialData: T | null - データの初期値（省略時は null）
 * 
 * 【戻り値】
 * AsyncState<T> & AsyncActions<T> - 状態（data, loading, error）と操作関数を含むオブジェクト
 * 
 * 【使用するReact標準フック】
 * - useState: コンポーネント状態の管理
 * - useCallback: 関数のメモ化（不要な再作成を防止）
 */
export const useAsyncState = <T>(initialData: T | null = null): AsyncState<T> & AsyncActions<T> => {
  
  // React標準フック useState でデータの状態管理
  // 引数: T | null（初期値）, 戻り値: [現在の値, 更新関数]
  const [data, setData] = useState<T | null>(initialData);
  
  // React標準フック useState でローディング状態の管理
  // 引数: boolean（初期値: false）, 戻り値: [現在の値, 更新関数]
  const [loading, setLoading] = useState(false);
  
  // React標準フック useState でエラー状態の管理
  // 引数: string | null（初期値: null）, 戻り値: [現在の値, 更新関数]
  const [error, setError] = useState<string | null>(null);

  /**
   * 非同期処理を実行する関数（作成者定義）
   * 
   * 【引数】
   * @param asyncFn: () => Promise<T> - 実行する非同期処理の関数（Promiseを返す）
   * @param defaultErrorMessage: string - エラー時に表示するデフォルトメッセージ（省略可）
   * 
   * 【戻り値】
   * Promise<void> - 処理完了を示すPromise
   * 
   * 【使用するReact標準フック】
   * - useCallback: 関数のメモ化（依存配列が変更された時のみ再作成）
   * 
   * 【使用する作成者定義関数】
   * - formatErrorMessage: エラーメッセージの統一形式への変換
   */
  const execute = useCallback(async (
    asyncFn: () => Promise<T>, 
    defaultErrorMessage = '処理中にエラーが発生しました'
  ) => {
    // JavaScript標準 try-catch文でエラーハンドリング
    try {
      // 作成者定義関数 setLoading（React useState由来）でローディング開始
      setLoading(true);
      // 作成者定義関数 setError（React useState由来）で前回のエラーをクリア
      setError(null);
      
      // JavaScript標準 await で非同期処理の完了を待機
      const result = await asyncFn();
      
      // 作成者定義関数 setData（React useState由来）で取得データを状態に保存
      setData(result);
      
    } catch (err) {
      // 作成者定義関数 formatErrorMessage でエラーメッセージを統一形式に変換
      const errorMessage = formatErrorMessage(err, defaultErrorMessage);
      
      // 作成者定義関数 setError（React useState由来）でエラー状態を設定
      setError(errorMessage);
      
      // 作成者定義関数 setData（React useState由来）でデータをクリア
      setData(null);
      
    } finally {
      // JavaScript標準 finally節（成功・失敗に関わらず実行）
      // 作成者定義関数 setLoading（React useState由来）でローディング終了
      setLoading(false);
    }
  }, []); // 依存配列空 = 関数は1回のみ作成、再作成されない

  /**
   * すべての状態を初期値にリセットする関数（作成者定義）
   * 
   * 【引数】
   * なし
   * 
   * 【戻り値】
   * void - 戻り値なし
   * 
   * 【使用するReact標準フック】
   * - useCallback: 関数のメモ化（initialDataが変更された時のみ再作成）
   */
  const reset = useCallback(() => {
    // 作成者定義関数 setData（React useState由来）でデータを初期値に戻す
    setData(initialData);
    // 作成者定義関数 setLoading（React useState由来）でローディングを停止
    setLoading(false);
    // 作成者定義関数 setError（React useState由来）でエラーをクリア
    setError(null);
  }, [initialData]); // 依存配列: initialData変更時のみ関数を再作成

  /**
   * フックの戻り値（作成者定義）
   * 
   * 【戻り値の内容】
   * - data: T | null - 取得したデータ
   * - loading: boolean - 読み込み中フラグ
   * - error: string | null - エラーメッセージ
   * - setData: (data: T) => void - データ直接設定関数
   * - setLoading: (loading: boolean) => void - ローディング状態設定関数
   * - setError: (error: string | null) => void - エラー状態設定関数
   * - execute: (asyncFn: () => Promise<T>, defaultErrorMessage?: string) => Promise<void> - 非同期処理実行関数
   * - reset: () => void - 状態リセット関数
   */
  return {
    // React useState由来の状態値
    data,
    loading,
    error,
    
    // React useState由来の状態更新関数 + 作成者定義の操作関数
    setData,
    setLoading,
    setError,
    execute,
    reset
  };
}; 