import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import checkAuth from "../../checkAuth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const auth = checkAuth();
  const [userName, setUserName] = useState("");
  const isRouteActive = (path) => {
    return location.pathname.startsWith(path) ? styles.active : "";
  };
  useEffect(() => {
    setUserName(window.localStorage.getItem("userName"));
  }, [auth]);

  const logout = () => {
    if (window.confirm("Do you want logout ?")) {
      window.localStorage.removeItem("token");
      navigate("/log")
    }
  };

  return (
    <div className="container">
      <header className={styles.header}>
        <Link to={"/"} className={styles.header__logo}>
          <img height="32px" src="/icons/w2w.png" alt="" />
          <span className={styles.header__logoText}>what2watch</span>
        </Link>
        <nav className={styles.header__nav}>
          <Link
            to="/movies/1"
            className={`${styles.header__navLink} ${isRouteActive("/movies")}`}
          >
            Movies
          </Link>
          <Link
            to="/genres"
            className={`${styles.header__navLink} ${isRouteActive("/genres")}`}
          >
            Genres
          </Link>
          <Link
            to="/collections"
            className={`${styles.header__navLink} ${isRouteActive(
              "/collections"
            )}`}
          >
            Collections
          </Link>
          <Link
            to="/favorite"
            className={`${styles.header__navLink} ${isRouteActive(
              "/favorite"
            )}`}
          >
            Favorite
          </Link>
        </nav>
        <div className={styles.header__user}>
          {auth ? (
            <h4>
              {userName}
              <button onClick={logout}>
                <img src="/icons/logout.svg" alt="" />
              </button>
            </h4>
          ) : (
            <Link to="/log">
              <button className={styles.header__user_login}>Login</button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
