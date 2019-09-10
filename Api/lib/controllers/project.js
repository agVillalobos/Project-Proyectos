'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');
const s3 = require('../config/s3.config.js');
var stream = require('stream');
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

        // return res.status(200).send({
        //     project: project,
        //     message: 'Metodo saveProject'
        // });
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
        console.log(update.name);
        console.log(update.description);

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
        const s3Client = s3.s3Client;
        const params = s3.uploadParams;
        var projectId = req.params.id;

        console.log(req.file);
        params.Key = req.file.originalname;
        params.Body = req.file.buffer;
        params.ContentType = req.file.mimetype;

        s3Client.upload(params, (err, data) => {
            if (err) {
                res.status(500).json({error:"Error -> " + err});
            }

            Project.findById(projectId, (err, project) => {
                if (err) return res.status(500).send({ message: 'Error al guardar' });
    
                if (!project) return res.status(404).send({ message: 'El proyecto no existe' });
                
                var update = project;
                update.image = data.Location;
                Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar' });
        
                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe' });
        
                    return res.status(200).send({ project: projectUpdated });
                });
            });
        });
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