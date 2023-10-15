import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className="page">
      <div className="container">
        <div className={styles.page}>
          <img className={styles.image} src="/404.png" alt="" />
          <div className={styles.body}>
            <h2>Page Not Found</h2>
            <p>
              Sorry, the page you're looking for doesn't exist. If you think
              somethin is broken, report a problem.
            </p>
            <Link to={"/home"}>Go Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
