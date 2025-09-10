import React from 'react';

function Header() {
  return (
    <header className=" sticky top-0 z-50 bg-cyan-400 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-center space-x-4">
        {/* Logo */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVfsW7vDXM9ASe9C2Xqsb32iOPnz7-WHLyjw&s"
          alt="logo"
          className="w-20 h-20 rounded-full border-2 border-white"
        />
        {/* Text */}
        <p className="text-5xl p-6 font-semibold tracking-wide text-pink-600">
          GoalGlow Welcomes You
        </p>
      </div>
    </header>
  );
}

export default Header;
