import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import MovieCard from "../../components/ui/MovieCard/MovieCard";
import styles from "./GenreMovies.module.scss";
import Header from "../../components/Header/Header";
import API_URL from "../../config";
import LoadingCard from "../../components/ui/LoadingCard/LoadingCard";

const GenreMovies = () => {
  const { genreName } = useParams();
  const [moviesArr, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/moviesByGenre?genre=${genreName}&sort=-1`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, [genreName]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className={styles.movies}>
          {moviesArr.length
            ? [...moviesArr].map((movie, i) => {
                return <MovieCard key={i} movie={movie} css={"big"} />;
              })
            : [...Array(10)].map((_, i) => <LoadingCard key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default GenreMovies;
