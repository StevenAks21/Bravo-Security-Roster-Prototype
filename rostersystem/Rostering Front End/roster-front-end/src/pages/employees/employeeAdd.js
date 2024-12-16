
import { Link } from "react-router-dom";
import { getToken } from "../../auth/auth";
import { useState } from "react";


function AddEmployees() {
    const token = getToken();
    const [firstName, setFirstName] = useState(``)
    const [lastName, setLastName] = useState(``)
    const [message, setMessage] = useState(``)

    async function addToDatabase() {
        setMessage(``)
        if (!firstName || !lastName) {
            setMessage(`first name and last name cant be empty`)
        }

        else {
            const addUrl = `http://localhost:3001/employees/add`
            const args = { method: `POST`, headers: { "Content-Type": "Application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify({ first_name: firstName, last_name: lastName }) }
            let response = await fetch(addUrl, args)
            let data = await response.json()
            console.log(data)
        }
    }

    return (
        <div>
            {message.length === 0 ? <></> : <p>{message}</p>}
            <p>first name is {firstName.length === 0 ? <>Empty</> : firstName}</p>
            <input onChange={(e) => setFirstName(e.target.value)}></input>
            <p>last name is {lastName.length === 0 ? <>Empty</> : lastName}</p>
            <input onChange={(e) => setLastName(e.target.value)}></input>
            <button onClick={addToDatabase}>Add</button>
            <Link to="/dashboard/employees">
                <button>Back</button>
            </Link>
        </div>
    )
}

export default AddEmployees;
