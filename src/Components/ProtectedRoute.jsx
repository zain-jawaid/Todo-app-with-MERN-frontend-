import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // or use your own auth check

  if (!isAuthenticated) {
    return <Navigate to="/signin" />; // Redirect to SignIn page if not authenticated
  }

  return children; // If authenticated, render the children (i.e., /todo)
};

export default ProtectedRoute;
