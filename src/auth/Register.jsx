import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { __AUTH } from "../backend/firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../Helper/Spinner";

const Register = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [showPassword1, setShowPassword1] = useState(false);
  let [showPassword2, setShowPassword2] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let { username, email, password, confirmPassword } = userData;

  let handleInputChange = (e) => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    
    try {
      let registeredUser = await createUserWithEmailAndPassword(__AUTH, email, password);
      await sendEmailVerification(registeredUser.user);
      updateProfile(registeredUser.user, { displayName: username });
      toast.success(`Email verification sent to ${email}`);
      navigate("/auth/login");
      toast.success("User has been registered successfully");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
    
    setIsLoading(false);
  };

  return (
    <section className="text-white w-full flex justify-center min-h-screen items-center mt-[-30px]">
      <article className="w-[30%] bg-white/30 text-rose-600 px-5 py-6 rounded-lg shadow-indigo-500/50 shadow-2xl">
        <header className="text-center text-2xl font-extrabold mb-4">
          <h1>Register</h1>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col relative">
            <label htmlFor="username" className="font-semibold text-lg">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              onChange={handleInputChange} 
              placeholder="Enter Your Name" 
              className="outline-none border border-white/20 px-2 py-1 rounded-md bg-white/40 text-white hover:shadow-[0_0_10px_#0ff]" />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="email" className="font-semibold text-lg">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={handleInputChange} 
              placeholder="Enter Your Email" 
              className="outline-none border border-white/20 px-2 py-1 rounded-md bg-white/40 text-white hover:shadow-[0_0_10px_#0ff]" />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="font-semibold text-lg">Password:</label>
            <input 
              type={showPassword1 ? "text" : "password"} 
              id="password" 
              name="password" 
              value={password} 
              onChange={handleInputChange} 
              placeholder="Enter a Valid Password" 
              className="outline-none border border-white/20 px-2 py-1 rounded-md bg-white/40 text-white hover:shadow-[0_0_10px_#0ff]" />
            <span className="absolute right-3 top-10 text-gray-400 cursor-pointer" onClick={() => setShowPassword1(!showPassword1)}>
              {showPassword1 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="confirmPassword" className="font-semibold text-lg">Confirm Password:</label>
            <input 
              type={showPassword2 ? "text" : "password"} 
              id="confirmPassword" 
              name="confirmPassword" 
              value={confirmPassword} 
              onChange={handleInputChange} 
              placeholder="Confirm Your Password" 
              className="outline-none border border-white/20 px-2 py-1 rounded-md bg-white/40 text-white hover:shadow-[0_0_10px_#0ff]" />
            <span className="absolute right-3 top-10 text-gray-400 cursor-pointer" onClick={() => setShowPassword2(!showPassword2)}>
              {showPassword2 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="font-bold border border-white/20 shadow-[0_0_10px_#0ff] px-4 py-2 mt-4 bg-white font-bold text-lg cursor-pointer hover:bg-rose-600 hover:text-white hover:scale-110 rounded-md">
              Register
            </button>
          </div>
          <div className="flex justify-center items-center font-semibold">
            <span>Already have an account? </span>
            <NavLink to="/auth/login" className="ml-3 text-white hover:text-[#5D00FF] underline">
              Login
            </NavLink>
          </div>
        </form>
      </article>
      {isLoading && (
        <section className="w-[100%] h-[100vh] bg-black/50 fixed top=0 flex justify-center items-center">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default Register;
