"use strict";
/* -------------------------------------------------------
            EXPRESSJS - TODO CONTROLLER
------------------------------------------------------- */

const Todo = require("../models/todoModel");

module.exports = {
  list: async (req, res) => {
    //   const todos = await Todo.findAll(); // SELECT * FROM todos
    //   const todos = await Todo.findAll({ attributes: ["title", "id"] }); // SELECT title, id FROM todos
    console.log("hit");
    const todos = await Todo.findAndCountAll();

    res.status(200).send({
      error: false,
      data: todos,
    });
  },

  create: async (req, res) => {
    // const todos = await Todo.create({
    //     title: 'todo-1'
    // });

    const todos = await Todo.create(req.body);

    res.status(201).send({
      error: false,
      data: todos,
    });
  },

  read: async (req, res) => {
    //   const todo = await Todo.findOne({where: {id: req.params.id}});
    //   const todo = await Todo.findOne({ where: { title: req.params.id } });
    const todo = await Todo.findByPk(req.params.id);

    res.status(200).send({
      error: false,
      data: todo,
    });
  },

  update: async (req, res) => {
    // update({...newData},{...where})
    // it returns [affectedCount: number] - [1] / [0]
    const [isUpdated] = await Todo.update(req.body, {
      where: { id: req.params.id },
    });

    if (!isUpdated) {
      res.errStatusCode = 400;
      throw new Error("Data is not updated. Something went wrong.");
    }

    res.status(202).send({
      error: false,
      new: await Todo.findByPk(req.params.id),
    });
  },

  delete: async (req, res) => {
    // destroy({...where})
    // it returns number - 0 / 1
    const isDeleted = await Todo.destroy({ where: { id: req.params.id } });

    if (!isDeleted) {
      res.errStatusCode = 400;
      throw new Error("Data already deleted or something went wrong.");
    }

    res.sendStatus(204);
  },

  toggle: async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);

    const [isUpdated] = await Todo.update(
      { isDone: !todo.isDone },
      { where: { id: req.params.id } },
    );

    if (!isUpdated) {
      res.errStatusCode = 400;
      throw new Error("Data is not updated. Something went wrong.");
    }

    res.status(202).send({
      error: false,
      new: await Todo.findByPk(req.params.id),
    });
  },
};
