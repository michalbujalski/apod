import { FC } from 'react';
import { Picture } from '../models';

interface Props {
  picture: Picture;
  onRemove: (picture: Picture) => void;
}

const ImageItem: FC<Props> = ({ picture, onRemove }) => {
  return (
    <div>
      <img key={picture.date} src={picture.url} alt={picture.title} />;
      <button onClick={() => onRemove(picture)}>Remove</button>
    </div>
  );
};

export default ImageItem;
