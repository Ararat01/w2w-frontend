import React from "react";

import styles from "./Filter.module.scss";
import { useState } from "react";
import Arrow from "../ui/Arrow/Arrow";

const Filter = ({ filter, filters, onChange }) => {
  const [select, showSelect] = useState(false);
  const openSelect = () => {
    showSelect(!select);
  };
  return (
    <div className={styles.select}>
      <button className={""} onClick={openSelect}>
        <span>{filter}</span>
        <Arrow size={15} rotate={90} color={"#fff"} />
      </button>
      <div className={`${styles.options} ${select ? styles.active : ""}`}>
        {[...filters].map((filt, i) => {
          return filt !== filter ? (
            <button
              key={i}
              onClick={() => {
                openSelect();
                onChange(filt);
              }}
            >
              {filt}
            </button>
          ) : (
            <span key={i}></span>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
