import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import MovieCard from "../../components/ui/MovieCard/MovieCard";
import Arrow from "../../components/ui/Arrow/Arrow";
import API_URL from "../../config";

const Home = () => {
  const [genresArr, setGenresArr] = useState([]);
  const [moviesArr, setMovies] = useState([]);
  const [selectedGenre, setGenre] = useState("Action");
  const [slide, setSlide] = useState(0);

  const slider = () => {
    if (slide === 4) {
      setSlide(0);
    } else {
      setSlide(slide + 1);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/moviesByGenre?genre=${selectedGenre}&count=10&sort=-1`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedGenre]);

  useEffect(() => {
    axios
      .get(`${API_URL}/genres`)
      .then((res) => {
        setGenresArr(res.data.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`${styles.homePage} page`}>
      <Header />
      <section className={`${styles.home} "container"`}>
        <h2>
          Let <span>What2Watch</span>
        </h2>
        <h3>rescue your evenings from boredom!</h3>
        <h5>Your compass to the cinematic world!</h5>
        <div className={styles.home__action}>
          <button className={`${styles.home__action_btn} ${styles.active}`}>
            <Link to={"/log"}>Join Now</Link>
          </button>
          <button className={styles.home__action_btn}>
            <Link to={"/movies/1?filter=latest release"}>Show Movies</Link>
          </button>
        </div>
      </section>

      <section className={`${styles.slider} container`}>
        <div className={styles.slider__genre}>
          {genresArr.map((genre, i) => {
            return (
              <button
                className={
                  genre.genreName === selectedGenre ? styles.active : ""
                }
                key={i}
                onClick={() => {
                  setGenre(genre.genreName);
                  setSlide(0);
                }}
              >
                {genre.genreName}
              </button>
            );
          })}
          <button>
            <Link to={"/genres"}>More</Link>
          </button>
        </div>
        {moviesArr.length ? (
          <div className={styles.slider_block}>
            <div className={styles.slider__movies}>
              {[...moviesArr].slice(slide, slide + 6).map((movie, i) => {
                return <MovieCard key={i} movie={movie} css={"small"} />;
              })}
            </div>
            <button className={styles.slider_btn} onClick={slider}>
              <Arrow color={"#fff"} />
            </button>
          </div>
        ) : (
          <div className={styles.moviesLoader}>
            {[...Array(6)].map((_, i) => {
              return (
                <div key={i} className={styles.loaderCard}>
                  <ColorRing
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#C65257",
                      "#4CC4D6",
                      "#B1D595",
                      "#F58C2D",
                      "#C65257",
                    ]}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
