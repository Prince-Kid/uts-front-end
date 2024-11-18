import React, { useState, useEffect } from "react";
import { useSelectUsersQuery } from "../../Redux/Admin/usersSlice";
import { Circles } from "react-loader-spinner";
import { toCapital } from "./AdminHeader";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const SellerTable: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const usersPerPage = 15;

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useSelectUsersQuery({});

  useEffect(() => {
    refetch();
  }, []);

  const filteredUsers = users.filter((user: UserData) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onViewDetails = (user: UserData) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[90%]">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-[90%]">
        <div className="text-center">
          <p className="text-red-600 font-semibold">
            An error occurred while loading users. Please try again later.
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

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden lg:mb-12 xl:ml-[5%] mt-3">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold text-gray-600">All Users</h1>
        <input
          type="text"
          className="border rounded-lg p-2"
          placeholder="Search username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-4 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">User Name</th>
            <th className="px-4 py-2 text-left hidden md:table-cell lg:table-cell">
              Email
            </th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user: any, index: any) => (
            <tr key={user.id}>
              <td className="px-4 py-2 text-left">
                {String(indexOfFirstUser + index + 1).padStart(2, "0")}
              </td>
              <td className="px-4 py-2">{toCapital(user.name)}</td>
              <td className="px-4 py-2 hidden md:table-cell lg:table-cell">
                {user.email}
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-orange-500 hover:text-orange-700"
                  onClick={() => onViewDetails(user)}
                >
                  <i className="fas fa-eye"></i> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {toCapital(selectedUser.name)}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
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
    </div>
  );
};

export default SellerTable;
