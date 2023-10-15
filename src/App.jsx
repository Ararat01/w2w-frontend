import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import AllMovies from "./pages/AllMovies/AllMovies";
import CollectionMovies from "./pages/CollectionMovies/CollectionMovies";
import Collections from "./pages/Collections/Collections";
import Favorite from "./pages/Favorite/Favorite";
import GenreMovies from "./pages/GenreMovie/GenreMovies";
import Genres from "./pages/Genres/Genres";
import Home from "./pages/Home/Home";
import Log from "./pages/Log/Log";
import Movie from "./pages/Movie/Movie";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <main>
        <div className={styles.imgDiv}>
          <div className={styles.imgShadow}></div>
          <img className={styles.img} src="/background.jpg" alt="" />
        </div>
      </main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home/" />} />
          <Route path="home/" element={<Home />} />
          <Route path="movies/:page" element={<AllMovies />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="collections/" element={<Collections />} />
          <Route
            path="collections/:collectionId"
            element={<CollectionMovies />}
          />
          <Route path="genres/" element={<Genres />} />
          <Route path="genres/:genreName" element={<GenreMovies />} />
          <Route path="log/" element={<Log />} />
          <Route path="favorite/" element={<Favorite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
