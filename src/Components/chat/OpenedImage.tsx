import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const OpenedImage = ({image,setOpenedImage}: {image: string,setOpenedImage:any}) => {
  return (
    <div className='w-full h-full absolute flex  justify-center p-10 left-0 top-0 bg-black/70'>
        <div className='h-[80vh] flex flex-row gap-[10px]'>

        <LazyLoadImage src={image} className='h-full'  />
        <span onClick={()=> setOpenedImage("")} className='font-[600] text-[40px] text-white cursor-pointer'>X</span>
        </div>
    </div>
  )
}

export default OpenedImage