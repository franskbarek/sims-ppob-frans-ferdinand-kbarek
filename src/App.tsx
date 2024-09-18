import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuthCheck } from "./utils/useAuthCheck";
import Header from "./components/layouts/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TopUp from "./pages/TopUp";
import Payment from "./pages/Payment";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import CircularIndeterminate from "./utils/CircularIndeterminate";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topup"
          element={
            <ProtectedRoute>
              <TopUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { loading, error } = useAuthCheck();

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center">
  //       <CircularIndeterminate />
  //     </div>
  //   );
  // }

  if (error) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated } = useAuthCheck();

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center">
  //       <CircularIndeterminate />
  //     </div>
  //   );
  // }

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
