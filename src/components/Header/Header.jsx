import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import checkAuth from "../../checkAuth";

const Header = ({ open = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = checkAuth();
  const [userName, setUserName] = useState("");
  const [menuOpened, setMenuOpened] = useState(false);
  const isRouteActive = (path) => {
    return location.pathname.startsWith(path) ? styles.active : "";
  };
  useEffect(() => {
    setUserName(window.localStorage.getItem("userName"));
  }, [auth]);
  useEffect(() => {
    setMenuOpened(open);
  }, [open]);

  const logout = () => {
    if (window.confirm("Do you want logout ?")) {
      window.localStorage.removeItem("token");
      setMenuOpened(false);
      navigate("/log");
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <Link to={"/"} className={styles.header__logo}>
          <img
            className={styles.header__logo_img}
            src="/icons/w2w.png"
            alt=""
          />
          <span className={styles.header__logo_text}>what2watch</span>
        </Link>
        <nav className={styles.header__nav}>
          <Link
            to="/movies/1?filter=latest release"
            className={`${styles.header__nav_link} ${isRouteActive("/movies")}`}
          >
            Movies
          </Link>
          <Link
            to="/genres"
            className={`${styles.header__nav_link} ${isRouteActive("/genres")}`}
          >
            Genres
          </Link>
          <Link
            to="/collections"
            className={`${styles.header__nav_link} ${isRouteActive(
              "/collections"
            )}`}
          >
            Collections
          </Link>
          <Link
            to="/favorite"
            className={`${styles.header__nav_link} ${isRouteActive(
              "/favorite"
            )}`}
          >
            Favorite
          </Link>
        </nav>
        <div className={styles.header__user}>
          {auth ? (
            <>
              <h4>{userName}</h4>
              <button onClick={logout}>
                <img src="/icons/logout.svg" alt="" />
              </button>
            </>
          ) : (
            <Link to="/log">
              <button className={styles.header__user_login}>Login</button>
            </Link>
          )}
        </div>
      </header>
      <header className={styles.mobileHeader}>
        <div
          className={`${styles.mobileHeader_show} ${
            menuOpened ? styles.active : ""
          }`}
        >
          <div className={styles.mobileHeader__user}>
            {auth ? (
              <>
                <h3>Welcome</h3>
                <h4>
                  {userName}
                  <button onClick={logout}>
                    <img src="/icons/logout.svg" alt="" />
                  </button>
                </h4>
              </>
            ) : (
              <Link to="/log">
                <button className={styles.mobileHeader__user_login}>
                  Login
                </button>
              </Link>
            )}
          </div>
          <nav className={styles.mobileHeader__nav}>
            <Link
              to="/movies/1?filter=latest release"
              className={`${styles.mobileHeader__nav_link} ${isRouteActive(
                "/movies"
              )}`}
            >
              Movies
            </Link>
            <Link
              to="/genres"
              className={`${styles.mobileHeader__nav_link} ${isRouteActive(
                "/genres"
              )}`}
            >
              Genres
            </Link>
            <Link
              to="/collections"
              className={`${styles.mobileHeader__nav_link} ${isRouteActive(
                "/collections"
              )}`}
            >
              Collections
            </Link>
            <Link
              to="/favorite"
              className={`${styles.mobileHeader__nav_link} ${isRouteActive(
                "/favorite"
              )}`}
            >
              Favorite
            </Link>
          </nav>
        </div>
        <Link to={"/"} className={styles.mobileHeader__logo}>
          <img
            className={styles.mobileHeader__logo_img}
            src="/icons/w2w.png"
            alt=""
          />
          <span className={styles.mobileHeader__logo_text}>what2watch</span>
        </Link>
        <div className={styles.mobileHeader__menu}>
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className={`${styles.mobileHeader__menu_burger} ${
              menuOpened ? styles.active : ""
            }`}
          >
            <span></span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
