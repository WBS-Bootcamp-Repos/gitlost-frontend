import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen ">
            <Header />
            <main className="flex-grow">
                {/* This will render the child routes */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
