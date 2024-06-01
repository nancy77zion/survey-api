// controllers/optionController.js

const { Options } = require('../models');

const createOption = async (req, res) => {
  try {
    const newOption = await Options.create(req.body);
    res.status(201).json(newOption);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOption = async (req, res) => {
  try {
    const option = await Options.findByPk(req.params.id);
    if (!option) return res.status(404).json({ error: 'Option not found' });
    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOption = async (req, res) => {
  try {
    const option = await Options.findByPk(req.params.id);
    if (!option) return res.status(404).json({ error: 'Option not found' });
    await option.update(req.body);
    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOption = async (req, res) => {
  try {
    const option = await Options.findByPk(req.params.id);
    if (!option) return res.status(404).json({ error: 'Option not found' });
    await option.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOption,
  getOption,
  updateOption,
  deleteOption,
};
