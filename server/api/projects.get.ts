import { createError, defineEventHandler, getQuery } from "h3";
import ProjectModel, { type ProjectPreviewDTO } from "~~/server/models/project";
import type { FileDTO } from "~~/server/models/file";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const skip = Number(query.skip as string) || 0;
    const limit = Number(query.limit as string) || 6;

    const projects = await ProjectModel.find({ published: true })
      .limit(limit)
      .skip(skip)
      .populate<{ previewImage: FileDTO }>("previewImage")
      .select("_id title slug description tags previewImage")
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
