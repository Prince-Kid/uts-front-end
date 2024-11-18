import React, { FormEvent, useEffect, useState } from 'react'
import Input from '../../Constants/Input'
import AuthButton from '../../Constants/AuthButton'
import axios from 'axios'
import {useUpdateProductMutation } from '../../Redux/features/sellerSlice'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'


interface productProps {
    setIsComplete: any,
    setModal: any,
    productData: any
}

const UpdateProduct = (property: productProps) => {
    const [name, setName] = useState<string>(property.productData.name)
    const [description, setDescription] = useState<string>(property.productData.description)
    const [discount, setDiscount] = useState<number>(property.productData.discount)
    const [price, setPrice] = useState<string>(property.productData.price)
    const [image, setImage] = useState(property.productData.image);
    const [category, setCategory] = useState<string>(property.productData.category)
    const [quantity, setQuantity] = useState<number>(property.productData.quantity)
    const [expiringDate, setExpiringDate] = useState<string>(property.productData.expiringDate)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const token = useAuthHeader()

    
     
    const [updateProduct, {isLoading:uploadLoading,isError}] = useUpdateProductMutation()

    const handleImages = (value: FileList): void => {
        const newImages = Array.from(value)
        if ((newImages.length + image.length) > 5) {
            return;
        } else {
            setImage([...image, ...newImages]);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            handleImages(event.target.files);
        }
    };
    const handelRemove  = (index:any)=>{
        console.log(index)
        const newImages = [...image]
        newImages.splice(index,1)
        setImage(newImages)
    }

    const validateForm = (): boolean => {
        setLoading(true)
        if (!name || !description || !discount || !price) {
          setError(true);
          return false;
        }
        if (image.length === 0) {
          setError(true);
          return false;
        }
        return true;
      };
    
      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
          const uploadPromises = image.map((img:any) => {
            const formData = new FormData();
            formData.append('file', img);
            formData.append('upload_preset', 'e-commerce');
            return axios.post('https://api.cloudinary.com/v1_1/dnefzcfv6/image/upload', formData);
          });
    
          const responses = await Promise.all(uploadPromises);
          const imageUrls = responses.map(response => response.data.secure_url);
    
          const vendor = JSON.parse(localStorage.getItem('vendorData') as string);
          const data = {name,quantity,description,price,discount,expiringDate,category,image: imageUrls, vendorId: vendor.vendorId,id: property.productData.productId };
    
          const response = await updateProduct({data,token}).unwrap();
          if (response.message && response.message === "Product updated successfully") {
            console.log(response)
            setLoading(false)
            property.setModal(false)
            property.setIsComplete(true)
          }
        } catch (error) {
          setLoading(false)
          setError(true);
        }
      };
    


    return (
        <div className='w-full h-full bg-black/20  fixed flex items-center top-0 justify-center left-0'>
            <div className='w-1/2 flex flex-col max-h-[90vh] overflow-y-scroll gap-[10px] bg-white p-4 rounded-[12px]'>
                <div className='w-full flex flex-row font-outfit items-center justify-between'>
                    <h1 className='text-[18px] font-[600]'>Update Product</h1>
                    <div className='text-[20px] font-[700] text-black cursor-pointer hover:scale-125 transition-all duration-300' onClick={()=> property.setModal(false)}>X</div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-[10px] items-center'>
                    <div className='grid grid-cols-2 gap-[10px] w-full'>
                        <Input label='Name' type='text' value={name} placeholder='Enter Product Name' error={error} onChange={(value) => setName(value)} />
                        <Input label='Description' type='text' value={description} placeholder='Type Description' error={error} onChange={(value) => setDescription(value)} />
                        <Input label='Price' type='number' value={price} placeholder='Enter Product Price' error={error} onChange={(value) => setPrice(value)} />
                        <Input label='Quantity' type='number' value={quantity} placeholder='Enter Product Price' error={error} onChange={(value) => setQuantity(value)} />
                        <Input label='Discount' type='number' value={discount} placeholder='Enter Product Discount' error={error} onChange={(value) => setDiscount(value)} />
                        <div className='flex flex-col gap-[6px] w-full'>
                        <span className="text-[16px] font-[400] text-[#666666] font-outfit">Category</span>
                        <select name="category" onChange={(e)=> setCategory(e.target.value)}  className={`p-3 border ${error ? 'border-red-500/60' : 'border-border/50'}  rounded-[12px] font-outfit outline-none placeholder:font-[400] w-full`} id="">
                        <option value="Electronics">Electronics</option>
                        <option value="Food">Food</option>
                        <option value="Mechanism">Mechanism</option>
                        <option value="Sport Kit">Sport Kit</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Shoes">Shoes</option>
                        </select>
                        </div>
                        <Input label='Expiring Date' type='date' value={expiringDate} placeholder='Enter Product Name' error={error} onChange={(value) => setExpiringDate(value)} />
                    </div>
                    <div className='w-full flex gap-[10px]'>
                        <label htmlFor="images" className='w-1/2 cursor-pointer hover:scale-95 transition-all duration-300 flex items-center justify-center p-3 rounded-[4px] bg-secondary'>
                            <span className='text-white font-[600] font-outfit'>Select Images +</span>
                        </label>
                        <input type="file" className='hidden' onChange={handleFileChange} id='images' multiple />
                        <button type='submit' className='w-1/2 p-3 bg-primary flex items-center justify-center text-white font-[600] text-[20px] rounded-[6px]'>
                        {loading || uploadLoading ? "Loading.." : "Update"}
                        </button>
                    </div> 
                </form>
                <div className='grid grid-cols-4 gap-[10px]'>
                    {image.map((photo:any,index:number)=>{
                        return(
                            <div className='w-full h-[20vh] relative'>
                                <div onClick={()=> handelRemove(index)} className='text-red-600 absolute right-0 top-0 font-[800] cursor-pointer'>X</div>
                                <img src={photo} alt="" className='w-full h-full object-contain rounded-[4px]'/>
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    )
}

export default UpdateProduct