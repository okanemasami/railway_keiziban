export interface Thread {
  id: string;
  title: string;
  createdAt: string;
}

export async function getThreads(offsetValue: number): Promise<Thread[]> {
  const url = `https://railway.bulletinboard.techtrain.dev/threads?offset=${offsetValue}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const threadsData = await response.json();
    console.log('APIレスポンス:', threadsData); // デバッグ用ログ
    
    // レスポンスが配列であることを確認
    if (!Array.isArray(threadsData)) {
      throw new Error('APIレスポンスが期待された配列形式ではありません');
    }
    
    return threadsData;

  } catch (error) {
    console.error('スレッドデータの取得に失敗しました:', error);
    throw error;
  }
}