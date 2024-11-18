import React, { useEffect, useState } from 'react'
import { useSelectProductsQuery } from '../../Redux/features/sellerSlice'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import NewProduct from '../../Components/vendor/NewProduct'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { toast } from "react-toastify"
import Skeleton from 'react-loading-skeleton'

const MyProducts = () => {
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const [isModal, setModal] = useState<boolean>(false)
    const vendorData: any = localStorage.getItem('vendorData')
    const vendor = JSON.parse(vendorData)
    const token = useAuthHeader()
    const { data: products, isLoading, isError, refetch } = useSelectProductsQuery({ id: vendor.vendorId, token })

    useEffect(() => {
        if (isComplete) {
            toast.success("product created")
            refetch().then(() => setIsComplete(false))
        }
    }, [isComplete, refetch])
    const sortedProducts = products ? [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : []
    return (
        <>
            {!isModal ? ("") : (
                <NewProduct setIsComplete={setIsComplete} setModal={setModal} />

            )}


            <div className='flex flex-col p-4 w-full gap-[10px]'>
                <div className='w-full p-3 flex flex-row justify-between bg-white rounded-[12px]'>
                    <div className='flex fle-row gap-[10px] items-center'>
                        <span>My Products</span>
                        <div className='p-2 bg-gray-100 rounded-[5px]'>
                            {sortedProducts ? sortedProducts.length : ""}
                        </div>
                    </div>
                    {/* <div className='border-[1px] rounded-[12px] p-1 px-3 flex flex-row gap-[4px] items-center'>
                        <div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.58268 17.5C13.9549 17.5 17.4993 13.9556 17.4993 9.58335C17.4993 5.2111 13.9549 1.66669 9.58268 1.66669C5.21042 1.66669 1.66602 5.2111 1.66602 9.58335C1.66602 13.9556 5.21042 17.5 9.58268 17.5Z" stroke="#C9C9C9" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.3327 18.3334L16.666 16.6667" stroke="#C9C9C9" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <input type="text" className='w-full h-full p-2 outline-none' placeholder='Search product' />
                    </div> */}
                </div>
                <div className='w-full flex flex-row gap-[10px] bg-white p-4 rounded-[12px]'>
                    <table className='w-[88%]'>
                        <tr className='h-10'>
                            <th className='text-start text-gray-500 font-[400]'>No</th>
                            <th className='text-start text-gray-500 font-[400]'>Product Name</th>
                            <th className='text-start text-gray-500 font-[400]'>Category</th>
                            <th className='text-start text-gray-500 font-[400]'>Action</th>
                        </tr>
                        {isLoading ? (
                            <tr>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                            </tr>


                        ) : (
                            sortedProducts.map((product: any, index: number) => (

                                <tr key={index} className='h-10'>
                                    <td className='text-black text-[14px] '>{index + 1}</td>
                                    <td className='text-black text-[14px] '>{product.name}</td>
                                    <td className='text-black text-[14px] '>{product.category}</td>
                                    <td className='text-secondary font-[600] text-[14px] '><a href={`/vendor-single-product/${product.productId}`}>View</a></td>
                                </tr>
                            ))

                        )}

                    </table>
                    <div>
                        <div onClick={() => setModal(!isModal)} className='p-2 cursor-pointer hover:scale-105 duration-300 transition-all rounded-[4px] font-[600] font-outfit bg-secondary text-white text-[12px] '>New Product</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProducts