import { iterateThroughAccounts } from './iterateThroughAccounts';
import { choiceTodayDate } from '../utils/choiceTodayDate';
import { clearCoockies } from '../utils/clearCoockies';

async function checkAccount(log, pass, browser) {
  const page = await browser.newPage();
  await page.goto('https://ads.tiktok.com/i18n/login?_source_=ads_homepage');
  await page.waitForSelector('#TikTok_Ads_SSO_Login_Email_Input', {
    timeout: 0,
  });
  // Ввод email
  await page.type('#TikTok_Ads_SSO_Login_Email_Input', log);
  // Ввод passwort
  await page.type('#TikTok_Ads_SSO_Login_Pwd_Input', pass);
  await Promise.all([
    // Submit формы входа
    page.click('#TikTok_Ads_SSO_Login_Btn'),
    // Здесь, возможно, надо ввести капчу. Скрипт будет ждать редиректа на страницу после входа
    page.waitForNavigation({ timeout: 0 }),
  ]);
  // Выбор аккаунт
  await page.waitForSelector('.vi-collapse-item__header', { timeout: 0 });
  // Нажимает на кнопку Business Center
  await page.click('.vi-collapse-item__header');
  await Promise.all([
    // Нажимает на кнопку tiktok_vs
    // ОСТОРОЖНО! СЕЛЕКТОР ДОВОЛЬНО СЛАБЫЙ
    page.click('.item-wrap:last-child'),
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 }),
  ]);
  // Переход на вкладку обзор
  await page.click('.byted-menu-item');
  // Закрывает popup с подсказками, если он есть.
  try {
    await page.click(
      '.vi-button.vi-byted-button.footer-btn.vi-button--default'
    );
  } catch {}
  // Выбор сегодняшней даты
  await choiceTodayDate(page);
  // Проходится по аккаунтам
  await iterateThroughAccounts(page, browser);
  // Чистит куки
  await clearCoockies(page);
  // // Закрывает страницу
  await page.close();
}

export { checkAccount };
