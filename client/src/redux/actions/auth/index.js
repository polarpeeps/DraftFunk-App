import axios from '../../../utils/axios'
import {toast} from "react-hot-toast"
export const loginUser = (user) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("/auth/login", user);
        const responseData  = response.data;
        const { token } = responseData;
        axios.defaults.headers.common["Authorization"] = `${token}`;
        // store token in local storage
        localStorage.setItem("token", token);
        dispatch({
          type: "LOGIN_USER",
          payload: responseData,
        });
        toast.success("Login successful");
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
  };
  export const signupUser = (user) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("/auth/signup", user);
        const responseData = response.data;
  
        // Dispatch an action indicating signup was successful. The payload could include user data or just a success message.
        dispatch({
          type: "SIGNUP_USER",
          payload: responseData,
        });
  
        // Notify the user that signup was successful. The message could be more specific based on the responseData if needed.
        toast.success("Signup successful. Please login to continue.");
  
      } catch (error) {
        // Attempt to display a user-friendly error message if the API provides one, otherwise fall back to a generic error message.
        toast.error(error.response?.data?.message || "An error occurred during signup.");
        console.log(error);
      }
    };
  };
// export const signupUser = (user) => {
//  return async (dispatch) => {
//     try {
//         const response = await axios.post('/auth/signup', user)
//         const {data:responseData} = response
//         const {token} = responseData.data
//         axios.defaults.headers.common['Authorization'] = `${token}`
//         dispatch({
//             type: 'SIGNUP_USER',
//             payload: response
//         })
//         toast.success(response.message)
//     } catch (error) {
//         toast.error(error.response.data.message)
//         console.log(error)
//     }
//  }
// }
export const loadUser = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get(`/auth/validate-token/${token}`);
        const responseData  = response.data;
        console.log(responseData)
        dispatch({
          type: "LOAD_USER",
          payload: {
            token,
            user: responseData,
          },
        });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("token");
    return async (dispatch) => {
      dispatch({type: "LOGOUT"});
    };
  }