import mongoose, { Schema, Types } from "mongoose";
import type { FileDTO } from "./file";

export interface ContentBlock {
  _id?: string;
  type: 'text' | 'image' | 'carousel';
}

export interface TextBlock extends ContentBlock {
  type: 'text';
  content: string;
}

export interface ImageBlock extends ContentBlock {
  type: 'image';
  image: string; // ObjectId as string for saving
}

export interface CarouselBlock extends ContentBlock {
  type: 'carousel';
  images: string[]; // array of ObjectIds
}

export interface PopulatedContentBlock extends ContentBlock {
  type: 'text' | 'image' | 'carousel';
}

export interface PopulatedTextBlock extends PopulatedContentBlock {
  type: 'text';
  content: string;
}

export interface PopulatedImageBlock extends PopulatedContentBlock {
  type: 'image';
  image?: FileDTO;
}

export interface PopulatedCarouselBlock extends PopulatedContentBlock {
  type: 'carousel';
  images: FileDTO[];
}

export type ContentBlockUnion = TextBlock | ImageBlock | CarouselBlock;
export type PopulatedContentBlockUnion = PopulatedTextBlock | PopulatedImageBlock | PopulatedCarouselBlock;

export interface ProjectDTO {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  mainImage?: string;
  previewImage?: string;
  content: ContentBlockUnion[];
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedProjectDTO {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  mainImage?: FileDTO;
  previewImage?: FileDTO;
  content: PopulatedContentBlockUnion[];
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const contentBlockSchema = new Schema({
  type: { type: String, required: true }
}, { discriminatorKey: 'type', _id: true });

const textBlockSchema = new Schema({
  content: { type: String, required: true }
});

const imageBlockSchema = new Schema({
  image: { type: Types.ObjectId, ref: 'File', required: true }
});

const carouselBlockSchema = new Schema({
  images: [{ type: Types.ObjectId, ref: 'File' }]
});

const projectSchema = new Schema<ProjectDTO>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  tags: [{ type: String }],
  mainImage: { type: Types.ObjectId, ref: 'File' },
  previewImage: { type: Types.ObjectId, ref: 'File' },
  content: [contentBlockSchema],
  published: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const ContentBlockModel = mongoose.model('ContentBlock', contentBlockSchema);
ContentBlockModel.discriminator('text', textBlockSchema);
ContentBlockModel.discriminator('image', imageBlockSchema);
ContentBlockModel.discriminator('carousel', carouselBlockSchema);

const ProjectModel = mongoose.model('Project', projectSchema);

export default ProjectModel;
