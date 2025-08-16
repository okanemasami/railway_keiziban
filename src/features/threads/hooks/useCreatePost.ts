import { useCallback } from 'react';
import { useAsyncState } from '../../../hooks/useAsyncState';
import { createPost as createPostApi } from '../../threads/api/threads';
import type { Post } from '../types';

interface CreatePostHookReturn {
  loading: boolean;
  error: string | null;
  createdPost: Post | null;
  createPost: (post: string) => Promise<void>;
}

export const useCreatePost = (threadId: string | undefined): CreatePostHookReturn => {
  const { data, loading, error, execute } = useAsyncState<Post>();

  const handleCreatePost = useCallback(
    async (post: string): Promise<void> => {
      if (!threadId) {
        throw new Error('スレッドIDが指定されていません');
      }
      const trimmed = post.trim();
      if (!trimmed) {
        throw new Error('投稿内容を入力してください');
      }
      await execute(
        () => createPostApi(threadId, trimmed),
        '投稿の作成中にエラーが発生しました'
      );
    },
    [execute, threadId]
  );

  return {
    loading,
    error,
    createdPost: data,
    createPost: handleCreatePost,
  };
};


