'use strict'
const router = require('express').Router()


router.get('/',  (req, res) => {
    try {
        delete req.session.accessToken
        delete req.session.userId
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = router