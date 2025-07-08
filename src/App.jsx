import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import MovieDetail from "./pages/MovieDetailPage";
import Mainlayout from "./layout/Mainlayout";
import Favorite from "./pages/Favorite";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/Movies" element={<Movie />} />
          <Route path="/Series" element={<Series />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
