import express from 'express'
import dotenv from 'dotenv'
import ConnectDb from './config/db.js'

dotenv.config()

//Routes
import userRoutes from './routes/userRoutes.js'

const app = express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const PORT = process.env.PORT || 4000;
ConnectDb();


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`Server is running ${PORT}`))