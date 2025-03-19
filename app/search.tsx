"use client"

import { Select } from "antd";
import { FC, useCallback, useMemo, useState } from "react";
import { useCurBooksCxt } from "./curBooksCxt";

type BookCategory = Array<{
    type: 'string';
    text: 'string'
    books: Array<{
      text: string;
      dir: string;
    }>
  }>
  

const Search: FC<{ bookCategory: BookCategory }> = ({ bookCategory }) => {
    const { openBook } = useCurBooksCxt();
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

    const onBookChange = useCallback(
        (_: string, v?: { dir: string; text: string; type: string } | { dir: string; text: string; type: string }[]) => {
            if (v && !Array.isArray(v))
                openBook(v)
        }, [openBook]
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
                onChange={onBookChange}
            />
        </div>
    )
}

export default Search