import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ImageProvider from './contexts/ImageProvider';
import Explore from './pages/Explore';
import Favorite from './pages/Favorite';

function App() {
  return (
      <Router>
        <ImageProvider>
          <main>
            <Routes>
              <Route path='/' element={<Explore />}></Route>
              <Route path='/favorite' element={<Favorite />}></Route>
            </Routes>
          </main>
        </ImageProvider>
      </Router>
    
  );
}

export default App;