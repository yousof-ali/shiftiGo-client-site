import React from "react";
import { cn } from "@/lib/utils"; 
const Container = ({ children, className }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-3", className)}>
      {children}
    </div>
  );
};

export default Container;

