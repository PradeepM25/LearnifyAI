import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDb from './config/db.js'

dotenv.config()

//Routes
import userRoutes from './routes/userRoutes.js'
import topicRoutes from './routes/topicRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';

const app = express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: true,
    credentials: true,
}));
// console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;
ConnectDb();


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/modules', moduleRoutes)

app.listen(PORT, () => console.log(`Server is running ${PORT}`))