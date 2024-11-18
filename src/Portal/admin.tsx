import React, { useEffect } from 'react'
import Logout from '../services/Logout'
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Components/dashboard/Sidebar'
import DashFooter from '../Components/dashboard/DashFooter'
import DashHeader from "../Components/dashboard/AdminHeader";

const Admin = () => {
  const navigate = useNavigate()
  const userData: any = useAuthUser()
  useEffect(() => {
    if (userData.role !== "admin") {
      navigate(`/${userData.role}`)
      return
    }
  }, [navigate])
  return (
    <div className=" w-full h-screen flex flex-row">
      <div className='hidden lg:w-[15%] relative lg:flex'>
        <Sidebar />
      </div>

      <div className="w-full lg:flex flex-col ">
        <DashHeader />
        <div className=" justify-center flex flex-grow p-4 bg-gray-100  lg:ml-[70px] pt-[10vh] xl:ml-[20px]">
          <Outlet />
        </div>
        <DashFooter />
      </div>
    </div>
  )
}

export default Admin
