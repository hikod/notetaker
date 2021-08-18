const router = require('express').Router();
const notes = require('../../db/db');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
  console.log("Notes are " + JSON.stringify(notes));
  res.json(notes);
})

router.post('/notes', (req, res) => {
  const note = req.body;
  let maxId = 1;

  //this part of the goes and find the max id in the notes array
  notes.forEach((note) => {
    if (note.id > maxId)
      maxId = note.id;
  })
 // the newly addes note will have the id of existing maxid plus 1
  note.id = maxId + 1;
  notes.push(note);

  // the db json will be updated based on the new value
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(notes, null, 2)
  );
  res.json(notes);

})

router.delete('/notes/:id', (req, res) => {
  const note = req.body;
  // the notes array fom db.json will be read and then 
  //based on the id matched with the parameter id
  //if criteria met, then the note will be removed from the array
  notes.forEach(note => {
    if (note.id == req.params.id) {
      notes.splice(notes.indexOf(note), 1);
    }
  });

   // the db json will be updated based on the new value
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(notes, null, 2)
  );
  res.json(notes);
})

module.exports = router;