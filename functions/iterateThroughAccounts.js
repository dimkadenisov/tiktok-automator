import { getAccauntsWithCostsLinks } from '../utils/getAccauntsWithCostsLinks';
import { writeLogToFile } from '../utils/writeLogToFile';
import { checkAdCampaign } from './checkAdCampaign';

async function iterateThroughAccounts(page, browser) {
  // Получаем аккаунты
  const accounts = await page.$$(
    '.vi-collapse-item:first-child .custom-select-panel-item'
  );

  for await (const account of accounts) {
    // Нажимает на селектор профилей
    await page.click('.biz_user_warp');
    await account.click();
    // Получаем ссылки на профили, где были потрачены деньги
    const accauntsWithCostsLinks = await getAccauntsWithCostsLinks(page);
    writeLogToFile(
      `\tВсего профилей с тратами: ${accauntsWithCostsLinks.length}\n`
    );
    // Проверяем рекламные кампании
    for await (const link of accauntsWithCostsLinks) {
      await checkAdCampaign(link, browser);
    }
  }
}

export { iterateThroughAccounts };
