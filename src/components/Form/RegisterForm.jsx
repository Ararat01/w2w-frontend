import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import API_URL from "../../config";
import styles from "./Form.module.scss";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const passwordPattern =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&_-])[A-Za-zd@$!%*?&_-]{8,}$";

  const [pass, setPass] = useState(getValues("password"));

  const onChange = (v) => {
    setPass(getValues("password"));
  };
  const onSubmit = (values) => {
    if (window.localStorage.getItem("token") !== null) return;
    axios
      .post(`${API_URL}/auth/register`, values)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      onChange={onChange}
    >
      <input
        autoComplete="off"
        type="text"
        placeholder="Name Surname"
        {...register("fullName", { required: true, minLength: 1 })}
        name="fullName"
      />
      <input
        autoComplete="off"
        type="email"
        placeholder="Email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        name="email"
      />

      <input
        autoComplete="off"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          minLength: 8,
          pattern: passwordPattern,
        })}
        name="password"
      />
      <ul>
        <li className={/^.*[a-z].*$/.test(pass) ? styles.true : ""}>
          At least one lowercase letter
        </li>
        <li className={/^.*[A-Z].*$/.test(pass) ? styles.true : ""}>
          At least one uppercase letter
        </li>
        <li className={/^.*\d.*$/.test(pass) ? styles.true : ""}>
          At least one number
        </li>
        <li className={/^.*[@$!%*?&_-].*$/.test(pass) ? styles.true : ""}>
          At least one special character
        </li>
        <li className={/^.{8,}$/.test(pass) ? styles.true : ""}>
          Minimum eight characters
        </li>
      </ul>
      <button className={styles.form__btn} type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default RegisterForm;
