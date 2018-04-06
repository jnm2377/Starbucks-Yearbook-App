const express = require('express');
const router = express.Router();
const Barista = require('../models/baristas.js')

router.get('/', async (req, res) => {
  const baristas = await Barista.find();
  res.status(200).json(baristas);
});

router.get('/:id', async (req, res) => {
  try{
    const barista = await Barista.findById(req.params.id);
    res.status(200).json({barista});
  } catch (err){
    console.log(err);
    res.status(400).json({err: err.message})
  }
});

router.post('/', async (req, res) => {
  try{
    const barista = await Barista.create(req.body);
    res.status(201).json(barista);
  } catch (err){
    console.log(err);
    res.status(400).json({err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updatedBarista = await
    Barista.findByIdAndUpdate(req.params.id, req.body, {new: true, set:true});
    res.status(200).json(updatedBarista)
  } catch(e){
    console.log(e);
    res.status(400).json({err: e.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const barista = await Barista.findByIdAndRemove(req.params.id);
    res.status(200).json({message: 'barista removed'})
  } catch (err) {
    console.log(err);
    res.status(400).json({err: err.message})
  }
})

module.exports = router;
