import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import UserProfilePage from "./components/UserProfilePage.jsx";
import Docs from "./components/Docs.jsx";
import Layout from "./components/Layout.jsx";

import { UserProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />

        <Route
          path="/docs"
          element={
            <Layout>
              <Docs />
            </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("fintrack_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
