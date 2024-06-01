// controllers/surveyController.js

const { Surveys, Questions, Responses } = require('../models');

const createSurvey = async (req, res) => {
  try {
    const newSurvey = await Surveys.create(req.body);
    const surveyLink = `${req.protocol}://${req.get('host')}/formpage/${newSurvey.surveyId}`;
    res.status(201).json({ survey: newSurvey, link: surveyLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSurvey = async (req, res) => {
  try {
    const survey = await Surveys.findOne({
      where: { surveyId: req.params.id },
      include: [{
        model: Questions,
      }, {
        model: Responses,
      }]
    });
    if (!survey) return res.status(404).json({ error: 'Survey not found' });
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSurvey = async (req, res) => {
  try {
    const survey = await Surveys.findByPk(req.params.id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });
    await survey.update(req.body);
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSurvey = async (req, res) => {
  try {
    const survey = await Surveys.findByPk(req.params.id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });
    await survey.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSurvey,
  getSurvey,
  updateSurvey,
  deleteSurvey,
};
