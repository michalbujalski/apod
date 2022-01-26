import { useCallback, useEffect, useState } from 'react';
import { fetchApodPic } from '../api';
import { usePictures } from '../context/PictureContext';
import { generateUniqueDate } from '../helpers';
import { Picture } from '../models';

const Home = () => {
  const { saveAlreadySeen, alreadySeen } = usePictures();
  const [picture, setPicture] = useState<Picture>();
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = useCallback(async () => {
    setIsLoading(true);
    const date = generateUniqueDate(alreadySeen.map((pic) => pic.date));
    const pic = await fetchApodPic(date);
    saveAlreadySeen(pic);
    setPicture(pic);
  }, [alreadySeen, saveAlreadySeen]);
  useEffect(() => {
    handleNext();
  }, []);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <button onClick={handleNext}>Next</button>
      <img
        alt="pic"
        src={picture?.hdurl}
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
