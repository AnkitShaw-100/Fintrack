import React from "react";

const Home = () => {
    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-100 px-4">
            <div className="max-w-2xl text-center">
                <h1 className="text-4xl font-extrabold text-gray-600 sm:text-5xl">
                    Welcome to <span className="text-green-600">FinTrack</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Track your expenses, manage your budget, and take control of your finances.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="/signup"
                        className="rounded-lg bg-green-600 px-6 py-3 text-white font-medium shadow-md transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                    >
                        Get Started
                    </a>
                    <a
                        href="/login"
                        className="rounded-lg border border-green-600 px-6 py-3 text-green-600 font-medium shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
