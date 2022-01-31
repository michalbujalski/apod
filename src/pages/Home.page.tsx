import { useCallback, useEffect, useMemo, useState } from 'react';
import { Refresh } from '@mui/icons-material';
import { Button } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { fetchApodPic } from '../api';
import ImageDetails from '../components/ImageDetails';
import NavBar from '../components/NavBar';
import { usePictures } from '../context/PictureContext';
import { generateUniqueDate } from '../helpers';
import { Picture } from '../models';

import './Home.page.scss';
import ContentWrapper from '../components/ContentWrapper';

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
      <ContentWrapper
        isLoading={isLoading}
        isError={isError}
        handleRetry={handleNext}
      >
        {picture ? <ImageDetails picture={picture} /> : <div>no content</div>}
      </ContentWrapper>
    </div>
  );
};

export default Home;
