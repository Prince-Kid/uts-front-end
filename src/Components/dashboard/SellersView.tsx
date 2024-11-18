import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useSelectStoresQuery } from "../../Redux/Admin/sellersSlice";
import { useSelectUsersQuery } from "../../Redux/Admin/usersSlice";
import { toCapital } from "./AdminHeader";

interface SellerData {
  sellerId: string;
  userId: string;
  storeName: string;
  address: {
    city: string;
  };
  TIN: string;
  status: string;
}

interface UserData {
  userId: string;
  name: string;
  email: string;
}

const SellersView: React.FC = () => {
  const {
    data: sellers = [],
    isLoading: isSellersLoading,
    isError: isSellersError,
    refetch: refetchSellers,
  } = useSelectStoresQuery({});

  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useSelectUsersQuery({});

  const [selectedSeller, setSelectedSeller] = useState<SellerData | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const sellersPerPage = 15;

  useEffect(() => {
    refetchSellers();
    refetchUsers();
  }, [refetchSellers, refetchUsers]);

  const approvedSellers = sellers.filter(
    (seller: SellerData) => seller.status === "approved"
  );

  const filteredSellers = approvedSellers.filter((seller: SellerData) =>
    seller.storeName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredSellers.slice(
    indexOfFirstSeller,
    indexOfLastSeller
  );

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onViewDetails = (seller: SellerData) => {
    setSelectedSeller(seller);
    const user = users.find((user: UserData) => user.userId === seller.userId);
    setSelectedUser(user || null);
  };

  const closeModal = () => {
    setSelectedSeller(null);
    setSelectedUser(null);
  };

  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage);

  if (isSellersLoading || isUsersLoading) {
    return (
      <div className="flex justify-center items-center h-[90%]">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );
  }

  if (isSellersError || isUsersError) {
    return (
      <div className="flex justify-center items-center  h-[90%]">
        <div className="text-center">
          <p className="text-red-600 font-semibold">
            An error occurred. Please try again later.
          </p>
          <button
            className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden lg:mb-12 xl:ml-[5%] mt-3">
      {filteredSellers.length === 0 ? (
        <div className="items-center p-4 text-center text-secondary font-semibold">
          No Approved Sellers
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-gray-600">
              Approved Sellers
            </h1>
            <input
              type="text"
              className="border rounded-lg p-2"
              placeholder="Search storename"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Store Name</th>
                <th className="px-4 py-2 text-left hidden md:table-cell lg:table-cell">
                  City
                </th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSellers.map((seller: any, index: any) => (
                <tr key={seller.sellerId}>
                  <td className="px-4 py-2 text-left">
                    {String(indexOfFirstSeller + index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2">{seller.storeName}</td>
                  <td className="px-4 py-2 hidden md:table-cell lg:table-cell">
                    {seller.address.city}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-orange-500 hover:text-orange-700"
                      onClick={() => onViewDetails(seller)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedSeller && selectedUser && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Seller Details</h2>
                <p>
                  <strong>Seller Name:</strong> {toCapital(selectedUser.name)}
                </p>
                <p>
                  <strong>Seller Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Store Name:</strong> {selectedSeller.storeName}
                </p>
                <p>
                  <strong>City:</strong> {selectedSeller.address.city}
                </p>
                <p>
                  <strong>TIN:</strong> {selectedSeller.TIN}
                </p>
                <div className="mt-4 text-right">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center py-4 mb-5">
            <nav className="block">
              <ul className="flex pl-0 list-none rounded space-x-2">
                {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                  <li key={pageNumber} className="block">
                    <button
                      className={`${
                        currentPage === pageNumber + 1
                          ? "bg-gray-400 text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      } px-3 py-2 rounded-md`}
                      onClick={() => onPageChange(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default SellersView;
