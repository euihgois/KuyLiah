const express = require("express");
const router = express.Router();
const Controller = require('../controllers/index')

//router.get('/:adminId', Controller.showPage)

/*
GET - /admin/:adminId/add - masuk halaman add kampus & programnya
POST - /admin/:adminId/add - save kampus & programnya
*/
router.get('/:adminId', Controller.showAdmin)
router.get('/:adminId/add', Controller.getaddAdmin)
router.post('/:adminId/add', Controller.postaddAdmin)
router.get('/:adminId/profile', Controller.profileEdmin)
router.get('/:adminId/delete/:universityId', Controller.delete)


module.exports = router