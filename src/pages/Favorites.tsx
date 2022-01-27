import { Grid } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ImageItem from '../components/ImageItem';
import { usePictures } from '../context/PictureContext';

const Favorites = () => {
  const { favorites, deleteFavorite } = usePictures();

  const favs = useMemo(() => {
    return favorites.map((fav) => {
      return (
        <Grid>
          <ImageItem picture={fav} onRemove={deleteFavorite} />
        </Grid>
      );
    });
  }, [favorites, deleteFavorite]);
  return (
    <div>
      <Link to="/">Home</Link>
      <Grid container>{favs}</Grid>
    </div>
  );
};

export default Favorites;
