import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { user, singInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    singInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        
        // Check if location state exists and has a 'from' property
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      })
      .catch((err) => {
        console.log(err.message);
        // You might want to show an error message to the user here
        alert("Login failed: " + err.message);
      });
  };

  return (
    <div>
      <form
        className="max-w-sm w-full mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8">
          Welcome Back!
        </h2>
        <div className="flex flex-col gap-1">
          <label className="label">Email</label>
          <input
            type="email"
            className="p-3 rounded-md   border"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        {errors.email?.type === "required" && (
          <p className="text-xs text-red-600">Email is required!</p>
        )}

        <div className="flex flex-col gap-1">
          <label className="label mt-3">Password</label>
          <input
            type="password"
            className=" p-3 text-base rounded-md border"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-xs text-red-600">Password is required!!</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-xs text-red-600">
              Password will be more than 6 character!!
            </p>
          )}
        </div>
        <div className="mt-2">
          <a className="link link-hover ">Forgot password?</a>
        </div>

        <Button className={"w-full mt-6 py-6"}>Log In</Button>
      </form>

      <div className="sm:max-w-sm  w-full mx-auto">
        <p className="teaxt-sm mt-6">
          Create a Account{" "}
          <Link to={"/sign-up"} className="btn btn-link ">
            Sign Up
          </Link>
        </p>
        <SocialLogin location={location} />
      </div>
    </div>
  );
};

export default Login;