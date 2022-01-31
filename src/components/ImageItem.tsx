import { Button } from '@mui/material';
import { FC } from 'react';
import { Picture } from '../models';
import './ImageItem.scss';
import LazyImage from './LazyImage';
interface Props {
  picture: Picture;
  onRemove: (picture: Picture) => void;
}

const ImageItem: FC<Props> = ({ picture, onRemove }) => {
  return (
    <div className="image-item">
      <h1 className="title">{picture.title}</h1>
      <LazyImage url={picture.url} alt={picture.title} />
      <div className="actions">
        <Button onClick={() => onRemove(picture)}>Remove</Button>
        <Button href={`/favorites/${picture.date}`} variant="contained">
          Details
        </Button>
      </div>
    </div>
  );
};

export default ImageItem;
