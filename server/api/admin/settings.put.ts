import mongoose from "mongoose";
import Settings from "~~/server/models/settings";
import File from "~~/server/models/file";

interface UpdateSettingsBody {
  heroImage?: string;
  aboutImage?: string;
  aboutText?: string;
}

async function validateFileId(
  fileId: string,
  fieldName: string,
): Promise<void> {
  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Некорректный ID файла для ${fieldName}`,
    });
  }

  const file = await File.findById(fileId);
  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: `Файл с ID ${fileId} не найден для поля ${fieldName}`,
    });
  }
}

async function updateFileField(
  settings: any,
  fileId: string | undefined,
  fieldName: string,
): Promise<void> {
  if (fileId) {
    await validateFileId(fileId, fieldName);
    settings[fieldName] = fileId;
  }
}

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  try {
    const body: UpdateSettingsBody = await readBody(event);
    const { heroImage, aboutImage, aboutText } = body;

    // Validate aboutText if provided
    if (aboutText !== undefined && typeof aboutText !== "string") {
      throw createError({
        statusCode: 400,
        statusMessage: "Поле aboutText должно быть строкой",
      });
    }

    // Find or create settings
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    // Update fields
    await updateFileField(settings, heroImage, "heroImage");
    await updateFileField(settings, aboutImage, "aboutImage");

    if (aboutText !== undefined) {
      settings.aboutText = aboutText;
    }

    // Save settings
    await settings.save();

    return {
      success: true,
      message: "Настройки успешно обновлены",
      data: settings,
    };
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && "statusCode" in error ? error.statusCode : 500;
    const statusMessage =
      error instanceof Error && "statusMessage" in error
        ? error.statusMessage
        : "Ошибка при обновлении настроек";

    throw createError({
      statusCode: statusCode as number,
      statusMessage: statusMessage as string,
      data: error instanceof Error ? error.message : String(error),
    });
  }
});
