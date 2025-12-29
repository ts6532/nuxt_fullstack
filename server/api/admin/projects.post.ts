import { createError, defineEventHandler, readBody } from "h3";
import { ContentBlockUnion } from "~~/server/models/project";
import ProjectModel from "~~/server/models/project";
import { generateSlug } from "~~/server/utils/slug";

interface CreateProjectDTO {
  title: string;
  description?: string;
  tags: string[];
  mainImage?: string;
  previewImage?: string;
  content: ContentBlockUnion[];
  published: boolean;
  order: number;
}

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  try {
    const body = await readBody<CreateProjectDTO>(event);

    const slug = generateSlug(body.title);

    const project = new ProjectModel({
      ...body,
      slug,
    });

    await project.save();

    return project;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Ошибка при создании проекта",
      data: error,
    });
  }
});
