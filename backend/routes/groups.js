const express = require('express');
const router = express.Router();

const {
    getallGroups,
    createGroup,
    removeGroup
} = require('../controllers/group');


router.get('/', getallGroups);
router.post('/', createGroup);


module.exports = router;