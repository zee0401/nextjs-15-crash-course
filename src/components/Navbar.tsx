import React from "react";

const Navbar = () => {
  return (
    <header className=" px- ">
      <nav>
        <ul className="flex-row items-center justify-between">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#" className="text-white">
              Sign In
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
