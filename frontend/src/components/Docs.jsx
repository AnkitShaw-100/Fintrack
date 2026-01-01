import React, { useState } from "react";

const faqData = [
  {
    question: "Is Finora free to use?",
    answer:
      "Yes, Finora offers a free plan with all core features. Premium features may be available in the future.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click on 'Forgot password?' to receive a reset link.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. We use industry-standard encryption and never share your data without your permission.",
  },
  {
    question: "Can I import transactions from my bank?",
    answer:
      "Yes, you can securely connect your bank or upload CSV files to import transactions.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out via the Contact link in the footer or email us at support@finora.com.",
  },
  {
    question: "Can I use Finora on mobile devices?",
    answer:
      "Yes, Finora is fully responsive and works great on all modern smartphones and tablets.",
  },
  {
    question: "How do I set a budget?",
    answer:
      "Go to the Budgeting section in your dashboard, click 'Add Budget', and set your desired limits for each category.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes, you can export your transactions and reports as CSV files from the dashboard.",
  },
  {
    question: "What happens if I forget my login email?",
    answer:
      "Contact support with any details you remember, and we’ll help you recover your account.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to your profile settings and select 'Delete Account'. This will permanently remove your data from our servers.",
  },
];

const Docs = () => {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="min-h-screen bg-[#07090a] text-gray-200 flex flex-col items-center px-4 py-20">
      <div className="max-w-6xl w-full p-10">
        <h1 className="text-4xl font-extrabold text-white mb-2 text-center">
          Finora Documentation
        </h1>
        <p className="text-gray-400 mb-8 text-center text-lg">
          Find everything you need to get started, manage your finances, and
          make the most of Finora.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          {/* Getting Started */}
          <div className="bg-[#0d1112] rounded-lg p-8 flex flex-col gap-2 min-h-[220px] justify-center">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <h2 className="text-2xl font-bold text-[#b5f277]">
                Getting Started
              </h2>
            </div>
            <p className="text-gray-300">
              Create your account, set up your profile, and connect your bank
              accounts to start tracking your finances in minutes.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-400 mt-2">
              <li>Sign up with your email and a secure password</li>
              <li>Complete your profile for personalized insights</li>
              <li>Connect your bank or add accounts manually</li>
            </ul>
          </div>

          {/* Managing Expenses */}
          <div className="bg-[#0d1112] rounded-lg p-8 flex flex-col gap-2 min-h-[220px] justify-center">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <h2 className="text-2xl font-bold text-[#b5f277] ">
                Managing Expenses
              </h2>
            </div>
            <p className="text-gray-300">
              Easily log, categorize, and review your expenses. Stay on top of
              your spending with real-time updates and smart suggestions.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-400 mt-2">
              <li>Add expenses manually or import from your bank</li>
              <li>Use categories for better organization</li>
              <li>View monthly and yearly summaries</li>
            </ul>
          </div>

          {/* Budgeting Tips */}
          <div className="bg-[#0d1112] rounded-lg p-8 flex flex-col gap-2 min-h-[220px] justify-center">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <h2 className="text-2xl font-bold text-[#b5f277]">
                Budgeting Tips
              </h2>
            </div>
            <p className="text-gray-300">
              Set budgets for different categories, get alerts when you’re close
              to your limits, and receive AI-powered tips to save more.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-400 mt-2">
              <li>Create monthly or custom budgets</li>
              <li>Track your progress visually</li>
              <li>Get suggestions to optimize your spending</li>
            </ul>
          </div>

          {/* Security & Privacy */}
          <div className="bg-[#0d1112] rounded-lg p-8 flex flex-col gap-2 min-h-[220px] justify-center">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <h2 className="text-2xl font-bold text-[#b5f277]">
                Security & Privacy
              </h2>
            </div>
            <p className="text-gray-300">
              Your data is encrypted and never shared without your consent.
              Learn more about how we keep your information safe.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-400 mt-2">
              <li>End-to-end encryption for all data</li>
              <li>Two-factor authentication support</li>
              <li>Strict privacy policy</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[#0d1112] rounded-lg p-8 w-full mt-2">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <h2 className="text-2xl font-bold text-[#b5f277]">
              Frequently Asked Questions
            </h2>
          </div>
          <ul className="space-y-3 mt-2">
            {faqData.map((faq, idx) => (
              <li key={idx}>
                <button
                  className="w-full text-left flex items-center justify-between py-3 px-4 rounded-lg bg-[#23282c] hover:bg-[#23282c]/80 focus:outline-none transition"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-semibold text-white text-base">
                    {faq.question}
                  </span>
                  <span className="ml-4 text-[#b5f277] text-xl">
                    {openFaq === idx ? "-" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="text-gray-300 text-base px-4 pb-4 pt-2 animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Docs;
