'use strict';

require('dotenv').config({ path: '../variables.env' });
const connectToDatabase = require('../db');
const Note = require('../models/Note');
const Project = require('../models/project');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
    Project.create(JSON.parse(event.body))
    )
    .then(project => callback(null, {
      statusCode: 200,
      body: JSON.stringify(project)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the project.'
    }));
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Project.findById(event.pathParameters.id)
    )
    .then(project => callback(null, {
      statusCode: 200,
      body: JSON.stringify(project)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the project.'
    }));
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Project.find()
    )
    .then(project => callback(null, {
      statusCode: 200,
      body: JSON.stringify(project)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the project.'
    }))
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Project.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
    )
    .then(project => callback(null, {
      statusCode: 200,
      body: JSON.stringify(project)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the project.'
    }));
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Project.findByIdAndRemove(event.pathParameters.id)
    )
    .then(project => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Removed project with id: ' + project._id, project: project })
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the project.'
    }));
};