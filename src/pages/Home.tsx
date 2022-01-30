import { useCallback, useEffect, useMemo, useState } from 'react';
import { Refresh } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { fetchApodPic } from '../api';
import ImageDetails from '../components/ImageDetails';
import NavBar from '../components/NavBar';
import { usePictures } from '../context/PictureContext';
import { generateUniqueDate } from '../helpers';
import { Picture } from '../models';

import './Home.scss';

const Home = () => {
  const {
    saveAlreadySeen,
    alreadySeen,
    isSaved,
    saveFavorite,
    deleteFavorite
  } = usePictures();
  const [picture, setPicture] = useState<Picture>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleNext = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const date = generateUniqueDate(alreadySeen.map((pic) => pic.date));
      const pic = await fetchApodPic(date);
      saveAlreadySeen(pic);
      setPicture(pic);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [alreadySeen, saveAlreadySeen]);

  useEffect(() => {
    handleNext();
  }, []);

  const isFav = useMemo(() => {
    if (!picture) {
      return;
    }
    return isSaved(picture.date);
  }, [isSaved, picture]);

  const toggleFav = useCallback(() => {
    if (!picture) {
      return;
    }
    if (!isFav) {
      saveFavorite(picture);
    } else {
      deleteFavorite(picture);
    }
  }, [isFav, saveFavorite, deleteFavorite, picture]);

  const content = useMemo(() => {
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
          <Button onClick={handleNext}>Retry</Button>
        </div>
      );
    }
    if (picture) {
      return <ImageDetails picture={picture} />;
    }
  }, [isError, isLoading, picture, handleNext]);

  return (
    <div className="home">
      <NavBar
        actions={
          <div>
            <Button href="/favorites" sx={{ color: 'white' }}>
              Favorites
            </Button>
            <Button sx={{ color: 'white' }} onClick={handleNext}>
              <Refresh />
            </Button>
            {((picture && !isLoading) || isError) && (
              <Button sx={{ color: 'white' }} onClick={toggleFav}>
                {isFav ? <StarIcon /> : <StarBorderIcon />}
              </Button>
            )}
          </div>
        }
      />
      {content}
    </div>
  );
};

export default Home;
