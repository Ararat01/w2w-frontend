import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Genres.module.scss";
import Header from "../../components/Header/Header";
import API_URL from "../../config";
import GenreCard from "../../components/ui/GenreCard/GenreCard";
import LoadingCard from "../../components/ui/LoadingCard/LoadingCard";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/genres`)
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page">
      <Header />
      <div className="container">
        <div className={styles.genres}>
          {genres.length
            ? genres.map((genre, i) => {
                return <GenreCard key={i} genre={genre} />;
              })
            : [...Array(10)].map((_, i) => <LoadingCard key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Genres;
