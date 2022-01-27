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
  console.log(picture);
  return (
    <div className="image-item">
      <h1>{picture.title}</h1>
      <LazyImage url={picture.url} alt={picture.title} />
      <div className="image-item__actions">
        <Button onClick={() => onRemove(picture)} variant="contained">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ImageItem;
