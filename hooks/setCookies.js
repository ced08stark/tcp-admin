import Cookies from "js-cookie";


const SetCookies = (cookiename, usrln) =>{
    Cookies.set(cookiename, usrln,{ expires:1, secure: true, sameSite: 'strict', path: '/'})
}


export default SetCookies;