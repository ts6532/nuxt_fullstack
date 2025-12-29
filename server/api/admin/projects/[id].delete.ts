import { createError, defineEventHandler } from "h3";
import ProjectModel from "~~/server/models/project";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  try {
    const id = getRouterParam(event, "id");

    if (!id)
      throw createError({ statusCode: 400, message: "ID required" });

    await ProjectModel.findByIdAndDelete(id);

    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка при удалении проекта",
      data: error,
    });
  }
});
