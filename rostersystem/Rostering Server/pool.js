require(`dotenv`).config({ path: `./process.env` })
const sql = require(`mysql2`)


const connection = sql.createPool(
    {
        database: `myDB`,
        host: `localhost`,
        waitForConnections: true,
        queueLimit: 0,
        connectionLimit: 10,
        user: `root`,
        password: `Bravo2024`
    }
)

module.exports = connection