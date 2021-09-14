import { getAccauntsWithCostsLinks } from '../utils/getAccauntsWithCostsLinks';
import { checkAdCampaign } from './checkAdCampaign';

async function iterateThroughAccounts(page, browser) {
  // Получаем аккаунты
  const accounts = await page.$$(
    '.vi-collapse-item:first-child .custom-select-panel-item'
  );

  for await (const account of accounts) {
    // Нажимает на селектор аккаунтов
    await page.click('.biz_user_warp');
    await account.click();
    // Получаем ссылки на аккаунты, где были потрачены деньги
    const accauntsWithCostsLinks = await getAccauntsWithCostsLinks(page);
    // Проверяем рекламные кампании
    for await (const link of accauntsWithCostsLinks) {
      await checkAdCampaign(link, browser);
    }
  }
}

export { iterateThroughAccounts };
