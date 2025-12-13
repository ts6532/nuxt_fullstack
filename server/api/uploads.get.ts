import FileModel from "~~/server/models/file";

export default defineEventHandler(async (event) => {
  try {
    const files = await FileModel.find().lean().exec();

    return files;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при получении файлов из базы данных",
      data: error,
    });
  }
});
