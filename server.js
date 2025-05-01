const express = require('express');
const app= express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB=require('./config/db');
const socketService = require('./services/socket.service');
const nodemailer = require('nodemailer')

app.use(cors());

require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Import routes
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const aboutRoutes = require('./routes/about.routes');

// Routes
app.use('/api/login', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/about', aboutRoutes);
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;


  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  }); 

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `From: ${name} (${email})\n\n${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).send(err.toString());
    res.status(200).send('Email sent');
  });
});


connectDB(); // Connect to MongoDB


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
  

const {createAdmin} = require('./createadmin');
createAdmin(); // Tạo admin nếu chưa tồn tại

socketService(server);

const io = socketService(server); // Sửa: nhận lại io
app.set('io', io);
