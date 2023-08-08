import Cookies from "js-cookie";

const RemoveCookies = (cookiename) => {
   Cookies.remove(cookiename);
};

export default RemoveCookies;
