import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';
import { commonStyles } from '../../../styles/common.styles';
import { Button } from '../../../shared/components/Button';
import { useCreateThread } from '../hooks/useCreateThread';

export default function CreateThread() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const { createThread, loading } = useCreateThread();

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleSubmitClick = useCallback(async () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await createThread(trimmed);
    setTitle("");
    navigate(ROUTES.HOME);
  }, [createThread, title]);

  return (
    <div>
      <h1 style={commonStyles.title}>スレッド投稿</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '100%', marginTop: '20px', alignItems: 'center' }}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="スレッドタイトルを入力"
          style={{
            width: '200%',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px 12px',
            fontSize: '14px',
          }}
          disabled={loading}
        />

        <Button variant="primary" onClick={handleSubmitClick} disabled={loading}>
          スレッドを投稿
        </Button>
      </div>
    </div>
  );
}


