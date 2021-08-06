const express = require('express');
const Celebrity = require('../models/celebrity.model');



const router = express.Router();




router.get('/celebrities', (req, res) => {
 Celebrity.find({})
 .then((celebrities) => res.render('celebrity/index', {celebrities}))
 .catch((error) => console.log('error showing all celebrities', error));
});


router.get('/celebrities/new',(req,res,next) => {
    res.render('celebrity/new');
});

router.post('/celebrities/new', (req, res, next) => {
    const {name, occupation, catchPhrase } = req.body;
    Celebrity.create({name, occupation, catchPhrase})
    .then(() => res.redirect('/celebrities'))
  });

  router.get('/celebrities/:id', (req, res, next) => {
    const celebrityId = req.params.id
Celebrity.findById(celebrityId)
.then((celebrityDetail) => res.render('celebrity/show',{celebrity: celebrityDetail}))
.catch((error) => console.log('error showing the celebrity', error));
});


router.get('/celebrities/:id/edit', (req, res, next) => {
    const celebrityId = req.params.id;
    Celebrity.findById(celebrityId)
    .then(celebrityToEdit => {
      console.log(celebrityToEdit);
      return res.render('celebrity/edit', { celebrity: celebrityToEdit });
    })
    .catch(error => next(error));
  });
  
  router.post('/celebrities/:id/edit', (req, res, next) => {
    const celebrityId = req.params.id;
    const { name, occupation, catchPhrase } = req.body;
    
    Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase }, { new: true })
      .then(() => res.redirect('/celebrities'))
      .catch(error => next(error));
  });

  


router.post('/celebrities/:id/delete', (req, res, next) => {
    const celebrityId= req.params.id;
    Celebrity.findByIdAndDelete(celebrityId)
    .then(()=> res.redirect('/celebrities'))
    });



module.exports = router;