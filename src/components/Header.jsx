import React from "react";
import { Link } from "react-router"; 

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
  {/* Logo Image */}
  <img
    src="src/blog.jpg" 
    alt="My Blog Logo"
    className="h-25 w-20 rounded-full object-cover" 
  />
  <div className="text-3xl font-extrabold text-white"></div>
</Link>
          <p className="text-m text-gray-200">Where stories begin.</p>
        </div>
        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-gray-200 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-gray-200 transition duration-300">
                  Create Post
                </Link>
              </li>
            </ul>
          </nav>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full text-black"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

