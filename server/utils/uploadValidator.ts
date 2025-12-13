import type { MultiPartData } from "h3";
import { DEFAULT_ALLOWED_TYPES, DEFAULT_MAX_FILE_SIZE } from "~~/shared/constants/IMAGE_UPLOADS_OPTS";





export function validateUploadFile(
  file: MultiPartData | undefined,
): boolean {

  // Проверка наличия файла
  if (!file) {
    return false;
  }

  // Проверка наличия имени файла
  if (!file.filename) {
    return false;
  }

  // Проверка размера файла
  if (file.data.length > DEFAULT_MAX_FILE_SIZE) {
    return false;
  }

  // Проверка типа файла
  if (!file.type || !DEFAULT_ALLOWED_TYPES.includes(file.type)) {
    return false;
  }

  return true;
}

export function validateFormDataArray(
  formData: MultiPartData[] | undefined,
) {
  if (!formData || formData.length < 1) {
    console.error("[uploadValidator] No files uploaded");
    return null;
  }

  let file = formData[0];

  if (validateUploadFile(file)) {
    return file as MultiPartData & { filename: string };
  }

  return null;
}
