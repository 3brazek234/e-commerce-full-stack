import multer from 'multer';

// 1. إعداد التخزين في الذاكرة (Memory Storage)
// ده اللي هيخلي req.file.buffer متاح في الكنترولر
const storage = multer.memoryStorage();

// 2. فلتر للتأكد إن الملف صورة
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// 3. تصدير الأداة
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2 // حد أقصى 2 ميجا (مهم جداً في طريقة الميموري عشان الرامات)
  },
});