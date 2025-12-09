import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/Router.jsx";
import "aos/dist/aos.css";
import Aos from "aos";
import Authprovider from "./context/authContext/Authprovider";

Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist">
      <Authprovider>
        <RouterProvider router={router} />
      </Authprovider>
    </div>
  </StrictMode>
);
