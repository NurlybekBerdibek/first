require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path')
const app = express()

const PORT = process.env.PORT || 8000


app.use(cors())
app.use(express.json())
app.use(require('./routes/authRouter'))
app.use(require('./routes/postRouter'))



const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A Express ",
		},
		servers: [
			{
				url: "http://localhost:8000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



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
