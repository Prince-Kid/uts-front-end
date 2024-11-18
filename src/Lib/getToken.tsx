import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const getToken = () => {
  const authHeader:any = useAuthHeader();
  return authHeader();
};
