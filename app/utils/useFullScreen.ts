import ImageViewer from "~/components/ImageViewer.vue";
import type { FileDTO } from "~~/server/models/file";

type UseFullScreenType = {
  image?: FileDTO;
  path?: string;
  images?: FileDTO[];
  index?: number;
};

export const useFullscreen = ({
  image,
  path,
  images,
  index,
}: UseFullScreenType) => {
  const url = image?.path ?? path;
  
  if (!url && !images?.length) return;

  const overlay = useOverlay();

  const modal = overlay.create(ImageViewer);

  return modal.open(
    url
      ? {
          url,
        }
      : { images, index },
  );
};
