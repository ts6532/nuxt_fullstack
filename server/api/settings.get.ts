import { createError, defineEventHandler } from "h3";
import { FileDTO } from "~~/server/models/file";
import SettingsModel from "~~/server/models/settings";

export default defineEventHandler(async () => {
 
  try {
    let settings = await SettingsModel.findOne()
      .populate<{ heroImage: FileDTO }>("heroImage")
      .populate<{ aboutImage: FileDTO }>("aboutImage")
      .lean();

    if (!settings) {
      await SettingsModel.create({});
      settings = await SettingsModel.findOne()
        .populate<{ heroImage: FileDTO }>("heroImage")
        .populate<{ aboutImage: FileDTO }>("aboutImage")
        .lean();
    }
    
    return settings;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при получении настроек",
      data: error,
    });
  }
});
