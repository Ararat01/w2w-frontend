import React from "react";
import styles from "./Pagination.module.scss";
import Arrow from "../ui/Arrow/Arrow";

const Pagination = ({ size = 1, pageHandler, page }) => {
  return (
    <div className={`${styles.pagination} container`}>
      <button
        onClick={() => pageHandler(page - 1)}
        disabled={page <= 1}
        className={styles.pagination__arrow}
      >
        <Arrow
          color={"#f58c2d"}
          size={15}
          rotate={180}
        />
      </button>
      <div className={styles.pagination__pages}>
        {[...Array(size)].map((_, i) => {
          return (
            <button
              key={i}
              onClick={() => pageHandler(i + 1)}
              className={i + 1 === page ? styles.active : ""}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => pageHandler(page + 1)}
        disabled={page >= size}
        className={styles.pagination__arrow}
      >
        <Arrow color={"#f58c2d"} size={15} />
      </button>
    </div>
  );
};

export default Pagination;
