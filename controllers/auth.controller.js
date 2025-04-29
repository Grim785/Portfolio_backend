// controllers/auth.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login request:', req.body);

    // Kiểm tra input
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ username và password.' });
    }

    // Tìm user theo username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại.' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('here');
      return res.status(400).json({ message: 'Sai mật khẩu.' });
    }

    // Tạo JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token hết hạn sau 7 ngày
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi server.' });
  }
};

module.exports = {
  loginAdmin,
};
