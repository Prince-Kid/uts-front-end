import React, { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

interface AuthDataProps {
    name: string;
    role: string
}

const VendorHeader = () => {
    const authData: AuthDataProps | null = useAuthUser();
    const [stringMonth, setStringMonth] = useState('');
    const [hourss, setHourss] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [period, setPeriod] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const datee = date.getMonth()
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';

            setHourss(hours);
            setMinutes(minutes);
            setPeriod(period);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthLabel = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <div className="flex flex-row fixed w-[80%] z-50 p-4 items-center justify-between bg-white">
            <div className="flex flex-col">
                <h1 className="text-[16px] font-[600]">Welcome back! {authData?.name} </h1>
                <div className="flex text-gray-400 font-[400] font-outfit text-[14px] flex-row items-center gap-[4px]">
                    <span>{day} </span>
                    <span>{monthLabel[month]} </span>
                    <span>{year} </span>

                    <div className="ml-4 flex flex-row gap-[4px] items-center">
                        <span>{hourss} : </span>
                        <span>{minutes} </span>
                        <span> {period}</span>
                    </div>
                </div>
            </div>
            <div className='flex items-center flex-row gap-[20px]'>
                <div className='p-2 rounded-[12px] bg-gray-100 flex items-center flex-row gap-[10px]'>
                    <div className='bg-secondary rounded-[6px] w-[30px] h-[30px] flex items-center justify-center'>
                        <span className='text-white font-[600] text-center text-[20px]'>{authData?.name.slice(0, 1)}{authData?.name.split(" ")[1]?.slice(0, 1)}</span>
                    </div>
                    <div className='flex leading-4 flex-col items-start'>
                        <span className='font-outfit text-[18px] font-[700]'>{authData?.name}</span>
                        <span className='text-gray-400 font-outfit'>{authData?.role}</span>
                    </div>
                    <span>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.724074 0.641402C0.945963 0.419513 1.29318 0.399341 1.53786 0.580887L1.60796 0.641402L6.99935 6.03251L12.3907 0.641402C12.6126 0.419513 12.9598 0.399341 13.2045 0.580887L13.2746 0.641402C13.4965 0.863291 13.5167 1.21051 13.3351 1.45519L13.2746 1.52529L7.44129 7.35862C7.2194 7.58051 6.87218 7.60068 6.62751 7.41913L6.55741 7.35862L0.724074 1.52529C0.479996 1.28121 0.479996 0.885479 0.724074 0.641402Z" fill="black" />
                        </svg>

                    </span>

                </div>
            </div>
        </div>
    );
};

export default VendorHeader;
