require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 8000


app.use(cors())
app.use(express.json())
app.use(require('./routes/authRouter'))
app.use(require('./routes/postRouter'))




const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
