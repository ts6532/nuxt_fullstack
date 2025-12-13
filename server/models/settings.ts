import mongoose, { Schema, Types } from "mongoose";

export interface SettingsDTO {
  _id: string;
  heroImage?: string;
  aboutImage?: string;
}

const settingsSchema = new Schema<SettingsDTO>({
  heroImage: { type: Types.ObjectId, ref: "File" },
  aboutImage: { type: Types.ObjectId, ref: "File" },
});

const SettingsModel = mongoose.model("Settings", settingsSchema);

export default SettingsModel;
