import React, { useEffect } from 'react'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Logout from '../services/Logout';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
;

const Buyer = () => {
  const handelLogout = Logout()
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
    <h1 className='text-[32px] font-[700]'>Buyer Dashboard</h1>
    <button onClick={handelLogout}>SignOut</button>
  </div>
  )
}

export default Buyer