const express = require('express');
const { createProject, getAllProjects, deleteProject, updateProject, getProjectById } = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router();

// Route để tạo dự án
router.post('/', authMiddleware, createProject);

// Route để lấy tất cả dự án
router.get('/', getAllProjects);

// Route để xóa dự án theo ID
router.delete('/:id', authMiddleware, deleteProject);

// Route để cập nhật dự án theo ID
router.put('/:id', authMiddleware, updateProject);

// Route để lấy dự án theo ID (nếu cần, có thể thêm vào sau này)
router.get('/:id', authMiddleware, getProjectById);

module.exports = router;
