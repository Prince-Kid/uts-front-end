import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDeleteProductMutation, useSelectSingleProductQuery } from '../../Redux/features/sellerSlice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { toast } from 'react-toastify'
import UpdateProduct from '../../Components/vendor/UpdateProduct'
import Skeleton from 'react-loading-skeleton'
import Reviews from "../../Components/SingleProduct/reviews";

const VendorSingleProduct = () => {
    const [isComplete,setIsComplete] = useState<boolean>(false)
    const [isModal,setModal] = useState<boolean>(false)
    const { id } = useParams<{ id: string }>()
    const navigate:any = useNavigate()
    const token = useAuthHeader()
    const { data: singleProduct, error, isLoading,refetch } = useSelectSingleProductQuery(id)
    const [deleteProduct, { isLoading: deleteLoading, isError: deleteError }] = useDeleteProductMutation()
    const vendorData: any = localStorage.getItem('vendorData')
    const vendor = JSON.parse(vendorData)

    const [openedImage, setOpenedImage] = useState<number>(0)

    useEffect(() => {
        if (isComplete) {
            toast.success("Product updated")
            refetch().then(() => setIsComplete(false))
        }
    }, [isComplete, refetch])

    if (isLoading) {
        return (
           <div className='w-full flex flex-col gap-[20px] p-20'>
             <div className='flex flex-row gap-[20px] '>
                <div className='flex w-[60%] flex-col gap-[20px]'>
                    <div className='w-full  h-[60vh] rounded-[12px]'>
                       <Skeleton className='w-full h-full'/>
                    </div>
                    <div className='grid  grid-cols-4 gap-[20px]'>
                        {Array.from({length: 4}).map((item:any,index:number)=>{
                            return(

                        <div onClick={()=> setOpenedImage(index)} key={index} className=' cursor-pointer w-full h-[20vh]'>
                            <Skeleton className='w-full rounded-[12px] h-full object-cover' />
                        </div>
                            )
                        })}
                      
                    
                    </div>
                </div>
                <div className='w-[10%] flex flex-col gap-[10px]'>
                    <div className='flex flex-col gap-[5px]'>
                       <Skeleton height={30}/>
                       <Skeleton height={30}/>
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                    <Skeleton height={30}/>
                    <Skeleton height={30}/>
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                    <Skeleton height={30}/>
                    <Skeleton height={30}/>
                    </div>
                    <div className='flex flex-col gap-[5px] font-outfit'>
                    <Skeleton height={30}/>
                        <div className='flex flex-row gap-[10px] items-center'>
                        <Skeleton height={30}/>
                        <Skeleton height={30}/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[5px] font-outfit'>
                    <Skeleton height={30}/>
                        <div className='flex flex-row gap-[10px] items-center'>
                           <Skeleton height={30}/>

                        </div>
                    </div>
                    <div className='flex flex-col gap-[5px] font-outfit'>
                        <div className='flex flex-row gap-[10px] items-center'>
                        <Skeleton height={30}/>
                        <Skeleton height={30}/>

                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center w-full'>
            <Skeleton height={50}/>
            <Skeleton height={50}/>
            </div>
           </div>
        )
    }
    if (error) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <span className='text-[32px] font-[600]'>No Product Found</span>
            </div>
        )
    }
    

    const expiringDate = new Date(singleProduct.expiringDate)
    const day = expiringDate.getDate()
    const month = expiringDate.toLocaleString('default', { month: 'long' })
    const year = expiringDate.getFullYear()

    const handelDelete = async () => {
        try {
            const response = await deleteProduct({ id, token, data: { vendorId: vendor.vendorId } })
            if (response) {
                toast.success("Product Deleted")
                setTimeout(() => {
                    navigate("/vendor/my-products")
                }, 1000)
            }

        } catch (error) {
            console.log(error)
        }
    }



   
    return (
        <>
  
      
        <div className='flex flex-col  gap-[20px] p-4 px-20 bg-white'>
            <a href='/vendor/my-products' className=' ml-auto '><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.6667 5H8.33333C7.44928 5 6.60143 5.35119 5.97631 5.97631C5.35119 6.60143 5 7.44928 5 8.33333V31.6667C5 32.5507 5.35119 33.3986 5.97631 34.0237C6.60143 34.6488 7.44928 35 8.33333 35H31.6667C32.5507 35 33.3986 34.6488 34.0237 34.0237C34.6488 33.3986 35 32.5507 35 31.6667V8.33333C35 7.44928 34.6488 6.60143 34.0237 5.97631C33.3986 5.35119 32.5507 5 31.6667 5ZM26 28.3333L20 22.3333L14 28.3333L11.6667 26L17.6667 20L11.6667 14L14 11.6667L20 17.6667L26 11.6667L28.3333 14L22.3333 20L28.3333 26L26 28.3333Z" fill="#777777" />
            </svg>
            </a>
            <div className='flex flex-row gap-[20px] '>
                <div className='flex w-[60%] flex-col gap-[20px]'>
                    <div className='w-full  h-[60vh] rounded-[12px]'>
                        <LazyLoadImage src={singleProduct.image[openedImage]} className='w-full rounded-[12px] h-full object-cover' />
                    </div>
                    <div className='grid  grid-cols-4 gap-[20px]'>
                        {singleProduct.image.map((item:any,index:number)=>{
                            return(

                        <div onClick={()=> setOpenedImage(index)} key={index} className=' cursor-pointer w-full h-[20vh]'>
                            <LazyLoadImage src={item} className='w-full rounded-[12px] h-full object-cover' />
                        </div>
                            )
                        })}
                      
                    
                    </div>
                </div>
                <div className='w-[40%] flex flex-col gap-[10px]'>
                    <div className='flex flex-col gap-[5px]'>
                        <span className='text-secondary font-outfit '>Product Category</span>
                        <span className='px-2 bg-gray-50 rounded-[12px] py-1 flex items-center justify-center w-[100px]'>{singleProduct.category}</span>
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <span className='text-secondary font-outfit '>Product Name</span>
                        <span className='px-2 text-balck font-outfit text-[16px]'>{singleProduct.name}</span>
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <span className='text-secondary font-outfit '>Quantity</span>
                        <span className='px-2 bg-gray-50 rounded-[12px] py-1 flex items-center justify-center max-w-[150px] min-w-[100px] font-[600] font-outfit'>{singleProduct.quantity} In Stock</span>
                    </div>
                    <div className='flex flex-col gap-[5px] font-outfit'>
                        <span className='text-secondary font-outfit '>Price</span>
                        <div className='flex flex-row gap-[10px] items-center'>
                            <span>{singleProduct.price}</span>
                            <span className='p-2 bg-gray-50'>Rwf</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[5px] font-outfit'>
                        <span className='text-secondary font-outfit '>Description</span>
                        <div className='flex flex-row gap-[10px] items-center'>
                            <span>{singleProduct.description}</span>

                        </div>
                    </div>
                    <div className='flex flex-col gap-[5px] font-outfit'>
                        <span className='text-secondary font-outfit '>Expiring Date</span>
                        <div className='flex flex-row gap-[10px] items-center'>
                            <span>{day} {month}  {year}</span>

                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center w-full'>
                <h1 className='text-[18px] font-outfit'>Reviews</h1>
                <div className='flex flex-row gap-[20px]'>
                    <button onClick={()=> setModal(true)} className='p-2 bg-primary rounded-[12px] px-4 text-white font-outfit'>
                        Update
                    </button>
                    <button onClick={handelDelete} className='p-2 bg-secondary rounded-[12px] px-4 text-white font-outfit'>
                        {deleteLoading ? "In Progress" : "Delete"}
                    </button>
                </div>
            </div>
            {!isModal ? ("") : (
            <UpdateProduct productData={singleProduct} setIsComplete={setIsComplete} setModal={setModal} />

        )}
        </div>
  
        </>
    )
}

export default VendorSingleProduct