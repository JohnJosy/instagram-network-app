'use strict'

const router = require('express').Router()
const Instagram = require('node-instagram').default;
const {clientId, clientSecret, accessToken} = require('../models/keys').instagram

const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret,
    accessToken: accessToken
})

router.get('/', (req, res) => {
    res.render('login')
})

module.exports = router