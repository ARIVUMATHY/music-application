import React, { useContext } from "react";
import { FaUserXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { BackendUserContext } from "../../Context/FetchUserContext";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { FaEdit } from "react-icons/fa";

const MyAccount = () => {
  let { authUser } = useContext(AuthUserContext);
  let { userData } = useContext(BackendUserContext);
  console.log(userData);

  return (
    <section className="w-[100%] h-[calc(100vh-70px)] flex justify-center items-center pt-[70px] text-black">
      <article className=" ml-[400px] w-[80%] bg-white/40 mb-15 flex flex-col justify-center p-2 rounded">
        <header className="w-full h-[110px] bg-white/60 rounded-md flex flex-col gap-2 justify-center items-center">
          <img
            src={authUser?.photoURL}
            alt=""
            className="w-[100px] h-[100px] rounded-full mt-[-60px] hover:scale-130 "
          />
          <h1 className="text-md font-semibold mt-[-5px] ">{authUser?.displayName}</h1>
          <p className="text-md font-semibold mt-[-10px]">{authUser?.email}</p>
        </header>
        <main className="w-[100%] flex flex-col">
          <div className="w-full flex justify-between items-center px-6">
            <h1 className="text-center text-2xl font-bold uppercase py-3">
              Personal Details
            </h1>
            <span className="flex items-center gap-2">
              <NavLink to={"/user/profile/add-profile"}
                state={userData}
                className={"py-2 px-4 bg-rose-600 text-white font-semibold rounded-md hover:bg-rose-500 flex items-center gap-2"}>
                <span>Edit</span>
                <FaEdit />
              </NavLink>
            </span>
          </div>
          {userData === null ? (<aside className="w-full">
            <div className="flex flex-col justify-center items-center">
              <FaUserXmark className="text-9xl" />
              <h1 className="text-lg">User Data Not Found!!</h1>
            </div>
            <div className="flex justify-center items-center">
              <NavLink
                to={"/user/profile/add-profile"}
                className={
                  "py-2 px-10 my-5 bg-rose-600 rounded-lg text-lg font-semibold cursor-pointer"
                }
              >
                Add Profile
              </NavLink>
            </div>
          </aside>) : (<aside className="w-full">
            <article className="flex gap-3 py-2 px-6 text-black">
              <div className="w-[300px] flex items-center gap-2 p-4 rounded ">
                <span className="text-lg font-semibold py-1">Name:</span>
                <span className="border w-[230px] h-[30px] border-black/30 rounded border border-black text-black px-3  flex items-center">{userData?.username}</span>
              </div>
              <div className="w-[300px] flex items-center gap-2  p-4 rounded">
                <span className="text-lg font-semibold py-1">Contact:</span>
                <span className="border w-[230px] h-[30px] border-black/30 rounded border border-black text-black px-3  flex items-center">{userData.contactNumber}</span>
              </div>
              <div className=" w-[300px] flex items-center gap-2 p-4 rounded">
                <span className="text-lg font-semibold py-1">Gender:</span>
                <span className="border w-[230px] h-[30px] border-black/30 rounded border border-black text-black px-3  flex items-center">{userData.gender}</span>
              </div>
            </article>
            <article className="flex gap-3 py-2 px-6">
              <div className="w-[300px] flex items-center gap-2 p-4 rounded">
                <span className="text-lg font-semibold py-1 ">DOB:</span>
                <span className=" w-[230px] h-[30px] rounded text-black px-3 border border-black/30  flex items-center">{userData.dob}</span>
              </div>
              <div className="w-[300px] flex items-center gap-2  p-4 rounded">
                <span className="text-lg font-semibold py-1">Age:</span>
                <span className=" w-[230px] h-[30px]rounded text-black px-3  border border-black/30 flex items-center">{userData.age}</span>
              </div>
              <div className="w-[300px] flex items-center gap-2d  p-4 rounded">
                <span className="text-lg font-semibold py-1">Language:</span>
                <span className=" w-[230px] h-[30px] rounded text-black px-3 border border-black/30 flex items-center">{userData.lang}</span>
              </div>
            </article>
            <article className="flex gap-3 py-2 px-6">
              <div className="w-[300px] flex items-center gap-2  p-4 rounded">
                <span className="text-lg font-semibold py-1">Country:</span>
                <span className=" w-[230px] h-[30px] rounded text-black px-3 border border-black/30 flex items-center">{userData.country}</span>
              </div>
              <div className="w-[300px] flex items-center gap-2  p-4 rounded">
                <span className="text-lg font-semibold py-1">State:</span>
                <span className=" w-[230px] h-[30px] rounded text-black px-3 border border-black/30 flex items-center">{userData.state}</span>
              </div>
              <div className="w-[300px] flex items-center gap-2  p-4 rounded">
                <span className="text-lg font-semibold py-1">City:</span>
                <span className=" w-[230px] h-[30px] rounded text-black px-3 border border-black/30 flex items-center">{userData.city}</span>
              </div>
            </article>
            <article className="flex py-2 px-6">
              <div className="flex items-center gap-2 p-4 rounded">
                <span className="text-lg font-semibold py-1">Address:</span>
                <span className="w-[810px] h-[60px] rounded text-black px-3 flex border border-black/30 items-center">{userData.address}</span>
              </div>
            </article>
          </aside>)
          }
        </main>
      </article>
    </section>
  );
};

export default MyAccount;