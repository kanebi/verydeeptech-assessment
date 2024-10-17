"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import logo from '../../app/images/logo.png'
import { useStore } from "../../store/store";

const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-white"
      } shadow-md`}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between sm:w-full md:w-1/2">
        <div className="text-2xl font-bold overflow-hidden h-[70px] text-primary">
          <Image
            src={logo}
            alt="Gloval Logo"
            width={100}
            height={100}
            className="mr-4"
          />{" "}
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/">
            <div className="text-gray-600 hover:text-primary cursor-pointer">
              <HomeIcon className="h-6 w-6" />
            </div>
          </Link>
          <Link href="/cart">
            <div className="text-gray-600 hover:text-primary cursor-pointer">
              <ShoppingCartIcon className="h-6 w-6" />
            </div>
          </Link>
          <div className="relative">
            <div
              className="text-gray-600 hover:text-primary cursor-pointer"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <UserIcon className="h-6 w-6" />
            </div>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {isLoggedIn ? (
                  <>
                    <Link href="/profile">
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:text-secondary">
                        Profile
                      </div>
                    </Link>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-secondary cursor-pointer"
                      onClick={() => logout()}
                    >
                      Sign Out
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:text-secondary">
                        Login
                      </div>
                    </Link>
                    <Link href="/signup">
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:text-secondary">
                        Sign Up
                      </div>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
