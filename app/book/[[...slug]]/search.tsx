"use client"

import { Select } from "antd";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";

type BookCategory = Array<{
    type: 'string';
    text: 'string'
    books: Array<{
      text: string;
      dir: string;
    }>
  }>
  

const Search: FC<{ bookCategory: BookCategory }> = ({ bookCategory }) => {
    const router = useRouter()
    const openBook = (dir: string) => {
        router.push(`/book/${dir}`)
    }
    const [category, setCategory] = useState<string>();

    const categories = bookCategory.map(v => ({
        label: v.text,
        value: v.type,
    }))

    const books = useMemo(
        () => {
            const books: Array<{
                label: string,
                value: string,
                type: string,
                dir: string,
                text: string
            }> = []

            bookCategory.forEach(v => {
                if (category && v.type !== category) {
                    return
                }
                v.books.forEach(vv => {
                    books.push({
                        ...vv,
                        label: vv.text,
                        value: vv.dir,
                        type: v.type,
                    })
                })
            })

            return books;
        }, [category, bookCategory]
    );

    return (
        <div className="flex gap-5 pr-5">
            <Select
                options={categories}
                className="w-50"
                onChange={setCategory}
            />
            <Select
                options={books}
                className="w-50"
                onChange={openBook}
            />
        </div>
    )
}

export default Search