"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-xl" : ""
      }`}
    >
      {/* Main header section with animated gradient background */}
      <div
        className={`bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white transition-all duration-300 
        ${scrolled ? "py-3" : "py-8"}`}
      >
        {/* Animated pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "12px 12px",
          }}
        />

        {/* Container for site title and description */}
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`flex flex-col items-center justify-center transition-all duration-300
            ${scrolled ? "mb-0" : "mb-4"}`}
          >
            <h1
              className={`font-bold tracking-tight text-white drop-shadow-md transition-all duration-300
              ${scrolled ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"}`}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">
                MEZIANTOU&apos;S BLOG
              </span>
            </h1>

            <p
              className={`text-blue-100 max-w-2xl text-center font-light transition-all duration-300
              ${
                scrolled
                  ? "text-xs md:text-sm mt-1 opacity-80"
                  : "text-sm md:text-base mt-3"
              }`}
            >
              Blog about Microsoft technologies (.NET, ASP.NET Core, Blazor, EF
              Core, WPF, TypeScript, etc.)
            </p>
          </div>
        </div>
      </div>

      {/* Navigation bar with frosted glass effect */}
      <div className="bg-indigo-950/95 backdrop-blur-md py-3 border-t border-indigo-800/50 border-b border-indigo-900/50 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu button with animation */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none p-1 rounded-md hover:bg-indigo-800/50 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Navigation with hover effects */}
            <nav className="flex flex-1 justify-center">
              <ul className="flex space-x-1">
                <li>
                  <Link
                    href="/"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${
                      isActiveLink("/")
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                        : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/archives"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${
                      isActiveLink("/archives")
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                        : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    Archives
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${
                      isActiveLink("/projects")
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                        : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${
                      isActiveLink("/about")
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                        : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Menu with animation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "max-h-56 opacity-100 mt-3 pt-3 border-t border-indigo-800/50"
                : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-1 pb-2">
              <li>
                <Link
                  href="/"
                  className={`block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    isActiveLink("/")
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                      : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/archives"
                  className={`block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    isActiveLink("/archives")
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                      : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Archives
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className={`block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    isActiveLink("/projects")
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                      : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    isActiveLink("/about")
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-800/20"
                      : "text-blue-100 hover:bg-indigo-800/50 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
