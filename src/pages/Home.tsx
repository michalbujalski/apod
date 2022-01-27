import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApodPic } from '../api';
import { usePictures } from '../context/PictureContext';
import { generateUniqueDate } from '../helpers';
import { Picture } from '../models';

const Home = () => {
  const { saveAlreadySeen, saveFavorite, alreadySeen } = usePictures();
  const [picture, setPicture] = useState<Picture>();
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = useCallback(async () => {
    setIsLoading(true);
    const date = generateUniqueDate(alreadySeen.map((pic) => pic.date));
    const pic = await fetchApodPic(date);
    saveAlreadySeen(pic);
    setPicture(pic);
  }, [alreadySeen, saveAlreadySeen]);
  const addToFavs = useCallback(async () => {
    if (picture) {
      saveFavorite(picture);
    }
  }, [picture, saveFavorite]);
  useEffect(() => {
    handleNext();
  }, []);
  return (
    <div>
      <Link to="/favorites">Favorites</Link>
      {isLoading && <div>Loading...</div>}
      <button onClick={handleNext}>Next</button>
      <button onClick={addToFavs}>Save</button>
      <img
        alt="pic"
        src={picture?.url}
        onLoad={() => {
          setIsLoading(false);
        }}
        className="image full"
        style={{ display: isLoading ? 'none' : 'inherit' }}
      />
    </div>
  );
};

export default Home;
