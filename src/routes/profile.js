'use strict'
const router = require('express').Router()


router.get('/', (req, res) => {
    try {
        res.render('profile')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router