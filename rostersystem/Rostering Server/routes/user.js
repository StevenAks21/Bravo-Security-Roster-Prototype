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
        let jsonResponse = { error: false, message: `user_name and password cant be empty!` }
        return respond.status(400).json(jsonResponse)
    }
    else {
        const selectQuery = `SELECT password FROM users WHERE username = (?)`
        const password = request.body.password
        const username = request.body.user_name
        try {
            const hashedPassword = await hashPassword(password)
            connection.query(selectQuery, [username], async (err, results, fields) => {
                if (err) {
                    console.error('MySQL error:', err);
                    return respond.status(500).json({ error: true, message: 'Database error' });
                }

                if (!results || results.length === 0) {
                    return respond.status(400).json({ error: false, message: `Wrong username or password` });
                }})
        }

        catch (err) {
            console.log(err)
        }
    }
})

module.exports = router
