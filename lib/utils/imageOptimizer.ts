/**
 * Client-side Image Optimization Utility
 * Automatically resizes images to a maximum width/height (default 1600px)
 * and compresses using HTML5 Canvas to save mobile bandwidth.
 */
export async function optimizeImage(
  file: File,
  maxDimension = 1600,
  quality = 0.85
): Promise<{ dataUrl: string; width: number; height: number; originalSize: number; optimizedSize: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to create canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);

        // Approximate size in bytes from base64
        const stringLength = dataUrl.length - "data:image/jpeg;base64,".length;
        const optimizedSize = Math.round(stringLength * 0.75);

        resolve({
          dataUrl,
          width,
          height,
          originalSize: file.size,
          optimizedSize,
        });
      };

      img.onerror = () => reject(new Error("Failed to load image file"));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}
