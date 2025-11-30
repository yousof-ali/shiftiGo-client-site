import React from "react";
import Container from "./Container";
import { Link } from "react-router";
import { Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-16 md:py-24">
      <Container>
        <div className="text-gray-700  flex flex-col items-center mx-auto max-w-3xl">
          <img className="md:w-38  w-28" src="/logo.png" alt="logo" />
          <p className="text-center mt-2 text-xs sm:text-sm md:text-base">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <ul className="flex gap-3 text-sm font-semibold sm:text-base lg:gap-4 py-8">
            <li>
              <Link className="hover:text-primary cursor-pointer" to={"/"}>
                Service
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary cursor-pointer" to={"/"}>
                Coverage
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary cursor-pointer" to={"/"}>
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary cursor-pointer" to={"/"}>
                About us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="border-primary pb-2" />
        <div className="flex justify-between items-center">
          <div className=" border-primary/20  text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-primary font-semibold">Profast</span>
            . All rights reserved.
          </div>
          <div className="flex gap-3">
            <Link>
              <Facebook className="hover:text-primary" />
            </Link>
            <Link>
              <Twitter className="hover:text-primary" />
            </Link>
            <Link>
              <Youtube className="hover:text-primary" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
