import { createError, defineEventHandler, getQuery } from "h3";
import ProjectModel, { type ProjectPreviewDTO } from "~~/server/models/project";
import type { FileDTO } from "~~/server/models/file";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const skip = parseInt(query.skip as string) || 0;
    const limit = parseInt(query.limit as string) || 12;

    const projects = await ProjectModel.find({ published: true })
      .populate<{ previewImage: FileDTO }>("previewImage")
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('_id title slug description tags previewImage')
      .lean()
      .exec();

    return projects as ProjectPreviewDTO[];
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при получении проектов",
      data: error,
    });
  }
});
