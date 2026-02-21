import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { updatePassword } from "firebase/auth";
import Spinner from "../../Helper/Spinner";

const ChangePassword = () => {
  let { authUser } = useContext(AuthUserContext);
  let navigate = useNavigate();

  let [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  let { password, confirmPassword } = userPassword;

  let [showPassword1, setShowPassword1] = useState(false);
  let [showPassword2, setShowPassword2] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let togglePassword1 = () => setShowPassword1(!showPassword1);
  let togglePassword2 = () => setShowPassword2(!showPassword2);

  let handleInputChange = (e) => {
    let { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password === confirmPassword) {
        await updatePassword(authUser, password);
        toast.success("Password Updated Successfully");
        navigate("/user/profile");
      } else {
        toast.error("Passwords do not match!");
      }
    } catch (error) {
      toast.error(error.code.slice(5));
    }
    setIsLoading(false);
  };

  return (
    <section className="w-full flex justify-center items-center py-12 min-h-screen ml-[300px] mt-[-100px]">
      <article className="bg-white/30 w-[90%] md:w-[60%] lg:w-[40%] p-8 rounded-lg shadow-lg">
        <header className="text-center text-3xl text-black font-bold pb-4 uppercase">
          <h1>Change Password</h1>
        </header>
        <form onSubmit={handleSubmit} className="text-black space-y-4">

          {/* New Password */}
          <div className="relative">
            <label htmlFor="password" className="block font-semibold text-black text-lg">New Password:</label>
            <input
              type={showPassword1 ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="w-full bg-white/40 border border-white/20 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <span
              onClick={togglePassword1}
              className="absolute right-3 top-11 cursor-pointer text-xl text-gray-400"
            >
              {showPassword1 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block font-semibold text-black text-lg">Confirm Password:</label>
            <input
              type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleInputChange}
              placeholder="Re-enter new password"
              className="w-full bg-white/40 border border-white/20 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <span
              onClick={togglePassword2}
              className="absolute right-3 top-11 cursor-pointer text-xl text-gray-400"
            >
              {showPassword2 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white text-lg font-semibold rounded-lg transition-all duration-300 cursor-pointer w-full"
            >
              {isLoading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </article>

      {/* Loading Spinner */}
      {isLoading && (
        <section className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default ChangePassword;
