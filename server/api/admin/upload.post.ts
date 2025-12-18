import File from "~~/server/models/file";
import { getStorageProvider } from "~~/server/utils/storage";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const config = useRuntimeConfig();
  const storage = getStorageProvider();

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
  let fileUrl;
  try {
    fileUrl = await storage.upload(fileName, data);
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
      path: fileUrl,
      storageType: config.storageType,
    });

    await fileRecord.save();

    return fileRecord._id.toString();
  } catch (error) {
    try {
      await storage.delete(fileUrl);
    } catch (removeError) {
      console.error(
        `[upload] Ошибка при удалении файла ${fileUrl} после ошибки MongoDB:`,
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
