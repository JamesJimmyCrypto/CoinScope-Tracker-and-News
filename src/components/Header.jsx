import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";
import noUserImg from "../assets/noUserImg.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useContext(CryptoCurrency);

  const navItems = [
    {
      id: 1,
      name: "Home",
      slug: "/",
    },
    {
      id: 2,
      name: "Cryptocurrencies",
      slug: "/cryptocurrencies",
    },
    {
      id: 3,
      name: "News",
      slug: "/news",
    },
  ];

  return (
    <header className="navbar bg-[#faed26] relative">
      <div className="navbar-start text-3xl text-[#121111] font-bold w-full flex items-center justify-between px-4">
        <Link to="/" className="z-50">
          CoinScope
        </Link>

        <div className="flex items-center md:hidden">
          {user ? (
            <Link to="/profile" className="avatar">
              <div className="ring-black ring-offset-base-100 w-8 rounded-full ring ring-offset-2 mr-3">
                <img src={user.photoURL ? user.photoURL : noUserImg} />
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className=" text-[#faed26] bg-[#121111] font-medium px-4 py-2 rounded-xl"
            >
              Log In
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <IoClose className="text-2xl text-[#121111]" />
            ) : (
              <GiHamburgerMenu className="text-2xl text-[#121111]" />
            )}
          </button>
        </div>
      </div>

      <nav className="hidden md:flex navbar-end items-center w-full px-4">
        <ul className="flex-grow flex items-center justify-center space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                className={(e) => {
                  return e.isActive
                    ? "text-[#faed26] bg-[#121111] p-2 rounded-xl text-lg font-medium"
                    : "text-[#121111] text-lg hover:text-[#525252] font-medium";
                }}
                to={`${item.slug}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {user ? (
          <Link to="/profile" className="avatar">
            <div className="ring-black ring-offset-base-100 w-9 rounded-full ring ring-offset-2">
              <img src={user.photoURL ? user.photoURL : noUserImg} />
            </div>
          </Link>
        ) : (
          <Link
            to="/login"
            className=" text-[#faed26] bg-[#121111] font-medium px-4 py-2 rounded-xl"
          >
            Log In
          </Link>
        )}
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#faed26] z-40 md:hidden flex items-center justify-center">
          <nav className="w-full">
            <ul className="space-y-6 text-center flex flex-col items-center">
              {navItems.map((item) => (
                <li key={item.id} className="w-full flex justify-center">
                  <NavLink
                    to={item.slug}
                    onClick={() => setIsMenuOpen(false)}
                    className={(e) => {
                      return e.isActive
                        ? "bg-[#121111] text-[#faed26] text-2xl font-bold px-4 py-2 rounded-xl"
                        : "text-[#121111] text-2xl hover:text-[#525252] font-medium";
                    }}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
