import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import { isAuthenticated } from "./lib/authService";
import { useEffect, useState } from "react";

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsUserAuthenticated(isAuthenticated());
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <section className="w-screen h-screen flex justify-center items-center">
        <h2 className="text-3xl font-semibold">Loading</h2>
      </section>
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isUserAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
