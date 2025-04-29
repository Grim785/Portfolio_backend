const About = require('../models/about.model');

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAbout = async (req, res) => {
  const { content } = req.body;
  try {
    const about = await About.findOneAndUpdate({}, { content }, { new: true });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
