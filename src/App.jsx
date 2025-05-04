import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./Components/Todo";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
    <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Todo App</h1>
      <Routes>
        <Route path="/"  element={<SignUp />} />
        <Route path="/signup"  element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Route for /todo */}
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


