import React, { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import pusher from '../../Lib/pusher';
import { useGetLatestMessageQuery } from '../../Redux/features/ChatSlice';
import { useDispatch } from 'react-redux';
import { addUnreadMessage, markMessagesAsRead } from '../../Redux/features/MessageSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Skeleton from 'react-loading-skeleton';

interface Vendor {
    userId: string;
    name: string;
    profile: string
    Vendor?: {
        storeName: string;
    };
}
interface ChatListProps {
    selectedUser: Partial<Vendor> | null;
    vendors: Vendor[];
    isLoading: boolean;
    handelSelect: (vendor: Vendor) => void;
}

const ChatList: React.FC<ChatListProps> = ({ vendors, isLoading, handelSelect, selectedUser }) => {
    const [selectUsers, setSelectUsers] = useState<Vendor[]>([]);
    const userData: any = useAuthUser();
    const id = userData.userId;
    const [lastMessages, setLastMessages] = useState<any[]>([]);
    
    const dispatch = useDispatch()

    const { data: latestMessages, error, isLoading: latestLoading } = useGetLatestMessageQuery(id);
    const unreadMessages = useSelector((state: RootState) => state.unreadMessages.unreadMessages);

    useEffect(() => {
        if (latestMessages) {
            setLastMessages(latestMessages);
        }
    }, [latestMessages]);

    useEffect(() => {

        const channel = pusher.subscribe("user");
        channel.bind("send-user", (data: any) => {
            const userExists = vendors.some((vendor) => vendor.userId === data.sender.userId) || selectUsers.some((user) => user?.userId === data.sender.userId);
            if (!userExists && data.message.receiver === userData.userId) {
                setSelectUsers((prevUsers) => [...prevUsers, data.sender as Vendor]);
            }
            dispatch(addUnreadMessage({ userId: data.sender.userId }));
            setLastMessages((prevMessages) => {
                const messageIndex = prevMessages.findIndex((msg) => msg.userId === data.sender.userId || msg.userId === data.message.receiver);
                if (messageIndex !== -1) {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], latestMessage: data.message };
                    return updatedMessages;
                }
                return [...prevMessages, { userId: data.sender.userId, latestMessage: data.message }];
            });
        });
        return () => {
            pusher.unsubscribe("user");
        };

    }, [userData, vendors, selectUsers]);

    const getLatestMessage = (userId: string) => {
        const message = lastMessages.find((msg) => {
            return (msg.latestMessage?.sender === userData.userId && msg.latestMessage?.receiver === userId) ||
                (msg.latestMessage?.sender === userId && msg.latestMessage?.receiver === userData.userId);
        });
        return message?.latestMessage?.content || "No messages yet";
    };

    const handleSelectVendor = (vendor: Vendor) => {
        handelSelect(vendor);
        dispatch(markMessagesAsRead({ userId: vendor.userId }));
      };
    
      const getUnreadCount = (userId: string) => {
        const unread = unreadMessages.find((msg) => msg.userId === userId);
        return unread ? unread.count : 0;
      };

    return (
        <div className='w-full bg-white min-h-[45vh] p-2 rounded-[12px] rounded-tl-none flex flex-col gap-[10px]'>

            {isLoading ? (
                <div className='flex flex-col gap-[10px]'>
                    <Skeleton height={40}/>
                    <Skeleton height={40}/>
                    <Skeleton height={40}/>
                </div>
            ) : (
                selectUsers.length == 0 && vendors.length === 0 ? (
                    <div className=' w-full h-full flex flex-col items-center justify-center'>
                        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1508_1557)">
                                <path d="M50 0C36.7392 0 24.0215 5.26784 14.6447 14.6447C5.26784 24.0215 0 36.7392 0 50C0 63.2608 5.26784 75.9785 14.6447 85.3553C24.0215 94.7322 36.7392 100 50 100C63.2608 100 75.9785 94.7322 85.3553 85.3553C94.7322 75.9785 100 63.2608 100 50C100 36.7392 94.7322 24.0215 85.3553 14.6447C75.9785 5.26784 63.2608 0 50 0ZM29.725 28.5375C34.4938 19.6375 54.85 27.7875 35.675 50C7.575 40.025 20.9875 23.1375 29.725 28.5375ZM70.7187 62.5875C71.312 62.4478 71.9332 62.4847 72.5058 62.6935C73.0784 62.9024 73.5774 63.2742 73.9415 63.7631C74.3055 64.2519 74.5185 64.8366 74.5545 65.445C74.5904 66.0535 74.4477 66.6592 74.1437 67.1875C71.6748 71.4639 68.1235 75.0148 63.8469 77.4834C59.5703 79.9519 54.7192 81.251 49.7813 81.25C44.8433 81.251 39.9922 79.9519 35.7156 77.4834C31.439 75.0148 27.8877 71.4639 25.4187 67.1875C25.1148 66.6592 24.9721 66.0535 25.008 65.445C25.044 64.8366 25.257 64.2519 25.6211 63.7631C25.9851 63.2742 26.4841 62.9024 27.0567 62.6935C27.6293 62.4847 28.2505 62.4478 28.8437 62.5875H28.875L28.9813 62.6188L29.4 62.7125L30.975 63.0562C32.3187 63.3437 34.1938 63.7313 36.3313 64.1125C40.6625 64.8875 45.8438 65.625 49.7813 65.625C53.7188 65.625 58.9062 64.8875 63.2312 64.1125C65.5512 63.6943 67.8621 63.2275 70.1625 62.7125L70.5813 62.6188L70.6875 62.5938L70.7187 62.5812V62.5875ZM70.2812 28.5375C79.0125 23.1375 92.425 40.025 64.325 50C45.1562 27.7875 65.5187 19.6375 70.2812 28.5375Z" fill="#013362" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1508_1557">
                                    <rect width="100" height="100" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <h1 className='text-[30px] font-[600] font-outfit'>No chat Yet</h1>
                        <span className='text-center text-[14px] font-outfit'>Click plus on top to select vendor</span>

                    </div>
                ) : (
                    <>
                        {selectUsers.map((vendor: any) => {
                            return (
                                <div onClick={() => handleSelectVendor(vendor)} className=' cursor-pointer hover:opacity-40 flex flex-row gap-[10px]  py-2 items-center'>
                                    <div className='flex items-center justify-center w-[45px] h-[45px] rounded-full border border-gray-500'>
                                        <img src={vendor?.profile} className='w-full h-full object-cover rounded-full' alt="" />
                                    </div>
                                    <div className='flex flex-col leading-1 w-[250px]'>
                                        <div className='flex font-outfit flex-row items-center justify-between w-full'>
                                            {vendor?.role == "vendor" ? (

                                                <span className='text-[18px] font-[600]'>{vendor?.Vendor?.storeName}</span>
                                            ) : (
                                                <span className='text-[18px] font-[600]'>{vendor?.name}</span>

                                            )}
                                            <span className='text-[14px] text-gray-400'>Today</span>
                                        </div>
                                        <div className='flex flex-row w-full items-center justify-between gap-[4px]'>

                                            <span className=' line-clamp-1 text-[12px] text-gray-500'>{getLatestMessage(vendor.userId)}</span>
                                            {getUnreadCount(vendor.userId)=== 0 ? (""):(
                                                <span className='bg-primary px-2 text-[12px] text-white rounded-full'>{getUnreadCount(vendor.userId)}</span>

                                            )}
                                        </div>
                                    </div>

                                </div>

                            )
                        })}
                        {vendors.map((vendor: any) => {
                            return (
                                <div onClick={() => handleSelectVendor(vendor)} className=' cursor-pointer hover:opacity-40 flex flex-row gap-[10px]  py-2 items-center'>
                                    <div className='flex items-center justify-center w-[45px] h-[45px] rounded-full border border-gray-500'>
                                        <img src={vendor.profile} className='w-full h-full object-cover rounded-full' alt="" />
                                    </div>
                                    <div className='flex flex-col leading-1 w-[250px]'>
                                        <div className='flex font-outfit flex-row items-center justify-between w-full'>
                                            {vendor?.role == "vendor" ? (

                                                <span className='text-[18px] font-[600]'>{vendor?.Vendor?.storeName}</span>
                                            ) : (
                                                <span className='text-[18px] font-[600]'>{vendor?.name}</span>

                                            )}
                                            <span className='text-[14px] text-gray-400'>Today</span>
                                        </div>
                                        <div className='flex flex-row gap-[4px] w-full justify-between'>

                                            <span className=' line-clamp-1 text-[12px] text-gray-500'>{getLatestMessage(vendor.userId)}</span>
                                            {getUnreadCount(vendor.userId)=== 0 ? (""):(
                                                <span className='bg-primary px-2 text-[12px] text-white rounded-full'>{getUnreadCount(vendor.userId)}</span>

                                            )}
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                        )}
                    </>))}



        </div>
    )
}

export default ChatList