import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGetAllMessageQuery, useSendMessageMutation } from '../../Redux/features/ChatSlice'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import SentImage from './SentImage'
import pusher from '../../Lib/pusher'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import OpenedImage from './OpenedImage'

const ChatPlace = ({ selectedUser }: { selectedUser: any }) => {
    const { data, error, isLoading,refetch } = useGetAllMessageQuery({})
    const userData:any = useAuthUser()
    const [newMessage, setNewMessage] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [messages, setMessages] = useState<any[]>([])
    const [filteredMessages, setFilteredMessages] = useState<any[]>([]);
    const [openedImage , setOpenedImage] = useState<string>("")

    const [sendMessage, { isLoading: loading, isError: errorr, isSuccess }] = useSendMessageMutation()

    const myId = userData.userId

    useEffect(() => {
        refetch();
    }, [selectedUser, refetch]);

    useEffect(() => {
        if (isLoading) {
            console.log("loading.................");
        } else if (error) {
            console.error("Error loading data:", error);
        } else if (data) {
            console.log("data", data);
            setMessages(data.messages || [])

        }
    }, [isLoading, data, error]);


    useEffect(() => {
        const filtered:any = messages?.length> 0 && messages
            .filter((mess: any) =>
                (mess.sender === myId && mess.receiver === selectedUser?.userId) ||
                (mess.sender === selectedUser?.userId && mess.receiver === myId)
            )
            .sort((a: any, b: any) => {
                const timeA = typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() : a.createdAt;
                const timeB = typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() : b.createdAt;
                return timeA - timeB;
            });
    
        setFilteredMessages(filtered || []);

        if (chatContainerRef.current) {
            setTimeout(() => {
                chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;
            }, 0);
        }
    }, [messages, selectedUser, myId]);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, data]);
    const handelSubmit = async () => {
        try {
            const newMessageObject = {
                id: messages.length + 1,
                content: newMessage,
                sender: myId,
                receiver: selectedUser.userId,
                createdAt: Date.now(),
            }
            const response = await sendMessage(newMessageObject)
            setNewMessage('')
        } catch (error) {
            console.log(error)

        }
    }

  

        useEffect(() => {
            const channel = pusher.subscribe('message');
    
            const handleMessageReceived = (data:any) => {
                if(data.message.sender === myId || data.message.receiver === myId){

                    setMessages((prevMessages:any) => [...prevMessages, data.message]);
                }
            };
    
            channel.bind('new-message', handleMessageReceived);
    
            return () => {
                channel.unbind('new-message', handleMessageReceived);
                channel.unsubscribe();
            };
        }, []);

        const handelOpenImage = async(image:any)=>{
            setOpenedImage(image)

        }
    

    return (
        <div className='w-full  flex flex-col justify-between rounded-[12px] bg-white p-2 h-[80vh]'>
            {!selectedUser?.name ? (
                <>
                    <div className='w-full h-full  items-center justify-center flex flex-col'>

                        <span className='text-center text-[32px] font-[800] font-outfit'>👋 Welcome 👋</span>
                        <span className='text-center font-outfit'>Thank you for joining us. Please select a vendor to initiate your chat.</span>

                    </div>
                </>
            ) : (
                <>
                    <div className='flex flex-row justify-between items-center p-2'>
                        <div className='flex flex-row gap-[10px] items-center'>
                            <div className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-gray-500'>
                                <img src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?b=1&s=170667a&w=0&k=20&c=FycdXoKn5StpYCKJ7PdkyJo9G5wfNgmSLBWk3dI35Zw=" className='w-full h-full object-cover rounded-full' alt="" />
                            </div>
                            <span className='text-[18px] font-[600] font-outfit'>{selectedUser.Vendor ? selectedUser.Vendor.storeName : ""}</span>
                        </div>
                        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" stroke="#292D32" />
                            <path d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z" stroke="#292D32" />
                            <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke="#292D32" />
                        </svg>
                        </div>
                    </div>

                    <div  ref={chatContainerRef} className='w-full  p-2 flex flex-col  overflow-y-scroll   h-full'>
                        {isLoading ? ("lofing") : (<>
                            {filteredMessages.length < 1 && (
                                <div className='flex flex-col py-10 gap-[10px]'>
                                    <span className='text-center text-[24px] font-outfit'>Hey there! 😊</span>
                                    <h1 className='text-center font-outfit'>No conversations here. Start chatting with a vendor to get started! 🗣️</h1>
                                </div>
                            )}
                            {filteredMessages.map((message: any, index: number) => {
                                const isLastMessage: any = index === filteredMessages.length - 1;
                                return (
                                    <div ref={isLastMessage ? lastMessageRef : null} key={index} className={` flex flex-col gap-[4px] ${message.sender === myId ? "ml-auto" : "mr-auto"} `}>
                                        {message.imageUrl == null ? (
                                            <div className={`p-2 mb-2 min-w-[100px] flex flex-col max-w-[500px] rounded-[6px] ${message.sender === myId ? "ml-auto bg-primary" : "mr-auto bg-gray-50"}`}>

                                                <span className={`text-[14px] font-outfit ${message.sender === myId ? "text-white" : ""}`}>{message?.content}</span>
                                                <span className={`text-[12px] font-outfit ${message.sender === myId ? "text-end text-white" : " opacity-70"}`}>{new Date(message.createdAt).getHours() + ":" + new Date(message.createdAt).getMinutes()}</span>

                                            </div>
                                        ) : (
                                            <div className='flex flex-col bg-gray-50'>
                                                <div onClick={()=> handelOpenImage(message.imageUrl[0])} className='w-[200px] h-[150px] rounded-[4px] cursor-pointer'>
                                                    <LazyLoadImage src={message.imageUrl[0]} className='w-full h-full object-cover rounded-[4px]' />
                                                </div>
                                                <span className={` p-1 text-[14px] font-outfit ${message.sender === myId ? "text-black" : ""}`}>{message?.content}</span>
                                                <span className={` px-1 text-[12px] font-outfit ${message.sender === myId ? "text-end text-white" : " opacity-70"}`}>{new Date(message.createdAt).getHours() + ":" + new Date(message.createdAt).getMinutes()}</span>

                                            </div>
                                        )}

                                    </div>
                                )
                            })}
                        </>)}


                    </div>
                    {image !== "" ? (
                        <div className='w-full h-full left-0 pt-10  bg-black/30 bottom-2 absolute'>
                            <SentImage setImage={setImage} setMessage={setMessages} selectedUser={selectedUser} messages={messages} image={image} />
                        </div>
                    ) : ("")}

                    <div className='flex flex-row justify-between p-2  gap-[10px]'>
                        <div className='flex flex-row gap-[10px] items-center'>
                            <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.2063 8.84652L9.90459 16.1482C8.27742 17.7754 5.63923 17.7754 4.01204 16.1482C2.38486 14.521 2.38486 11.8829 4.01204 10.2557L10.7885 3.47921C11.9275 2.34018 13.7743 2.34018 14.9133 3.47921C16.0523 4.61824 16.0523 6.46497 14.9133 7.60401L8.41868 14.0986C7.76778 14.7495 6.7125 14.7495 6.06163 14.0986C5.41076 13.4478 5.41075 12.3924 6.06163 11.7416L12.0567 5.74656" stroke="black" stroke-linecap="round" />
                            </svg>
                            </div>
                            <label htmlFor="selectfile" className=' cursor-pointer'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.49999 18.3334H12.5C16.6667 18.3334 18.3333 16.6667 18.3333 12.5V7.50002C18.3333 3.33335 16.6667 1.66669 12.5 1.66669H7.49999C3.33332 1.66669 1.66666 3.33335 1.66666 7.50002V12.5C1.66666 16.6667 3.33332 18.3334 7.49999 18.3334Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.50001 8.33333C8.42051 8.33333 9.16668 7.58714 9.16668 6.66667C9.16668 5.74619 8.42051 5 7.50001 5C6.57954 5 5.83334 5.74619 5.83334 6.66667C5.83334 7.58714 6.57954 8.33333 7.50001 8.33333Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.22504 15.7917L6.33337 13.0334C6.9917 12.5917 7.9417 12.6417 8.53334 13.1501L8.80834 13.3917C9.45834 13.9501 10.5083 13.9501 11.1583 13.3917L14.625 10.4167C15.275 9.8584 16.325 9.8584 16.975 10.4167L18.3333 11.5834" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            </label>
                            <input id='selectfile' className=' hidden' type="file" onChange={(e: any) => setImage(e.target.files[0])} />
                        </div>
                        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Enter message here' className='p-2 h-[45px] bg-gray-50 border-2 outline-none w-full rounded-[8px]' />
                        <button onClick={handelSubmit} className='p-2'><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29 15.9863C29.0009 16.3426 28.9066 16.6927 28.7269 17.0004C28.5471 17.3081 28.2884 17.5621 27.9775 17.7363L6.98877 29.7375C6.68721 29.9085 6.34668 29.9989 6.00002 30C5.68033 29.9994 5.36545 29.9221 5.08178 29.7747C4.79811 29.6272 4.55392 29.414 4.36967 29.1527C4.18542 28.8915 4.06648 28.5898 4.02282 28.2731C3.97917 27.9564 4.01207 27.6339 4.11877 27.3325L7.53752 17.3388C7.5712 17.2399 7.63501 17.1541 7.71998 17.0933C7.80495 17.0325 7.90681 16.9999 8.01127 17H17C17.1371 17.0003 17.2728 16.9724 17.3986 16.9181C17.5245 16.8637 17.6378 16.7841 17.7316 16.6841C17.8254 16.5841 17.8976 16.4659 17.9438 16.3368C17.99 16.2078 18.0091 16.0706 18 15.9338C17.9773 15.6766 17.8584 15.4375 17.6669 15.2644C17.4754 15.0913 17.2256 14.9968 16.9675 15H8.02002C7.91572 15.0002 7.81397 14.9678 7.72901 14.9073C7.64406 14.8467 7.58017 14.7612 7.54627 14.6625L4.11627 4.66253C3.9827 4.27934 3.96885 3.86459 4.07656 3.47334C4.18427 3.0821 4.40845 2.73288 4.71933 2.47205C5.0302 2.21123 5.41307 2.05114 5.81707 2.01304C6.22108 1.97495 6.62712 2.06066 6.98127 2.25878L27.9813 14.245C28.2902 14.4189 28.5473 14.6718 28.7263 14.9778C28.9053 15.2838 28.9998 15.6318 29 15.9863Z" fill="#013362" />
                        </svg>
                        </button>
                    </div>
                </>)}

                {openedImage !== "" ? (
                    <OpenedImage setOpenedImage={setOpenedImage} image={openedImage}/>

                ): ("")}
        </div>
    )
}

export default ChatPlace