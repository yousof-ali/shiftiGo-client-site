import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Auth/Login/Login";
import SignUp from "@/pages/Auth/Sign-up/SignUp";
import Coverage from "@/pages/Coverage/Coverage";
import SendParcel from "@/pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute";
import Myparcel from "@/pages/Dashboard/Myparcel";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHome from "@/pages/Dashboard/Home";
import Payment from "@/pages/Dashboard/payment/Payment";
import TransactionHistory from "@/pages/Dashboard/TransactionHistory";
import TrackParcel from "@/pages/Dashboard/TrackParcel";

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
        path: "coverage",
        Component: Coverage,
      },

      {
        path: "sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "sign-up",
        Component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-parcels",
        Component: Myparcel,
      },
      {
        path:"payment/:id",
        Component:Payment
      },
      {
        path:"transaction-history",
        Component:TransactionHistory
      },
      {
        path:"track-parcel",
        Component:TrackParcel
      }
    ],
  },
]);
