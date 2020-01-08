import { noop } from "./helpers";

interface ImageCreateOptions {
  onLoad: (ev: Event) => void;
  onError: (ev: Event | string) => void;
}

export const createImage = (
  url: string,
  options: ImageCreateOptions = { onLoad: noop, onError: noop }
) => {
  const image = new Image();
  image.src = url;
  image.onload = options.onLoad;
  image.onerror = options.onError;
};
