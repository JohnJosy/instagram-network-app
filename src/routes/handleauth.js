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
        req.session.accessToken = data.access_token //salvo l'Access token che ricevo da 'data' nella sessione del navigatore
        req.session.userId = data.user.id //salvo l'user Id che ricevo da 'data' nella sessione del navigatore

        instagram.config.accessToken = req.session.accessToken//passo a instagram accessToken e userId per poter far arrivare i dati da instagra
        instagram.config.userId = req.session.userId//passo a instagram accessToken e userId per poter far arrivare i dati da instagra

        console.log('dati per Autenticazione', instagram)

        console.log(data)
        res.json(instagram)
    } catch (error) {
        console.log(error)
        res.json(e)
    }
})

module.exports = router