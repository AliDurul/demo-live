"use strict";
/* -------------------------------------------------------
            EXPRESSJS - TODO ROUTER
------------------------------------------------------- */
// ROUTES:

const router = require("express").Router();
const todo = require("../controllers/todoController");


router.route("/")
    .get(todo.list)
    .post(todo.create);

router.route("/:id")
    .get(todo.read)
    .put(todo.update)
    .delete(todo.delete);

router.patch("/:id/toggle", todo.toggle);

module.exports = router;
