import './App.css';
import { Route,Routes } from 'react-router-dom';
import LandingPage from './components/Landing Page/LandingPage';
import Explore from './components/Explore/Explore';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/listings' element={<Explore/>}/>
      </Routes>
    </div>
  );
}

export default App;
