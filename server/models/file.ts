import mongoose, { Schema, Types } from "mongoose";

export interface FileDTO {
  _id: string;
  filename: string;
  path: string;
  storageType: string;
}

const fileSchema = new Schema<FileDTO>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  storageType: { type: String, required: true },
});

const FileModel = mongoose.model("File", fileSchema);

export default FileModel;
