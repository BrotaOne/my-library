import fs from 'fs'
import {Menu} from 'antd'
import path from 'path'
import SiderBookItem from './siderBookItem'
import ShowBook from './Read/showBook'
import Search from './search'

type BookCategory = Array<{
    type: 'string'
    text: 'string'
    books: Array<{
        text: string
        dir: string
    }>
}>

const getBookCategory: () => BookCategory = () => {
    // const data = await fetch('http://localhost:3000/books.json')
    // const bookCategory = await data.json()
    const filePath = path.join(process.cwd(), 'public', 'books.json')
    const bookCategory = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return bookCategory
}

export default async function Home({
    params,
}: {
    params: Promise<{slug?: string[]}>
}) {
    const {slug = []} = await params
    const bookCategory = getBookCategory()
    const items = bookCategory.map((v) => {
        return {
            key: v.type,
            label: v.text,
            children: v.books.map((vv) => ({
                key: vv.dir,
                label: <SiderBookItem text={vv.text} dir={vv.dir} />,
            })),
        }
    })
    const [base, type, fileName] = slug?.map((v) => decodeURI(v))
    const defaultSelectedKeys = [type, `/${base}/${type}/${fileName}`]

    return (
        <div className="flex max-w-screen max-h-screen flex-col">
            <header className="max-w-full flex-shrink-0 h-[60px] border-b border-b-gray-300 flex items-center pl-5 justify-between">
                Brota 的书架
                <Search bookCategory={bookCategory} />
            </header>
            <div className="flex max-w-full max-md:p-2">
                <aside className="w-[200px] max-sm:hidden">
                    <Menu
                        items={items}
                        mode="inline"
                        defaultOpenKeys={[type]}
                        defaultSelectedKeys={defaultSelectedKeys}
                    />
                </aside>
                <main className="flex-1">
                    <ShowBook params={params} />
                </main>
            </div>
        </div>
    )
}
