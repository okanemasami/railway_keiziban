export const localCache = { // ユーザー定義: ローカルストレージ簡易キャッシュ
  get(key: string): string | null { // 値の取得
    return localStorage.getItem(key); // 文字列 or null を返す
  },
  set(key: string, value: string, ttlMs?: number): void { // 値の保存（TTL付き）
    localStorage.setItem(key, value); // 即時保存
    if (ttlMs && ttlMs > 0) { // TTLが有効なら期限で削除
      setTimeout(() => localStorage.removeItem(key), ttlMs); // 期限到来で削除
    }
  },
};

