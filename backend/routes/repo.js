const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Repo = require('../models/Repo');

// @route   GET api/repos
// @desc    Gets all the repos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const repos = await Repo.find();
    res.json(repos);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/repos
// @desc    Create a repo
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('repoIdentifier', 'Repo identifier is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      name,
      repoIdentifier,
      description,
      lastUpdated,
      viewers,
      stars,
      issues,
      commitHistory,
    } = req.body;

    try {
      let repo = await Repo.findOne({ repoIdentifier });

      if (repo) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Repo already tracked',
            },
          ],
        });
      }

      repo = new Repo({
        name,
        repoIdentifier,
        description,
        lastUpdated,
        viewers,
        stars,
        issues,
        commitHistory,
      });

      await repo.save();

      res.send(`Repo ${name} with id ${repoIdentifier} tracked successfully!!`);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
