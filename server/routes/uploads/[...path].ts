export default defineEventHandler(async (event) => {
  const storage = useStorage("uploads");
  
  const path = await getRouterParam(event, "path");

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Path is required",
    });
  }

  return await storage.getItemRaw(path);
});
