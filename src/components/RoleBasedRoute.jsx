import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import TeacherDashboard from "../TeacherDashboard";
import StudentDashboard from "../StudentDashboard";

const RoleBasedRoute = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.role);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return userRole === "teacher" ? <TeacherDashboard /> : <StudentDashboard />;
};

export default RoleBasedRoute;
