import React from "react";

import Menu from "./Menu";
import Logo from "./Logo";

const NavbarContainer = () => {
  return (
    <div className=" w-screen h-[90px] bg-white/30 text-white flex items-center justify-between ">
      <Logo />
      <Menu />     
    </div>
  );
};

export default NavbarContainer;
