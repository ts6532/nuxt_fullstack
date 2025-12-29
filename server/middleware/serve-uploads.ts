export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // Проверяем, что запрос к /uploads/
  if (!url.pathname.startsWith("/uploads/")) {
    return;
  }

  const config = useRuntimeConfig();

  // Только для локального хранилища
  if (config.storageType !== "local") {
    return;
  }

  const fileName = url.pathname.replace("/uploads/", "");
  const storage = useStorage("uploads");

  try {
    const file = await storage.getItemRaw(fileName);

    if (!file) {
      throw createError({
        statusCode: 404,
        message: "File not found",
      });
    }

    return file;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to serve file",
      data: error,
    });
  }
});
