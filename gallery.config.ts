const config: GalleryOptions = {
    title: "Gallery",
    description: "An image gallery built with Nuxt 3",
    htmlLang: "en",
    baseURL: "https://kristofvdb1.github.io/Anna-Kristof/", //without trailing slash, used for metadata giving previews in social media
    search: {
        //if not defined search is disabled
        //uses alt text
        oramaSupportedLanguage: "english", //https://docs.oramasearch.com/open-source/text-analysis/stop-words#supported-languages
    },
};

export default config;

export type GalleryOptions = {
    /**
     * HTML meta title
     */
    title: string;
    /**
     * HTML meta description
     */
    description: string;
    /**
     * Locale used for HTML lang attribute
     * @example "de"
     * @example "en"
     */
    htmlLang: string;
    /**
     * Enable search functionality
     * @example "https://gallery-nuxt.netlify.app"
     */
    baseURL: string;
    /**
     * Optional function to generate alt text for images from filename
     * @example Filename example: "my-image.jpg"
     */
    altTextGenerator?: (filename: string) => string;
    /**
     * Configure search functionality, if not defined search is disabled
     */
    search?: {
        oramaSupportedLanguage: string;
    };
    /**
     * Image captions: usually the file names are used for alt text, but you can override them here.
     */
    imageCaptions?: {
        [key: string]: string;
    };
};
