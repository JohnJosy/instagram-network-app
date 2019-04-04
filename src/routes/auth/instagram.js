'use strict'
const router = require('express').Router()
const Instagram = require('node-instagram').default
const {clientId, clientSecret, accessToken} = require('../../models/keys').instagram

const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret,
    accessToken: accessToken
})

/* const redirectUri = 'http://localhost:3000/handleauth'  */
const redirectUri = 'https://frozen-bayou-63406.herokuapp.com/handleauth'

//Eseguo Autorizzazione ; Una volta fatta l'autorizzazione Instagram mi fa ritoranare a handleauth
router.get('/', (req, res) =>{
    res.redirect(
        instagram.getAuthorizationUrl(redirectUri,{
            scope: ['basic', 'likes'],
            state: 'positivo'
        })
    )
})

module.exports = router