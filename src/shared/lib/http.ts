export interface RequestOptions { // ユーザー定義: リクエスト設定
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // HTTPメソッド
  body?: unknown; // リクエストボディ
  headers?: Record<string, string>; // 追加ヘッダー
}

export async function fetchWithErrorHandling<T>( // 共通HTTP: エラーハンドリング付きfetch
  url: string, // リクエストURL
  options: RequestOptions = {} // 設定（省略可）
): Promise<T> { // 戻り値: T 型のデータ
  const { method = 'GET', body, headers = {} } = options; // 設定の展開（デフォルトGET）
  const init: RequestInit = {
    method, // メソッド
    headers: {
      'Content-Type': 'application/json', // JSON送受信用ヘッダー
      Accept: 'application/json', // 受理するコンテンツ
      ...headers, // 追加ヘッダーの上書き
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}), // bodyがあればJSON化
  };

  const response = await fetch(url, init); // fetch標準APIで送信

  if (!response.ok) { // ステータス異常時はエラー
    throw new Error(`サーバーとの通信でエラーが発生しました (Status: ${response.status})`); // メッセージ
  }

  return response.json(); // JSONとして返却
}

