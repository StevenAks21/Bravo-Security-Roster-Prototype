import { Link } from "react-router-dom";
import { getToken } from "../../auth/auth";
import { useState } from "react";

function RemoveEmployees() {
    const token = getToken();
    const [id, setId] = useState(``);
    const [message, setMessage] = useState(``);

    async function removeFromDatabase() {
        setMessage(``)
        if (!id) {
            setMessage(`Employee ID can't be empty!`);
        } else {
            if (/^\d+$/.test(id)) {
                const removeUrl = `http://localhost:3001/employees/delete`;
                const args = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "Application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ employee_id: id }),
                };
                try {
                    const response = await fetch(removeUrl, args);
                    const data = await response.json();
                    setMessage(data.message || "Employee removed successfully!");
                } catch (error) {
                    setMessage("An error occurred while removing the employee.");
                }
            } else {
                setMessage(`ID can't have alphabets inside them.`);
            }
        }
    }

    return (
        <div>
            {message && <p>{message}</p>}
            <input onChange={(e) => setId(e.target.value)} placeholder="Enter Employee ID" />
            <button onClick={removeFromDatabase}>Remove Employee</button>
            <Link to = "/dashboard/employees">
                <button>Back</button>
            </Link>
        </div>
    );
}

export default RemoveEmployees;
