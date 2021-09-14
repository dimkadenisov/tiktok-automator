/**
 *
 * @param {string} url ссылка, которую нужно проверить
 * @param {string[]} baseUrls массив базовых ссылок
 *
 * @returns {boolean} прошла ли ссылка проверку
 */
function checkUrl(url, baseUrls) {
  for (const baseUrl of baseUrls) {
    return url.includes(baseUrl);
  }
}
export { checkUrl };
