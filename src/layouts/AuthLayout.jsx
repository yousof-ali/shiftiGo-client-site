import Container from "@/components/shared/Container";
import React from "react";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <Container>
      <div className="inline-block py-4">
        <Link to={"/"}>
          <img className="w-44 cursor-pointer" src="/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="min-h-[80vh] flex flex-col justify-center ">
        <div className="flex  gap-6 items-center">
          {/* form div  */}
          <div className="flex-1 ">
            <Outlet></Outlet>
          </div>

          {/* image div  */}
          <div className="flex-1 hidden md:flex ">
            <img src="/loginImage.png" alt="" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuthLayout;
