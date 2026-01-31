import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import toast from "react-hot-toast";
import { Image } from "lucide-react";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase.init";
import usePublicApi from "@/hooks/usePublicApi";

const SignUp = () => {
  const { createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [imgUrl, setImageUrl] = useState("");
  const publicApi = usePublicApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: imgUrl,
        }).then(async (_) => {
          try {
            const userInfo = {
              name: data.name,
              email: data.email,
              role: "user",
              createdAt: new Date().toISOString(),
              lastLogIn: new Date().toISOString(),
            };
            const res = await publicApi.post('/user',userInfo);
            console.log(res);
            toast.success("Account create successfully!");
            navigate(location?.state ? location.state : "/");
          } catch (err) {
            console.log(err);
          }
          
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData,
      );
      console.log(res.data.data.url);
      setImageUrl(res.data.data.url);
    }
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
          {errors.name?.type === "required" && (
            <p className="text-xs text-red-600">Name is required!</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Email</label>
          <input
            type="email"
            className="p-3 rounded-md   border"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-xs text-red-600">Email is required!</p>
          )}
        </div>

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

        {/* Profile Picture */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="label">Profile Picture</label>

          <label
            htmlFor="profileImage"
            className=" h-32  border-2 rounded-md border-dashed flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition"
          >
            {imgUrl ? (
              <img
                src={imgUrl}
                alt="Preview"
                className="w-28 h-28 object-cover"
              />
            ) : (
              <span className="text-sm flex flex-col items-center text-gray-400 text-center px-2">
                <Image />
                Click to upload
              </span>
            )}
          </label>

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
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
