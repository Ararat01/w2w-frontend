import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import API_URL from "../../config";
import styles from "./Form.module.scss";

const ReviewForm = ({ movieId, onChange }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      body: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      navigate("/log");
      return;
    }
    axios
      .post(`${API_URL}/movies/${movieId}/reviews`, values, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        onChange();
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        type="body"
        placeholder="Review"
        {...register("body")}
        name="body"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ReviewForm;
