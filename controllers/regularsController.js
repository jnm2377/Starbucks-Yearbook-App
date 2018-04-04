const express = require('express');
const router = express.Router();
const Regular = require('../models/regulars.js')

router.get('/', async (req, res) => {
    const regulars = await Regulars.find();
    res.status(200).json(users);
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
    req.session.regular = regular;
    res.status(201).json(regular);
  } catch (err) {
    console.log(err);
    res.status(400).json({err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updatedRegular = await Regular.findByIdAndUpdate(req.params.id, req.body, {new: true, set:true});
    res.status(200).json(updatedUser);
  } catch(e){
    console.log(e);
    res.status(400).json({err: e.message});
  }
});

router.delete('/:id', async (req, res ) => {
  try{
    const regular = await Regular.findByIdAndRemove(req.params.id);
    res.status(200).json({message: 'user removed'});
  } catch (e) {
    console.log(err);
    res.status(400).json({err: err.message})
  }
});

module.exports = router;
