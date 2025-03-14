import fs from 'fs';

const baseDir = 'public/books';
const targetDir = 'public/books.json';
const downloadDir = 'books';
const ignoredFile = '.DS_Store'
const bookCategoriesDir = 'scripts/bookCategries.json'

const getBookCategories = () => {
    const bookCategories = fs.readFileSync(bookCategoriesDir, 'utf8');
    const ret = JSON.parse(bookCategories)
    return ret.reduce((acc, cur) => ({
        ...acc,
        [cur.category]: cur,
    }),  {});
}

const main = () => {
    const categories = fs.readdirSync(baseDir).filter(v => v !== ignoredFile);
    const bookCategories = getBookCategories();
    
    const allBooks = categories.map(dir => {
        const books = fs.readdirSync(`${baseDir}/${dir}`);
        const category = bookCategories[dir]
    
        return {
            type: dir,
            text: category.text,
            description: category.description,
            books: books.filter(v => v !== ignoredFile).map(v => {
                return {
                    text: v.split('.').slice(0, -1).join('.'),
                    dir: `/${downloadDir}/${dir}/${v}`
                };
            }),
        };
    })

    fs.writeFileSync(targetDir, JSON.stringify(allBooks, null, 2));
}

main();