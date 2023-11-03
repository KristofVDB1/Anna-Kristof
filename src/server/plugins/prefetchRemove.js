import * as cheerio from "cheerio";

//currently no other workaround that works for this, including modifying the manifest at build.
//Without this, all images are prefetched on every page.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html) => {
    /**
     * @WORKAROUND: remove auto generated <link rel="prefetch" /> tags from the head
     * currently it automatically adds prefetch tags for all assets imported in the page
     */
    // https://github.com/nuxt/nuxt/issues/18376#issuecomment-1431318970
    // https://github.com/nuxt/nuxt/issues/18376

    html.head = html.head.map((head) => {
      const $ = cheerio.load(head);
      $("link[rel=prefetch]").each(function () {
        $(this).remove();
      });

      return $.root().find("head").contents();
    });
  });
});
