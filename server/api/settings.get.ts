import { createError, defineEventHandler } from "h3";
import { FileDTO } from "~~/server/models/file";
import SettingsModel from "~~/server/models/settings";

export default defineEventHandler(async () => {
  try {
    let settings = await SettingsModel.findOne();

    if (!settings) {
      await SettingsModel.create({});
    }

    let populatedSettings = await SettingsModel.findOne()
      .populate<{ heroImage: FileDTO }>("heroImage")
      .populate<{ aboutImage: FileDTO }>("aboutImage")
      .lean();
    return populatedSettings;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при получении настроек",
      data: error,
    });
  }
});
