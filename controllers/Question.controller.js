// controllers/questionController.js

const { Questions } = require('../models');

const createQuestion = async (req, res) => {
  try {
    const newQuestion = await Questions.create(req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestion = async (req, res) => {
  try {
    const question = await Questions.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await Questions.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    await question.update(req.body);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Questions.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    await question.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
