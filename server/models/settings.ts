import mongoose, { Schema, Types } from "mongoose";
import type { FileDTO } from "./file";

export interface SettingsDTO {
  _id: string;
  heroImage?: string;
  aboutImage?: string;
  aboutText?: string;
  vkLink?: string;
  instLink?: string;
  beLink?: string;
}

export interface PopulatedSettingsDTO {
  _id: string;
  heroImage?: FileDTO;
  aboutImage?: FileDTO;
  aboutText?: string;
  vkLink?: string;
  instLink?: string;
  beLink?: string;
}

const settingsSchema = new Schema<SettingsDTO>({
  heroImage: { type: Types.ObjectId, ref: "File" },
  aboutImage: { type: Types.ObjectId, ref: "File" },
  aboutText: { type: String },
  vkLink: { type: String },
  instLink: { type: String },
  beLink: { type: String },
});

const SettingsModel = mongoose.model<SettingsDTO>("Settings", settingsSchema);

export default SettingsModel;
