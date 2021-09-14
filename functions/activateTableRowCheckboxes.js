async function activateTableRowCheckboxes(page) {
  await page.waitForSelector('.vi-table__fixed .vi-table__body tbody', {
    timeout: 0,
  });
  await page.evaluate(() => {
    // Выбирает строки в таблице с рекламными кампаниями
    const tableRows = document.querySelector(
      '.vi-table__fixed .vi-table__body tbody'
    ).children;
    // Нажимает на чекбоксы только в строках с тратами
    [...tableRows].forEach((row) => {
      const totalCost = row
        .querySelector('td:nth-child(6) div')
        .innerHTML.replace(/\D/g, '');
      if (totalCost > 0) {
        const checkbox = row.querySelector('td:first-child .vi-checkbox');
        setTimeout(() => {
          checkbox.click();
        }, 100);
      }
    });
  });
}

export { activateTableRowCheckboxes };
