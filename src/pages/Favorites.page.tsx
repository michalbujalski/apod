import { Grid } from '@mui/material';
import { useMemo } from 'react';
import ImageItem from '../components/ImageItem';
import NavBar from '../components/NavBar';
import { usePictures } from '../context/PictureContext';

const Favorites = () => {
  const { favorites, deleteFavorite } = usePictures();

  const favs = useMemo(() => {
    return favorites.map((fav) => {
      return (
        <Grid key={fav.date}>
          <ImageItem picture={fav} onRemove={deleteFavorite} />
        </Grid>
      );
    });
  }, [favorites, deleteFavorite]);
  return (
    <div>
      <NavBar backUrl="/" />
      <Grid container>{favs}</Grid>
    </div>
  );
};

export default Favorites;
