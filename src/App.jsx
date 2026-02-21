import React from "react";
import NavbarContainer from "./components/navbarblocks/navbarcontainer";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

const App = () => {
  return (
    <div>
      <NavbarContainer />
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add this */}
    </div>
  );
};

export default App;
