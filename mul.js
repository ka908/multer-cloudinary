// const multer = require("multer");
// const express = require("express");
// const cloudinary = require("cloudinary").v2;
const path = require("path");
// const { Readable } = require("stream");

// const app = express();
// cloudinary.config({
//   cloud_name: "dcilcqkiq",
//   secure: true,
//   api_key: "166412622424926",
//   api_secret: "xcVwT6T_xgpnwhCvGz8dx4VmWpk", // Click 'View API Keys' above to copy your API secret
// });

// // Configure storage engine and filename
// // const storage = multer.diskStorage({
// //   destination: "./uploads/",
// //   filename: function (req, file, cb) {
// //     // cb(null, `${Date.now()}-${file.originalname}`);
// //     cb(null, `${file.originalname}`);
// //   },
// // });

// // // Initialize upload middleware and add file size limit
// // // const upload = multer({ dest: "uploads/" });
// // const upload = multer({ storage: storage });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// //   storage: storage,
// //   limits: { fileSize: 1000000 } // 1MB file size limit
// // }).single('myFile'); // 'myFile' is the name attribute of the file input field

// // File upload route
// app.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     // const { originalname } = req.file;
//     console.log(req.file);

//     //  ( req.file)
//     if (!req.file) {
//       return res.status(400).json({ error: "Please send file" });
//     } else {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         req.file.buffer,
//         {
//           resource_type: "image",
//           use_filename: true,
//           public_id: req.file.originalname,
//           unique_filename: false,
//         }, // Upload as an image
//         (error, result) => {
//           if (error) {
//             console.error("Cloudinary Upload Error:", error);
//             return res
//               .status(500)
//               .json({ msg: "Cloudinary upload failed", error });
//           }
//           // console.log(result.secure_url);
//           // // const [a] = result.secure_url;
//           // const str = result.secure_url;

//           // // console.log(truncatedStr);
//           // // let abc = truncatedStr + req.file.originalname;
//           // // console.log(abc);
//           // const urlParts = new URL(str);
//           // console.log(urlParts);
//           // const str1 = urlParts.pathname;
//           // let truncatedStr = str1.substring(0, 36);
//           // console.log(truncatedStr);
//           // let abc = urlParts.origin + truncatedStr + req.file.originalname;
//           const str = result.secure_url; // Original Cloudinary URL
//           const originalName = req.file.originalname; // Original file name

//           // Find the last slash ("/") to separate the base URL and the file name
//           const lastSlashIndex = str.lastIndexOf("/");

//           // Extract the base URL (everything before the last slash) and append the new file name
//           const baseUrl = str.substring(0, lastSlashIndex + 1);
//           console.log(baseUrl); // Base URL with the trailing "/"

//           // Append the new file name
//           const newUrl = baseUrl + originalName;

//           console.log(newUrl); // Outputs a valid URL with the new file name

//           // let abc = `${urlParts.origin}${truncatedStr}${req.file.originalName}`;
//           // console.log(abc); // This will give a valid URL

//           // res.redirect(result.secure_url); // Overwrite /old-url to point to /new-url
//           // Truncate to 5 characters
//           res.json({
//             msg: "Image uploaded successfully",
//             url: newUrl,
//             url1: result.secure_url,
//             name: req.file.originalname,
//           });
//         }
//       );
//       // console.log(secure_url);
//       console.log(req.file);

//       //   Convert buffer to a stream and pipe it to Cloudinary
//       const bufferStream = new Readable();
//       // console.log(bufferStream);
//       bufferStream.push(req.file.buffer);
//       // console.log(req.file.buffer);
//       bufferStream.push(null);
//       bufferStream.pipe(uploadStream);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
// //   const result = await cloudinary.uploader.upload({
// //     secure_url: req.file.buffer,
// //     resource_type: "image",
// //     use_filename: true,
// //     unique_filename: false,
// //     // folder: "uploads", // Optional: specify folder in Cloudinary
// //   });

// //   console.log("Upload Successful:", result.secure_url);
// //   console.log("Upload Successful:", req.file.originalname);
// //   console.log("Upload Successful:", req.file.path);
// //   console.log("Upload Successful:", req.file.size);

// //   res.json({ msg: "Image uploaded successfully", url: result.secure_url });
// //   return result.secure_url; // URL of the uploaded file
// // } catch (error) {
// //   console.error("Upload Error:", error);

// app.listen(3000, () => console.log("Server started on port 3000"));

const multer = require("multer");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dcilcqkiq",
  secure: true,
  api_key: "166412622424926",
  api_secret: "xcVwT6T_xgpnwhCvGz8dx4VmWpk",
});

// Use multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// File upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { originalname } = req.file;
    // console.log(req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }
    const bufferStream = new Readable();
    // bufferStream.push(req.file.buffer);
    bufferStream.push(null); // Signal the end of the stream
    // console.log("bufferStream", bufferStream);
    const fileExtension = path.extname(originalname).toLowerCase(); // Get file extension, e.g., .jpg or .jpeg
    console.log("fileExtension", fileExtension);
    // Upload the image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "pictures",
        use_filename: true,
        public_id: originalname.split(".")[0],
        unique_filename: true,
        overwrite: true,
        // format: fileExtension === ".png" || fileExtension === ".jpg",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res
            .status(500)
            .json({ msg: "Cloudinary upload failed", error });
        }
        res.json({
          msg: "Image uploaded successfully",
          cloudinary_url: result.secure_url, // The Cloudinary URL
        });
      }
    );
    bufferStream.pipe(uploadStream);
    // console.log(storage);
    // console.log(upload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
});

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));
