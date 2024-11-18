import React, { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useUpdateAdminPasswordMutation } from "../../Redux/Admin/usersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../../services/Logout";

interface Passwords {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface Errors {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const AdminSettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState<Passwords>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const user: any = useAuthUser();

  const [updatePassword] = useUpdateAdminPasswordMutation();
  const logout = Logout();

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleDiscard = () => {
    setIsChangingPassword(false);
    setPasswords({ password: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setPasswords({ ...passwords, [id]: value });
  };

  const validateForm = () => {
    const errors: Errors = {};
    if (!passwords.password) errors.password = "Current password is required";
    if (!passwords.newPassword) errors.newPassword = "New password is required";
    if (passwords.newPassword !== passwords.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await updatePassword({ id: user.userId, passwords }).unwrap();
        toast.success("Password updated successfully");
        handleDiscard();
        setTimeout(() => {
          logout();
        }, 4000);
      } catch (error) {
        toast.error("Failed to update password");
      }
    }
  };

  const inputClass =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const errorClass = "text-red-500 text-sm";

  return (
    <div className="h-[90%] w-full mt-2 md:mt-4 lg:mt-6 bg-white rounded-lg shadow-md p-6 lg:ml-5 xl:ml-8 2xl:ml-10 3xl:ml-12">
      <ToastContainer />
      {!isChangingPassword ? (
        <div>
          <h2 className="text-xl text-center font-bold mb-4">
            Profile Information
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`${inputClass} text-center`}
              value={user.name || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${inputClass} text-center`}
              value={user.email || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              className={`${inputClass} text-center`}
              value={user.role || ""}
              readOnly
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl text-center text-primary font-bold mb-4">
            Change Password
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Current Password
            </label>
            <input
              type="password"
              id="password"
              className={inputClass}
              placeholder="Enter Current Password"
              value={passwords.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className={errorClass}>{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className={inputClass}
              placeholder="Enter New Password"
              value={passwords.newPassword}
              onChange={handleInputChange}
            />
            {errors.newPassword && (
              <p className={errorClass}>{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={inputClass}
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className={errorClass}>{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleDiscard}
              className="text-gray-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSettings;
