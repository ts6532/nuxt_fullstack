import sharp from "sharp";
import type { MultiPartData } from "h3";
import {
  DEFAULT_QUALITY,
  DEFAULT_FORMAT,
} from "~~/shared/constants/IMAGE_UPLOADS_OPTS";

export interface ImageConversionOptions {
  quality?: number; // качество от 0 до 100, по умолчанию 80
  format?: "webp" | "jpeg" | "png"; // формат выходного изображения
}

export async function convertImage(
  file: MultiPartData & { filename: string },
  options: ImageConversionOptions = {}
) {
  const quality = options.quality ?? DEFAULT_QUALITY;
  const format = options.format ?? DEFAULT_FORMAT;

  try {
    // Удаляем оригинальное расширение и добавляем новое
    const originalNameWithoutExt = file.filename.replace(/\.[^/.]+$/, "");
    const processedFileName = `${originalNameWithoutExt}.${format}`;

    // Конвертируем изображение
    let processedBuffer: Buffer;

    switch (format) {
      case "webp":
        processedBuffer = await sharp(file.data).webp({ quality }).toBuffer();
        break;
      case "jpeg":
        processedBuffer = await sharp(file.data).jpeg({ quality }).toBuffer();
        break;
      case "png":
        processedBuffer = await sharp(file.data).png({ quality }).toBuffer();
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    return {
      data: processedBuffer,
      filename: processedFileName,
    };
  } catch (error) {
    throw error;
  }
}
