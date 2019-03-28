'use strict'

// MODULI
const express = require('express')
const exphbs  = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const session = require ('cookie-session')
const Instagram = require('node-instagram').default;

const indexRouter = require('./routes/index')//Richiamo il routing dell'index
const loginRouter = require('./routes/login')//Richiamo il routing del login
const profileRouter = require('./routes/profile')
const authInstagram = require('./routes/auth/instagram')//Richiamo il routing per l'autenticazione
const handleAuth = require('./routes/handleauth')//Richiamo il routing per le richieste

const app = express()

// SETTINGS
const PORT = process.env.PORT || 3000
app.set('port', PORT)
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')
app.set('views', path.join(__dirname, 'views'))//path.join unisce percorsi ; __dirname => da il percorso attuale

// MIDDLEWARE
app.use(morgan('dev'))//utilizzo la proprietà dev per vedere il log delle rooting
app.use(session({//Utilizzo per salvare i dati nel session cookies
    secret: 'Parola segreta', //Perchè la sessione non si alteri
    signed: true
}))

// STATIC FILE 


// ROUTES
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/auth/instagram', authInstagram)
app.use('/handleauth', handleAuth)
app.use('/profile', profileRouter)

// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Attivi alla porta ', app.get('port'))
})