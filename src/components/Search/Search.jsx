import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import styles from "./Search.module.scss";
import API_URL from "../../config";

const Search = ({ searchRes, closeSearch }) => {
  const {
    register,
    handleSubmit,

    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      search: "",
    },
    mode: "onChange",
  });
  const searchMovie = (values) => {
    axios
      .post(`${API_URL}/movies/search`, {
        movieName: values.search,
      })
      .then((res) => searchRes(res.data))
      .catch((err) => console.log(err));
  };
  const clearSearch = () => {
    closeSearch();
    setValue("search", "");
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit(searchMovie)}>
      <input
        autoComplete="off"
        className={styles.searchForm__input}
        type="text"
        placeholder="Search..."
        {...register("search", { required: true })}
        name="search"
      />

      <button type="submit" className={styles.searchForm__btn}>
        <img src="/icons/search.svg" alt="" />
      </button>

      <button
        type="button"
        disabled={!getValues("search")}
        onClick={clearSearch}
        className={`${styles.searchForm__btn} ${styles.searchForm__btn_close} ${
          getValues("search") ? styles.searchForm__btn_close_active : ""
        }`}
      >
        <img src="/icons/close.svg" alt="" />
      </button>
    </form>
  );
};

export default Search;
