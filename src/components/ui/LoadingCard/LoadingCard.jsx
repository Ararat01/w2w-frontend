import { ColorRing, ThreeDots } from "react-loader-spinner";
import styles from "./LoadingCard.module.scss";

const LoadingCard = ({ card }) => {
  return (
    <div
      className={
        card === "horizontal"
          ? styles.loaderCard__horizontal
          : styles.loaderCard
      }
    >
      <div className={styles.loaderCard__img}>
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#C65257", "#4CC4D6", "#B1D595", "#F58C2D", "#C65257"]}
        />
      </div>
      <ThreeDots
        height="40"
        width="40"
        radius="9"
        color="#F58C2D"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default LoadingCard;
