import React from "react";
import { Link } from "react-router-dom";

function Rosters() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <p className="dashboard-welcome">Rosters Management</p>
                <div className="dashboard-buttons">
                    <Link to="/dashboard/rosters/view">
                        <button className="dashboard-btn">View All Rosters</button>
                    </Link>
                    <button className="dashboard-btn">Create New Roster</button>
                    <button className="dashboard-btn">Delete Roster</button>
                    <button className="dashboard-btn">Update rosters</button>
                    <Link to="/dashboard">
                        <button className="dashboard-btn">Back to Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Rosters;
