import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const accent = "#b5f277";

  return (
    <div className="min-h-screen relative bg-[#07090a] text-gray-200 px-4 sm:px-6">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-0 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start mt-14 md:mt-20">
          <div className="mt-4 md:mt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              Finora — Take full control of your money
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-xl">
              Track expenses, set budgets, and get AI-powered insights that help
              you spend smarter and save more. Secure, private, and built to
              grow with your life.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-[#b5f277] hover:bg-[#9fd063] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition font-bold"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 border border-[#b5f277] text-[#b5f277] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#0f1416] transition font-bold"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end self-stretch">
            {/* Compact dashboard panel replacing phone mockup */}
            <div className="w-full max-w-[18rem] sm:max-w-[21.6rem] md:w-[21.6rem] h-full rounded-3xl bg-gradient-to-b from-[#0b0f12] to-[#0f1416] p-3 sm:p-4 shadow-2xl border border-[#111318]">
              <div className="w-full rounded-2xl bg-[#0b0f12] p-3 sm:p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: accent }}
                    >
                      Finora
                    </div>
                    <div className="text-xs text-gray-400">Overview</div>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    $2,408.45
                  </div>
                </div>

                <div className="rounded-lg bg-[#0d1112] p-2 sm:p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Total Balance</div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: accent }}
                      >
                        $2,408.45
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Saved</div>
                      <div
                        className="text-lg font-semibold"
                        style={{ color: accent }}
                      >
                        $75
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-3">
                  <div className="flex items-center justify-between p-2 sm:p-2 rounded bg-[#0f1416]">
                    <div>
                      <div className="text-sm font-medium">PASHABANK USD</div>
                      <div className="text-xs text-gray-400">Checking</div>
                    </div>
                    <div className="text-sm font-semibold">$425.35</div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#0f1416]">
                    <div>
                      <div className="text-sm font-medium">Cash USD</div>
                      <div className="text-xs text-gray-400">Wallet</div>
                    </div>
                    <div className="text-sm font-semibold">$600</div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#0f1416]">
                    <div>
                      <div className="text-sm font-medium">LEOBANK EUR</div>
                      <div className="text-xs text-gray-400">Savings</div>
                    </div>
                    <div className="text-sm font-semibold">$775</div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-xs text-gray-400 mb-2">Recent</div>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between p-2 rounded bg-[#0f1416]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1f2930] flex items-center justify-center text-sm">
                          🍔
                        </div>
                        <div>
                          <div className="text-sm">Lunch</div>
                          <div className="text-xs text-gray-400">Today</div>
                        </div>
                      </div>
                      <div className="text-sm text-red-400">-$12.50</div>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded bg-[#0f1416]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1f2930] flex items-center justify-center text-sm">
                          🚌
                        </div>
                        <div>
                          <div className="text-sm">Transport</div>
                          <div className="text-xs text-gray-400">Yesterday</div>
                        </div>
                      </div>
                      <div className="text-sm text-red-400">-$3.20</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="max-w-6xl mx-auto px-0 sm:px-0 md:px-0 py-12 sm:py-16">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center">
              All the tools you need
            </h3>
            <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl text-center">
              Everything built to help you understand and improve your finances.
            </p>
          </div>
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-lg bg-[#0d1112]">
              <div
                className="text-xl font-semibold text-center"
                style={{ color: accent }}
              >
                Expense Tracking
              </div>
              <p className="mt-2 text-gray-400 text-center">
                Log expenses in seconds and categorize them automatically.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-[#0d1112]">
              <div
                className="text-xl font-semibold text-center"
                style={{ color: accent }}
              >
                Budgeting
              </div>
              <p className="mt-2 text-gray-400 text-center">
                Create budgets, get alerts, and see where your money goes.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-[#0d1112]">
              <div
                className="text-xl font-semibold text-center"
                style={{ color: accent }}
              >
                Insights & Reports
              </div>
              <p className="mt-2 text-gray-400 text-center">
                Visualize trends and receive personalized saving tips.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-[#0d1112]">
              <div
                className="text-xl font-semibold text-center"
                style={{ color: accent }}
              >
                Secure by Design
              </div>
              <p className="mt-2 text-gray-400 text-center">
                Your data is encrypted and never shared without your consent.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-[#0d1112]">
              <div
                className="text-xl font-semibold text-center"
                style={{ color: accent }}
              >
                Multi-currency
              </div>
              <p className="mt-2 text-gray-400 text-center">
                Support for multiple accounts and currencies.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-[#0d1112]">
              <div
                className="text-xl font-semibold text-center"
                style={{ color: accent }}
              >
                Easy Import
              </div>
              <p className="mt-2 text-gray-400 text-center">
                Import transactions from banks and CSV files quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Distinct Section: Financial Wellness */}
      <section className="py-12 sm:py-2f4">
        <div className="max-w-6xl mx-auto px-0 sm:px-0 md:px-0 flex flex-col items-center">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center">
            Your Financial Wellness, Simplified
          </h3>
          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-2xl text-center">
            Stay motivated on your journey to financial freedom. Get
            personalized tips, track your progress, and celebrate your wins—all
            in one place.
          </p>
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center">
            <div className="flex-1 flex flex-row items-center bg-[#0d1112] rounded-lg p-4 sm:p-6 shadow-lg mb-6 md:mb-0">
              <div>
                <div
                  className="text-xl font-semibold mb-1 text-center"
                  style={{ color: accent }}
                >
                  Set & Achieve Goals
                </div>
                <p className="text-gray-400 text-center">
                  Define savings targets and track your progress visually.
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-center bg-[#0d1112] rounded-lg p-4 sm:p-6 shadow-lg mb-6 md:mb-0">
              <div>
                <div
                  className="text-xl font-semibold mb-1 text-center"
                  style={{ color: accent }}
                >
                  Visualize Growth
                </div>
                <p className="text-gray-400 text-center">
                  See your financial journey with beautiful charts and insights.
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-center bg-[#0d1112] rounded-lg p-4 sm:p-6 shadow-lg">
              <div>
                <div
                  className="text-xl font-semibold mb-1 text-center"
                  style={{ color: accent }}
                >
                  AI Recommendations
                </div>
                <p className="text-gray-400 text-center">
                  Get smart, actionable tips tailored to your habits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
