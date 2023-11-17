import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing Page/LandingPage";
import Explore from "./components/Explore/Explore";
import ListingDetailPage from "./components/ListingDetailPage/ListingDetailPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="/listings" element={<Explore />} />
      </Routes>
      <Routes>
        <Route path="/detail/:property_id" element={<ListingDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
