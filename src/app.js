'use strict'

// MODULI
const express = require('express')
const exphbs  = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const session = require ('cookie-session')
const Handlebars = require('handlebars');
const indexRouter = require('./routes/index')//Richiamo il routing dell'index
const loginRouter = require('./routes/login')//Richiamo il routing del login
const profileRouter = require('./routes/profile')
const authInstagram = require('./routes/auth/instagram')//Richiamo il routing per l'autenticazione
const handleAuth = require('./routes/handleauth')//Richiamo il routing per le richieste
const logoutRouter = require('./routes/logout')//Richiamo il routing per il logout

const app = express()

// SETTINGS
const PORT = process.env.PORT
app.set('port', PORT)

//Template Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')
app.set('views', path.join(__dirname, 'views'))//path.join unisce percorsi ; __dirname => da il percorso attuale

// MIDDLEWARE
app.use(morgan('dev'))//utilizzo la proprietà dev per vedere il log delle rooting
app.use(session({//Utilizzo per salvare i dati nel session cookies
    secret: 'Parola segreta', //Perchè la sessione non si alteri
    signed: true
}))

//Creo Middleware per gestire le date
Handlebars.registerHelper('dataFormattata', (date) => {
    let dataPost = new Date(date * 1000)
    let dataDay = dataPost.getDate()
    let dataMonth = dataPost.getMonth()
    let dataYear = dataPost.getFullYear()
    return dataDay + '-' + dataMonth + '-' + dataYear
})


// STATIC FILE 
app.use(express.static('src/public'));

// ROUTES
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/auth/instagram', authInstagram)
app.use('/handleauth', handleAuth)
app.use('/profile', profileRouter)
app.use('/logout', logoutRouter)

// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Attivi alla porta ', app.get('port'))
})