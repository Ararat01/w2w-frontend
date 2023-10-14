import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import MovieCard from "../../components/ui/MovieCard/MovieCard";
import styles from "./CollectionMovies.module.scss";
import Header from "../../components/Header/Header";
import API_URL from "../../config";
import LoadingCard from "../../components/ui/LoadingCard/LoadingCard";

const CollectionMovies = () => {
  const { collectionId } = useParams();
  const [moviesArr, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/collections/${collectionId}`)
      .then((res) => {
        setMovies(res.data.movies);
      })
      .catch((err) => console.log(err));
  }, [collectionId]);

  return (
    <div className="page">
      <Header />
      <div className="container">
        <div className={styles.movies}>
          {moviesArr.length
            ? [...moviesArr].map((movie, i) => {
                return <MovieCard key={i} movie={movie} css={"big"} />;
              })
            : [...Array(12)].map((_, i) => <LoadingCard key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default CollectionMovies;
