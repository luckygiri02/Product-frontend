import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [auth, setAuth] = useState({ email: "", role: "" });

  // If not logged in, only show Login and Register routes
  if (!auth.role) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register />} />
          {/* Redirect any other route to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  // If logged in, show the full app routes with nav
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <button onClick={() => setAuth({ email: "", role: "" })}>Logout</button> |{" "}
        
        {auth.role === "admin" && <Link to="/admin">Admin Panel</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm auth={auth} />} />
        <Route path="/edit/:id" element={<ProductForm auth={auth} editMode />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminPanel auth={auth} />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
