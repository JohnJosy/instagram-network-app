'use strict'
const router = require('express').Router()


router.get('/',  (req, res) => {
    try {
        const accesTokenLogout = delete req.session.accessToken
        console.log('Logout accesTokenLogout: ', accesTokenLogout)
        const userIdLogout = delete req.session.userId
        console.log('Logout userIdLogout: ', userIdLogout)
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = router