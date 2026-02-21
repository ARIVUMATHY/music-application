import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';  

import { __AUTH } from '../backend/firebaseconfig';

const ResetPassword = () => {
    let [email, setEmail] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();  // imp

    let handleInputChange = (e) => {
        let value = e.target.value;
        setEmail(value);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(__AUTH, email);
            toast.success(`Reset Password Link has been sent to your registered email: ${email}`);
            navigate("/auth/login");  // to login always define in 2 places in import and inide the function
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false); 
        }
    }

  return (
    <section className="text-white w-full flex justify-center min-h-screen items-center">
      <article className="w-[30%] bg-[#202040] text-white px-5 py-6 rounded-lg shadow-indigo-500/50 shadow-2xl">
        <header className="text-center text-2xl font-extrabold mb-4">
          <h1>Reset Password</h1>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit} >
          <div className="flex flex-col relative">
            <label htmlFor="email" className="font-semibold text-lg mt-2">
              Email:
            </label>
            <span className="absolute right-3 top-10 text-gray-400">
              <FaRegUserCircle />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={email}
              placeholder="Enter Your Email"
              className="outline-none border border-gray-500 px-2 py-1 rounded-md bg-gray-800 text-white hover:shadow-2xl shadow-amber-50"
            />
          </div>

        

          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold border border-gray-200 px-4 py-2 mt-4 cursor-pointer hover:bg-[#5d00ff] hover:text-white hover:scale-110 transition-all duration-300 rounded-md"
            >
           {isLoading ? "Loading...":"Reset Password"}
            </button>
          </div>
            
          {/* //Forgot password pages pages */}
          <div className="flex justify-center items-center font-semibold">
            <NavLink to={"/auth/login"}>
              
              <span className="hover:text-[#5d00ff] hover:underline animate-spin">
               CANCEL
              </span>
            </NavLink>
          </div>
        </form>
      </article>
    </section>
  )
}

export default ResetPassword