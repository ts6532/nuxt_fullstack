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
      throw createError({ statusCode: 400, statusMessage: "ID required" });

    const body = await readBody<UpdateProjectDTO>(event);

    const data: ProjectData = { ...body };

    if (data.title) {
      data.slug = generateSlug(data.title);
    }

    const project = await ProjectModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!project)
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });

    return project;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при обновлении проекта",
      data: error,
    });
  }
});
