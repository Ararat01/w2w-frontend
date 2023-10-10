import { Link } from "react-router-dom";
import styles from "./MovieCard.module.scss";

const MovieCard = ({ movie, css }) => {
  return (
    <Link
      className={`${styles.movieCard} ${styles[css]}`}
      to={`/movie/${movie._id}`}
    >
      <span className={styles.movieCard__rating}>{movie.imdbRating}</span>
      <div className={styles.movieCard__img}>
        <img src={movie.Poster} alt="" />
      </div>

      <p className={styles.movieCard__name}>
        {movie.Title} ({movie.Year})
      </p>
    </Link>
  );
};

export default MovieCard;
