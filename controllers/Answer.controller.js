// controllers/answerController.js

const { Answers } = require('../models');

const createAnswer = async (req, res) => {
  try {
    const newAnswer = await Answers.create(req.body);
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnswer = async (req, res) => {
  try {
    const answer = await Answers.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAnswer = async (req, res) => {
  try {
    const answer = await Answers.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    await answer.update(req.body);
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answers.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    await answer.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
};
