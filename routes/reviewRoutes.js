const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// CREATE Review
router.post('/', async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Log the incoming body
    const { username, email, feedback, rating } = req.body;

    const newReview = new Review({ username, email, feedback, rating });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error while saving review:", error);
    res.status(500).json({ error: 'Unable to save review', details: error.message });
  }
});




// READ Reviews
// READ Reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    console.log('Reviews fetched:', reviews); // Log reviews to check

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
});

// UPDATE Review
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update review' });
  }
});

// DELETE Review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete review' });
  }
});

module.exports = router;
