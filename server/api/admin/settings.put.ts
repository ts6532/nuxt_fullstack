import mongoose from "mongoose";
import Settings from "~~/server/models/settings";
import File from "~~/server/models/file";

interface UpdateSettingsBody {
  heroImage?: string;
  aboutImage?: string;
  aboutText?: string;
  vkLink?: string;
  instLink?: string;
  beLink?: string;
}

async function validateFileId(
  fileId: string | undefined,
  fieldName: string,
): Promise<void> {
  if (!fileId) return;

  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    throw createError({
      statusCode: 400,
      message: `Некорректный ID файла для ${fieldName}`,
    });
  }

  const file = await File.findById(fileId);
  if (!file) {
    throw createError({
      statusCode: 404,
      message: `Файл с ID ${fileId} не найден для поля ${fieldName}`,
    });
  }
}

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  try {
    const body: UpdateSettingsBody = await readBody(event);
    const { heroImage, aboutImage } = body;

    await validateFileId(heroImage, "heroImage");
    await validateFileId(aboutImage, "aboutImage");

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    settings.overwrite({ ...body });

    await settings.save({});

    return {
      success: true,
      message: "Настройки успешно обновлены",
      data: settings,
    };
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && "statusCode" in error ? error.statusCode : 500;
    const message =
      error instanceof Error && "message" in error
        ? error.message
        : "Ошибка при обновлении настроек";

    throw createError({
      statusCode: statusCode as number,
      message: message as string,
      data: error instanceof Error ? error.message : String(error),
    });
  }
});
