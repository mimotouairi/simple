const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const interactionRoutes = require('./routes/interactions');
const app = express();
// التأكد من وجود مجلد الرفع
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use(cors());
// رفع حد معالجة البيانات إلى 400 ميجا
app.use(express.json({ limit: '400mb' }));
app.use(express.urlencoded({ limit: '400mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => res.json({ message: 'Flix API is live' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/interactions', interactionRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
// استخدام بورت 3000 ليتوافق مع إعدادات المنصة
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
/**
 * إعدادات هامة جداً لحل مشكلة Broken Pipe و Request Aborted
 * نقوم برفع مهلة السيرفر لـ 10 دقائق للسماح برفع الملفات الضخمة
 */
server.timeout = 600000;          // 10 دقائق
server.keepAliveTimeout = 610000; 
server.headersTimeout = 620000;