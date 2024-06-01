// controllers/responseController.js

const { Responses, Answers } = require('../models');

const createResponse = async (req, res) => {
  try {
    const newResponse = await Responses.create(req.body);
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getResponse = async (req, res) => {
  try {
    const response = await Responses.findOne({
      where: { responseId: req.params.id },
      include: [Answers]
    });
    if (!response) return res.status(404).json({ error: 'Response not found' });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateResponse = async (req, res) => {
  try {
    const response = await Responses.findByPk(req.params.id);
    if (!response) return res.status(404).json({ error: 'Response not found' });
    await response.update(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteResponse = async (req, res) => {
  try {
    const response = await Responses.findByPk(req.params.id);
    if (!response) return res.status(404).json({ error: 'Response not found' });
    await response.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createResponse,
  getResponse,
  updateResponse,
  deleteResponse,
};
