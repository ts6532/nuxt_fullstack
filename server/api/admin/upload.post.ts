import File from "~~/server/models/file";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

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

  const storage = useStorage("uploads");
  const { filename: fileName, data } = convertedFile;
  try {
    await storage.setItemRaw(fileName, file.data);
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
      path: `/uploads/${fileName}`,
      storageType: "uploads",
    });

    await fileRecord.save();

    return fileRecord._id.toString();
  } catch (error) {
    try {
      await storage.removeItem(fileName);
    } catch (removeError) {
      console.error(
        `[upload] Ошибка при удалении файла ${fileName} из storage после ошибки MongoDB:`,
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
