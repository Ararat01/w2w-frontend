import React from "react";
import styles from "./Pagination.module.scss";
import Arrow from "../ui/Arrow/Arrow";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Pagination = ({ size = 1, pageHandler, page }) => {
  let params = useParams();

  useEffect(() => {
    console.log(params.page);
  }, params);
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => pageHandler(page - 1)}
        disabled={page <= 1}
        className={styles.pagination__arrow}
      >
        <Arrow color={"#f58c2d"} size={15} rotate={180} />
      </button>
      <div className={styles.pagination__pages}>
        {page > 3 ? (
          <div className={styles.pagination__pages_start}>
            <button onClick={() => pageHandler(1)}>1</button>
            {page > 4 ? (
              <div className={styles.dots}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {[...Array(size)].slice(0, 5).map((_, i) => {
          if (page === 1) {
            return (
              <button
                key={i}
                onClick={() => pageHandler(page + i)}
                className={page + i === page ? styles.active : ""}
              >
                {page + i}
              </button>
            );
          }
          if (page + i - 2 >= size) return;
          return (
            <button
              key={i}
              onClick={() => pageHandler(page + i - 2)}
              className={page + i === page + 2 ? styles.active : ""}
            >
              {page + i - 2}
            </button>
          );
        })}
        {page < size || page === 10 ? (
          <div className={styles.pagination__pages_end}>
            {page < size - 3 ? (
              <div className={styles.dots}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <></>
            )}
            <button onClick={() => pageHandler(size)}>{size}</button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.pagination__pages_small}>
        {page > 2 ? (
          <div className={styles.pagination__pages_start}>
            <button onClick={() => pageHandler(1)}>1</button>
            {page > 3 ? (
              <div className={styles.dots}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {[...Array(size)].slice(0, 3).map((_, i) => {
          if (page === 1) {
            return (
              <button
                key={i}
                onClick={() => pageHandler(page + i)}
                className={page + i === page ? styles.active : ""}
              >
                {page + i}
              </button>
            );
          }
          if (page + i - 1 >= size) return;
          return (
            <button
              key={i}
              onClick={() => pageHandler(page + i - 1)}
              className={page + i === page + 1 ? styles.active : ""}
            >
              {page + i - 1}
            </button>
          );
        })}
        {page - 1 < size || page === 10 ? (
          <div className={styles.pagination__pages_end}>
            {page < size - 2 ? (
              <div className={styles.dots}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <></>
            )}
            <button
              onClick={() => pageHandler(size)}
              className={page === size ? styles.active : ""}
            >
              {size}
            </button>
          </div>
        ) : (
          <></>
        )}
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
