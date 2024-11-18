import axios from 'axios'
import React, { useState } from 'react'
import { useSendMessageMutation } from '../../Redux/features/ChatSlice';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

interface  sendImageProps {
    image: any;
    messages: any;
    selectedUser: any;
    setMessage: any;
    setImage:any
}

const SentImage = (data: sendImageProps) => {
    const [caption, setCaption] = useState<string>("")
    const [sendMessage, { isLoading: loading, isError: errorr, isSuccess }] = useSendMessageMutation()
    const userData:any = useAuthUser()
    const handelSubmit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', data.image);
        formData.append('upload_preset', 'e-commerce');
        try {

            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dnefzcfv6/image/upload',
                formData
            );
            
            const imageUrl = response.data.secure_url
            if(response.data.secure_url){
                    const newMessageObject = {
                        id: data.messages.length + 1,
                        content: caption,
                        imageUrl: [imageUrl],
                        sender: userData.userId,
                        receiver: data.selectedUser.userId,
                        createdAt: Date.now(),
                    }
                    const response = await sendMessage(newMessageObject)
                    setCaption('')
                    data.setImage("")          
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-1/3   h-[70%] mx-auto p-4  rounded-[2px]'>
            <div className='w-full h-full'>
                <img src={URL.createObjectURL(data.image)} className='w-full h-full object-cover rounded-[2px]' />
            </div>

            <div className='flex flex-row justify-between py-1  gap-[10px]'>
                <textarea onChange={(e: any) => setCaption(e.target.value)} placeholder='add caption here' className='p-2 h-[45px] bg-gray-50 border-2 outline-none w-full rounded-[8px]' />
                <button onClick={handelSubmit} className='p-2'><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29 15.9863C29.0009 16.3426 28.9066 16.6927 28.7269 17.0004C28.5471 17.3081 28.2884 17.5621 27.9775 17.7363L6.98877 29.7375C6.68721 29.9085 6.34668 29.9989 6.00002 30C5.68033 29.9994 5.36545 29.9221 5.08178 29.7747C4.79811 29.6272 4.55392 29.414 4.36967 29.1527C4.18542 28.8915 4.06648 28.5898 4.02282 28.2731C3.97917 27.9564 4.01207 27.6339 4.11877 27.3325L7.53752 17.3388C7.5712 17.2399 7.63501 17.1541 7.71998 17.0933C7.80495 17.0325 7.90681 16.9999 8.01127 17H17C17.1371 17.0003 17.2728 16.9724 17.3986 16.9181C17.5245 16.8637 17.6378 16.7841 17.7316 16.6841C17.8254 16.5841 17.8976 16.4659 17.9438 16.3368C17.99 16.2078 18.0091 16.0706 18 15.9338C17.9773 15.6766 17.8584 15.4375 17.6669 15.2644C17.4754 15.0913 17.2256 14.9968 16.9675 15H8.02002C7.91572 15.0002 7.81397 14.9678 7.72901 14.9073C7.64406 14.8467 7.58017 14.7612 7.54627 14.6625L4.11627 4.66253C3.9827 4.27934 3.96885 3.86459 4.07656 3.47334C4.18427 3.0821 4.40845 2.73288 4.71933 2.47205C5.0302 2.21123 5.41307 2.05114 5.81707 2.01304C6.22108 1.97495 6.62712 2.06066 6.98127 2.25878L27.9813 14.245C28.2902 14.4189 28.5473 14.6718 28.7263 14.9778C28.9053 15.2838 28.9998 15.6318 29 15.9863Z" fill="#013362" />
                </svg>
                </button>
            </div>
        </div>
    )
}

export default SentImage