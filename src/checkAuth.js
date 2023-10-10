import axios from "axios";
import API_URL from "./config";

const checkAuth = () => {
  const token = window.localStorage.getItem("token");

  if (token !== null) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data) {
            resolve(true);
            window.localStorage.setItem("userName", res.data.fullName);
          } else {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("userName");
            resolve(false);
          }
        })
        .catch((err) => {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("userName");
          resolve(false);
          console.log(err);
        });
    });
  } else {
    return false;
  }
};
export default checkAuth;

// biography https://assets-prd.ignimgs.com/2022/12/19/op-1671429105678.png
