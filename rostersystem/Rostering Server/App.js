require(`dotenv`).config({ path: `./process.env` })
const express = require(`express`)
const employeesRoute = require(`./routes/employees.js`)
const rostersRoute = require(`./routes/rosters.js`)
const userRoute = require(`./routes/user.js`)
const cors = require('cors');

const app = express()

app.use(cors())

app.use(`/employees`, employeesRoute)

app.use(`/rosters`, rostersRoute)

app.use(`/user`, userRoute)

app.use((req, res) => {
    res.status(404).json({ error: true, message: `route does not exist` })
})

app.listen(3001)