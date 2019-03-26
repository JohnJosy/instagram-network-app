'use strict'

const router = require('express').Router()
const Instagram = require('node-instagram').default
const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret,
    accessToken: accessToken
})
const redirectUri = 'http://localhost:3000/handleauth' 
//Una volta fatta l'aute
router.get('/', async (req, res) => {
    try {
        const code = req.query.code
        await instagram.authorizeUser(code, redirectUri)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router