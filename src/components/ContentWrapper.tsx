import { Button, CircularProgress } from '@mui/material';
import { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
  isLoading: boolean;
  isError: boolean;
  handleRetry: () => void;
}
const ContentWrapper: FC<Props> = ({
  children,
  isLoading,
  isError,
  handleRetry
}) => {
  if (isLoading) {
    return (
      <div className="progress-wrapper">
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="error">
        <div>There was an error fetching picture info</div>
        <Button onClick={handleRetry}>Retry</Button>
      </div>
    );
  }
  return children;
};

export default ContentWrapper;
