import { Button, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApodPic } from '../api';
import ImageDetails from '../components/ImageDetails';
import { usePictures } from '../context/PictureContext';
import { generateUniqueDate } from '../helpers';
import { Picture } from '../models';

const Home = () => {
  const { saveAlreadySeen, saveFavorite, alreadySeen } = usePictures();
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
  const addToFavs = useCallback(async () => {
    if (picture) {
      saveFavorite(picture);
    }
  }, [picture, saveFavorite]);
  useEffect(() => {
    handleNext();
  }, []);
  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return (
      <div>
        <div>There was an error fetching picture info</div>
        <Button onClick={handleNext}>Retry</Button>
      </div>
    );
  }
  return (
    <div>
      <Link to="/favorites">Favorites</Link>
      {isLoading && <div>Loading...</div>}
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
      <Button variant="contained" onClick={addToFavs}>
        Save
      </Button>
      {picture && <ImageDetails picture={picture} />}
    </div>
  );
};

export default Home;
