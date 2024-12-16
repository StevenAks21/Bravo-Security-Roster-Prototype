import React from "react";
import { getToken } from "./auth";
import { Link } from "react-router-dom";
import "../style/Auth.css"

function RequireAuth({ children }) {
  const token = getToken();

  // Redirect to login if no token is found
  if (!token) {
    return <div>

      <p id="unauthorizedMessage">Unauthorized, Please Login First.</p>
      <Link to="/">
        <button className="dashboard-btn">Login</button>
      </Link>

    </div>;
  }

  return children; // Render children if authorized
}

export default RequireAuth;
