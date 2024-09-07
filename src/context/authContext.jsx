import { createContext, useReducer } from "react";
import { authReducer, authInitialState } from "../redux/reducers/auth";
import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_PERMISSIONS_USER_SUCCESS,
  GET_PERMISSIONS_USER_FAIL,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
} from "../redux/actions/types";
import { useAlert } from "../hooks/useAlert";
import { AlertCircle, Shield, Zap } from "react-feather";
import { UserPlus } from "react-feather";
import { Edit } from "react-feather";

//creando contexto
export const AuthContext = createContext();

function useAuthContext() {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const { createdAlert } = useAlert();

  const signup = async (
    first_name,
    last_name,
    email,
    password,
    re_password
  ) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/`,
        body,
        config
      );

      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });

        createdAlert(
          "We sent you an email, please activate your account",
          { color: "green", type: "Register" },
          UserPlus
        );
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });

        createdAlert(
          "Error creating account",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      console.log(error);
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });

      createdAlert(
        "error connecting to the server. Try later",
        { color: "red", type: "Action Failed" },
        AlertCircle
      );
    }
  };

  const activate = async (uid, token) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/activation/`,
        body,
        config
      );

      if (res.status === 204) {
        dispatch({
          type: ACTIVATE_SUCCESS,
        });

        createdAlert(
          "account activated successfully",
          { color: "green", type: "Activated" },
          Zap
        );
      } else {
        dispatch({
          type: ACTIVATE_FAIL,
        });
        createdAlert(
          "error activating account",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (error) {
      dispatch({
        type: ACTIVATE_FAIL,
      });
      console.log(error);
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      createdAlert(
        "error connecting to the server. Try later",
        { color: "red", type: "Action Failed" },
        AlertCircle
      );
    }
  };

  const login = async (email, password) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/create/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });

        loaderUser();

        createdAlert(
          "account login successfully",
          { color: "green", type: "Authenticated" },
          Shield
        );
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });

        createdAlert(
          "Error login account",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log(error);
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });

      createdAlert(
        "error connecting to the server. Try later",
        { color: "red", type: "Action Failed" },
        AlertCircle
      );
    }
  };

  const loaderUser = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/me/`,
          config
        );
        if (res.status === 200) {
          const permissions = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_API_URL
            }/auth/getPermissionsGroup?email_user=${res.data.email}`,
            config
          );

          if (permissions.status === 200) {

            let user = res.data
            user['permissions'] = permissions.data.permissions

            dispatch({
              type: USER_LOADED_SUCCESS,
              payload: user,
            });
          } else {
            dispatch({
              type: USER_LOADED_FAIL,
            });
          }
        } else {
          dispatch({
            type: USER_LOADED_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: USER_LOADED_FAIL,
        });
        console.log(error);
      }
    } else {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  };

  const checkAuthenticated = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        token: localStorage.getItem("access"),
      });

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/verify/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch({
            type: AUTHENTICATED_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
        console.log(error);
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  };

  const refresh = async () => {
    if (localStorage.getItem("refresh")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        refresh: localStorage.getItem("refresh"),
      });

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/refresh/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: REFRESH_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: REFRESH_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: REFRESH_FAIL,
        });
        console.log(error);
      }
    } else {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    createdAlert("Succesfully logged out", { color: "green", type: "Log Out" });
  };

  const resetPassword = async (email) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ email });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/reset_password/`,
        body,
        config
      );

      if (res.status === 204) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });

        createdAlert("Password reset email sent", {
          color: "green",
          type: "Accion Accept",
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAIL,
        });

        createdAlert(
          "error sendig password reset email",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });

      createdAlert(
        "error sendig password reset email",
        { color: "red", type: "Action Failed" },
        AlertCircle
      );
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

  const resetPasswordConfirm = async (
    uid,
    token,
    new_password,
    re_new_password
  ) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid,
      token,
      new_password,
      re_new_password,
    });

    if (new_password !== re_new_password) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
      createdAlert(
        "passwords do not match",
        { color: "red", type: "Action Failed" },
        AlertCircle
      );
    } else {
      try {
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/auth/users/reset_password_confirm/`,
          body,
          config
        );

        if (res.status === 204) {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
          });
          createdAlert(
            "Password has been reset successfully",
            { color: "green", type: "Password Change" },
            Edit
          );
        } else {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
          });
          createdAlert(
            "Error resetting your password",
            { color: "red", type: "Action Failed" },
            AlertCircle
          );
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        });
        createdAlert(
          "Error resetting your password",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    }
  };

  return {
    state,
    signup,
    activate,
    login,
    loaderUser,
    checkAuthenticated,
    refresh,
    logout,
    resetPassword,
    resetPasswordConfirm,
  };
}

//proveer contexto
export function AuthProvider({ children }) {
  const {
    state,
    signup,
    activate,
    login,
    loaderUser,
    checkAuthenticated,
    refresh,
    logout,
    resetPassword,
    resetPasswordConfirm,
  } = useAuthContext();
  return (
    <AuthContext.Provider
      value={{
        stateAuth: state,
        signup,
        activate,
        login,
        loaderUser,
        checkAuthenticated,
        refresh,
        logout,
        resetPassword,
        resetPasswordConfirm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
