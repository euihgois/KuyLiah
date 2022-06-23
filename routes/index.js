const express = require('express')
const router = express.Router()
const Controller = require('../controllers/index.js')



router.get('/', (req, res) => {
    res.send('Hello World!')
})



module.exports = router


