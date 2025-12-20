import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex pt-18 min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="max-w-2xl text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
                    Welcome to <span className="text-green-600">FinTrack</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Track your expenses, manage your budget, and take control of your finances.
                </p>

                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <Link
                        to="/signup"
                        className="rounded-lg bg-green-600 px-6 py-3 text-white font-medium shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="rounded-lg border-2 border-green-600 px-6 py-3 text-green-600 font-medium shadow-sm transition hover:bg-green-50 hover:border-green-700 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
