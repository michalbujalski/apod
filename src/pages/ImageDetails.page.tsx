import { Button } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApodPic } from '../api';
import ContentWrapper from '../components/ContentWrapper';
import ImageDetails from '../components/ImageDetails';
import NavBar from '../components/NavBar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { usePictures } from '../context/PictureContext';
import { Picture } from '../models';

import './ImageDetails.page.scss';

const ImageDetailsPage = () => {
  const { isSaved, saveFavorite, deleteFavorite } = usePictures();
  const [picture, setPicture] = useState<Picture>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { date } = useParams();

  const isFav = useMemo(() => {
    if (!picture) {
      return;
    }
    return isSaved(picture.date);
  }, [isSaved, picture]);
  const fetchDetails = async (date?: string) => {
    if (!date) {
      throw new Error('No date');
    }
    try {
      setIsLoading(true);
      const pic = await fetchApodPic(date);
      setPicture(pic);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    fetchDetails(date);
  }, [date]);
  return (
    <div className="image-details-page">
      <NavBar
        backUrl={document.referrer}
        actions={
          <>
            {(!isLoading || isError) && (
              <Button sx={{ color: 'white' }} onClick={toggleFav}>
                {isFav ? <StarIcon /> : <StarBorderIcon />}
              </Button>
            )}
          </>
        }
      />

      <ContentWrapper
        isLoading={isLoading}
        isError={isError}
        handleRetry={() => fetchDetails(date)}
      >
        {picture ? <ImageDetails picture={picture} /> : <div>No data</div>}
      </ContentWrapper>
    </div>
  );
};

export default ImageDetailsPage;
