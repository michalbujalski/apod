import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ImageItem from '../components/ImageItem';
import { usePictures } from '../context/PictureContext';

const Favorites = () => {
  const { favorites, deleteFavorite } = usePictures();

  const favs = useMemo(() => {
    return favorites.map((fav) => {
      return <ImageItem picture={fav} onRemove={deleteFavorite} />;
    });
  }, [favorites, deleteFavorite]);
  return (
    <div>
      <Link to="/">Home</Link>
      {favs}
    </div>
  );
};

export default Favorites;
