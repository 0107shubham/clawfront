import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = Cookies.get("userName");
  const navigate = useNavigate();

  const handleSignout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("userId");
    Cookies.remove("userName");
    navigate("/signin");
  };
  return (
    <div className="h-[100px] bg-[#405DE6] flex justify-between items-center px-5">
      <p className="text-white text-2xl capitalize font-semibold">{username}</p>
      <button
        onClick={handleSignout}
        className="border bg-red-600 text-white p-2 text-2xl"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
