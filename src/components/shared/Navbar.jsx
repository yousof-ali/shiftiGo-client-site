import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import Container from "./Container";
import { Link, NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const linksData = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Services",
      route: "/services",
    },
    {
      name: "Send a Parcel",
      route: "/sendParcel",
    },
    {
      name: "Coverage",
      route: "/coverage",
    },
    user && {
      name: "Dashboard",
      route: "/dashboard/my-parcels",
    },
    {
      name: "Pricing",
      route: "pricing",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const links = (
    <>
      {linksData.map((name) => {
        return (
          <li key={name.name}>
            <NavLink
              to={name.route}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 md:text-lg transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground hover:text-primary/80"
                }`
              }
            >
              {name.name}
            </NavLink>
          </li>
        );
      })}
    </>
  );

  const handleLogout = () => {
    logOut().then((_) => {
      toast.success("Log out Success!");
      navigate("/");
    });
  };

  return (
    <div className="py-4 border-b relative">
      <Container>
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </div>

          {/* Logo */}
          <img className="md:w-44 w-32" src="/logo.png" alt="logo" />

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-6 font-semibold">{links}</ul>

          {/* Buttons */}
          <div className="flex gap-2">
            {user ? (
              <Button onClick={handleLogout}>Log Out</Button>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant="outline">Login</Button>
                </Link>
                <Button className={"hidden md:block"}>Be a rider</Button>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full lg:hidden w-72 bg-background shadow-lg transform transition-transform duration-300 flex flex-col justify-between p-6 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <img className="w-32" src="/logo.png" alt="logo" />
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Nav Links */}
            <ul className="flex flex-col gap-2  font-semibold">{links}</ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-6">
            {user ? (
              <Button onClick={handleLogout}>Log Out</Button>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Login
                  </Button>
                </Link>
                <Button onClick={() => setIsOpen(false)}>Be a rider</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
