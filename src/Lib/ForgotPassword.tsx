import React, { FormEvent, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../asset/images/logo.png";
import AuthButton from "../Constants/AuthButton";
import Input from "../Constants/Input";
import {
  useRequest_paswordMutation,
  useReset_passwordMutation,
} from "../Redux/features/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Forgotpassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");
  const [re_password, setRe_Pasword] = useState<string>("");

  const getQueryParams = (search: string) => new URLSearchParams(search);
  const queryParams = getQueryParams(location.search);
  const token = queryParams.get("token");

  const [request, { isLoading: loading }] = useRequest_paswordMutation();
  const [reset, { isLoading: reset_loading }] = useReset_passwordMutation();

  const handel_validation = async (e: FormEvent) => {
    e.preventDefault();

    if (token) {
      if (!newPassword || !re_password) {
        setErrorMessage("All fields are required");
        return;
      }
      if (newPassword === re_password) {
        handelSubmit();
      } else {
        setErrorMessage("Passwords do not match");
      }
    } else {
      if (!email) {
        setErrorMessage("Email is required");
        return;
      }
      handelSubmit();
    }
  };

  const handelSubmit = async () => {
    const data = {
      email: email,
    };

    const data_reset = {
      password: newPassword,
      token: token,
    };

    if (token) {
      try {
        const response = await reset(data_reset).unwrap();
        if (response && response.message === "Password has been reset") {
          setIsReset(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error: any) {
        if (error.data && error.status === 400) {
          setErrorMessage("Password reset token is invalid or has expired");
        } else {
          setErrorMessage("Something went wrong, try again later");
        }
      }
    } else {
      try {
        const response = await request(data).unwrap();
        if (
          response.message &&
          response.message === "Password reset email sent"
        ) {
          setIsEmailSent(true);
        }
      } catch (error: any) {
        if (error.data && error.data.message === "User not found") {
          setErrorMessage("No user found with the provided email");
        } else {
          setErrorMessage("Something went wrong, try again later");
        }
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-x-hidden overflow-hidden">
      {/* <div className="top-0 -z-10 right-[-80px] rotate-[160deg] absolute w-[200px] md:w-[300px] h-[50px] bg-primary" />
      <div className="top-[75px] -z-10 right-[-80px] rotate-[160deg] absolute w-[200px] md:w-[300px] h-[50px] bg-secondary" />
      <div className="bottom-0 left-[-80px] -z-10  rotate-[160deg] absolute w-[200px] md:w-[300px] h-[50px] bg-primary" />
      <div className="bottom-[75px] left-[-80px] -z-10  rotate-[160deg] absolute w-[200px] md:w-[300px] h-[50px] bg-secondary" /> */}
      <div className="w-full md:w-2/3 bg-white lg:w-1/3 rounded-[12px] p-4 flex items-center flex-col gap-[20px]">
        {isReset && (
          <div className="p-3 w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black/40 z-40">
            <div className="w-full sm:w-1/4 p-4 rounded-[6px] flex flex-row items-center justify-center gap-[10px] bg-white">
              <svg
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM15 4.45L16.8 6.25L8.75 14.3L4.45 10L6.25 8.2L8.75 10.7L15 4.45Z"
                  fill="#C9974C"
                />
              </svg>
              <span className="text-[18px] font-[400] font-outfit text-primary">
                Your Password has been reset
              </span>
            </div>
          </div>
        )}
        <div className="w-[200px] h-[60px]">
          <LazyLoadImage
            src={logo}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-center font-outfit">
          {token
            ? "Please enter your new password on this page."
            : "Enter your email, and we'll send you a link to get back into your account."}
        </span>
        {isEmailSent ? (
          <div className="w-full p-4 flex flex-col gap-[10px] items-center justify-center rounded-[12px] bg-[#e7b871]">
            <div className="flex flex-row justify-between items-center w-full">
              <span></span>
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM15 4.45L16.8 6.25L8.75 14.3L4.45 10L6.25 8.2L8.75 10.7L15 4.45Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setIsEmailSent(false)}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.1317 0.40065L0.743164 5.78918L3.49476 8.54078L10.2973 15.458L3.49476 22.2605L0.743164 24.8975L6.1317 30.4006L8.88329 27.6491L15.8005 20.7319L22.603 27.6491L25.24 30.4006L30.7432 24.8975L27.9916 22.2605L21.0744 15.458L27.9916 8.54078L30.7432 5.78918L25.24 0.40065L22.603 3.15224L15.8005 9.95479L8.88329 3.15224L6.1317 0.40065Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
            <span className="text-center text-white font-outfit font-[600]">
              The reset password link has been sent to your email address. Use
              it to reset your password in less than 15 minutes.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handel_validation}
            className="flex flex-col gap-[20px] w-full"
            method="post"
          >
            <span className="text-center text-red-400">{errorMessage}</span>
            {token ? (
              <>
                <Input
                  label=""
                  error={error}
                  value={newPassword}
                  type="password"
                  placeholder="Enter New Password"
                  onChange={(value) => setNewPassword(value)}
                />
                <Input
                  label=""
                  error={error}
                  value={re_password}
                  type="password"
                  placeholder="Re-Type Password"
                  onChange={(value) => setRe_Pasword(value)}
                />
                <AuthButton isLoading={reset_loading} label="Confirm" />
              </>
            ) : (
              <>
                <Input
                  label=""
                  error={error}
                  value={email}
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={(value) => setEmail(value)}
                />
                <AuthButton isLoading={loading} label="Continue" />
              </>
            )}
            <div className="w-full flex flex-row gap-[10px] items-center">
              <div className="w-1/2 h-[2px] bg-gray-200" />
              <span>OR</span>
              <div className="w-1/2 h-[2px] bg-gray-200" />
            </div>
            <a
              href="/signup"
              className="text-center text-primary font-[500] font-outfit"
            >
              Create New Account
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgotpassword;
