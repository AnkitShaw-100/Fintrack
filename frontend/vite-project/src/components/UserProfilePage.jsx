import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("fintrack_token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://fintrack-backend-olive.vercel.app/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          throw new Error("Failed to parse response");
        }

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch user profile");
        }

        setUser(data.user);
      } catch (err) {
        setError(err.message || "Network error");
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
          <p className="mt-1 text-gray-600">
            View and edit your account details
          </p>
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
            type="button"
            className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
            aria-label="Edit Profile"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
