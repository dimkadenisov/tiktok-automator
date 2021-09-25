async function getAdCampaignsData(page) {
  const addLinks = [];
  // Получает кнопки, открывающие попап с данными
  const viewDataButtons =
    (await page.$$(
      '.vi-table__fixed-body-wrapper .operation-item:first-child'
    )) || [];

  for await (const button of viewDataButtons) {
    await button.hover();
    await button.click();
    await page.waitForSelector('.info.id-name .label', { timeout: 0 });
    await page.waitForSelector('.overflow-tooltip.value.link .label-content', {
      timeout: 0,
    });
    // Получает идентификатор рекламы
    const adId = await page
      .$('.info.id-name .label')
      .then((element) => element.getProperty('innerText'))
      .then((value) => value.jsonValue());
    // Получает ссылку на рекламную кампанию
    const href = await page
      .$('.overflow-tooltip.value.link .label-content')
      .then((element) => element.getProperty('innerText'))
      .then((value) => value.jsonValue());

    addLinks.push({ adId, href });

    await page.click('.side-slip-close');
  }

  return addLinks;
}

export { getAdCampaignsData };
