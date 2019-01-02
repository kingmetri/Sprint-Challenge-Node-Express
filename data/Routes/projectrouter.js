const express = require('express');
const router = express.Router();
//Database
const dbProjects = require('../helpers/projectModel');

router.get('/', (req ,res) => {
    dbProjects.get()
             .then(project => {
                 res.status(200).json(project);
             })
             .catch(err => {
                 res.json(500).json({errorMessage: "Unable to get projects this time"});
             })
});

router.get('/:id', (req,res) => {
  const { id } = req.params;
  dbProjects.get(id)
           .then(project => {
              project ? res.json(project) : res.status(404).json({Message: "Required project with this ID not found"});
              console.log(project);
           })
           .catch(err => {
               res.json(500).json({errorMessage: "Unable to get projects this time"});
           });
});

router.post('/', (req,res) => {
  //   const {project_id, notes, description} = req.body;
    const project = req.body;
    // const { name, description } = req.body;
    console.log('This is line 35:', project);
    if( project.name && project.description) {
            dbProjects.insert(project)
                      .then( incomingData => {
                        console.log('line 36:', incomingData);
                        dbProjects.get(incomingData.id).then( response => {
                            res.status(201).json(response); 
                        })
                 
                    })
                    .catch(err => {
                        res.status(500).json({errorMessage: "Could not create this project for you now"});
                    });
            } else {
                       res.status(400).json({errorMessage: "Please enter notes and description details"});
            }        
});

router.put('/:id', (req, res) => {
     const {id} = req.params;
     const project = req.body;
     if(project.name && project.description) {
          dbProjects.update(id, project)
          .then( newProject => {
               dbProjects.get(newProject.id)
                        .then(project => {
                          project ? res.json(project) : res.status(400).json({Message: "Did not find project"});
                        })
                        .catch(err => {
                            res.status(500).json({errorMessage:"Could not get your projects"})
                        })
          })
          .catch(err => {
              res.status(500).json({errorMessage: "Could not update the project with this ID"});
          });
     } else {
             res.status(400).json({errorMessage:"Description, Notes, and projectId required!!!"});
     }
     
});

router.delete('/:id', (req, res) => {
       const { id } = req.params;
       dbProjects.remove(id)
                .then(count => {
                    count ? res.json({Message:"Successfully deleted!!!"}) : 
                            res.status(404).json({Message: "Could not delete your project with this ID"});
                })
                .catch(err => {
                    res.status(500).json({errorMessage:"Could not delete your projects now"});
                });
});

module.exports = router;
