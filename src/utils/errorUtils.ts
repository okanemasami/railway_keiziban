/**
 * エラーハンドリング（エラー処理）に関するユーティリティ関数集（作成者定義）
 * 
 * 【エクスポートする関数】
 * - formatErrorMessage: (error: unknown, defaultMessage: string) => string - エラーメッセージの統一形式への変換
 * - isApiError: (error: unknown) => boolean - APIエラーの判定
 * 
 * 【使用するJavaScript標準機能】
 * - Error: エラーオブジェクト
 * - typeof: 型判定
 * - instanceof: インスタンス判定
 * 
 * 【使用する作成者定義型】
 * - ApiError: APIエラーレスポンスの型定義（threadService.tsから）
 */

/**
 * エラーメッセージを統一的に変換するユーティリティ関数（作成者定義）
 * 
 * 【引数】
 * @param error: unknown - 発生したエラー（型は不明）
 * @param defaultMessage: string - エラーの詳細が取得できない場合のデフォルトメッセージ
 * 
 * 【戻り値】
 * string - ユーザーに表示するエラーメッセージ
 * 
 * 【使用するJavaScript標準機能】
 * - instanceof: Error インスタンスの判定
 * - typeof: オブジェクト型の判定
 * - hasOwnProperty: プロパティ存在確認
 * - JSON.stringify: オブジェクトの文字列化
 * 
 * 【処理の流れ】
 * 1. errorがError型（標準的なJavaScriptエラー）かどうかをチェック
 * 2. Error型の場合：error.message（詳細なエラー内容）を返す
 * 3. それ以外の場合：defaultMessage（デフォルトメッセージ）を返す
 */
export const formatErrorMessage = (error: unknown, defaultMessage: string): string => {
  // instanceof演算子：errorがError型のインスタンス（実例）かどうかを判定
  // Error型の場合、messageプロパティに詳細なエラー内容が格納されている
  if (error instanceof Error) {
    return error.message; // Error型のmessageプロパティを取得して返す
  }
  
  // Error型でない場合（文字列、数値、nullなど）は、デフォルトメッセージを返す
  // 【なぜこの処理が必要？】
  // JavaScriptでは「throw 'エラー'」や「throw 123」など、Error型以外も投げられるため
  return defaultMessage;
};

/**
 * APIエラーかどうかを判定する関数（型ガード関数）
 * 
 * 【この関数の役割】
 * - 受け取ったエラーがAPI通信由来のエラーかどうかを判定
 * - TypeScriptの「型ガード」機能を提供（型の安全性を向上）
 * - エラーの種類に応じた適切な処理分岐を可能にする
 * 
 * 【型ガード関数とは？】
 * TypeScriptで「この条件を満たせば、この型である」ことを保証する関数
 * 戻り値の型に「is」を使って型を限定する特殊な関数
 * 
 * 【引数の説明】
 * @param error - 判定対象のエラー（型は不明：unknown）
 * 
 * 【戻り値】
 * @returns boolean - APIエラーの場合true、それ以外false
 *          戻り値の型「error is { message: string }」は型ガード構文
 *          trueが返された場合、errorは必ずmessageプロパティを持つオブジェクト
 * 
 * 【判定条件】
 * 以下のいずれかに該当する場合、APIエラーと判定：
 * 1. Error型のインスタンス（標準的なJavaScriptエラー）
 * 2. オブジェクト型で、messageプロパティを持つ（カスタムAPIエラー）
 */
export const isApiError = (error: unknown): error is { message: string } => {
  // 条件1：Error型のインスタンスかどうかをチェック
  // 【例】new Error('通信エラー')で作成されたエラー
  if (error instanceof Error) {
    return true; // Error型は確実にmessageプロパティを持つため、true
  }
  
  // 条件2：オブジェクト型で、messageプロパティを持つかどうかをチェック
  // 【例】{ message: 'APIエラーが発生しました', code: 500 }のようなカスタムエラー
  return (
    typeof error === 'object' &&     // errorがオブジェクト型である
    error !== null &&                // errorがnullでない（nullもobject型のため除外）
    'message' in error                // errorにmessageプロパティが存在する
  );
}; 