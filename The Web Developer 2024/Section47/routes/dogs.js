const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('ALL DOGS');
})

router.get('/:id', (req, res) => {
    res.send('VIEWING ONE SHELTERS');
})

router.get('/:id/edit', (req, res) => {
    res.send('EDITING ONE SHELTERS');
})

module.exports = router;
