import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
} from "./types";

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `http://112.221.126.138:10000/api/testing/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    console.log("load_user1");
    // const config = {
    //   Headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `JWT ${localStorage.getItem("access")}`,
    //     Accept: "application/json",
    //   },
    // };
    try {
      console.log(`JWT ${localStorage.getItem("access")}`);
      const res = await axios
        .get(`http://112.221.126.138:10000/api/testing/users/me/`, {
          Headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        })
        .then(function (res) {
          console.log(res);
          dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data,
          });
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };
  // const userInfo = { username: username, password: password };
  //const body = JSON.stringify(username, password);

  try {
    const res = await axios
      .post("http://112.221.126.138:10000/api/testing/jwt/create/", {
        username: username,
        password: password,
        config,
      })
      .then(function (res) {
        console.log(res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(load_user());
      });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
