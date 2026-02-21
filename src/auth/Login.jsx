import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { __AUTH } from "../backend/firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ Fixed useNavigate
import { FaRegUserCircle } from "react-icons/fa";
import Spinner from "../Helper/Spinner";

const Login = () => {
  let navigate = useNavigate(); // ✅ Fixed function name
  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let [showPassword, setShowPassword] = useState(false); // ✅ Fixed naming consistency
  let [isLoading, setIsLoading] = useState(false);

  let { email, password } = userData;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  let togglePassword = () => {
    setShowPassword(!showPassword);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let loggedInUser = await signInWithEmailAndPassword(
        __AUTH,
        email,
        password
      );
      console.log(loggedInUser);
      if (loggedInUser.user.emailVerified === true) {
        toast.success("User has been logged in");
        navigate("/");
      } else {
        toast.error("Email is not yet verified");
      }
    } catch (error) {
      toast.error(error.code.slice(5));
    }
    setIsLoading(false);
  };

  return (
    <section className="text-white w-full flex justify-center min-h-screen items-center mt-[-40px]">
      <article className="w-[30%] bg-white/30 text-rose-600 px-5 py-6 rounded-lg ">
        <header className="text-center text-2xl font-extrabold mb-4">
          <h1>Login</h1>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col relative">
            <label htmlFor="email" className="font-semibold text-lg mt-2">
              Email:
            </label>
            <span className="absolute right-3 top-11 text-gray-400">
              <FaRegUserCircle />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              className="outline-none border border-white/20 px-2 py-1 rounded-md bg-white/40 text-white hover:shadow-[0_0_10px_#0ff]"
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="font-semibold text-lg mt-2">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"} // ✅ Fixed variable name
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter a Valid Password"
              className="outline-none border border-white/20 px-2 py-1 rounded-md bg-white/40 text-white hover:shadow-[0_0_10px_#0ff]"
            />
            <span
              className="absolute right-3 top-11 text-gray-400 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold border border-white/20 shadow-[0_0_10px_#0ff] px-4 py-2 mt-4 bg-white font-bold text-lg cursor-pointer hover:bg-rose-600 hover:text-white hover:scale-110 rounded-md"
            >
              Login
            </button>
          </div>
          {/* //SIgn up pages */}
          <div className="flex justify-center items-center font-semibold flex">
            <span>Don't have an account?{" "}</span>
            <NavLink to={"/auth/signup"}>
              <span className="ml-3 text-white hover:text-[#5D00FF] underline animate-spin">
                Register
              </span>
            </NavLink>
          </div>
          {/* //Forgot password pages pages */}
          <div className="flex justify-center items-center font-semibold">
            <NavLink to={"/auth/reset-password"}>
              <span className="text-white rounded-xl hover:text-[#5D00FF] underline">
                Forgot Password?
              </span>
            </NavLink>
          </div>
        </form>
      </article>
      {isLoading && (
        <section className="w-[100%] h-[100vh] bg-black/50 fixed top=0">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default Login;
