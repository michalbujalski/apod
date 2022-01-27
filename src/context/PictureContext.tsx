import { createContext, FC, useCallback, useContext, useState } from 'react';
import { Picture } from '../models';

interface ProductsContextType {
  saveAlreadySeen: (picture: Picture) => void;
  saveFavorite: (picture: Picture) => void;
  deleteFavorite: (picture: Picture) => void;
  favorites: Picture[];
  alreadySeen: Picture[];
}

const PictureContext = createContext<ProductsContextType>({
  saveAlreadySeen: (picture: Picture): void => {},
  saveFavorite: (picture: Picture): void => {},
  deleteFavorite: (picture: Picture): void => {},
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
  const saveFavorite = useCallback(
    (picture: Picture): void => {
      if (!favorites.some((fav) => fav.date === picture.date)) {
        setFavorites((oldArr) => [...oldArr, picture]);
      }
    },
    [favorites]
  );
  const deleteFavorite = useCallback(
    (picture: Picture) => {
      setFavorites(favorites.filter((fav) => fav.date !== picture.date));
    },
    [favorites]
  );
  return (
    <PictureContext.Provider
      value={{
        saveAlreadySeen,
        saveFavorite,
        deleteFavorite,
        favorites,
        alreadySeen
      }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export default PictureProvider;
