import imageCompression from "browser-image-compression";
const options = {
  maxSizeMB: 0.33,
  maxWidthOrHeight: 500,
  useWebWorker: true,
};
export const processImage = async (file) => {
  if (!file) return null;
  let compressedFile = file;
  try {
    compressedFile = await imageCompression(file, options);
  } catch (err) {
    console.error("Compression error:", err);
  }
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
    reader.readAsDataURL(compressedFile);
  });
};
