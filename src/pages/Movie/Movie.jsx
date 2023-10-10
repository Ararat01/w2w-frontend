import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import API_URL from "../../config";
import ReviewForm from "../../components/Form/ReviewForm";
import styles from "./Movie.module.scss";
import Header from "../../components/Header/Header";
import { Rating } from "react-simple-star-rating";
import LoadingMovie from "../../components/LoadingMovie/LoadingMovie";

const Movie = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [isFavorite, setFavorite] = useState(false);
  const [change, setChange] = useState(1);
  const token = window.localStorage.getItem("token");

  const addToFav = (movieId) => {
    if (token) {
      axios
        .post(
          `${API_URL}/auth/favorite`,
          { movieId },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {})
        .then(() => setFavorite(!isFavorite))
        .catch((err) => console.log(err));
    } else {
      navigate("/log");
    }
  };
  const delFromFav = (movieId) => {
    axios
      .post(
        `${API_URL}/auth/favorite/del`,
        { movieId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {})
      .then(() => setFavorite(!isFavorite))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
    if (token) {
      axios
        .get(`${API_URL}/auth/favorite/id`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setFavorite(res.data.includes(id));
        })
        .catch((err) => console.log(err));
    }
  }, [token, id, change, isFavorite]);

  const onPointerClick = (value) => {};

  return (
    <div>
      <Header />
      {movie ? (
        <>
          <div className={`${styles.top} container`}>
            <div className={styles.title}>
              <h2>{movie.Title}</h2>
              <p>
                <b>{movie.Year}</b>
                <b>{movie.Rated}</b>
                <b>{movie.Runtime}</b>
              </p>
            </div>
            <div className={styles.rating}>
              <div>
                <img src="/icons/imdb.png" alt="" />
                <h3>{`${movie.imdbRating}`}</h3>
              </div>
              <div>
                <img src="/icons/tomat.png" alt="" />
                <h3>{movie.tomatRating}</h3>
              </div>
              <div>
                <img src="/w2w.png" alt="" />
                <h3>{`${parseFloat(movie.w2wRating).toFixed(1)}`}</h3>
              </div>
            </div>
          </div>
          <div className={`${styles.pic} container`}>
            <img src={movie.Poster} alt="" />
            <div></div>
            <iframe
              src={movie.Trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className={`${styles.about} container`}>
            <div className={styles.genre}>
              {[...movie.Genre].map((genre, i) => {
                return <span key={i}>{genre}</span>;
              })}
            </div>
            <p>{movie.Plot}</p>
            <div className={styles.fullInfo}>
              <div className={`${styles.info} ${styles.info_left}`}>
                <div>
                  <span>
                    {movie.Director.split(", ").length - 1
                      ? "Directors"
                      : "Director"}
                    :
                  </span>
                  {[...movie.Director.split(", ")].map((name, i) => {
                    return (
                      <a key={i} href={`https://en.wikipedia.org/wiki/${name}`}>
                        {`${
                          name +
                          (i === movie.Director.split(", ").length - 1
                            ? ""
                            : ", ")
                        }`}
                      </a>
                    );
                  })}
                </div>
                <div>
                  <span>{movie.Writer.length - 1 ? "Writers" : "Writer"}:</span>
                  {[...movie.Writer].map((name, i) => {
                    return (
                      <a key={i} href={`https://en.wikipedia.org/wiki/${name}`}>
                        {`${
                          name + (i === movie.Writer.length - 1 ? "" : ", ")
                        }`}
                      </a>
                    );
                  })}
                </div>
                <div>
                  <span>{movie.Actors.length - 1 ? "Stars" : "Star"}:</span>
                  {[...movie.Actors].map((name, i) => {
                    return (
                      <a key={i} href={`https://en.wikipedia.org/wiki/${name}`}>
                        {`${
                          name + (i === movie.Actors.length - 1 ? "" : ", ")
                        }`}
                      </a>
                    );
                  })}
                </div>
                <div>
                  <span>Duration:</span> {movie.Runtime}
                </div>

                <div>
                  <span>For more information:</span>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    style={{ height: "20px" }}
                  >
                    <img height="20px" src="/icons/imdb.png" alt="" />
                  </a>
                </div>
              </div>
              <div className={`${styles.info} ${styles.info_right}`}>
                <div>
                  <span>Release Date:</span> {movie.Released}
                </div>
                <div>
                  <span>IMDb rating:</span> {movie.imdbRating}/10 (
                  {movie.imdbVotes} votes)
                </div>
                <div>
                  <span>Rotten Tomatoes:</span> {movie.tomatRating}
                </div>
                <div>
                  <Rating
                    onClick={onPointerClick}
                    size={25}
                    iconsCount={10}
                    initialValue={Math.round(movie.w2wRating)}
                  />
                  {movie.w2wRating} (1,256 votes)
                </div>
                <div>
                  {!isFavorite ? (
                    <button onClick={() => addToFav(id)}>
                      Add to Favorite
                      <img height="20px" src="/icons/fav.svg" alt="" />
                    </button>
                  ) : (
                    <button
                      className={styles.remove}
                      onClick={() => delFromFav(id)}
                    >
                      Remove from Favorite
                      <img height="20px" src="/icons/fav.svg" alt="" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.reviewBlock}>
              <div className={styles.review}>
                <h3>{movie.Reviews.length ? "Reviews" : "No reviews yet"}</h3>
                {[...movie.Reviews].reverse().map((review, i) => {
                  return (
                    <div className={styles.review__el} key={i}>
                      <h3>
                        <span>
                          <img src="/icons/user.svg" alt="" />
                        </span>
                        {review.user.fullName}
                      </h3>
                      <p>{review.body}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.reviewForm}>
                <ReviewForm
                  movieId={id}
                  onChange={() => setChange(change + 1)}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingMovie />
      )}
    </div>
  );
};

export default Movie;
