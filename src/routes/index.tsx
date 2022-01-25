import { Routes, Route } from 'react-router-dom';

import { BrowserRouter } from 'react-router-dom';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';

const ApodRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default ApodRouter;
