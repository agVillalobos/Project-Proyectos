const express = require('express')
const router = express.Router()
// Add all routes here
const notes = require('./notes/notes.controller')
const projects = require('./projects/project')

router.use('/notes', notes)
router.use('', projects)

module.exports = router
