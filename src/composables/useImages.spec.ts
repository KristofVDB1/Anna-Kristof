import { describe, it, expect } from "vitest";
import useImages from "./useImages";

describe("useImages", () => {
  it("should match images snapshot", () => {
    const images = useImages();
    //width/height is undefined as it is not available in the test environment (rollup does not process the images).
    expect(images).toMatchInlineSnapshot(`
          [
            {
              "alt": "Atacama Desert Chile",
              "aspectRatio": NaN,
              "filename": "Atacama-Desert-Chile.jpg",
              "height": undefined,
              "idx": 0,
              "path": "/images/Atacama-Desert-Chile.jpg",
              "width": undefined,
            },
            {
              "alt": "Hallstatter See Austria",
              "aspectRatio": NaN,
              "filename": "Hallstatter-See-Austria.jpg",
              "height": undefined,
              "idx": 1,
              "path": "/images/Hallstatter-See-Austria.jpg",
              "width": undefined,
            },
            {
              "alt": "Night sky Italy",
              "aspectRatio": NaN,
              "filename": "Night-sky-Italy.jpg",
              "height": undefined,
              "idx": 2,
              "path": "/images/Night-sky-Italy.jpg",
              "width": undefined,
            },
            {
              "alt": "Wadi Rum Village Jordan Sunset",
              "aspectRatio": NaN,
              "filename": "Wadi-Rum-Village-Jordan-Sunset.jpg",
              "height": undefined,
              "idx": 3,
              "path": "/images/Wadi-Rum-Village-Jordan-Sunset.jpg",
              "width": undefined,
            },
            {
              "alt": "a red panda",
              "aspectRatio": NaN,
              "filename": "a-red-panda.jpg",
              "height": undefined,
              "idx": 4,
              "path": "/images/a-red-panda.jpg",
              "width": undefined,
            },
            {
              "alt": "iceland aurora borealis",
              "aspectRatio": NaN,
              "filename": "iceland-aurora-borealis.jpg",
              "height": undefined,
              "idx": 5,
              "path": "/images/iceland-aurora-borealis.jpg",
              "width": undefined,
            },
            {
              "alt": "llama",
              "aspectRatio": NaN,
              "filename": "llama.jpg",
              "height": undefined,
              "idx": 6,
              "path": "/images/llama.jpg",
              "width": undefined,
            },
            {
              "alt": "victoria peak",
              "aspectRatio": NaN,
              "filename": "victoria-peak.jpg",
              "height": undefined,
              "idx": 7,
              "path": "/images/victoria-peak.jpg",
              "width": undefined,
            },
          ]
        `);
  });
});
