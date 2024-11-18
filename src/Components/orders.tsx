import React, { useEffect } from "react";
import OrderTable from "./orderComponent";
import { useAllOrdersQuery, useGetAllOrdersQuery, useGetSellerOrderQuery } from "../Redux/OrderSlice";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface Order {
    orderId: string;
    orderDate: Date;
    expectedDeliveryDate: Date;
    status: 'pending'| 'processing' | 'shipped' | 'delivered';
}

const OrderComponent = () => {
    const authData:any = useAuthUser()
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
    console.log('token ', token);
    const vendorData:any = localStorage.getItem("vendorData")
    const vendor = JSON.parse(vendorData) 
    const { data: orders, isLoading, error } = useGetSellerOrderQuery({ token,vendorId:vendor?.vendorId });
    const { data: buyerOrder, isLoading:buyerLoad, error:buyerError } =  useGetAllOrdersQuery({token});
    const LoadingSkeleton = () => {
        return (
            <div className="m-10">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-gray-300 rounded-lg p-6 mb-4 flex justify-between mr-20">
                        <div className="flex gap-10">
                            <div>
                                <Skeleton width={20} />
                            </div>
                            <div>
                                <Skeleton width={100} />
                            </div>
                            <div>
                                <Skeleton width={100} />
                            </div>
                            <div>
                                <Skeleton width={80} />
                            </div>
                        </div>
                        <div>
                            <Skeleton width={80}/>
                        </div>
    
                    </div>
                ))}
            </div>
        );
        
    }

    return (
        <div className="font-outfit">
            <div className="font-semibold m-10">
                My Orders
            </div>
            {isLoading ? (
                <LoadingSkeleton/>
            ) : error ? (
                <div>Error loading orders</div>
            
            ) : (
                authData.role == "vendor" ? (
                    <OrderTable orders={orders} />

                ):(
                    <OrderTable orders={buyerOrder} />  
                )
            )}
        </div>
    );
};

export default OrderComponent;
