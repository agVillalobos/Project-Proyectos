const express = require('express')
const projectController = express.Router()
const Project = require('./project')

projectController
  .post('/', async (req, res, next) => {
    const project = await Project.create(req.body)
    res.status(200).send(project)
  })

  projectController
  .put('/:id', async (req, res, next) => {
    const project = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { $upsert: true, new: true })
    res.status(200).send(project)
  })

  projectController
  .get('/', async (req, res, next) => {
    const projects = await Project.find()
    res.status(200).send({projects: projects})
  })

  projectController
  .get('/:id', async (req, res, next) => {
    const project = await Project.findById(req.params.id)
    res.status(200).send(project)
  })

  projectController
  .delete('/:id', async (req, res, next) => {
    const project = await Project.deleteOne({ _id: req.params.id })
    res.status(200).send(project)
  })

module.exports = projectController
