import fs from 'fs';
import { Menu } from 'antd';
import path from 'path';
import { CurBooksCxtProvider } from './curBooksCxt';
import SiderBookItem from './siderBookItem';
import ShowBook from './showBook';

type BookCategory = Array<{
  type: 'string';
  text: 'string'
  books: Array<{
    text: string;
    dir: string;
  }>
}>

const getBookCategory: () => BookCategory = () => {
  // const data = await fetch('http://localhost:3000/books.json')
  // const bookCategory = await data.json()
  const filePath = path.join(process.cwd(), 'public', 'books.json');
  const bookCategory = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return bookCategory;
};


export default async function Home() {
  const bookCategory = getBookCategory();
  const items = bookCategory.map(v => {
    return {
        key: v.type,
        label: v.text,
        children: v.books.map(vv => ({
            key: vv.dir,
            label: <SiderBookItem text={vv.text} dir={vv.dir} type={v.type} />,
        }))
    }
})

  return (
    <CurBooksCxtProvider >
      <div className="flex w-screen h-screen flex-col">
        <header className="w-screen h-[60px] border-b border-b-gray-300 flex items-center pl-5">
          Brota 的书架
        </header>
        <div className="flex w-screen h-screen p-5">
          <aside className="w-[200px]">
            <div>books</div>
            <Menu items={items} mode="inline" />
          </aside>
          <main className="flex-1">
            <ShowBook />
          </main>
        </div>
      </div>
    </CurBooksCxtProvider>
  );
}
