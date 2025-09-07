import React from "react";

const UserProfilePage = () => {
  // Replace with actual user data from context or props
  const user = {
    name: "John Doe",
    email: "johndoe@example.com"
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-600">User Profile</h2>
          <p className="mt-1 text-gray-600">View and edit your account details</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-4 text-gray-600">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-8 text-center">
          <button
            className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
