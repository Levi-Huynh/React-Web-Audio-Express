const router = require('express').Router();

const Scores = require('./points-model.js');


router.get('/', async (req, res) => {
  try {
    const scores = await Scores.find();
    res.status(200).json(scores);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error retrieving the Scores' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const scores = await Scores.findById(req.params.id);
    if (scores) {
      res.status(200).json(scores);
    } else {
      res.status(404).json({ message: 'We could not find the score' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error retrieving the score' });
  }
});

router.post('/', async (req, res) => {
  const scores = req.body;

  if (scores.date && scores.score) {
    try {
      const inserted = await Scores.add(scores);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'We ran into an error creating the score' });
    }
  } else {
    res.status(400).json({ message: 'Please provide date and value of the score' });
  }
});

router.put('/:id', async (req, res) => {
  const changes = req.body;

  if (changes.date && changes.score) {
    try {
      const updated = await Scores.update(req.params.id, changes);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: 'That score does not exist',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'We ran into an error updating the score' });
    }
  } else {
    res.status(400).json({
      message: 'Please provide the name of the score',
    });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const count = await Scores.remove(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'That score does not exist, perhaps it was deleted already',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error removing the score' });
  }
});

module.exports = router;
