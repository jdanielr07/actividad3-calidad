import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Bienvenida from "./pages/Bienvenida";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth-check", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => setIsAuth(data.auth))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return null;
  }

  return isAuth ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/bienvenida"
          element={
            <ProtectedRoute>
              <Bienvenida />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;