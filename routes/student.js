const express = require("express");
const router = express.Router();
const Controller = require('../controllers/index')

router.get('/:studentId', Controller.showPage)
router.get('/:studentId/profile', Controller.showProfile)
router.get('/:studentId/profile/edit', Controller.showEdit)
router.post('/:studentId/profile/edit', Controller.editStudent)
router.get('/:studentId/chance/:universityId', Controller.showDetail)

module.exports = router