
// ./lib/routes/index.js
const express = require('express')
const router = express.Router()
const notes = require('./notes/notes.controller')
router.use('/notes', notes)
const projects = require('./projects/project')
router.use('/projects', projects)
// Add more routes here if you want!
module.exports = router