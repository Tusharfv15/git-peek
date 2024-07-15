import React from "react";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdEditDocument, MdOutlineExplore } from "react-icons/md";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import Logout from "./LogOut";

const Sidebar = () => {
  const authUser = true;
  return (
    <aside
      className="flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8
    overflow-y-auto border-r bg-glass"
    >
      <nav className="h-full flex flex-col gap-5">
        <Link to="/" className="flex justify-center">
          <img src="/github.svg" alt="GitHub Logo" className="h-8" />
        </Link>
        <Link to="/" className="flex justify-center">
          <IoHomeSharp size={20} />
        </Link>
        {authUser && (
          <Link to="/likes" className="flex justify-center">
            <FaHeart size={20} />
          </Link>
        )}
        {authUser && (
          <Link to="/explore" className="flex justify-center">
            <MdOutlineExplore size={25} />
          </Link>
        )}

        {!authUser && (
          <Link to="/login" className="flex justify-center">
            <PiSignInBold size={25} />
          </Link>
        )}

        {!authUser && (
          <Link to="/signup" className="flex justify-center">
            <MdEditDocument size={25} />
          </Link>
        )}
        {authUser && (
          <div className="flex flex-col gap-2 mt-auto">
            <Logout />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
