import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Languages from "./JSON/languges.json"
import Cities from "./JSON/cities.json"
import States from "./JSON/state.json"
import Countrys from "./JSON/country.json"
import { AuthUserContext } from '../../Context/AuthContextApi';
import { doc, setDoc } from 'firebase/firestore';
import { __DB } from '../../backend/firebaseconfig';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../Helper/Spinner';

const Addprofile = () => {
  let { authUser } = useContext(AuthUserContext)
  let navigate = useNavigate();
  let location = useLocation();
  
  let [isLoading, setIsLoading] = useState(false);

  let [userDetails, setUserDetails] = useState({
    username: "",
    contactNumber: "",
    gender: "",
    dob: "",
    age: "",
    lang: "",
    country: "",
    state: "",
    city: "",
    address: "",
    role: "user"

  })
  //destructuring
  let { username,
    contactNumber,
    gender,
    dob,
    age,
    lang,
    country,
    state,
    city,
    address } = userDetails;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let { displayName, photoURL, email, uid } = authUser
      let payload = {
        ...userDetails,
        displayName,
        photoURL,
        email,
        uid
      }
      let user_profile_collection = doc(__DB, "user_details", uid)
      await setDoc(user_profile_collection, payload);
      navigate("/user/profile")
      toast.success("User details has been added successfully")

    } catch (error) {
      console.error("Error while uploading data:", error);
      if (error.code) {
        toast.error(error.code.slice(5));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  }
  return (
    <section className="w-[100%] h-[600px] flex flex-col justify-center items-center">
      <article className="w-[80%] ml-[550px] bg-white/30 p-3 rounded-lg shadow-lg mb-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-black mb-5">Add Profile</h1>
        </header>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-black font-semibold ">
              Name:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}

              placeholder="Enter your name"
              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="text-black font-semibold ">
              Contact Number:
            </label>
            <input
              type="tel"
              id="contact"
              name="contactNumber"
              onChange={handleInputChange}

              placeholder="Enter your contact number"
              className="py-2 px-4 rounded-lg bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className='font-semibold text-black'>Gender</label>
            {/* <input type="text" className="outline-none border  border-white p-2 rounded-lg w-[250px]" /> */}
            <div className="flex justify-evenly border border-white/20 bg-white/30 text-black font-semibold p-2 rounded-lg w-[250px]">
              <input type="radio" name="gender" value="male" onChange={handleInputChange} />
              <label htmlFor="male">Male</label>

              <input type="radio" name="gender" value="female" onChange={handleInputChange} />
              <label htmlFor="female">Female</label>

              <input type="radio" name="gender" value="others" onChange={handleInputChange} />
              <label htmlFor="others">Others</label>
            </div>
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="text-black font-semibold ">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              onChange={handleInputChange}


              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label htmlFor="age" className="text-black font-semibold ">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={handleInputChange}


              placeholder="Enter your age"
              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Language */}
          <div className="flex flex-col">
            <label htmlFor="lang" className="text-black font-semibold ">
              Language:
            </label>
            <input
              type="text"
              id="lang"
              name="lang"
              onChange={handleInputChange}
              list='langList'
              placeholder="Enter your language"
              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
            <datalist id='langList'>
              {
                Languages.map((languages, index) => {
                  return <option key={index}>{languages}</option>
                })
              }
            </datalist>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label htmlFor="country" className="text-black font-semibold ">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              onChange={handleInputChange}
              list='countryList'

              placeholder="Enter your country"
              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
            <datalist id='countryList'>
              {
                Countrys.map((country, index) => {
                  return <option key={index}>{country}</option>
                })
              }
            </datalist>
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="text-black font-semibold ">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              onChange={handleInputChange}
              list='stateList'

              placeholder="Enter your state"
              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <datalist id='stateList'>
            {
              States.map((state, index) => {
                return <option key={index}>{state}</option>
              })
            }
          </datalist>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="text-black font-semibold ">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={handleInputChange}
              list='cityList'


              placeholder="Enter your city"
              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
            <datalist id='cityList'>
              {
                Cities.map((city, index) => {
                  return <option key={index}>{city}</option>
                })
              }
            </datalist>
          </div>

          {/* Address */}
          <div className="flex flex-col col-span-3">
            <label htmlFor="address" className="text-black font-semibold ">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              onChange={handleInputChange}


              placeholder="Enter your address"
              className="py-2 px-4 rounded-lg bg-white/30 bg-white/30 border border-white/20 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-3 flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 bg-rose-600 hover:bg-rose-500 text-white text-lg font-semibold rounded-lg transition-all duration-300 cursor-pointer">
              Add Profile
            </button>
          </div>
        </form>
      </article>
      {isLoading && (
        <section className="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
          <Spinner />
        </section>)}
    </section>
  );
};

export default Addprofile;