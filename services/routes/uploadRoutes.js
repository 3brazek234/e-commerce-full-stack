// في ملف الـ routes مثلاً routes/imageRoutes.js
const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary.js"); // المسار لملف إعداد Cloudinary

const router = express.Router();

// إعداد Multer لتخزين الملف في الذاكرة مؤقتاً
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// مسار لرفع صورة 
router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  console.log(req.file);
  try {
    // تحويل الـ buffer إلى base64 string
    // أو استخدام Data URI (أو حتى Stream مباشرةً لو Multer بيديها)
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataUri = "data:" + req.file.mimetype + ";base64," + b64;

    // رفع الصورة لـ Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "project_images", // اسم المجلد اللي هتتحفظ فيه الصور في Cloudinary
      public_id: req.file.originalname.split(".")[0] + "-" + Date.now(), // اسم فريد للصورة
    });

    // result.secure_url هو الـ URL بتاع الصورة اللي تم رفعها على Cloudinary
    const imageUrl = result.secure_url;

    // هنا هتحفظ الـ imageUrl في الداتابيز بتاعتك (مثلاً في User Model أو Product Model)
    // const newProduct = await Product.create({ name: "My Product", image: imageUrl });

    res.status(200).json({
      message: "Image uploaded successfully to Cloudinary",
      imageUrl: imageUrl,
      publicId: result.public_id, // ممكن تحتاج الـ public_id لو عايز تمسح الصورة بعدين
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res
      .status(500)
      .json({
        message: "Error uploading image to Cloudinary",
        error: error.message,
      });
  }
});

// مثال لمسح صورة (هتحتاج الـ public_id اللي حفظته في الداتابيز)
router.delete("/delete-image/:publicId", async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.status(200).json({ message: "Image deleted from Cloudinary" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    res
      .status(500)
      .json({
        message: "Error deleting image from Cloudinary",
        error: error.message,
      });
  }
});

module.exports = router;