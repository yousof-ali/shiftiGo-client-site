import Container from "@/components/shared/Container";
import React from "react";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center ">
        <div className="inline-block">
          <Link to={"/"}>
            <img className="w-54 cursor-pointer" src="/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="flex  items-center">
          {/* form div  */}
          <div className="flex-1">
            <Outlet></Outlet>
          </div>

          {/* image div  */}
          <div className="flex-1">
            <img src="/loginImage.png" alt="" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuthLayout;
