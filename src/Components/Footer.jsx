import React from "react";

function Footer() {
  return (
  <div>
    <footer className=" sticky  z-50 bg-gray-800 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left Section */}
        <p className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>

      </div>
    </footer>
    </div>
  );
}

export default Footer;
