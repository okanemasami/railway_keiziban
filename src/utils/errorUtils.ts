export const formatErrorMessage = (error: unknown, defaultMessage: string): string => { // エラーメッセージを統一
  if (error instanceof Error) {
    return error.message; // Error の場合は詳細メッセージ
  }
  return defaultMessage; // それ以外はデフォルト
};

export const isApiError = (error: unknown): error is { message: string } => { // 型ガード: APIエラー判定
  if (error instanceof Error) {
    return true; // Error は message を持つ
  }
  return (
    typeof error === 'object' && // オブジェクト
    error !== null && // null でない
    'message' in error // message プロパティを持つ
  );
};