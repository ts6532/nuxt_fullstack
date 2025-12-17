import File from "~~/server/models/file";
import mongoose from "mongoose";
import { del } from "@vercel/blob";

export default defineEventHandler<{ query: { id: string } }>(async (event) => {
  await requireUserSession(event);

  const config = useRuntimeConfig();

  const id = getQuery(event).id;

  if (!id || typeof id !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "File ID is required",
    });
  }

  // Валидация формата MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid file ID format",
    });
  }

  // Поиск файла в MongoDB
  let fileRecord;
  try {
    fileRecord = await File.findById(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to query database",
      data: error,
    });
  }

  if (!fileRecord) {
    throw createError({
      statusCode: 404,
      statusMessage: "File not found",
    });
  }

  // Удаление файла из blob storage
  try {
    await del(fileRecord.path, { token: config.blobToken });
  } catch (error) {
    // Логируем ошибку, но продолжаем удаление из MongoDB
    console.error("[upload.delete] Failed to remove file from blob storage:", error);
    // Не выбрасываем ошибку здесь - всё равно удаляем запись из MongoDB
  }

  // Удаление записи файла из MongoDB
  try {
    await File.findByIdAndDelete(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete file record from database",
      data: error,
    });
  }

  return {
    success: true,
    message: "File deleted successfully",
    deletedId: id,
  };
});
