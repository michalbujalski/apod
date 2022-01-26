import './App.scss';
import PictureProvider from './context/PictureContext';
import Router from './routes';

function App() {
  return (
    <div className="App">
      <PictureProvider>
        <Router />
      </PictureProvider>
    </div>
  );
}

export default App;
