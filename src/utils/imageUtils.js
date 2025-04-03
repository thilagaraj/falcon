import imageCompression from "browser-image-compression";
const options = {
  maxSizeMB: 0.25,
  maxWidthOrHeight: 1200,
  useWebWorker: true,
  initialQuality: 0.7,
  alwaysKeepResolution: false,
  exifOrientation: true,
  fileType: "image/jpeg",
  mozjpeg: true,
  webp: false,
};
const LARGE_FILE_THRESHOLD = 5;
const SMALL_FILE_THRESHOLD = 1;

// Compression quality settings
const AGGRESSIVE_COMPRESSION = {
  maxSizeMB: 0.2,
  initialQuality: 0.6,
};

const LIGHT_COMPRESSION = {
  maxSizeMB: 0.3,
  initialQuality: 0.8,
};

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (result && typeof result === "string") {
        const base64Data = result.split(",")[1];
        if (base64Data) {
          resolve(base64Data);
        } else {
          reject(new Error("Base64 value is null or undefined"));
        }
      } else {
        reject(new Error("Failed to read file as Base64"));
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsDataURL(file);
  });
};

export const processImage = async (file) => {
  if (!file) return null;
  const fileSizeMB = file.size / 1024 / 1024;
  let compressionOptions = { ...options };

  if (fileSizeMB > LARGE_FILE_THRESHOLD) {
    // For very large images, use more aggressive compression
    compressionOptions = { ...compressionOptions, ...AGGRESSIVE_COMPRESSION };
  } else if (fileSizeMB < SMALL_FILE_THRESHOLD) {
    // For smaller images, use lighter compression
    compressionOptions = { ...compressionOptions, ...LIGHT_COMPRESSION };
  }

  let compressedFile = file;
  try {
    console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    compressedFile = await imageCompression(file, compressionOptions);
    console.log(
      `Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
    );
  } catch (err) {
    console.error("Compression error:", err);
  }
  return await readFileAsBase64(compressedFile);
};
