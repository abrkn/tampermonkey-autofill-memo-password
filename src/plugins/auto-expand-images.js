const get = require('lodash.get');

function injectAutoExpandImages() {
  $('.post .message').each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const $a = $message.find('a');

    const createImg = src =>
      $(
        `<img src="${src}" className="is-mes-expanded-media" style="max-width:${messageWidth}px;max-height:200px;" />`
      );

    $a.each((i, el) => {
      const $el = $(el);
      const href = $(el).attr('href');

      // Direct
      const directImg = get(href.match(/^.+\.(png|jpe?g|gif)$/i), '0');

      if (directImg) {
        $el.html(createImg(directImg));
      }

      // Imgflip
      const imgFlipId = get(href.match(/https?:\/\/imgflip\.com\/i\/([a-z0-9]{6,8})/i), '1');

      if (imgFlipId) {
        const imgFlipSrc = `https://i.imgflip.com/${imgFlipId}.jpg`;
        $el.html(createImg(imgFlipSrc));
      }
    });
  });
}

module.exports = injectAutoExpandImages;