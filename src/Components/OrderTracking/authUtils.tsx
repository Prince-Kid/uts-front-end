import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getCookie = (name: string) => {
    const value = `;${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;


  }
  
  export const isVendor = (): boolean => {
    const token = Cookies.get('_auth');
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { role?: string };
        return decodedToken.role === 'vendor';
      } catch (error) {
        console.error('Failed to decode token ', error);
        return false;
      }
    }
    return false;
  };

  export const getToken = () => {
    const token = Cookies.get('_auth');

    if(!token) return null;
    try{
        return jwtDecode(token);
    } catch(error){
        console.error('Failed to decode token ', error);
        return null;
    }
  }