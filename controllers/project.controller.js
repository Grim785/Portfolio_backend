const Project = require('../models/project.model');
const mongoose = require('mongoose');

// Tạo dự án mới
const createProject = async (req, res) => {
  try {
    const { title, description, technologies, imageUrl, link } = req.body;
    const newProject = new Project({
      title,
      description,
      technologies: technologies.split(','),
      imageUrl,
      link
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Lấy tất cả dự án
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("deteled")

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, imageUrl, link } = req.body;
    technologies.split(',')

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, technologies, imageUrl, link },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getProjectById
};
