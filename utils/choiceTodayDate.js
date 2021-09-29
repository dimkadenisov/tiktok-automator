async function choiceTodayDate(page) {
  // Выбор сегодняшней даты
  await page.waitForSelector('.vi-date-editor.vi-range-editor', {
    timeout: 0,
  });
  await page.click('.vi-date-editor.vi-range-editor');
  await page.waitForSelector('td.available.today', { timeout: 0 });

  const todayButton = await page.$('td.available.today');
  const todayDate = await todayButton
    .getProperty('innerText')
    .then((value) => value.jsonValue());
  const realTodayDate = new Date().getDate();

  await page.waitForTimeout(500);
  if (todayDate == realTodayDate) {
    await todayButton.click();
    await todayButton.click();
  } else {
    const prevDayButton = await todayButton.getProperty(
      'previousElementSibling'
    );
    await prevDayButton.click();
    await page.waitForTimeout(500);
    await prevDayButton.click();
  }
  await page.waitForTimeout(5000);
}

export { choiceTodayDate };
