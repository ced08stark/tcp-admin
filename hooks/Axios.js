import axios from "axios";

const baseUrl = "https://abjectof-conoda2.onrender.com/";
const baseUrl3 = "https://tcp-services-huga.onrender.com/";
const baseUrl2 = "http://localhost:3500/";
export const baseUrlOfUploadthing="https://utfs.io/f/";
export const instance = axios.create({
  baseURL: baseUrl,
  //   headers: { "X-Custom-Header": "foobar" },
});

export const baseUrlFile = baseUrl + "api/question/file/";
export const baseUrlImg = baseUrl + "uploads/image/";
export const baseUrlpdf = baseUrl + "uploads/pdf/";
export const baseOther = baseUrl + "uploads/autres/";
export const baseAudio = baseUrl + "uploads/audios/"
export default baseUrl;
