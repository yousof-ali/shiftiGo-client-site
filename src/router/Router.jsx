import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Auth/Login/Login";
import SignUp from "@/pages/Auth/Sign-up/SignUp";
import Coverage from "@/pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"/coverage",
        Component:Coverage
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
    ],
  },
]);
