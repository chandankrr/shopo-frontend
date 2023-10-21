import axios from 'axios';
import { server } from '../../server';

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoadUserFail',
      payload: error.response.data.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadSellerRequest',
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: 'LoadSellerSuccess',
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: 'LoadSellerFail',
      payload: error.response.data.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch, action) => {
    try {
      dispatch({
        type: 'updateUserInfoRequest',
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updateUserInfoSuccess',
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        error: 'updateUserInfoFailed',
        payload: error.response.data.message,
      });
    }
  };
