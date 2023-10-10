import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

import API_URL from "../../config";
import styles from "./Form.module.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const [forgot, setForgot] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    if (window.localStorage.getItem("token") !== null) return;
    axios
      .post(`${API_URL}/auth/login`, values)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => console.log(err.response.data));
  };

  const getNewPass = (values) => {
    axios
      .post(`${API_URL}/auth/forget`, values)
      .then((res) => {
        emailjs
          .send(
            "service_3jpk5jq",
            "template_0jkzhbs",
            res.data,
            "UrNQANTO-8g7Er0_r"
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err.response.data));
    setForgot(false);
  };

  return (
    <>
      {forgot ? (
        <form className={styles.form} onSubmit={handleSubmit(getNewPass)}>
          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email.." })}
            name="email"
          />

          <button className={styles.form__btn} type="submit">
            Send sms
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email.." })}
            name="email"
          />

          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password.." })}
            name="password"
          />
          <button className={styles.form__btn} type="submit">
            SUBMIT
          </button>
          <button
            className={styles.form__forgotBtn}
            onClick={() => setForgot(true)}
          >
            Forgot your password?
          </button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
