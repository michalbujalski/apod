import axios from 'axios';
import { Picture } from '../models';

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const fetchApodPic = async (date: string): Promise<Picture> => {
  const response = await api.get<Picture>('/planetary/apod', {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      date
    }
  });
  return response.data;
};
