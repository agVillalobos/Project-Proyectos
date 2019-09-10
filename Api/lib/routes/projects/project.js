'use strict'

var express= require('express');
var ProjectController = require('../../controllers/project');

var router = express.Router();

let upload = require('../../config/multer.config.js');

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', upload.single("file"), ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;