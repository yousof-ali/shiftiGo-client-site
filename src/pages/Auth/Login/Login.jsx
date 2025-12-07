import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form className="max-w-sm w-full mx-auto"  onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8">Welcome Back!</h2>
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
            className=" p-3 rounded-md border"
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
    </div>
  );
};

export default Login;
