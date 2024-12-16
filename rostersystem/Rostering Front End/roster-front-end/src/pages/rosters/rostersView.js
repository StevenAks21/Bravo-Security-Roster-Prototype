import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../auth/auth";
import { useState } from "react";

function RostersView() {
    const [rosters, setRosters] = useState(``)
    const token = getToken()

    async function getRosters() {
        const getUrl = `http://localhost:3001/rosters/all`
        const args = {
            method: "GET",
            headers: { "Content-Type": "Application/json", Authorization: `Bearer ${token}` }
        }
        const response = await fetch(getUrl, args)
        const data = await response.json()

        console.log(data.results.length)

        setRosters(data)

    }
    return (
        <div>
            <button onClick={getRosters}>Get Rosters</button>
            <Link to="/dashboard/rosters">
                <button>Back</button>
            </Link>
        </div>
    );
}

export default RostersView;
