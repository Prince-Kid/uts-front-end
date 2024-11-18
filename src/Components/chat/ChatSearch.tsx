import React, { useState } from 'react'
import { useGetAllVendorsQuery } from '../../Redux/features/ChatSlice'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const ChatSearch = ({ handelSelect }: { handelSelect: any }) => {
    const [isVendorOpen, setIsVendorOpen] = useState<boolean>(false)
    const { data, error, isLoading } = useGetAllVendorsQuery({})
    const vendors = data ? data.vendors : []
    const userData:any = useAuthUser()
    return (
        <>
            <div className='p-4 bg-white rounded-[12px] flex flex-col gap-[20px] w-full relative'>
                <div className={`w-full flex flex-col gap-[4px] ${isVendorOpen ? 'h-[60vh] py-2 px-4' : 'h-[0vh]'} listvendor transition-all duration-300 overflow-y-scroll shadow-md  bg-gray-50 absolute top-16 left-0 rounded-[6px] `}>
                    {isLoading ? ('loading..') : (
                        vendors.map((vendor: any, index: number) => {
                            return (
                                <div onClick={() => handelSelect(vendor)} key={index} className=' cursor-pointer hover:scale-105 transition-all duration-300 flex flex-row gap-[10px]  py-3 items-center bg-white px-2 rounded-[6px]'>
                                    <div className='flex items-center justify-center w-[30px] h-[30px] rounded-[6px] border border-gray-500'>
                                        <img src={vendor.profile} className='w-full h-full object-cover rounded-[6px]' alt="" />
                                    </div>
                                    <div className='flex flex-col leading-1'>
                                        <div className='flex font-outfit flex-row items-center justify-between w-full'>
                                            <span className='text-[14px] font-[600]'>{vendor?.Vendor?.storeName}</span>

                                        </div>

                                    </div>

                                </div>

                            )
                        })

                    )}

                </div>
                {userData?.role !== "vendor" ?  (
                    <>
                    

               
                <div className='flex flex-row gap-[10px] items-center justify-between w-full'>
                    <h1 className='text-[20px] font-[600] font-outfit'>Chat</h1>
                    <div onClick={() => setIsVendorOpen(!isVendorOpen)} className='w-[40px] h-[40px] bg-primary cursor-pointer hover:scale-75 transition-all duration-200 flex items-center justify-center rounded-[4px]'>
                        <span className='text-[24px] text-white '> + </span>
                    </div>

                </div>
               
                <div className='p-1 border flex flex-row rounded-[12px] items-center px-2'>
                    <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.58334 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58334C17.5 5.21108 13.9556 1.66667 9.58334 1.66667C5.21108 1.66667 1.66667 5.21108 1.66667 9.58334C1.66667 13.9556 5.21108 17.5 9.58334 17.5Z" stroke="#E6E6E6" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.3333 18.3333L16.6667 16.6667" stroke="#E6E6E6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </div>
                    <input type="text" placeholder='Search Vendor sss' className='p-2 outline-none w-full' />
                </div>
                </>
                 ): (<h1 className='text-[18px] font-[600] font-outfit uppercase'>Chat With Your Customer</h1>)}
            </div>
        </>
    )
}

export default ChatSearch