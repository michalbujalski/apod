import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApodPic } from '../api';
import ContentWrapper from '../components/ContentWrapper';
import ImageDetails from '../components/ImageDetails';
import { Picture } from '../models';

const ImageDetailsPage = () => {
  const [picture, setPicture] = useState<Picture>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { date } = useParams();
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
  useEffect(() => {
    fetchDetails(date);
  }, [date]);
  return (
    <ContentWrapper
      isLoading={isLoading}
      isError={isError}
      handleRetry={() => fetchDetails(date)}
    >
      {picture ? <ImageDetails picture={picture} /> : <div>No data</div>}
    </ContentWrapper>
  );
};

export default ImageDetailsPage;
