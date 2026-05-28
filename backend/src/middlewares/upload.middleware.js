const multer = require("multer");

// Use memory storage — files go straight to Cloudinary, no disk I/O
const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"), false);
  }
};

// Allow all file types — used for resume uploads
const anyFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Separate multer instance for non-image files (resume, etc.)
upload.raw = multer({
  storage,
  fileFilter: anyFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for docs
});

module.exports = upload;
