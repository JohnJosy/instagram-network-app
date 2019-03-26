'use strict'

// MODULI
const express = require('express')
const exphbs  = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const Instagram = require('node-instagram').default;

const indexRouter = require('./routes/index')//Richiamo il routing dell'index
const loginRouter = require('./routes/login')//Richiamo il routing del login

const app = express()

// SETTINGS
const PORT = process.env.PORT || 3000
app.set('port', PORT)
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')
app.set('views', path.join(__dirname, 'views'))//path.join unisce percorsi ; __dirname => da il percorso attuale

// MIDDLEWARE
app.use(morgan('dev'))//utilizzo la proprietà dev per vedere il log delle rooting

// STATIC FILE 


// ROUTES
app.use('/', indexRouter)
app.use('/login', loginRouter)

// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Attivi alla porta ', app.get('port'))
})