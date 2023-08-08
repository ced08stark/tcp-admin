import axios from "axios";

const baseUrl = "https://tcp-services-huga.onrender.com/";
export const instance = axios.create({
  baseURL: baseUrl,
  //   headers: { "X-Custom-Header": "foobar" },
});

export const baseUrlImg = baseUrl + "upload/";
export default baseUrl;
