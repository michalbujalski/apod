import { Button, CircularProgress } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import './LazyImage.scss';
interface Props {
  url: string;
  alt: string;
}

const LazyImage: FC<Props> = ({ url, alt }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setError(null);
    setIsLoading(true);
  }, [url]);
  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
  }, [setIsLoading, setError]);
  return (
    <div className="lazy-image">
      {isLoading && <CircularProgress />}
      {error}
      {!error && (
        <img
          alt={alt}
          src={url}
          onError={() => {
            setError('Could not load image:');
            setIsLoading(false);
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
          className="image full"
          style={{ display: isLoading ? 'none' : 'inherit' }}
        />
      )}
      {error && <Button onClick={handleRetry}>Retry</Button>}
    </div>
  );
};

export default LazyImage;
