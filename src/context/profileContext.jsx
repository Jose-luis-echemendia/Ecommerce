import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
} from "../redux/actions/types";

import { createContext, useReducer } from "react";
import { profileReducer, profileInitialState } from "../redux/reducers/profile";
import { useAlert } from "../hooks/useAlert";
import axios from "axios";
import { AlertCircle } from "react-feather";

//creando contexto
export const ProfileContext = createContext();

function useProfileContext() {
  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  const { createdAlert } = useAlert();

  const getProfile = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/user`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_USER_PROFILE_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: GET_USER_PROFILE_FAIL,
        });
        console.log(error);
      }
    }
  };

  const updatedProfile = async (
    address_line_1,
    address_line_2,
    apartament,
    city,
    province,
    zipcode,
    phone,
    country
  ) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      const body = JSON.stringify({
        address_line_1,
        address_line_2,
        apartament,
        city,
        province,
        zipcode,
        phone,
        country,
      });

      try {
        const res = await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/update`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: res.data,
          });
          createdAlert("Profile updated successfully", {
            color: "green",
            type: "Action Success",
          });
        } else {
          dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
          });
          createdAlert(
            "Failed to update profile",
            { color: "red", type: "Action Failed" },
            AlertCircle
          );
        }
      } catch (error) {
        console.log(error)
        dispatch({
          type: UPDATE_USER_PROFILE_FAIL,
        });
        createdAlert(
          "Failed to update profile",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
    }
  };

  return {
    state,
    getProfile,
    updatedProfile,
  };
}

//proveer contexto
export function ProfileProvider({ children }) {
  const { state, getProfile, updatedProfile } = useProfileContext();
  return (
    <ProfileContext.Provider
      value={{ stateProfile: state, getProfile, updatedProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
