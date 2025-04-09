import {test, expect} from '@playwright/test'
import fs from 'fs'

test.beforeEach(async ({page}) => {
    // 读取文件内容
    const filePath = './tests/e2e/alice.epub'
    const pdfFilePath = './tests/e2e/pdf test.pdf'
    const fileContent = fs.readFileSync(filePath)

    // 拦截请求并返回文件内容
    await page.route('**/books/**/*.epub', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/epub+zip',
            body: fileContent,
        })
    })

    const pdfContent = fs.readFileSync(pdfFilePath)
    await page.route('**/books/**/*.pdf', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/pdf',
            body: pdfContent,
        })
    })

    await page.goto('http://localhost:3000/')

    await expect(page).toHaveTitle(/A online library/)
})

test('test', async ({page}) => {
    await page.getByRole('link', {name: '看书'}).click()

    // 测试打开书
    await page.locator('aside li').first().click()
    const firstBook = await page.locator('aside').getByRole('link').first()
    const firstBookName = await firstBook.textContent()
    await firstBook.click()
    await expect(page.getByRole('main')).toContainText(firstBookName!)
    const canvasNum = await page.locator('main canvas').count()
    const iframeNum = await page.locator('main iframe').count()
    await expect(canvasNum + iframeNum).toBe(1)
    // await page.locator('canvas').click({
    //   position: {
    //     x: 990,
    //     y: 289
    //   }
    // });

    // 测试切换书
    const num = await page.locator('aside').getByRole('link').count()
    if (num > 1) {
        const secondBook = await page
            .locator('aside')
            .getByRole('link')
            .nth(num - 1)

        const secondBookName = await secondBook.textContent()
        await secondBook.click()
        await expect(page.getByRole('main')).toContainText(secondBookName!)

        await page.waitForLoadState('networkidle')
        const canvasNum = await page.locator('main canvas').count()
        // 直接找iframe会找不到
        const iframeNum = await page.getByRole('button', {name: '›'}).count()
        await expect(canvasNum + iframeNum).toBe(1)
    }

    // 测试关闭书
    await page.getByText('关闭文件').click()
    await expect(page.locator('main canvas')).toHaveCount(0)
    await expect(page.locator('main iframe')).toHaveCount(0)

    // 主题测试

    //   await page.getByText('01 Issue Brota 的书架system').press('ArrowRight');

    // await page.getByText('File system').click();
    // await page.getByRole('link', { name: '软技能：代码之外的生存指南 - John Sonmez' }).click();
    // await page.getByRole('button', { name: '›' }).click();
    // await page.getByText('关闭文件').click();
    // await page.getByText('system').click();
    // await page.getByText('dark').nth(1).click();
    // await page.getByRole('banner').getByTitle('dark').click();
    // await page.getByText('light').nth(1).click();
    // await page.getByRole('banner').getByTitle('light').click();
    // await page.getByText('dark').nth(1).click();
    // await page.getByText('语言').click();
    // await page.getByRole('link', { name: 'English-Conversation-Premium' }).click();
    // await page.locator('canvas').click({
    //   position: {
    //     x: 748,
    //     y: 916
    //   }
    // });
    // await page.getByText('01 Issue Brota 的书架dark语言 /').press('ArrowRight');
    // await page.getByText('01 Issue Brota 的书架dark语言 /').press('ArrowRight');
    // await page.getByText('01 Issue Brota 的书架dark语言 /').press('ArrowRight');
    // await page.getByText('01 Issue Brota 的书架dark语言 /').press('ArrowRight');
    // await page.getByText('01 Issue Brota 的书架dark语言 /').press('ArrowRight');
    // await page.getByText('01 Issue Brota 的书架dark语言 /').press('ArrowRight');
    // await page.getByText('01 Issue Brota 的书架dark语言 /').press('ArrowRight');
})
