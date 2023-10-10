import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import API_URL from "../../config";
import styles from "./Form.module.scss";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    if (window.localStorage.getItem("token") !== null) return;
    axios
      .post(`${API_URL}/auth/register`, values)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        autoComplete="off"
        type="text"
        placeholder="Name Surname"
        {...register("fullName", { required: "Name is required" })}
        name="fullName"
      />
      <input
        autoComplete="off"
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        name="email"
      />

      <input
        autoComplete="off"
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        name="password"
      />
      <button className={styles.form__btn} type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default RegisterForm;
