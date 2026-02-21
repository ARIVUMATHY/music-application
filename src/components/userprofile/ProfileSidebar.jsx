import React from "react";
import { NavLink } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";

const ProfileSidebar = () => {
  return (
    <aside className="h-[100%] fixed top-22.5 border border-white border-[5px] rounded left-0 bg-white/30">
      <nav className="w-full flex-1">
        <ul className="w-full p-5">
          <li className="flex items-center mt-[30px] h-[60px] bg-rose-600 hover:bg-rose-500 hover:text-xl  rounded-lg text-white font-semibold text-lg">
            <NavLink to="/user/profile/" className="flex">
              <span className="text-xl mt-1 mr-2 ml-2">
                <MdAccountBox />
              </span>
              <span>My Account</span>
            </NavLink>
          </li>
          <br />
          <li className="flex items-center h-[60px] bg-rose-600 hover:bg-rose-500 hover:text-xl  rounded-lg text-white font-semibold text-lg">
            <NavLink to="/user/profile/add-profile" className="flex">
              <span className="text-xl mt-1 mr-2 ml-2">
                <FaUserPlus />
              </span>
              <span>Add Profile</span>
            </NavLink>
          </li>
          <br />
          <li className="flex items-center h-[60px] bg-rose-600 hover:bg-rose-500 hover:font-bold rounded-lg text-white font-semibold text-lg">
            <NavLink to="/user/profile/upload-profile-photo" className="flex">
              <span className="text-xl mt-1 mr-1 ml-2">
                <MdAddPhotoAlternate />
              </span>
              <span>Upload Profile Photo</span>
            </NavLink>
          </li>
          <br />
          <li className="flex items-center h-[60px] bg-rose-600 hover:bg-rose-500 hover:text-xl  rounded-lg text-white font-semibold text-lg">
            <NavLink to="/user/profile/change-password" className="flex items-center">
              <span className="text-xl mt-1 mr-2 ml-2">
                <TbPasswordUser />
              </span>
              <span>Change Password</span>
            </NavLink>
          </li>
          <br />
          <li className="flex items-center h-[60px] bg-rose-600 hover:bg-rose-500 hover:text-xl  rounded-lg text-white font-semibold text-lg">
            <NavLink to="/user/profile/delete-account" className="flex items-center">
              <span className="text-xl mt-1 mr-2 ml-2">
                <AiOutlineUserDelete />
              </span>
              <span>Delete Account</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
