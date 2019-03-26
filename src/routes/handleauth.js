'use strict'

const router = require('express').Router()
const Instagram = require('node-instagram').default
const {clientId, clientSecret, accessToken} = require('../models/keys').instagram
const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret,
    accessToken: accessToken
})
const redirectUri = 'http://localhost:3000/handleauth' 
//Una volta fatta l'autenticazione da /auth/instagram arrivo qua
router.get('/', async (req, res) => {
    try {
        const code = req.query.code
        const data = await instagram.authorizeUser(code, redirectUri)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router