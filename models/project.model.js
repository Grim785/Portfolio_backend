const mongoose = require('mongoose');

// Tạo schema cho dự án
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Dự án phải có tên
    trim: true,
  },
  description: {
    type: String,
    required: true,  // Mô tả dự án là bắt buộc
  },
  technologies: {
    type: [String],  // Mảng các công nghệ sử dụng trong dự án
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,  // URL của ảnh dự án
  },
  link: {
    type: String,
    required: true,  // Liên kết đến dự án
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Tự động gán thời gian tạo
  },
  updatedAt: {
    type: Date,
    default: Date.now,  // Tự động gán thời gian cập nhật
  },
});

// Middleware để tự động cập nhật `updatedAt` mỗi khi tài liệu thay đổi
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();  // Cập nhật thời gian khi dự án được lưu
  next();
});

// Tạo model từ schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
