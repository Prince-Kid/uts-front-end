import React, { useState, useEffect } from "react";
import {
  useApproveMutation,
  useRejectMutation,
} from "../../Redux/Admin/requestsSlice";
import { Circles } from "react-loader-spinner";

interface SellerData {
  sellerId: string;
  userId: string;
  storeName: string;
  address: {
    city: string;
    sector: string
  };
  TIN: string;

}

interface SellerTableProps {
  sellers: SellerData[];
}

const RequestsTable: React.FC<SellerTableProps> = ({
  sellers: initialSellers,
}) => {
  const [sellers, setSellers] = useState(initialSellers);
  const [selectedSeller, setSelectedSeller] = useState<SellerData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [rejectMessage, setRejectMessage] = useState("");
  const [IsMessageOpen, setIsMessageOpen] = useState(false);

  const sellersPerPage = 15;

  const [approveVendor] = useApproveMutation();
  const [rejectVendor] = useRejectMutation();

  useEffect(() => {
    setSellers(initialSellers);
  }, [initialSellers]);

  const filteredSellers = sellers.filter((seller: SellerData) =>
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
  };

  const closeModal = () => {
    setSelectedSeller(null);
    setRejectMessage("");
    setIsMessageOpen(false);
  };

  const onApprove = async () => {
    if (selectedSeller) {
      setIsLoading(true);
      await approveVendor(selectedSeller.userId).unwrap();
      setIsLoading(false);
      setSuccessMessage("Seller approved successfully");
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller.userId !== selectedSeller.userId)
      );
      setSelectedSeller(null);
    }
  };

  const openMessageModal = () => {
    setIsMessageOpen(true);
  };

  const onDeny = async () => {
    if (selectedSeller) {
      setIsMessageOpen(false);
      setIsLoading(true);
      await rejectVendor({
        userId: selectedSeller.userId,
        message: rejectMessage,
      }).unwrap();
      setIsLoading(false);
      setSuccessMessage("Seller rejected successfully");
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller.userId !== selectedSeller.userId)
      );
      setSelectedSeller(null);
      setRejectMessage("");
    }
  };

  const closeSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage);

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden lg:mb-12 xl:ml-[5%] mt-3">
      {sellers.length === 0 ? (
        <div className="items-center p-4 text-center text-secondary font-semibold">
          No requests present
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-gray-600">
              Vendor Applications
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
              {currentSellers.map((seller, index) => (
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

          {selectedSeller && (
            <div className="z-80 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Seller Details</h2>
                
                <p>
                  <strong>Store name:</strong> {selectedSeller.storeName}
                </p>
                <p>
                  <strong>City:</strong> {selectedSeller.address.city}
                </p>
                <p>
                  <strong>District:</strong> {selectedSeller.address.sector}
                </p>
                <p>
                  <strong>TIN:</strong> {selectedSeller.TIN}
                </p>
                <div className="mt-4 text-right">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-24">
                      <Circles visible height="80" width="80" color="#C9974C" />
                    </div>
                  ) : (
                    <>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                        onClick={onApprove}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                        onClick={openMessageModal}
                      >
                        Deny
                      </button>
                    </>
                  )}
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

          {IsMessageOpen && (
            <div className="z-90 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">
                  Rejection Message
                </h2>
                <textarea
                  className="border rounded-lg p-2 w-full"
                  value={rejectMessage}
                  onChange={(e) => setRejectMessage(e.target.value)}
                  placeholder="Enter reason for rejection of request"
                />
                <div className="mt-4 text-right">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-24">
                      <Circles visible height="80" width="80" color="#C9974C" />
                    </div>
                  ) : (
                    <>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                        onClick={onDeny}
                      >
                        Deny
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">{successMessage}</h2>
                <div className="mt-4 text-right">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    onClick={closeSuccessMessage}
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

export default RequestsTable;
