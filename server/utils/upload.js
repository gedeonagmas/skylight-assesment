const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + Math.round(Math.random() * 1e9) + "." + file.mimetype.split("/")[1]);
  },
});
exports.upload = multer({ storage: diskStorage });
 