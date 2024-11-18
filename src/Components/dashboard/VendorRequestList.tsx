import React, { useEffect, useState } from "react";
import { useSelectRequestsQuery } from "../../Redux/Admin/sellersSlice";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";

interface Seller {
  storeName: string;
  address: {
    city: string;
  };
}

const VendorRequestList: React.FC = () => {
  const { data: sellers = [], isLoading, isError } = useSelectRequestsQuery({});
  const [sellersCount, setSellersCount] = useState(0);

  useEffect(() => {
    if (!isLoading && sellers) {
      setSellersCount(sellers.length);
    }
  }, [isLoading, sellers]);

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between mb-4 pr-7">
        <span className="px-2 text-sm lg:p-2 lg:px-4 rounded-[6px] bg-secondary text-white">
          Vendor Applications ({sellersCount})
        </span>
        <Link to="/admin/requests">
          <button className="sm:text-sm text-secondary">View all</button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-gray-200 font-semibold">
              Store Name
            </th>
            <th className="text-left text-gray-200 font-semibold">City</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <div className="flex justify-center items-center h-24">
                <Circles visible height="80" width="80" color="#C9974C" />
              </div>
            </tr>
          ) : (
            sellers.slice(0, 6).map((seller: Seller, index: number) => (
              <tr key={index} className="border-t">
                <td className="py-2">{seller.storeName}</td>
                <td>{seller.address.city}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRequestList;
