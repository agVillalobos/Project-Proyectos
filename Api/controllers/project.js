'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function (req, res) {
        return res.status(200).send({ message: 'Soy la home' });
    },
    test: function (req, res) {
        return res.status(200).send({ message: 'Soy el metodo de test' });
    },

    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });
            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar' });

            return res.status(200).send({ project: projectStored });
        });

        return res.status(200).send({
            project: project,
            message: 'Metodo saveProject'
        });
    },

    getProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) return res.status(500).send({ message: 'El projecto no existe' });

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!project) return res.status(404).send({ message: 'El proyecto no existe' });

            return res.status(200).send({ project: project });
        });

    },

    getProjects: function (req, res) {

        Project.find({}).sort('year').exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!projects) return res.status(404).send({ message: 'El proyecto no existe' });

            return res.status(200).send({ projects: projects });
        });
    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe' });

            return res.status(200).send({ project: projectUpdated });
        });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!projectRemoved) return res.status(404).send({ message: 'El proyecto no existe' });

            return res.status(200).send({ project: projectRemoved });
        });
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'imagen no subida ' + req.files +'';

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            fileName='enra al req.files';
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar' });

                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe' });

                    return res.status(200).send({ project: projectUpdated });
                });
            }else{
                fs.unlink(filePath, (err)=>{ return res.status(200).send({message: "la extension no es valida."})});
            }

            // console.log(req.files);
            return res.status(200).send({ files: req.files });
        } else {
            // console.log(req.files);
            return res.status(200).send({ files: fileName });
        }
    },

    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({ 
                    message: "No existe" 
                });
            }
        });
    }
};

module.exports = controller;