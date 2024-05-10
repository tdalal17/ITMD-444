const express = require('express');
const router = express.Router();
const Entity = require('../models/entity');

// Create a new entity
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const entity = new Entity({ name, description });
    await entity.save();
    res.status(201).json(entity);
  } catch (err) {
    console.error('Error creating entity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all entities
router.get('/', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (err) {
    console.error('Error retrieving entities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single entity by ID
router.get('/:id', async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.json(entity);
  } catch (err) {
    console.error('Error retrieving entity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an entity
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const entity = await Entity.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.json(entity);
  } catch (err) {
    console.error('Error updating entity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an entity
router.delete('/:id', async (req, res) => {
  try {
    const entity = await Entity.findByIdAndDelete(req.params.id);
    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.json({ message: 'Entity deleted successfully' });
  } catch (err) {
    console.error('Error deleting entity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;