"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLogin from "../components/admin/AdminLogin";
import MenuDashboard from "../components/admin/MenuDashboard";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on load
    const adminToken = localStorage.getItem("admin_token");
    if (adminToken) {
      // In a real app, you would validate the token with the server
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (password: string) => {
    // Simple password check - demo password is 1234
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "admin123" || password === "1234") {
      localStorage.setItem("admin_token", "temp_admin_token");
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord Admin</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
          <MenuDashboard />
        </div>
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
} 