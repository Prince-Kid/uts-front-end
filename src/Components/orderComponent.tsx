import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    status: 'pending'| 'processing' | 'shipped' | 'delivered' | 'cancelled';

}

const StatusIndicator: React.FC<Props> = ({ status }) => {
    const colorClass = status === 'pending' ? 'bg-primary':
                    status === 'processing' ? 'bg-secondary':
                    status === 'shipped' ? 'bg-orange-500':
                    status === 'cancelled' ? 'bg-red-600':
                    status === 'delivered' ? 'bg-green-400': 'bg-gray-500'

    return (
        <span className={`inline-block w-2 h-2 rounded-full ${colorClass} mr-2`}></span>
    )
    
}

interface OrderProps {
    status: 'pending'| 'processing' | 'shipped' | 'delivered',
    orderId: string | number,
    keyIndex: number,
    expectedDeliveryDate: Date,
    orderDate: Date,
    onViewDetails: (orderId: string | number) => void

}

const Order: React.FC<OrderProps> = ({ orderId, orderDate, keyIndex, expectedDeliveryDate, status, onViewDetails}) => {
    const formatDate = (dateString: Date) => {
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options)
    }
    
    return (
        <div className="bg-gray-300 hover:shadow-md rounded-lg p-6 mb-4 flex justify-between mr-20">
           
            <div className="flex gap-10">
                <div>
                <div className="text-sm text-gray-400">No.</div>
                <div>{keyIndex}</div>
                </div>
            
                <div>
                    <div className="text-sm text-gray-400">Order Date</div>
                    <div>{formatDate(orderDate)}</div>
                </div>
                <div>
                    <div className="text-sm text-gray-400">Expected Delivery Date</div>
                    <div>  {expectedDeliveryDate
                ? new Date(expectedDeliveryDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}</div>
                </div>
                <div>
                <div className="text-sm text-gray-400">Status</div>
                    <StatusIndicator status={status} />
                    <span className="capitalize">{status}</span>
                </div>
            </div>
            <div className="mt-4">
                <button className="text-blue hover:underline" onClick={() => onViewDetails(orderId)} >View Details</button>
            </div>
        </div>
    )
    
}

interface Order {
    status: 'pending'| 'processing' | 'shipped' | 'delivered',
    orderId: string,
    expectedDeliveryDate: Date,
    orderDate: Date,
    createdAt: Date,
}

interface OrderTableProps {
    orders: Order[]
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
    const navigate = useNavigate();

    const handleViewDetails = (orderId: string | number) => {
        navigate(`/order/${orderId}`)
    }
    return(
        <div className="container m-10">
            
                    {orders.map((order, index) => (
                        <Order
                            key={order.orderId} 
                            orderId={order.orderId} 
                            keyIndex={index + 1}
                            orderDate= {order.createdAt}
                            expectedDeliveryDate={order.expectedDeliveryDate} 
                            status={order.status}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                
        </div>
    )
}

export default OrderTable;