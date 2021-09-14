async function getAccauntsWithCostsLinks(page) {
  await page.waitForSelector('.vi-table__body tbody', { timeout: 0 });
  await page.waitForTimeout(3000);
  const accauntsLinks = await page.evaluate(() => {
    // Выбирает строки в таблице с аккаунтами
    const tableRows = document.querySelector('.vi-table__body tbody').children;
    // Возвращает строки, в которых были расходы
    const filteredRows = [...tableRows].filter((row) => {
      const cost = row
        .querySelector('.vi-table_1_column_4')
        .innerText.replace(/\D/g, '');

      return cost > 0;
    });
    // Возвращает ссылки на аккаунты с расходами
    const links = [...filteredRows].map((row) => {
      return row.querySelector('.is-left a').href;
    });

    console.log(links);

    return links;
  });

  return accauntsLinks;
}

export { getAccauntsWithCostsLinks };
