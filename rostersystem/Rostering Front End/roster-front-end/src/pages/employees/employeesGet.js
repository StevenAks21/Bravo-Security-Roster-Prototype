import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../auth/auth";
import "../../style/getEmployees.css"; // Import the CSS file

function GetEmployees() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const token = getToken();

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const fetchUrl = `http://localhost:3001/employees/all`;
                const args = {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                };
                const response = await fetch(fetchUrl, args);
                const result = await response.json();

                if (result.error) {
                    setError(result.error);
                } else {
                    setEmployees(result.result);
                }
            } catch (err) {
                setError("An error occurred while fetching employees.");
            }
        }

        fetchEmployees();
    }, [token]);

    return (
        <div className="employees-container">
            <div className="employee-list">
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    employees.map((employee) => (
                        <div key={employee.employee_id} className="employee-card">
                            <h3 className="employee-name">
                                {employee.first_name} {employee.last_name}
                            </h3>
                            <p className="employee-id">ID: {employee.employee_id}</p>
                        </div>
                    ))
                )}
            </div>
            <Link to="/dashboard/employees">
                <button className="back-button">Go Back</button>
            </Link>
        </div>
    );
}

export default GetEmployees;
