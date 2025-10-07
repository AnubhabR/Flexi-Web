import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import TeacherDashboard from "../TeacherDashboard";
import StudentDashboard from "../StudentDashboard";
import AdminDashboard from "../AdminDashboard";

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

          console.log("Full data from API:", userData);
          console.log("Role received:", userData.role);

          const roleFromAPI = userData.role;
          setUserRole(roleFromAPI ? roleFromAPI.trim().toLowerCase() : null);
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

  if (userRole === "student") {
  return <StudentDashboard />;
} else if (userRole === "teacher") {
  return <TeacherDashboard />;
} else if (userRole === "admin") {
  return <AdminDashboard />;
} else {
  return <Navigate to="/login" />;
}
};

export default RoleBasedRoute;
