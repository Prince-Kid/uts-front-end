import React, { useState } from "react";
import { useSelectUsersQuery } from "../../Redux/Admin/usersSlice";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";

interface User {
  name: string;
  email: string;
  role: string;
  updatedAt: string;
}

const UserTable: React.FC = () => {
  const { data: users, isLoading, isError } = useSelectUsersQuery({});

  const [activeTab, setActiveTab] = useState("Buyers");

  const sortedUsers =
    users
      ?.slice()
      .sort(
        (a: User, b: User) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ) || [];

  const buyersCount = sortedUsers.filter(
    (user: User) => user.role === "buyer"
  ).length;
  const sellersCount = sortedUsers.filter(
    (user: User) => user.role === "vendor"
  ).length;

  const filteredUsers = sortedUsers.filter((user: User) =>
    activeTab === "Buyers" ? user.role === "buyer" : user.role === "vendor"
  );

  const viewAllUrl = activeTab === "Buyers" ? "/admin/users" : "/admin/sellers";

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between mb-4 pr-7">
        <div className="flex flex-row items-center gap-[20px]">
          <span
            className={`px-2 text-sm lg:p-2  lg:px-4 rounded-[6px] cursor-pointer ${
              activeTab === "Buyers"
                ? "bg-secondary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("Buyers")}
          >
            Buyers ({buyersCount})
          </span>
          <span
            className={`px-2 text-sm lg:p-2 lg:px-4 rounded-[6px] cursor-pointer ${
              activeTab === "Sellers"
                ? "bg-secondary text-white"
                : "bg-gray-200 text-gray-400"
            }`}
            onClick={() => setActiveTab("Sellers")}
          >
            Vendors ({sellersCount})
          </span>
        </div>
        <Link to={viewAllUrl}>
          <button className="sm:text-sm text-secondary">View all</button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-t">
            <th className="font-semibold text-gray-200 text-left">Name</th>
            <th className="font-semibold text-gray-200 text-left">Email</th>
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <div className="flex justify-center items-center h-24">
              <Circles visible height="80" width="80" color="#C9974C" />
            </div>
          </tbody>
        ) : (
          <tbody>
            {filteredUsers.slice(0, 6).map((user: User, index: number) => (
              <tr key={index} className="border-t">
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UserTable;
