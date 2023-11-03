export type Image = {
  idx: number;
  path: string;
  filename: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: number;
};

export type ImageItemProps = {
  image: Image;
  loading: "lazy" | "eager";
  preload: boolean;
};

export type ImageAction = "download" | "source" | "close";

export type ImageActionProps = {
  image: Image;
  action: ImageAction;
};
