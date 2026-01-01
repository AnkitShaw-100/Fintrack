import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black border-t border-[#111318]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0b0f12] border border-[#111318]">
                <span style={{ color: "#b5f277", fontWeight: 800 }}>F</span>
              </div>
              <div>
                <div className="text-white font-semibold">Finora</div>
                <div className="text-xs text-gray-400">
                  Personal finance, made simple.
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Track expenses, set budgets, and get insights that help you save
              and grow — securely and privately.
            </p>
          </div>

          <div className="flex-1 flex justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="hover:text-white">
                    Docs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="hover:text-white">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#111318] pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div>
            © {year} Finora — Built with care for your financial wellbeing.
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-4">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
