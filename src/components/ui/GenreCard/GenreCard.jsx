import { Link } from "react-router-dom";
import styles from "./GenreCard.module.scss";

const GenreCard = ({ genre }) => {
  return (
    <Link
      className={`${styles.genreCard}`}
      to={`/genres/${genre.genreName}`}
    >
      <div className={styles.genreCard__img}>
        <img src={genre.genreImg} alt="" />
      </div>

      <p className={styles.genreCard__name}>{genre.genreName} </p>
    </Link>
  );
};

export default GenreCard;
