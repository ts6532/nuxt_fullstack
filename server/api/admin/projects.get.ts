import { createError, defineEventHandler } from "h3";
import { PopulatedProjectDTO } from "~~/server/models/project";
import ProjectModel from "~~/server/models/project";
import type { FileDTO } from "~~/server/models/file";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  try {
    const projects = await ProjectModel.find()
      .populate<{ mainImage: FileDTO }>("mainImage")
      .populate<{ previewImage: FileDTO }>("previewImage")
      .populate<{ "content.image": FileDTO }>("content.image")
      .populate<{ "content.images": FileDTO[] }>("content.images")
      .sort({ order: 1, createdAt: -1 })
      .lean()
      .exec();

    return projects as PopulatedProjectDTO[];
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка при получении проектов",
      data: error,
    });
  }
});
