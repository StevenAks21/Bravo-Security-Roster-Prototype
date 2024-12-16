require(`dotenv`).config({ path: `../process.env` })
const router = require(`express`).Router()
const express = require(`express`)
const connection = require(`../pool.js`)
const authentication = require(`../middleware/authentication.js`)



router.get(`/all`, authentication, (req, res) => {
    connection.query(`SELECT * FROM employees`, (err, results, fields) => {
        if (results.length === 0) {
            const response = { error: false, message: `No employees were found` }
            res.status(200).json(response)
        }
        else {
            const response = { error: false, result: results }
            res.status(200).json(response)
        }
    })
})

router.post(`/add`, authentication, express.json(), (req, res) => {
    const query = `INSERT INTO employees (first_name, last_name) values (?, ?)`

    if (!req.body.first_name || !req.body.last_name || req.body.first_name === `` || req.body.last_name === ``) {
        const message = { error: true, message: `error with request body, first name and last name cant be empty` }
        return res.status(400).json(message)
    }
    connection.query(query, [req.body.first_name, req.body.last_name], (err, results, fields) => {
        if (err) {
            const message = { error: true, message: `failed to add employee into database.` }
            return res.status(400).json(message)
        }
        else {
            const message = {
                error: false, message: `successfully added employee with first name ${req.body.first_name} and last name ${req.body.last_name}`
            }
            return res.status(200).json(message)
        }
    })
})

router.delete(`/delete`, authentication, express.json(), (req, res) => {
    const selectQuery = `SELECT * FROM employees WHERE employee_id = (?)`

    if (!req.body.employee_id || req.body.employee_id === ``) {
        const message = { error: true, message: `employee_id cant be empty` }
        return res.status(400).json(message)
    }


    connection.query(selectQuery, [req.body.employee_id], (err, results, fields) => {

        if (err) {
            const message = { error: true, message: `error with database query` }
            return res.status(400).json(message)
        }
        if (results.length === 0) {
            const message = { error: true, message: `employee with id ${req.body.employee_id} was not found` }
            return res.status(404).json(message)
        }
        else {
            const query = `DELETE FROM employees WHERE employee_id = (?)`

            connection.query(query, [req.body.employee_id], (err, results, fields) => {
                if (err) {
                    const message = { error: true, message: `failed to delete employee from database.` }
                    res.status(500).json(message)
                }
                else {
                    const message = { error: false, message: `successfully deleted employee with id ${req.body.employee_id}` }
                    res.status(200).json(message)
                }
            })

        }
    })
})


module.exports = router