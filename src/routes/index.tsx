import { Routes, Route } from 'react-router-dom';

import { BrowserRouter } from 'react-router-dom';
import FavoritesPage from '../pages/Favorites.page';
import HomePage from '../pages/Home.page';
import ImageDetailsPage from '../pages/ImageDetails.page';

const ApodRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/favorites">
          <Route path=":date" element={<ImageDetailsPage />} />
          <Route index element={<FavoritesPage />} />
        </Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default ApodRouter;
