import { del, put } from "@vercel/blob";

interface StorageProvider {
  upload(fileName: string, data: Buffer): Promise<string>;
  delete(url: string): Promise<void>;
}

class BlobStorage implements StorageProvider {
  private config = useRuntimeConfig();

  async upload(fileName: string, data: Buffer): Promise<string> {
    const blob = await put(fileName, data, {
      access: "public",
      token: this.config.blobToken,
    });
    return blob.url;
  }

  async delete(url: string): Promise<void> {
    await del(url, { token: this.config.blobToken });
  }
}

class LocalStorage implements StorageProvider {
  async upload(fileName: string, data: Buffer): Promise<string> {
    const storage = useStorage("uploads");
    await storage.setItemRaw(fileName, data);
    return `/uploads/${fileName}`;
  }

  async delete(url: string): Promise<void> {
    const storage = useStorage("uploads");
    const fileName = url.replace("/uploads/", "");
    await storage.removeItem(fileName);
  }
}

export function getStorageProvider(): StorageProvider {
  const config = useRuntimeConfig();
  const storageType = config.storageType;

  switch (storageType) {
    case "local":
      return new LocalStorage();
    case "blob":
    default:
      return new BlobStorage();
  }
}
