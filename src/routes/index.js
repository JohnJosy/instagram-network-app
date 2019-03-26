'uste string'

const router = require('express').Router()

router.get('/', (req, res) =>{
    res.render('index')// Render reinderizza a una vista
})

module.exports = router