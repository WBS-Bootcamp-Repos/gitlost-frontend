import React from "react";

const Footer = () => {
    return (
        <footer className="bg-primary text-white p-6 mt-4">
            <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row text-center">
                <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl font-bold">My Blog</h3>
                    <p className="text-s">
                        Your daily dose of insights and stories.
                    </p>
                </div>

                <p className="text-s mt-4 sm:mt-0">
                    &copy; 2025 My Blog. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
