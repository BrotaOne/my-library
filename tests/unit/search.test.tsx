import {fireEvent, render, within, screen} from '@testing-library/react'
import {beforeAll, expect, it, vi} from 'vitest'
import Search from '@/app/book/[[...slug]]/search'

const testOne = {
    text: 'Vue.js设计与实现 - 霍春阳',
    hasMind: '0',
    dir: '/books/000/Vue.js设计与实现 - 霍春阳.pdf',
}

const testTwo = {
    text: '一个人的老后 ([日] 上野千鹤子 译者 杨明绮)',
    hasMind: '0',
    dir: '/books/100/一个人的老后 ([日] 上野千鹤子 译者 杨明绮).pdf',
}

const data = [
    {
        type: '000',
        text: '计算机、信息、百科',
        description: '计算机、人工智能、编程、百科全书',
        books: [
            testOne,
            {
                text: 'book-riscv-rev4',
                hasMind: '1',
                dir: '/books/000/book-riscv-rev4.pdf',
            },
        ],
    },
    {
        type: '100',
        text: '哲学与心理学',
        description: '哲学、心理学、自我提升',
        books: [testTwo],
    },
    {
        type: '300',
        text: '社会科学',
        description: '政治、法律、经济、社会学',
        books: [],
    },
]
const push = vi.fn()

beforeAll(() => {
    vi.mock('next/navigation', () => {
        return {
            useRouter: () => ({
                push,
            }),
            useParams: () => ({
                slug: ['book', '000', 'Vue.js设计与实现 - 霍春阳.pdf'],
            }),
        }
    })
})

it('search books', () => {
    const dom = render(<Search bookCategory={data} />)
    expect(dom).matchSnapshot()
})

it('click book', async () => {
    const {container} = render(<Search bookCategory={data} />)
    const inputElement = within(container).getByRole('combobox')
    fireEvent.mouseDown(inputElement) // 打开下拉菜单
    const selectElement = screen.getAllByRole('menuitemcheckbox')[0]
    fireEvent.click(selectElement) // 打开下拉菜单

    clickBook(container, '计算机、信息、百科', testOne)

    clickBook(container, '哲学与心理学', testTwo)
})

const clickBook = (
    container: HTMLElement,
    category: string,
    {
        text,
        hasMind,
        dir,
    }: {
        text: string
        hasMind: string
        dir: string
    },
) => {
    const inputElement = within(container).getByRole('combobox')
    fireEvent.mouseDown(inputElement) // 打开下拉菜单

    const categoryElement = screen.getByText(category)
    fireEvent.click(categoryElement) // 点击选项
    // const selectElement = screen.getAllByRole('menuitemcheckbox')[0]
    // fireEvent.click(selectElement) // 打开下拉菜单

    const book = screen.getByText(text)
    // const selectElements = screen.getAllByRole('menuitemcheckbox')
    // fireEvent.click(selectElements[selectElements.length - 1]) // 点击选项
    fireEvent.click(book) // 点击选项
    expect(push).toHaveBeenCalledWith(`/book${dir}?hasMind=${hasMind}`)
}
