import { Grid } from '@mui/material';
import { useMemo } from 'react';
import ImageItem from '../components/ImageItem';
import NavBar from '../components/NavBar';
import { usePictures } from '../context/PictureContext';

import './Favorites.page.scss';

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
    <div className="favorites-page">
      <NavBar backUrl="/" />
      <Grid container justifyContent="center">
        {favs}{' '}
      </Grid>
    </div>
  );
};

export default Favorites;
