import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet>
      </Outlet>
      <Footer />
    </div>
  );
};

export default RootLayout;
