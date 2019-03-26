'use strict'

// MODULI
const express = require('express')
const exphbs  = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const Instagram = require('node-instagram').default;

const app = express()

// SETTINGS
const PORT = process.env.PORT || 3000
app.set('port', PORT)

// MIDDLEWARE
app.use(morgan('dev'))//utilizzo la proprietà dev per vedere il log delle rooting

// STATIC FILE 


// ROUTES


// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Attivi alla porta ', app.get('port'))
})