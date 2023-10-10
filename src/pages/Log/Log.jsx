import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import checkAuth from "../../checkAuth";
import styles from "./Log.module.scss";
import LoginForm from "../../components/Form/LoginForm";
import RegisterForm from "../../components/Form/RegisterForm";

const Log = () => {
  const [join, setJoin] = useState("Login");

  const navigate = useNavigate();
  useEffect(() => {
    if (checkAuth()) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <div className={styles.logForm}>
        <h3>{join}</h3>
        {join === "Login" ? (
          <>
            <LoginForm />
            <span>
              If you havn't an account <button onClick={() => setJoin('Register')}> Register </button>
            </span>
          </>
        ) : (
          <>
            <RegisterForm />
            <span>
              If you have an account <button onClick={() => setJoin('Login')}> Login </button>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Log;
