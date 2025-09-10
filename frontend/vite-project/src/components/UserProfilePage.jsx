import React, { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("fintrack_token");
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-600">User Profile</h2>
          <p className="mt-1 text-gray-600">View and edit your account details</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : user ? (
          <div className="space-y-4 text-gray-600">
            <div>
              <span className="font-semibold">Name:</span> {user.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {user.email}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No user data found.</div>
        )}

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
