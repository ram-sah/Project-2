const express = require('express');
const db = require('../models');

module.exports = function(app) {
    app.get("/:id", (req, res) => {
        const id = req.params.id;
        res.send("sent home route" + id)
    });
};

// const router = express.Router();

// router.get("/:id", (req, res) => {
//     const id = req.params.id;
//     res.send("sent home route" + id)
// });

// module.exports = router;