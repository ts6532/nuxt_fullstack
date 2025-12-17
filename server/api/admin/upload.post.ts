import File from "~~/server/models/file";
import { put } from "@vercel/blob";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const config = useRuntimeConfig();

  const formData = await readMultipartFormData(event);

  const file = validateFormDataArray(formData);

  // Если нет валидных файлов, возвращаем ошибку
  if (!file) {
    throw createError({
      statusCode: 500,
      statusMessage: "Фиал не валиден или его нет",
    });
  }

  // Конвертация изображений в WebP
  let convertedFile = file;
  try {
    convertedFile = await convertImage(file);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при конвертации фаила",
    });
  }

  const { filename: fileName, data } = convertedFile;
  let blob;
  try {
    blob = await put(fileName, data, {
      access: 'public',
      token: config.blobToken,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Не удалось сохранить файлы в хранилище",
      data: error,
    });
  }

  try {
    const fileRecord = new File({
      filename: fileName,
      path: blob.url,
      storageType: "blob",
    });

    await fileRecord.save();

    return fileRecord._id.toString();
  } catch (error) {
    try {
      const { del } = await import("@vercel/blob");
      await del(blob.url, { token: config.blobToken });
    } catch (removeError) {
      console.error(
        `[upload] Ошибка при удалении файла ${blob.url} из blob после ошибки MongoDB:`,
        removeError,
      );
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при сохранении метаданных фаила в базу данных",
      data: error,
    });
  }
});
