const cloudinary = require("../config/cloudinary");
const { successResponse, errorResponse } = require("../utils/response");
const { Readable } = require("stream");

/**
 * Upload buffer to Cloudinary via stream.
 */
const uploadToCloudinary = (buffer, folder, resourceType = "image") =>
  new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: resourceType,
    };
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (err, result) => (err ? reject(err) : resolve(result))
    );
    Readable.from(buffer).pipe(uploadStream);
  });

const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, { statusCode: 400, message: "No file uploaded" });
    const result = await uploadToCloudinary(req.file.buffer, "launchfolio/user-pic");
    return successResponse(res, {
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (err) {
    next(err);
  }
};

const uploadProjectImage = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, { statusCode: 400, message: "No file uploaded" });
    const result = await uploadToCloudinary(req.file.buffer, "launchfolio/projects-pic");
    return successResponse(res, {
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (err) {
    next(err);
  }
};

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, { statusCode: 400, message: "No file uploaded" });
    const result = await uploadToCloudinary(req.file.buffer, "launchfolio/resumes", "raw");
    return successResponse(res, {
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadProfileImage, uploadProjectImage, uploadResume };
