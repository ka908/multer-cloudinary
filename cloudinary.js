const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

// (async function () {
//   // Configuration
cloudinary.config({
  cloud_name: "dcilcqkiq",
  secure: true,
  api_key: "166412622424926",
  api_secret: "xcVwT6T_xgpnwhCvGz8dx4VmWpk", // Click 'View API Keys' above to copy your API secret
});

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Store file in memory

// POST route to upload image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  //   // Upload the file buffer to Cloudinary using a stream
  console.log(req.file.buffer);
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" }, // Upload as an image
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res
            .status(500)
            .json({ msg: "Cloudinary upload failed", error });
        }
        res.json({
          msg: "Image uploaded successfully",
          url: result.secure_url,
        });
      }
    );
    console.log(uploadStream);

    //   Convert buffer to a stream and pipe it to Cloudinary
    const bufferStream = new Readable();
    console.log(bufferStream);
    bufferStream.push(req.file.buffer);
    console.log(req.file.buffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.log(error);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();
