import mongoose from "mongoose";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const uri = config.mongoUri;

  if (!uri) {
    console.error(
      "[mongoose] No MongoDB URI provided (mongoUri runtime config)"
    );
    return;
  }

  // Избегаем повторных подключений при hot-reload в dev
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(uri, {});
      console.log("[mongoose] Connected");
    } catch (err) {
      console.error("[mongoose] Connection error", err);
    }
  }
});
