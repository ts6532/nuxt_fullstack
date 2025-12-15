import { createError, defineEventHandler } from "h3";
import { PopulatedProjectDTO } from "~~/server/models/project";
import ProjectModel from "~~/server/models/project";
import type { FileDTO } from "~~/server/models/file";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  try {
    const id = getRouterParam(event, "id");
    if (!id)
      throw createError({ statusCode: 400, statusMessage: "ID required" });

    const project = await ProjectModel.findById(id)
      .populate<{ mainImage: FileDTO }>("mainImage")
      .populate<{ previewImage: FileDTO }>("previewImage")
      .populate<{ "content.image": FileDTO }>("content.image")
      .populate<{ "content.images": FileDTO[] }>("content.images")
      .lean()
      .exec();

    if (!project)
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });

    return project as PopulatedProjectDTO;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при получении проекта",
      data: error,
    });
  }
});
