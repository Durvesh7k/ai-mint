import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { getRecords, saveRecord } from './controller/record-controller.js';
import { Connection } from './database/db.js';

dotenv.config();

const PORT = process.env.PORT || 8000
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post('/', saveRecord);

app.get("/:account", getRecords)

app.listen(PORT, () => console.log(`Server is started at port  ${PORT}`))

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD


const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@blog-site.8uf78hu.mongodb.net/?retryWrites=true&w=majority`

Connection(URL)

