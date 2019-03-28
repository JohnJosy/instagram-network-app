'use strict'
const router = require('express').Router


router.get('/', (req, res) => {
    try {
        res.send('O pdio')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router