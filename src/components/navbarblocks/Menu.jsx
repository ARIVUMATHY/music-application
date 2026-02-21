import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { BackendUserContext } from "../../Context/FetchUserContext";

const Menu = () => {
  const { authUser, logout } = useContext(AuthUserContext);
  console.log(authUser);

  let { userData } = useContext(BackendUserContext);
  let role  = userData?.role;
  console.log(role);
  

  const AnonymousUser = () => (
    <>
      <li>
        <NavLink
          to="/auth/login"
          className={({ isActive }) =>
            `inline-block px-4 py-2 shadow-[0_0_10px_#0ff] bg-white/70 text-lg font-semibold hover:scale-110 cursor-pointer 
            ${isActive
              ? "text-red-600"
              : "text-black "
            }`
          }
        >
          Log in
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/auth/signup"
          className={({ isActive }) =>
            `inline-block px-4 py-2 shadow-[0_0_10px_#0ff] bg-white/70 text-lg font-semibold hover:scale-110 cursor-pointer
            ${isActive
              ? "text-red-600"
              : "text-black"
            }`
          }
        >
          Register
        </NavLink>
      </li>
    </>
  );

  const AuthenticatedUser = () => (
    <>
      {role==="admin"&&(
        <li>
          <NavLink 
          to={"/admin"}
          end className={({ isActive }) =>
            `inline-block px-4 py-2 shadow-[0_0_10px_#0ff] bg-white/70 text-lg font-semibold hover:font-bold hover:scale-110 cursor-pointer 
            ${isActive
              ? "bg-black text-red-600"
              : "bg-black text-black"
            }`
          } >Admin</NavLink>
        </li>)}
      <li>
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `inline-block px-4 py-2 shadow-[0_0_10px_#0ff] bg-white/70 text-lg font-semibold hover:font-bold hover:scale-110 cursor-pointer 
            ${isActive
              ? "bg-black text-red-600"
              : "bg-black text-black"
            }`
          }
        >
          <div className="flex justify-evenly items-center">
            <span className="mr-2">{authUser?.displayName}</span>
            <img
              src={authUser?.photoURL}
              alt="profile"
              className=" w-[25px] h-[25px] rounded-full"
            />
          </div>
        </NavLink>
      </li>

      <li>
        <button
          onClick={() => logout()}
          className="inline-block text-black px-4 py-2 shadow-[0_0_10px_#0ff] bg-white/70 text-lg font-semibold hover:scale-110 cursor-pointer"
        >
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="basis-[33%]">
      <ul className="flex justify-evenly">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `inline-block px-4 py-2 shadow-[0_0_10px_#0ff] bg-white/70 text-lg bg-black font-semibold hover:scale-110 cursor-pointer 
              ${isActive
                ? "text-red-600"
                : "text-black"
              }`
            }
          >
            Home
          </NavLink>
        </li>

        {authUser === null ? <AnonymousUser /> : <AuthenticatedUser />}
      </ul>
    </div>
  );
};

export default Menu
