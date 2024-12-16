const router = require(`express`).Router()
const express = require(`express`)
const connection = require(`../pool.js`)
const moment = require(`moment`)
const authentication = require(`../middleware/authentication.js`)



router.get(`/all`, authentication, express.json(), (request, respond) => {
    connection.query(`SELECT * FROM rosters`, (err, result, field) => {

        const formattedResult = result.map(rosters => {

            const start_time = moment(rosters.start_time, `YYYY-MM-DD HH:mm:ss`)
            const end_time = moment(rosters.end_time, `YYYY-MM-DD HH:mm:ss`)
            return {
                employee_id: rosters.employee_id,
                start_time: start_time.format(`YYYY-MM-DD HH:mm:ss`),
                end_time: end_time.format(`YYYY-MM-DD HH:mm:ss`)
            }
        })
        respond.status(200).json({ error: false, results: formattedResult })
    })

})

router.post(`/add`, authentication, express.json(), (request, respond) => {
    const selectQuery = `SELECT * FROM employees WHERE employee_id = (?)`


    if (!request.body.employee_id || !request.body.start_time || !request.body.end_time) {
        let jsonResponse = { error: true, message: `body must have employee_id, start_time and end_time!` }
        return respond.status(400).json(jsonResponse)
    }
    const employee_id = request.body.employee_id
    const start_time = moment(request.body.start_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)
    const end_time = moment(request.body.end_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)

    connection.query(selectQuery, [employee_id], (err, results, fields) => {
        if (err) {
            return respond.status(500).json({ error: true, message: err.message })
        }

        if (results.length === 0) {
            let jsonResponse = { error: false, message: `no employees were found with id ${employee_id} please add employee first` }
            return respond.status(404).json(jsonResponse)
        }
        else {
            const addQuery = `INSERT INTO ROSTERS VALUES (?, ?, ?)`
            connection.query(addQuery, [employee_id, start_time, end_time], (err, results, fields) => {
                if (err) {
                    let jsonResponse = { error: true, message: err.message }
                    return respond.status(500).json(jsonResponse)
                }
                else {
                    let jsonResponse = { error: false, message: `Successfully added roster for employee with employee id ${employee_id}` }
                    return respond.status(200).json(jsonResponse)
                }
            })
        }
    })
})


router.delete(`/delete`, authentication, express.json(), (request, respond) => {

    if (!request.body.employee_id || !request.body.start_time || !request.body.end_time) {
        let jsonResponse = { error: true, message: `employee_id, start_time, end_time cant be empty!` }
        return respond.status(400).json(jsonResponse)
    }
    else {
        const employee_id = request.body.employee_id
        const start_time = moment(request.body.start_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)
        const end_time = moment(request.body.end_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)

        const selectQuery = `SELECT * FROM rosters WHERE employee_id = (?) AND start_time = (?) AND end_time = (?)`

        connection.query(selectQuery, [employee_id, start_time, end_time], (err, results, fields) => {
            if (err) {
                let jsonResponse = { error: true, message: err.message }
                return respond.status(500).json(jsonResponse)
            }

            if (results.length === 0) {
                let jsonResponse = {
                    error: false, message: `No rosters were found for for employee id ${employee_id} with start time ${start_time}, and end time ${end_time}`
                }
                return respond.status(400).json(jsonResponse)
            }

            else {
                const deleteQuery = `DELETE FROM rosters WHERE employee_id = (?) AND start_time = (?) AND end_time = (?)`
                connection.query(deleteQuery, [employee_id, start_time, end_time], (err, results, fields) => {
                    if (err) {
                        let jsonResponse = { error: true, message: err.message }
                        return respond.json(500).json(jsonResponse)
                    }
                    else {
                        let jsonResponse = {
                            error: false, message: `successfully deleted a roster for employee with employee_id ${employee_id}, start_time ${start_time} and end_time ${end_time}`
                        }
                        return respond.status(200).json(jsonResponse)
                    }
                })
            }
        })
    }
})

router.put(`/update`, authentication, express.json(), (request, respond) => {
    if (!request.body.employee_id || !request.body.start_time || !request.body.end_time ||
        !request.body.old_start_time || !request.body.old_end_time) {

        let jsonResponse = { error: true, message: `employee_id, start_time, end_time, old_end_time, or old_start_time cant be empty!` }
        return respond.status(400).json(jsonResponse)

    }
    else {
        const employee_id = request.body.employee_id
        const start_time = moment(request.body.start_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)
        const end_time = moment(request.body.end_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)
        const old_start_time = moment(request.body.old_start_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)
        const old_end_time = moment(request.body.old_end_time, `YYYY-MM-DD HH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`)

        const updateQuery = `UPDATE rosters SET start_time = (?), end_time = (?) WHERE employee_id = (?) AND start_time = (?) AND end_time = (?)`

        connection.query(updateQuery, [start_time, end_time, employee_id, old_start_time, old_end_time], (err, results, fields) => {
            if (err) {
                let jsonResponse = { error: true, message: err.message }
                return respond.status(500).json(jsonResponse)
            }
            else {
                if (results.affectedRows === 0) {
                    let jsonResponse = { error: false, message: `no rosters were found for employee with employee_id ${employee_id} with start_time ${start_time} and end_time ${end_time}` }
                    return respond.status(400).json(jsonResponse)
                }
                else {
                    let jsonResponse = { error: false, message: `successfully updated roster for employee with employee_id ${employee_id}` }
                    return respond.status(200).json(jsonResponse)
                }
            }
        })
    }
})

module.exports = router


