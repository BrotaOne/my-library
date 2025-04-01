import fs from 'fs'

const baseDir = 'public/books'
const targetDir = 'public/books.json'
const downloadDir = 'books'
const ignoredFile = '.DS_Store'
const bookCategoriesDir = 'scripts/bookCategries.json'

const bookAfterfix = ['pdf', 'epub']

const getBookCategories = () => {
    const bookCategories = fs.readFileSync(bookCategoriesDir, 'utf8')
    const ret = JSON.parse(bookCategories)
    return ret.reduce(
        (acc, cur) => ({
            ...acc,
            [cur.category]: cur,
        }),
        {},
    )
}

const main = () => {
    const categories = fs.readdirSync(baseDir).filter((v) => v !== ignoredFile)
    const bookCategories = getBookCategories()

    const allBooks = categories.map((dir) => {
        const books = fs.readdirSync(`${baseDir}/${dir}`)
        const category = bookCategories[dir]
        return {
            type: dir,
            text: category.text,
            description: category.description,
            books: books
                .map((v, idx) => {
                    const isBook =
                        v !== ignoredFile &&
                        bookAfterfix.find((vv) => v?.match(`.${vv}$`))

                    if (!isBook) {
                        return false
                    }
                    const text = v.split('.').slice(0, -1).join('.')
                    const hasMind =
                        books[idx - 1] === `${text}.json` ||
                        books[idx + 1] === `${text}.json`
                    return {
                        text,
                        hasMind: hasMind ? '1' : '0',
                        dir: `/${downloadDir}/${dir}/${v}`,
                    }
                })
                .filter((v) => !!v),
        }
    })

    fs.writeFileSync(targetDir, JSON.stringify(allBooks, null, 2))
}

main()
