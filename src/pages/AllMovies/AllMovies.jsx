import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import MovieCard from "../../components/ui/MovieCard/MovieCard";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./AllMovies.module.scss";
import Header from "../../components/Header/Header";
import API_URL from "../../config";
import Search from "../../components/Search/Search";
import LoadingCard from "../../components/ui/LoadingCard/LoadingCard";
import Filter from "../../components/Filter/Filter";

const AllMovies = () => {
  const navigate = useNavigate();
  let { page } = useParams();
  const [change, setChange] = useState(1);
  const filtersDb = {
    "latest release": "Year",
    "IMDb Rating": "imdbRating",
    "W2w Rating": "w2wRating",
    Metascore: "Metascore",
  };

  let [moviesArr, setMovies] = useState([]);
  let [moviesLen, setMoviesLen] = useState(1);
  let [pageShow, setPageShow] = useState(true);
  let [notFound, setNotFound] = useState(false);
  let [filters, _] = useState([
    "latest release",
    "IMDb Rating",
    "W2w Rating",
    "Metascore",
  ]);
  let [filter, setFilter] = useState("latest release");
  useEffect(() => {
    setNotFound(false);
    setPageShow(true);
    setMovies([]);

    axios
      .post(`${API_URL}/getMovies?page=${page}`, { filter: filtersDb[filter] })
      .then((res) => {
        setMovies(res.data.movies);
        setMoviesLen(Math.ceil(res.data.fullLength / 20));
      })
      .catch((err) => console.log(err));
  }, [page, filter, change]);

  const filterChange = (filt) => {
    setFilter(filt);
  };

  const pageClick = (k) => {
    if (k > moviesLen || k < 1) return;
    navigate(`/movies/${k}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const searchRes = (movies) => {
    if (movies.length) {
      setPageShow(false);
      setNotFound(false);
      setMovies(movies);
    } else {
      setPageShow(false);
      setNotFound(true);
    }
  };
  const closeSearch = () => {
    setChange(change + 1);
    setPageShow(true);
    setNotFound(false);
  };

  return (
    <div>
      <Header />

      <div className="container">
        <div className={styles.filters}>
          <Search searchRes={searchRes} closeSearch={closeSearch} />
          <Filter filters={filters} onChange={filterChange} filter={filter} />
        </div>

        {notFound ? <h3>Not found any movie with this title</h3> : <></>}
        <div className={styles.movies}>
          {moviesArr.length ? (
            notFound ? (
              <></>
            ) : (
              [...moviesArr].map((movie, i) => {
                return <MovieCard key={i} movie={movie} css={"big"} />;
              })
            )
          ) : (
            [...Array(10)].map((_, i) => <LoadingCard key={i} />)
          )}
        </div>
        {pageShow ? (
          <Pagination
            size={moviesLen}
            pageHandler={pageClick}
            page={parseInt(page)}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
