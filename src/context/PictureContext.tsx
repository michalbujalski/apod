import { createContext, FC, useContext, useState } from 'react';
import { Picture } from '../models';

interface ProductsContextType {
  saveAlreadySeen: (picture: Picture) => void;
  saveFavorite: (picture: Picture) => void;
  favorites: Picture[];
  alreadySeen: Picture[];
}

const PictureContext = createContext<ProductsContextType>({
  saveAlreadySeen: (picture: Picture): void => {},
  saveFavorite: (picture: Picture): void => {},
  favorites: [],
  alreadySeen: []
});

export const usePictures = () => useContext(PictureContext);

interface Props {
  children: React.ReactNode;
}

const PictureProvider: FC<Props> = ({ children }) => {
  const [alreadySeen, setAlreadySeen] = useState<Picture[]>([]);
  const [favorites, setFavorites] = useState<Picture[]>([]);
  const saveAlreadySeen = (picture: Picture): void => {
    setAlreadySeen((oldArr) => {
      return [...oldArr, picture];
    });
  };
  const saveFavorite = (picture: Picture): void => {
    setFavorites((oldArr) => [...oldArr, picture]);
  };

  return (
    <PictureContext.Provider
      value={{
        saveAlreadySeen,
        saveFavorite,
        favorites,
        alreadySeen
      }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export default PictureProvider;
