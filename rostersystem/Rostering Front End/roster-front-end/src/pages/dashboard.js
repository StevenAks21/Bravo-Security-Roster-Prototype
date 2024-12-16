import React from "react";
import { Link } from "react-router-dom";
import "../style/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <p className="dashboard-welcome">Welcome to the Dashboard. Please select an option:</p>
                <div className="dashboard-buttons">
                    <Link to="/dashboard/employees">
                        <button className="dashboard-btn">Employees</button>
                    </Link>
                    <Link to="/dashboard/rosters">
                        <button className="dashboard-btn">Rosters</button>
                    </Link>
                    <Link to="/">
                        <button className="dashboard-btn">Log Out</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
