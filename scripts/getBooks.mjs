import fs from 'fs';

const baseDir = 'public/books';
const targetDir = 'public/books.json';
const downloadDir = 'books';

const categories = fs.readdirSync(baseDir);

const allBooks = categories.map(dir => {
    const books = fs.readdirSync(`${baseDir}/${dir}`);
    return {
        type: dir,
        books: books.map(v => {
            return {
                text: v.split('.').slice(0, -1).join('.'),
                dir: `/${downloadDir}/${dir}/${v}`
            };
        }),
    }
})

fs.writeFileSync(targetDir, JSON.stringify(allBooks, null, 2));