require(`dotenv`).config({ path: `../process.env` })
const router = require(`express`).Router()
const express = require(`express`)
const bcrypt = require(`bcrypt`)
const connection = require(`../pool`)
const jwt = require(`jsonwebtoken`)
const SECRET_KEY = process.env.SECRET_KEY

async function hashPassword(password) {
    const saltRound = 10
    try {
        const hash = await bcrypt.hash(password, saltRound)
        return hash
    }
    catch (err) {
        console.log(err)
        return
    }
}


router.post(`/signin`, express.json(), async (request, respond) => {
    if (!request.body.user_name || !request.body.password) {
        let jsonResponse = { error: true, message: `user_name and password can't be empty!` };
        return respond.status(400).json(jsonResponse);
    }
    else {
        const selectQuery = `SELECT password FROM users WHERE username = (?)`;
        const password = request.body.password;
        const username = request.body.user_name;

        try {
            connection.query(selectQuery, [username], async (err, results, fields) => {

                if (results.length === 0) {
                    let jsonResponse = { error: true, message: `Wrong username or password` };
                    return respond.status(400).json(jsonResponse);
                } else {
                    const extractedPassword = results[0].password;

                    const passwordMatch = await bcrypt.compare(password, extractedPassword);
                    if (!passwordMatch) {
                        let jsonResponse = { error: true, message: `Wrong username or password` };
                        return respond.status(400).json(jsonResponse);
                    } else {
                        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: `1h` });
                        let jsonResponse = { error: false, message: `Successfully logged in as ${username}`, token: token };
                        return respond.status(200).json(jsonResponse);
                    }
                }
            });
        } catch (err) {
            console.log(err);
            let jsonResponse = { error: true, message: "Server error" };
            return respond.status(500).json(jsonResponse);
        }
    }
});


module.exports = router
