import axios from "axios";


export const URL="https://api.ggtops.com/api/v1";
// export const URL="http://localhost:2002";

export const axiosIn = axios.create({
  baseURL: URL,
});


export const config = {
    headers :{
        "Content-Type":"application/json",
    },
    withCredentials:false 
}

export const configWithToken = () => {
    let token = localStorage.getItem("accessToken");
    token = token ? token.replace(/^"|"$/g, "").trim() : null;
    console.log("MY TOKENx IS:", token);
  
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: false
    };
  };
    

export const configWithTokenMultiPart = () => {
  let token = localStorage.getItem("accessToken");
  // const  myfd="sfdsdfewsfsf897d8f97d8fds8f78dsf"
  token = token ? token.replace(/^"|"$/g, "").trim() : null; // Set undefined instead of null
    console.log("MY userSide Token now :", token);
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : "", // Explicitly handle undefined
      },
      withCredentials: false,
    };
  };