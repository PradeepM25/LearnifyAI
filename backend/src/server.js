import express from 'express'
import dotenv from 'dotenv'
import ConnectDb from './config/db.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000;
ConnectDb()

app.listen(PORT, () => console.log(`Server is running ${PORT}`))