import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#07090a] text-gray-200 flex flex-col items-center px-4 py-20">
      <div className="max-w-6xl w-full p-10">
        <h1 className="text-4xl font-extrabold text-white mb-2 text-center">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: January 1, 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-400 mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Account information (name, email, password)</li>
              <li>Financial data (expenses, budgets, categories)</li>
              <li>Usage data (how you interact with our service)</li>
              <li>Device information (browser type, IP address)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-400 mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and manage your account</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns and optimize user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Data Security
            </h2>
            <p className="text-gray-400">
              We take data security seriously and implement industry-standard
              measures to protect your information. This includes encryption of
              sensitive data, secure authentication protocols, and regular
              security audits. However, no method of transmission over the
              Internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Information Sharing
            </h2>
            <p className="text-gray-400">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mt-3">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-400 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of marketing communications</li>
              <li>Request information about data we hold about you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Cookies and Tracking
            </h2>
            <p className="text-gray-400">
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. Cookies are files
              with a small amount of data that are stored on your device. You
              can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Children's Privacy
            </h2>
            <p className="text-gray-400">
              Our service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-400">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-400">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="mt-3 text-gray-400">
              <p>Email: privacy@finora.com</p>
              <p>Address: 123 Finance Street, Tech City, TC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
