// import multer from "multer";
// import crypto from "crypto";
// import path from "path";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // cb(null, "/tmp");
//         cb(null, "./public/tmp")
//     },
//     filename: function (req, file, cb) {
//         crypto.randomBytes(12, function (err, bytes) {
//             const fn = bytes.toString("hex") + path.extname(file.originalname)
//             cb(null, fn)
//         })
//     }
// })

// export const upload = multer({ storage: storage })




import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

// Create destination folders if not exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "./public/tmp";
    // let folder = "/tmp";

    // ensureDir(folder);
    cb(null, folder);
  },

  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      if (err) return cb(err);

      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

// File filter (optional but good practice)
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  const allowedDigitalTypes = [
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/x-rar-compressed",
    "audio/mpeg",
    "video/mp4",
    "text/plain",
  ];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedDigitalTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type!"), false);
  }
};

// Create multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
});
