import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MovieCard from "../../components/ui/MovieCard/MovieCard";
import styles from "./Favorite.module.scss";
import Header from "../../components/Header/Header";
import API_URL from "../../config";
import LoadingCard from "../../components/ui/LoadingCard/LoadingCard";

const Favorite = () => {
  let [moviesArr, setMovies] = useState(false);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/auth/favorite/movies`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMovies(res.data.length ? res.data : false);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/log");
    }
  }, [token, navigate]);

  return (
    <div className="page">
      <Header />

      <div className="container">
        <div className={styles.movies}>
          {moviesArr !== false ? (
            moviesArr.length ? (
              [...moviesArr].map((movie, i) => {
                return <MovieCard key={i} movie={movie} css={"big"} />;
              })
            ) : (
              <h3>You havn't got favorite movies yet</h3>
            )
          ) : (
            [...Array(12)].map((_, i) => <LoadingCard key={i} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
