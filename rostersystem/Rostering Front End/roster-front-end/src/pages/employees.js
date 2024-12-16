import React from "react";
import { Link } from "react-router-dom";
import "../style/employees.css";

function Employees() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <p className="dashboard-welcome">Employees</p>
                <div className="dashboard-buttons">
                    <Link to="/dashboard/employees/get">
                        <button className="dashboard-btn">Get All Employees</button>
                    </Link>
                    <Link to="/dashboard/employees/add">
                        <button className="dashboard-btn">Add Employee</button>
                    </Link>
                    <Link to="/dashboard/employees/remove">
                        <button className="dashboard-btn">Remove Employee</button>
                    </Link>
                    <Link to="/dashboard">
                        <button className="dashboard-btn">Back to dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Employees;
