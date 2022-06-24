const Controller = require('../controllers/index')
const express = require("express");
const router = express.Router();


router.get('/',Controller.index)
router.get('/register', Controller.registerFormGet)
router.post('/register', Controller.registerFormPost)
router.get('/login', Controller.loginGet)
router.post('/login', Controller.loginPost)
router.get('/logout', Controller.logout)


router.use(function(req, res, next) {
    if(!req.session.userId) {
        const error = `Please login first`
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

/*
router.get('/login', Controller.login)                      //login page
router.post('/login', Controller.submit)                   //login submit
router.get('/logout', Controller.logout)
*/


router.use('/student' , require('./student'))
router.use('/admin' , require('./admin'))

module.exports = router;