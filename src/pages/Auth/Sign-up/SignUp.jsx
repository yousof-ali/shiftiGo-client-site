import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import toast from "react-hot-toast";

const SignUp = () => {
  const { user, createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((res) => {
        toast.success("Account create successfully!")
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <form
        className="max-w-sm w-full mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8">
          Create Your Account!
        </h2>
        <div className="flex flex-col mb-3 gap-1">
          <label className="label">Name</label>
          <input
            type="text"
            className="p-3 rounded-md   border"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>

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
        <Button className={"w-full mt-6 py-6"}>Sign Up</Button>
      </form>

      <div className="max-w-sm w-full mx-auto">
        <p className="teaxt-sm mt-3">
          Already have an Account{" "}
          <Link to={"/login"} className="btn btn-link ">
            Log In
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default SignUp;
