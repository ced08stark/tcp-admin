import axios from "axios";

const baseUrl = "https://tcp-services-huga.onrender.com/";
export const instance = axios.create({
  baseURL: baseUrl,
  //   headers: { "X-Custom-Header": "foobar" },
});

export const baseUrlImg = baseUrl + "uploads/image/";
export const baseUrlpdf = baseUrl + "uploads/pdf/";
export const baseOther = baseUrl + "uploads/autres/";
export const baseAudio = baseUrl + "uploads/audios/";
export default baseUrl;
