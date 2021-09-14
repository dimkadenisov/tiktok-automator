async function clearCoockies(page) {
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
}

export { clearCoockies };
