import mongoose, { Schema, Types } from "mongoose";
import type { FileDTO } from "./file";

export interface SettingsDTO {
  _id: string;
  heroImage?: string;
  aboutImage?: string;
  aboutText: string;
}

export interface PopulatedSettingsDTO {
  _id: string;
  heroImage?: FileDTO;
  aboutImage?: FileDTO;
  aboutText: string;
}

const settingsSchema = new Schema<SettingsDTO>({
  heroImage: { type: Types.ObjectId, ref: "File" },
  aboutImage: { type: Types.ObjectId, ref: "File" },
  aboutText: { type: String },
});

const SettingsModel = mongoose.model("Settings", settingsSchema);

export default SettingsModel;
