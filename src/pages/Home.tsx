import { useEffect, useState } from 'react';
import { fetchApodPic } from '../api';
import { generateUniqueDate } from '../helpers';
import { Picture } from '../models';

const Home = () => {
  const [picture, setPicture] = useState<Picture>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const date = generateUniqueDate([]);
      const pic = await fetchApodPic(date);
      setPicture(pic);
    })();
  }, []);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
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
