"use client";

import React, { useState } from "react";

interface DrawerProps {
  isLoggedIn: boolean;
  userEmail?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const MenuDrawer = ({
  isLoggedIn,
  userEmail,
  onLogin,
  onLogout,
}: DrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden
          flex flex-col justify-center items-center
          w-10 h-10 rounded-full
          bg-gray-900 text-white shadow
        "
      >
        <span className="w-5 h-0.5 bg-white mb-1"></span>
        <span className="w-5 h-0.5 bg-white mb-1"></span>
        <span className="w-5 h-0.5 bg-white"></span>
      </button>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* Drawer Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50
          bg-white rounded-r-3xl shadow-xl border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500">ACCOUNT</p>
            {isLoggedIn ? (
              <>
                <p className="text-sm text-gray-700">{userEmail ?? "User"}</p>
                <button
                  className="text-red-600 text-sm hover:underline"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="text-blue-600 text-sm hover:underline"
                onClick={onLogin}
              >
                Login / Sign up
              </button>
            )}
          </div>

          {/* Filters */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-3">FILTERS</p>
            <div className="space-y-2">
              <button className="text-sm hover:underline">Priority</button>
              <button className="text-sm hover:underline">Status</button>
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full border rounded-lg px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MenuDrawer;
