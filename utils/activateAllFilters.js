async function activateAllFilters(page) {
  // Нажимает на кнопку фильтры
  await page.waitForSelector('.filter-button', { timeout: 0 });
  await page.click('.filter-button');

  // Находит чекбокс, который выбирает все фильтры
  await page.waitForSelector(
    '.custom-filters .all-checkbox > .vi-checkbox:first-child',
    { timeout: 0 }
  );
  const checkbox = await page.$(
    '.custom-filters .all-checkbox > .vi-checkbox:first-child'
  );

  // Получает список классов чекбокса, чтобы проверить выбран ли он
  const classList = await checkbox
    .getProperty('classList')
    .then((value) => value.jsonValue())
    .then((value) => Object.values(value));

  // Клик на чекбокс, если он не выбран
  if (!classList.includes('is-checked')) {
    await checkbox.click();
  }

  // Находит кнопку применения фильтров
  const applyButton = await page
    .$$('.filter-options .vi-button.vi-byted-button.submit.vi-button--primary')
    .then((value) => value[1]);
  // Нажимает на кнопку применения фильтров
  await applyButton.click();
  await page.waitForTimeout(5000);
}

export { activateAllFilters };
