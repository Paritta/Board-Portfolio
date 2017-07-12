/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || 3000 

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)
// aa
// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})

app.use('/api', require('./routes/api'))

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

//===== 뷰 엔진 설정 =====//
app.set('view engine', 'ejs');
app.set('views', './views');
console.log('뷰 엔진이 ejs로 설정되었습니다.');

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})