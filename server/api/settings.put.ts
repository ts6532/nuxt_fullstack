import mongoose from "mongoose";
import Settings from "~~/server/models/settings";
import File from "~~/server/models/file";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { heroImage, aboutImage } = body;

  // Проверяем, что хотя бы одно из полей передано
  if (!heroImage && !aboutImage) {
    throw createError({
      statusCode: 400,
      statusMessage: "Необходимо указать хотя бы одно из полей: heroImage или aboutImage",
    });
  }

  // Проверяем, что переданные ID файлов являются валидными
  if (heroImage && !mongoose.Types.ObjectId.isValid(heroImage)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Некорректный ID файла для heroImage",
    });
  }

  if (aboutImage && !mongoose.Types.ObjectId.isValid(aboutImage)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Некорректный ID файла для aboutImage",
    });
  }

  try {
    // Находим текущие настройки
    let settings = await Settings.findOne();

    // Если настроек нет, создаем новые
    if (!settings) {
      settings = new Settings();
    }

    // Обновляем heroImage, если передан
    if (heroImage) {
      const file = await File.findById(heroImage);
      if (!file) {
        throw createError({
          statusCode: 404,
          statusMessage: `Файл с ID ${heroImage} не найден`,
        });
      }
      settings.heroImage = heroImage;
    }

    // Обновляем aboutImage, если передан
    if (aboutImage) {
      const file = await File.findById(aboutImage);
      if (!file) {
        throw createError({
          statusCode: 404,
          statusMessage: `Файл с ID ${aboutImage} не найден`,
        });
      }
      settings.aboutImage = aboutImage;
    }

    // Сохраняем настройки
    await settings.save();

    return {
      success: true,
      message: "Настройки успешно обновлены",
      data: settings,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при обновлении настроек",
      data: error,
    });
  }
});