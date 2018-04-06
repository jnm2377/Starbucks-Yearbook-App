const express = require('express');
const router = express.Router();
const Regular = require('../models/regulars.js')

router.get('/', async (req, res) => {
    const regulars = await Regular.find();
    res.status(200).json(regulars);
});

router.get('/:id', async (req, res) => {
  try {
    const regular = await Regular.findById(req.params.id);
    res.status(200).json({regular});
  } catch (err) {
    console.log(err);
    res.status(400).json({err: err.message})
  }
});

router.post('/', async (req, res) => {
  try{
    const regular = await Regular.create(req.body);
    res.status(201).json(regular);
  } catch (err) {
    console.log(err);
    res.status(400).json({err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updatedRegular = await Regular.findByIdAndUpdate(req.params.id, req.body, {new: true, set:true});
    res.status(200).json(updatedRegular);
  } catch(e){
    console.log(e);
    res.status(400).json({err: e.message});
  }
});

router.delete('/:id', async (req, res ) => {
  try{
    const regular = await Regular.findByIdAndRemove(req.params.id);
    res.status(200).json({message: 'regular removed'});
  } catch (err) {
    console.log(err);
    res.status(400).json({err: err.message})
  }
});

module.exports = router;
