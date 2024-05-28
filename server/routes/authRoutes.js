const express = require('express');
const { check } = require('express-validator');
const { register, login, getUser } = require('../controllers/authController');
const { auth, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    register
);

router.post(
    '/login',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
    ],
    login
);

router.get('/user', auth, getUser);
router.get('/admin', auth, admin, (req, res) => {
    res.send('Admin content');
});

module.exports = router;