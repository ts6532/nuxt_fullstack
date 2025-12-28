import { createError, defineEventHandler } from "h3";
import { FileDTO } from "~~/server/models/file";
import SettingsModel from "~~/server/models/settings";

export default defineEventHandler(async () => {
  let settings;

  try {
    settings = await SettingsModel.findOne();
  } catch (error) {
    console.log("No settings", error);
  }

  try {
    console.log("Creating Settings");
    settings = new SettingsModel({});
    await settings.save()
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при создании настроек",
      data: error,
    });
  }

  try {
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
