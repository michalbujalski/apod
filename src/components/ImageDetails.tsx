import { FC, useCallback, useMemo } from 'react';
import { Picture } from '../models';
import './ImageDetails.scss';
import LazyImage from './LazyImage';
import { usePictures } from '../context/PictureContext';

interface Props {
  picture: Picture;
}
const ImageDetails: FC<Props> = ({ picture }) => {
  const { isSaved, saveFavorite, deleteFavorite } = usePictures();

  return (
    <div className="image-details">
      <h1 className="title">{picture.title}</h1>
      <div>
        <h3 className="date">{picture.date}</h3>
      </div>
      <LazyImage url={picture.url} alt={picture.title} />
      <p>{picture.explanation}</p>
    </div>
  );
};

export default ImageDetails;
