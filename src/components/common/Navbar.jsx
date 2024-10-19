import { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { BiMenu, BiArrowFromLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from './logo.svg';
import { FiArrowRight, FiHome } from "react-icons/fi";


import {
  closeDropdown,
  closeSidebar,
  openSidebar,
  uiStore,
} from "../../features/uiSlice";
import { navLinks } from "../../data/navLinks";
import SingleLink from "./SingleLink";

const Navbar = () => {
  const { isSidebarOpen } = useSelector(uiStore);
  const [showSearchBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle dropdown close
  const handleClose = (e) => {
    if (!e.target.classList.contains("link")) {
      dispatch(closeDropdown());
    }
  };

  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains("mobile-modal")) dispatch(closeSidebar());
  };

  return (
    <div
      className="navbar h-[45px] fixed w-full z-20 top-0 left-0 px-[2%] md:px-[6%] flex items-center justify-between py-2 bg-white/60 border-b backdrop-blur-sm dark:border-dark dark:bg-card-dark/60"
      onMouseOver={handleClose}
    >
      <Link to="/" className="flex-shrink-0 flex items-center gap-x-1">
        <img src={Logo} width={80} className="mt-1 mb-1" alt="logo" />
      </Link>

      <div className="flex items-center gap-x-4 flex-nowrap">
        {/* Desktop Menu */}
        <ul className={`hidden md:flex items-center ${showSearchBar && "!hidden"}`}>
          {navLinks.map((link) => (
            <SingleLink {...link} key={link.id} />
          ))}
        </ul>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-50 opacity-0 pointer-events-none transition-a ${
            isSidebarOpen && "open"
          }`}
          onClick={handleCloseSidebar}
        >
          <ul
            className={`mobile-dialog overflow-auto absolute flex flex-col space-y-4 p-3 bg-white dark:bg-card-dark h-screen max-w-[300px] w-full -translate-x-[500px] transition-a ${
              isSidebarOpen && "open"
            }`}
          >
            <div className="border-b flex items-center justify-between dark:border-slate-800">
              <p className="uppercase text-sm">menu</p>
              <div
                className="icon-box md:hidden"
                onClick={() => dispatch(closeSidebar())}
              >
                <FiDelete />
              </div>
            </div>
            {navLinks?.map(({ id, linkText, url, subLinks }) => (
              <ul key={id}>
                <NavLink
                  to={url}
                  end
                  className="w-fit text-sm before:!hidden"
                  onClick={() => dispatch(closeSidebar())}
                >
                  {linkText}
                </NavLink>
                {subLinks?.map(({ id, linkText, url }) => (
                  <ul key={id} className="mt-2">
                    <NavLink
                      to={url}
                      end
                      className="relative ml-8 text-xs before:hidden w-fit after:absolute after:w-2 after:h-2 after:rounded-full after:border-2 after:top-1/2 after:-translate-y-1/2 after:-left-4 dark:after:opacity-50"
                      onClick={() => dispatch(closeSidebar())}
                    >
                      {linkText}
                    </NavLink>
                  </ul>
                ))}
              </ul>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Let's Build Button - Hidden on mobile */}
          <button
            className="hidden md:flex items-center gap-1 bg-[rgb(255_100_0/var(--tw-bg-opacity))] hover:bg-opacity-80 text-white font-semibold py-1 px-2 rounded-md transition duration-300 text-sm"
            onClick={() => navigate("/contact")}
          >
            Contact
            <FiArrowRight className="ml-1 text-sm" />
            {/* <button className="px-2 py-2 rounded-md btn-primary">
                < />
              </button> */}
          </button>

          <div className="hidden md:flex items-center space-x-2">
            {/* Vertical Line */}
            <span className="border-l border-gray-300 h-4"></span>

            {/* Phone Number Section - Hidden on mobile */}
            <a
              href="tel:+91 9999999999"
              className="flex items-center text-[rgb(255_100_0/var(--tw-bg-opacity))] font-semibold text-sm"
            >
              <i className="fas fa-phone-alt mr-1 text-sm"></i> {/* Phone icon */}
              +91 9999999999
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div
            className="icon-box md:hidden"
            onClick={() => dispatch(openSidebar())}
          >
            <BiMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
