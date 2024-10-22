const express = require("express");
const cloudinary = require("cloudinary").v2;
// const upload = require('./multer-config');
const app = express();
const multer = require("multer");
const storage = multer.memoryStorage(); // store image in memory
const upload = multer({ storage: storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dcilcqkiq",
  api_key: "166412622424926",
  api_secret: "xcVwT6T_xgpnwhCvGz8dx4VmWpk", // Click 'View API Keys' above to copy your API secret
});

// Express route for image upload
app.post("/up", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file.originalname);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "folder_name",
    });

    // Send the Cloudinary URL in the response
    res.json({ imageUrl: result.secure_url });
    console.log(result.secure_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
