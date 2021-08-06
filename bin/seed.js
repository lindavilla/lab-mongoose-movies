const mongoose = require('mongoose');
const Celebrity = require("../models/celebrity.model"); 
const DB_NAME = 'mongoose-movies';
 
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
    { 
        name: 'Jeepers Creepers', 
        occupation: 'not a cool guy', 
        catchPhrase: 'Im so cool'
     },
    { 
        name: 'Creepers Jeepers', 
        occupation: 'Cool guy', 
        catchPhrase: 'Im not so cool' 
    },
    { 
        name: 'Johny Cash', 
        occupation: 'Walk hard', 
        catchPhrase: 'dancin!' 
    }
  ];

  

  Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
 
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));
