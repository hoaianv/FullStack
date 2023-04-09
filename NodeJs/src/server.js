import Express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
import cors from 'cors'
require('dotenv').config()


let app = Express()
const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

configViewEngine(app)
initWebRoutes(app)

connectDB()
let port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('Backend NodeJS is running on the port', port)
})
