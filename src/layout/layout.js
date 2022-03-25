import Navbar from "../components/navbar";
import React from "react";
export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
