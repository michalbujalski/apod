import { Grid } from '@mui/material';
import { FC } from 'react';
import { Picture } from '../models';
import Field from './Field';
import './ImageDetails.scss';
import LazyImage from './LazyImage';

interface Props {
  picture: Picture;
}
const ImageDetails: FC<Props> = ({ picture }) => {
  return (
    <div className="image-details">
      <h1>{picture.title}</h1>
      <LazyImage url={picture.url} alt={picture.title} />
      <Grid container>
        <Grid item xs={6}>
          <Field label="Description" text={picture.explanation} />
        </Grid>
        <Grid item xs={6}>
          <Field label="Date" text={picture.date} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageDetails;
