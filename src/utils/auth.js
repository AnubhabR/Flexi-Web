export const logout = (navigate) => {
  try {
    // Clear all localStorage items
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    // Clear sessionStorage as well if used
    sessionStorage.clear();

    // Clear any cookies if used (optional)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Navigate to login
    navigate("/login");

    // Optional: Reload the page to ensure complete state reset
    // window.location.reload();
  } catch (error) {
    console.error("Error during logout:", error);
    // Force navigation even if there's an error
    navigate("/login");
  }
};
