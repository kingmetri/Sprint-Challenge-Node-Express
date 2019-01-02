const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const server = express();
//Database
const dbActions = require('./data/helpers/actionModel');
const dbProjects = require('./data/helpers/projectModel');
//PORT
const PORT = process.env.PORT || 5000;

server.get('/api/actions', (req,res) => {
      dbActions.get(id)
               .then(action => {
                   res.json(action);
               })
               .catch(err => {
                   res.json(500).json({errorMessage: "Unable to get actions this time"});
               })
});

server.get('/api/actions/:id', (req,res) => {
    const { id } = req.params;
    dbActions.get(id)
             .then(action => {
                action ? res.json(action) : res.status(404).json({Message: "Required action with this ID not found"});
                console.log(action);
             })
             .catch(err => {
                 res.json(500).json({errorMessage: "Unable to get actions this time"});
             });
});








server.listen(PORT, () => {
    console.log(`App is up and running at the PORT ${PORT}.`);
})