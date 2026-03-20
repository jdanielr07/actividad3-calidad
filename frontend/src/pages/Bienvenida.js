import { useEffect } from "react";

function Bienvenida() {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include"
      });
    } finally {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/auth-check", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.auth) {
          window.location.href = "/";
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Bienvenido</h1>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  );
}

export default Bienvenida;