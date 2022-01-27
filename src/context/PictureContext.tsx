import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { Picture } from '../models';
import { PersistantStore } from '../storage';

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

const KEY_FAVORITES = 'favs';
const KEY_ALREADY_SEEN = 'alreadySeen';

const PictureProvider: FC<Props> = ({ children }) => {
  const [alreadySeen, setAlreadySeen] = useState<Picture[]>(
    JSON.parse(PersistantStore.get(KEY_FAVORITES) || '') || []
  );
  const [favorites, setFavorites] = useState<Picture[]>(
    JSON.parse(PersistantStore.get(KEY_FAVORITES) || '') || []
  );

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
  useEffect(() => {
    PersistantStore.save(KEY_FAVORITES, JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    PersistantStore.save(KEY_ALREADY_SEEN, JSON.stringify(alreadySeen));
  }, [alreadySeen]);
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
