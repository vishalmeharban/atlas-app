import React from "react";
import Header from "./HeaderFooter/Header";
import Footer from "./HeaderFooter/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
