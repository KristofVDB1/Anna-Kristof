import { create, insertMultiple, search } from "@orama/orama";
import { images } from "./useImages";
import config from "~~/gallery.config";

const schema = {
  idx: "number",
  alt: "string",
  filename: "string",
  path: "string",
  width: "number",
  height: "number",
  aspectRatio: "number",
} as const;
const orama = await create({
  schema,
});

await insertMultiple(orama, images);

export type UseImageSearchParams = {
  term: string;
  tolerance?: number;
};

export default async function useImageSearch(params: UseImageSearchParams) {
  return await search(orama, params, config.search?.oramaSupportedLanguage);
}
