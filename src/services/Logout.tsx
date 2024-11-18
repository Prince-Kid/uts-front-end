import React from 'react'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

const Logout = () => {
  const signOut = useSignOut();
  return () => {
    signOut();
    window.location.href = '/';
  };
};

export default Logout