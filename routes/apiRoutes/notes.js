const router = require('express').Router();
// const { createNewNote, getAllNotes } = require('../../lib/notes');
const  notes = require('../../db/db');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req,res)=>{
  console.log("Notes are "+JSON.stringify(notes));
    res.json(notes);
})

router.post('/notes', (req,res)=>{
    const note = req.body;
    notes.push(note);

    fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'),
      JSON.stringify(notes, null, 2)
    );
    res.json(notes);
    
})

module.exports = router;