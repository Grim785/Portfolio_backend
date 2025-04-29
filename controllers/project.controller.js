const Project = require('../models/project.model');
const mongoose = require('mongoose'); // Import mongoose để kiểm tra ObjectId

// Tạo dự án mới
const createProject = async (req, res) => {
  try {
    const { title, description, technologies, imageUrl, link } = req.body;
    const newProject = new Project({
      title,
      description,
      technologies:technologies.split(','),
      imageUrl,
      link
    });

    await newProject.save();  // Lưu dự án vào cơ sở dữ liệu
    res.status(201).json(newProject);  // Trả lại dự án mới được tạo
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Lấy tất cả dự án
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); 
    console.log(projects) // Tìm tất cả dự án trong cơ sở dữ liệu
    res.status(200).json(projects);  // Trả về danh sách dự án
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ tham số URL

    // Kiểm tra ID có đúng chuẩn Mongo ObjectId không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ tham số URL
    const { title, description, technologies, imageUrl, link } = req.body; // Lấy dữ liệu từ body

    // Kiểm tra ID có đúng chuẩn Mongo ObjectId không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, technologies, imageUrl, link },
      { new: true } // Trả về tài liệu đã cập nhật
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject); // Trả về dự án đã cập nhật
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ tham số URL
    console.log("getProjectById", id);

    // Kiểm tra ID có đúng chuẩn Mongo ObjectId không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(id); // Tìm dự án theo ID
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(project); // Trả về dự án tìm thấy
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
}

module.exports = { createProject, getAllProjects, deleteProject, updateProject , getProjectById };
