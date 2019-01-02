const express = require('express');
const router = express.Router();
//Database
const dbActions = require('../helpers/actionModel');

router.get('/', (req ,res) => {
    dbActions.get()
             .then(action => {
                 res.status(200).json(action);
             })
             .catch(err => {
                 res.json(500).json({errorMessage: "Unable to get actions this time"});
             })
});

router.get('/:id', (req,res) => {
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

router.post('/', (req,res) => {
  //   const {project_id, notes, description} = req.body;
    const action = req.body;
    console.log('This is line 35:', action);
    if(action.project_id && action.notes && action.description) {
    dbActions.insert(action)
             .then(newAction => {
                 console.log('line43: ', newAction)
                 res.json(newAction);
             })
             .catch(err => {
                 res.status(500).json({errorMessage: "Could not create this action for you now"});
             });
    } else {
        res.status(400).json({errorMessage: "Please enter notes and description details"});
    }        
});

router.put('/:id', (req, res) => {
     const {id} = req.params;
     const action = req.body;
     if(action.notes && action.description && action.project_id) {
          dbActions.update(id, action)
          .then( newAction => {
               dbActions.get(newAction.id)
                        .then(action => {
                          action ? res.json(action) : res.status(400).json({Message: "Did not find action"});
                        })
                        .catch(err => {
                            res.status(500).json({errorMessage:"Could not get your actions"})
                        })
          })
          .catch(err => {
              res.status(500).json({errorMessage: "Could not update the action with this ID"});
          });
     } else {
             res.status(400).json({errorMessage:"Description, Notes, and projectId required!!!"});
     }
     
});

router.delete('/:id', (req, res) => {
       const { id } = req.params;
       dbActions.remove(id)
                .then(count => {
                    count ? res.json({Message:"Successfully deleted!!!"}) : 
                            res.status(404).json({Message: "Could not delete your action with this ID"});
                })
                .catch(err => {
                    res.status(500).json({errorMessage:"Could not delete your actions now"});
                });
});

module.exports = router;
