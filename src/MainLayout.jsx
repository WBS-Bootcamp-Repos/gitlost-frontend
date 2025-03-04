import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 via-teal-100 to-teal-200">
      <Header />
      <main className="flex-grow p-8 bg-white shadow-lg rounded-3xl mt-4 mx-auto w-full max-w-7xl">
        {/* This will render the child routes */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
