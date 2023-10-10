import styles from "./LoadingMovie.module.scss";

const LoadingMovie = () => {
  return (
    <div>
      <div className={`${styles.top} container`}>
        <div className={styles.title}>
          <div className={`${styles.name} ${styles.skeleton}`}></div>
          <div className={`${styles.year} ${styles.skeleton}`}></div>
        </div>
        <div className={`${styles.rating} ${styles.skeleton}`}>
        </div>
      </div>
      <div className={`${styles.pic} container`}>
        <div className={`${styles.poster} ${styles.skeleton}`}></div>
        <div className={`${styles.middle}`}></div>
        <div className={`${styles.iframe} ${styles.skeleton}`}></div>
      </div>
    </div>
  );
};

export default LoadingMovie;
