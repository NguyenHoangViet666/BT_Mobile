const { test, expect } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');

test('ba thẻ tái sử dụng và cả 10 sản phẩm truyền đúng dữ liệu sang Detail', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const imageDir = path.join(__dirname, '..', 'Ảnh');
  fs.mkdirSync(imageDir, { recursive: true });
  await page.goto('/');
  await expect(page.getByText('10 sản phẩm · Chạm để xem chi tiết')).toBeVisible();
  await page.screenshot({ path: path.join(imageDir, 'product_list.png'), fullPage: true });

  const products = [
    ['SP01', 'Tai nghe Bluetooth', '590.000 ₫'],
    ['SP02', 'Bàn phím cơ', '890.000 ₫'],
    ['SP03', 'Chuột không dây', '350.000 ₫'],
    ['SP04', 'Loa mini', '450.000 ₫'],
    ['SP05', 'Sạc dự phòng', '620.000 ₫'],
    ['SP06', 'Giá đỡ điện thoại', '120.000 ₫'],
    ['SP07', 'Cáp USB-C', '150.000 ₫'],
    ['SP08', 'Đế tản nhiệt laptop', '390.000 ₫'],
    ['SP09', 'Webcam Full HD', '790.000 ₫'],
    ['SP10', 'Ổ cứng SSD 512GB', '1.290.000 ₫'],
  ];
  for (const [id, name, price] of products) {
    await page.getByRole('button', { name: `Xem ${name}`, exact: true }).click();
    await expect(page.getByText('Product Detail', { exact: true })).toBeVisible();
    await expect(page.getByText(id, { exact: true })).toBeVisible();
    await expect(page.getByText(name, { exact: true })).toBeVisible();
    await expect(page.getByText(price, { exact: true })).toBeVisible();
    if (id === 'SP01') await page.screenshot({ path: path.join(imageDir, 'product_detail.png'), fullPage: true });
    await page.getByRole('button', { name: '‹ Quay lại danh sách' }).click();
    await expect(page.getByText('Product List', { exact: true }).last()).toBeVisible();
  }
  await page.getByRole('tab', { name: 'Bài dễ · ProductCard' }).click();
  for (const [, name, price] of products.slice(0, 3)) {
    await expect(page.getByText(name, { exact: true })).toBeVisible();
    await expect(page.getByText(price, { exact: true })).toBeVisible();
  }
  await page.screenshot({ path: path.join(imageDir, 'product_card.png'), fullPage: true });
  expect(errors).toEqual([]);
});
