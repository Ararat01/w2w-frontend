import { Link } from "react-router-dom";
import styles from "./CollectionCard.module.scss";

const CollectionCard = ({ collection }) => {
  return (
    <Link
      className={`${styles.collectionCard}`}
      to={`/collections/${collection._id}`}
    >
      <div className={styles.collectionCard__img}>
        <img src={collection.poster} alt="" />
        <span className={styles.collectionCard__movies}>
          {collection.movies.length}{" "}
          <img
            className={styles.collectionCard__movieIcon}
            src="/icons/movie.svg"
            alt=""
          />
        </span>
      </div>

      <p className={styles.collectionCard__name}>{collection.name} </p>
    </Link>
  );
};

export default CollectionCard;
