import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePictures } from '../context/PictureContext';

const Favorites = () => {
  const { favorites } = usePictures();
  const favs = useMemo(() => {
    return favorites.map((fav) => {
      return <img key={fav.date} src={fav.url} alt={fav.title} />;
    });
  }, [favorites]);
  return (
    <div>
      <Link to="/">Home</Link>
      {favs}
    </div>
  );
};

export default Favorites;
