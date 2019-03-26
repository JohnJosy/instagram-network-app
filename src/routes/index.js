'uste string'

const router = require('express').Router()

router.get('/', (req, res) =>{
    res.send('SIamo nella index')
})

module.exports = router