import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-center space-x-4">
        {/* Logo */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVfsW7vDXM9ASe9C2Xqsb32iOPnz7-WHLyjw&s"
          alt="logo"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        {/* Text */}
        <p className="text-xl font-semibold tracking-wide">
          GoalGlow Welcomes You
        </p>
      </div>
    </header>
  );
}

export default Header;
