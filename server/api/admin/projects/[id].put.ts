import { createError, defineEventHandler, readBody } from "h3";
import { ContentBlockUnion } from "~~/server/models/project";
import ProjectModel from "~~/server/models/project";
import { generateSlug } from "~~/server/utils/slug";

interface UpdateProjectDTO {
  title?: string;
  description?: string;
  tags?: string[];
  mainImage?: string;
  previewImage?: string;
  content?: ContentBlockUnion[];
  published?: boolean;
  order?: number;
}

type ProjectData = UpdateProjectDTO & { slug?: string };
export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  try {
    const id = getRouterParam(event, "id");

    if (!id)
      throw createError({ statusCode: 400, message: "ID required" });

    const body = await readBody<UpdateProjectDTO>(event);

    const data: ProjectData = { ...body };

    if (data.title) {
      data.slug = generateSlug(data.title);
    }

    const project = await ProjectModel.findOneAndReplace({ _id: id }, data, { returnOriginal: false });

    if (!project)
      throw createError({
        statusCode: 404,
        message: "Project not found",
      });

    return project;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка при обновлении проекта",
      data: error,
    });
  }
});
