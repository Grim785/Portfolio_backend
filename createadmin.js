// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const User = require('./models/user.model'); // Đảm bảo bạn đã có model User
const jwt = require('jsonwebtoken');

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (adminExists) {
      console.log('Admin đã tồn tại!');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, salt); // Thay đổi mật khẩu này theo nhu cầu

    const newAdmin = new User({
      username: process.env.USERNAME,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('Tạo admin thành công!');
  } catch (error) {
    console.error('Lỗi khi tạo admin:', error);
  }
};

module.exports = {
  createAdmin,
};
