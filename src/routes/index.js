const {Router} = require('express');
const router = Router();
const {GetIndex, GetAbout} = require('../controllers/Index.controller');

router.route('/index')
.get(GetIndex)

router.route('/about')
.get(GetAbout)

module.exports = router;