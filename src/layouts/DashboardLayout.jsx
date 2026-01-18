import useAuth from "@/hooks/useAuth";
import { Bell, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [{ label: "My Parcel", link: "/dashboard/my-parcels" }];

  console.log(user);

  return (
    <div className="lg:flex ">
      <div className=" p-4 hidden lg:flex flex flex-col justify-between bg-[#edf1ea] max-w-[250px] w-full h-[100vh]">
        {/* top  */}
        <div>
          <div className="flex justify-center pb-3 w-full border-b border-[#5EBB2B]">
            <Link to={"/"}>
              <img className="w-24" src="/logo.png" alt="logo" />
            </Link>
          </div>
          <ul className="w-full mt-6 space-y-2">
            {routes.map((l, indx) => (
              <li key={indx} className="w-full">
                <NavLink
                  to={l.link}
                  className={({ isActive }) =>
                    `block text-sm w-full px-4 font-medium py-2 rounded-md
           ${isActive ? "bg-[#5EBB2B] text-white" : "hover:bg-[#5ebb2b1a]"}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* footer  */}
        <div>
          <button className="btn w-full  rounded-md bg-[#5EBB2B] text-white ">
            Log out
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex lg:justify-end justify-between items-center px-2 bg-[#edf1ea] py-3 w-full">
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setIsOpen(true)} className="cursor-pointer">
              <Menu className="text-[#5EBB2B]" />
            </button>
            <p className="text-sm font-medium">Dashboard</p>
          </div>

          <div className="flex gap-2">
            <button className="cursor-pointer">
              <Bell className="text-[#5EBB2B]" />
            </button>
            <div className="">
              <img
                className="w-8 h-8 rounded-full border p-1 border-[#5EBB2B] "
                title={user.displayName}
                src={user.photoURL || "/defaultuser.png"}
                alt="user"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[240px] bg-[#edf1ea] shadow-lg 
  transform transition-transform duration-300 lg:hidden
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col justify-between h-full p-6">
          {/* Top */}
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-[#5EBB2B]">
              <img className="w-28" src="/logo.png" alt="logo" />
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 cursor-pointer text-[#5EBB2B]" />
              </button>
            </div>

            {/* Nav Links */}
            <ul className="mt-4 space-y-2">
              {routes.map((l, indx) => (
                <li key={indx}>
                  <NavLink
                    to={l.link}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block text-sm px-4 py-2 rounded-md font-medium
                ${
                  isActive ? "bg-[#5EBB2B] text-white" : "hover:bg-[#5ebb2b1a]"
                }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <button className="btn w-full rounded-md bg-[#5EBB2B] text-white">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
