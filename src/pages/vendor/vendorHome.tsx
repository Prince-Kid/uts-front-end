import React from 'react'
import { useSelectFeddbackQuery } from '../../Redux/features/sellerSlice'
import { FaStar } from "react-icons/fa";
import WeeklyReport from '../../Components/Analytics/WeeklyReport';
import SellerWeeklyReport from '../../Components/Analytics/SellerAnalytics/WeeklySellingReport';
import { useGetSellerOrderQuery } from '../../Redux/OrderSlice';

const VendorHome = () => {
    
    const { data: responseData, error, isLoading } = useSelectFeddbackQuery({})
    const vendorData:any = localStorage.getItem("vendorData")
    const vendor = JSON.parse(vendorData)
    function getAuthCookie() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === '_auth') {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    const token = getAuthCookie();
    const { data: sellerOrders, isLoading:sellerLoading, error:sellerError } = useGetSellerOrderQuery({ token,vendorId:vendor?.vendorId });
    const cardReview = [
        {
            label: "Reviews",
            number: responseData ?  responseData.feedback.filter((data: any) => data.Product.vendorId === vendor.vendorId).length : 0,
            icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#F2F2F2" />
                <path opacity="0.4" d="M20.9984 11.9667C20.9484 11.9583 20.8901 11.9583 20.8401 11.9667C19.6901 11.925 18.7734 10.9833 18.7734 9.81666C18.7734 8.62499 19.7318 7.66666 20.9234 7.66666C22.1151 7.66666 23.0734 8.63332 23.0734 9.81666C23.0651 10.9833 22.1484 11.925 20.9984 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M20.1393 18.0335C21.2809 18.2252 22.5393 18.0252 23.4226 17.4335C24.5976 16.6502 24.5976 15.3668 23.4226 14.5835C22.5309 13.9918 21.2559 13.7918 20.1143 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M10.9725 11.9667C11.0225 11.9583 11.0808 11.9583 11.1308 11.9667C12.2808 11.925 13.1975 10.9833 13.1975 9.81666C13.1975 8.62499 12.2391 7.66666 11.0475 7.66666C9.85579 7.66666 8.89746 8.63332 8.89746 9.81666C8.90579 10.9833 9.82246 11.925 10.9725 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M11.8316 18.0335C10.6899 18.2252 9.43158 18.0252 8.54824 17.4335C7.37324 16.6502 7.37324 15.3668 8.54824 14.5835C9.43991 13.9918 10.7149 13.7918 11.8566 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.0004 18.1918C15.9504 18.1835 15.8921 18.1835 15.8421 18.1918C14.6921 18.1502 13.7754 17.2085 13.7754 16.0418C13.7754 14.8502 14.7337 13.8918 15.9254 13.8918C17.1171 13.8918 18.0754 14.8585 18.0754 16.0418C18.0671 17.2085 17.1504 18.1585 16.0004 18.1918Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5756 20.817C12.4006 21.6003 12.4006 22.8836 13.5756 23.6669C14.9089 24.5586 17.0923 24.5586 18.4256 23.6669C19.6006 22.8836 19.6006 21.6003 18.4256 20.817C17.1006 19.9337 14.9089 19.9337 13.5756 20.817Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
        },
        // {
        //     label: "Purchases",
        //     number: 0,
        //     icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <rect width="32" height="32" rx="8" fill="#F2F2F2" />
        //         <path opacity="0.4" d="M20.9984 11.9667C20.9484 11.9583 20.8901 11.9583 20.8401 11.9667C19.6901 11.925 18.7734 10.9833 18.7734 9.81666C18.7734 8.62499 19.7318 7.66666 20.9234 7.66666C22.1151 7.66666 23.0734 8.63332 23.0734 9.81666C23.0651 10.9833 22.1484 11.925 20.9984 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path opacity="0.4" d="M20.1393 18.0335C21.2809 18.2252 22.5393 18.0252 23.4226 17.4335C24.5976 16.6502 24.5976 15.3668 23.4226 14.5835C22.5309 13.9918 21.2559 13.7918 20.1143 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path opacity="0.4" d="M10.9725 11.9667C11.0225 11.9583 11.0808 11.9583 11.1308 11.9667C12.2808 11.925 13.1975 10.9833 13.1975 9.81666C13.1975 8.62499 12.2391 7.66666 11.0475 7.66666C9.85579 7.66666 8.89746 8.63332 8.89746 9.81666C8.90579 10.9833 9.82246 11.925 10.9725 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path opacity="0.4" d="M11.8316 18.0335C10.6899 18.2252 9.43158 18.0252 8.54824 17.4335C7.37324 16.6502 7.37324 15.3668 8.54824 14.5835C9.43991 13.9918 10.7149 13.7918 11.8566 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path d="M16.0004 18.1918C15.9504 18.1835 15.8921 18.1835 15.8421 18.1918C14.6921 18.1502 13.7754 17.2085 13.7754 16.0418C13.7754 14.8502 14.7337 13.8918 15.9254 13.8918C17.1171 13.8918 18.0754 14.8585 18.0754 16.0418C18.0671 17.2085 17.1504 18.1585 16.0004 18.1918Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path d="M13.5756 20.817C12.4006 21.6003 12.4006 22.8836 13.5756 23.6669C14.9089 24.5586 17.0923 24.5586 18.4256 23.6669C19.6006 22.8836 19.6006 21.6003 18.4256 20.817C17.1006 19.9337 14.9089 19.9337 13.5756 20.817Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //     </svg>,
        // },
        {
            label: "Orders",
            number: sellerOrders ? sellerOrders.length : 0,
            icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#F2F2F2" />
                <path opacity="0.4" d="M20.9984 11.9667C20.9484 11.9583 20.8901 11.9583 20.8401 11.9667C19.6901 11.925 18.7734 10.9833 18.7734 9.81666C18.7734 8.62499 19.7318 7.66666 20.9234 7.66666C22.1151 7.66666 23.0734 8.63332 23.0734 9.81666C23.0651 10.9833 22.1484 11.925 20.9984 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M20.1393 18.0335C21.2809 18.2252 22.5393 18.0252 23.4226 17.4335C24.5976 16.6502 24.5976 15.3668 23.4226 14.5835C22.5309 13.9918 21.2559 13.7918 20.1143 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M10.9725 11.9667C11.0225 11.9583 11.0808 11.9583 11.1308 11.9667C12.2808 11.925 13.1975 10.9833 13.1975 9.81666C13.1975 8.62499 12.2391 7.66666 11.0475 7.66666C9.85579 7.66666 8.89746 8.63332 8.89746 9.81666C8.90579 10.9833 9.82246 11.925 10.9725 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M11.8316 18.0335C10.6899 18.2252 9.43158 18.0252 8.54824 17.4335C7.37324 16.6502 7.37324 15.3668 8.54824 14.5835C9.43991 13.9918 10.7149 13.7918 11.8566 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.0004 18.1918C15.9504 18.1835 15.8921 18.1835 15.8421 18.1918C14.6921 18.1502 13.7754 17.2085 13.7754 16.0418C13.7754 14.8502 14.7337 13.8918 15.9254 13.8918C17.1171 13.8918 18.0754 14.8585 18.0754 16.0418C18.0671 17.2085 17.1504 18.1585 16.0004 18.1918Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5756 20.817C12.4006 21.6003 12.4006 22.8836 13.5756 23.6669C14.9089 24.5586 17.0923 24.5586 18.4256 23.6669C19.6006 22.8836 19.6006 21.6003 18.4256 20.817C17.1006 19.9337 14.9089 19.9337 13.5756 20.817Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
        },
        // {
        //     label: "Transactions",
        //     number: 0,
        //     icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <rect width="32" height="32" rx="8" fill="#F2F2F2" />
        //         <path opacity="0.4" d="M20.9984 11.9667C20.9484 11.9583 20.8901 11.9583 20.8401 11.9667C19.6901 11.925 18.7734 10.9833 18.7734 9.81666C18.7734 8.62499 19.7318 7.66666 20.9234 7.66666C22.1151 7.66666 23.0734 8.63332 23.0734 9.81666C23.0651 10.9833 22.1484 11.925 20.9984 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path opacity="0.4" d="M20.1393 18.0335C21.2809 18.2252 22.5393 18.0252 23.4226 17.4335C24.5976 16.6502 24.5976 15.3668 23.4226 14.5835C22.5309 13.9918 21.2559 13.7918 20.1143 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path opacity="0.4" d="M10.9725 11.9667C11.0225 11.9583 11.0808 11.9583 11.1308 11.9667C12.2808 11.925 13.1975 10.9833 13.1975 9.81666C13.1975 8.62499 12.2391 7.66666 11.0475 7.66666C9.85579 7.66666 8.89746 8.63332 8.89746 9.81666C8.90579 10.9833 9.82246 11.925 10.9725 11.9667Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path opacity="0.4" d="M11.8316 18.0335C10.6899 18.2252 9.43158 18.0252 8.54824 17.4335C7.37324 16.6502 7.37324 15.3668 8.54824 14.5835C9.43991 13.9918 10.7149 13.7918 11.8566 13.9918" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path d="M16.0004 18.1918C15.9504 18.1835 15.8921 18.1835 15.8421 18.1918C14.6921 18.1502 13.7754 17.2085 13.7754 16.0418C13.7754 14.8502 14.7337 13.8918 15.9254 13.8918C17.1171 13.8918 18.0754 14.8585 18.0754 16.0418C18.0671 17.2085 17.1504 18.1585 16.0004 18.1918Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //         <path d="M13.5756 20.817C12.4006 21.6003 12.4006 22.8836 13.5756 23.6669C14.9089 24.5586 17.0923 24.5586 18.4256 23.6669C19.6006 22.8836 19.6006 21.6003 18.4256 20.817C17.1006 19.9337 14.9089 19.9337 13.5756 20.817Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
        //     </svg>,
        // },
    ]
    return (
        <div className='flex flex-col gap-[20px] px-2'>
            <div className='flex  flex-row gap-[20px]'>
                <div className='grid grid-cols-1 gap-[10px] w-[40%]'>
                    {cardReview.map((item, index) => {
                        return (
                            <div className='flex p-4 bg-white rounded-[12px] flex-row w-full justify-between gap-[20px] items-center' key={index}>
                                <div className='flex flex-col gap-[10px]'>
                                    <span className='text-[18px] font-[700] font-outfit'>{item.label}</span>
                                    <span className='text-[18px] font-[700] font-outfit'>{item.number}</span>
                                </div>
                                {item.icon}
                            </div>
                        )
                    })}

                </div>
                <div className='w-[60%]'>
                <SellerWeeklyReport/>

                </div>
            </div>
            <div className='flex flex-row gap-[10px]'>
                <div className='w-1/2 p-4 rounded-[12px] bg-white flex flex-col gap-[10px]'>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <div className='p-2 px-4 flex flex-row items-center gap-[10px] rounded-[6px] bg-secondary'>
                            <span className='text-[16px] font-[600] text-white font-outfit'>Reviews</span>
                            <span className='text-[16px] font-[600] text-white font-outfit'>
                                {isLoading ? (<h1>Loading</h1>) :(
                                    responseData.feedback.filter((data: any) => data.Product.vendorId === vendor.vendorId).length

                                )}
                            </span>
                        </div>
                        <a href="/" className='text-[14px] font-[500] text-secondary'>View All</a>
                    </div>
                    {isLoading ? (<h1></h1>) : (
                        <>

                            <table className='w-full'>
                                <tr className='h-10'>
                                    <th className='text-start font-[500] text-gray-400'>Name</th>
                                    <th className='text-start font-[500] text-gray-400'>Product</th>
                                    <th className='text-start font-[500] text-gray-400'>Review</th>
                                </tr>
                                {responseData.feedback.filter((data: any) => data.Product.vendorId === vendor.vendorId).slice(0,3).map((item: any, index: number) => {
                                    return (
                                        <tr className='h-10' key={index}>
                                            <td className='text-start font-[500] text-gray-400'>{item.name}</td>
                                            <td className='text-start font-[500] text-gray-400'>{item.Product.name}</td>
                                            <td className='flex flex-row gap-[4px] items-center pt-2'>
                                                {new Array(item.ratingScore).fill(0).map((item, indexKey) => {
                                                    return (
                                                        <div key={indexKey}>
                                                            <FaStar color='orange' />
                                                        </div>
                                                    )
                                                })}
                                            </td>
                                        </tr>

                                    )
                                })}

                            </table>
                        </>


                    )}
                </div>
            </div>
        </div>
    )
}

export default VendorHome