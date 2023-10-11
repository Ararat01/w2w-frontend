import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Collections.module.scss";
import Header from "../../components/Header/Header";
import CollectionCard from "../../components/ui/CollectionCard/CollectionCard";
import API_URL from "../../config";
import LoadingCard from "../../components/ui/LoadingCard/LoadingCard";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        setCollections(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page">
      <Header />
      <div className="container">
        <div className={styles.collections}>
          {collections.length
            ? collections.map((col, i) => {
                return <CollectionCard collection={col} key={i} />;
              })
            : [...Array(8)].map((_, i) => <LoadingCard ratio={'16/9'} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Collections;
