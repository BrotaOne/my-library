"use client"

import { FC } from "react";
import { Cascader } from "antd";
import { useParams, useRouter } from "next/navigation";

type BookCategory = Array<{
    type: string;
    text: string;
    books: Array<{
      text: string;
      dir: string;
    }>
}>

const Search: FC<{ bookCategory: BookCategory }> = ({ bookCategory }) => {
    const router = useRouter()
    const openBook = (value: string[]) => {
        const dir = value[1];
        if(dir)
        router.push(`/book/${dir}`)
    }

    const { slug = [] } = useParams<{ slug?: string[] }>()
    const [, type, dir] = slug?.map(v => decodeURI(v));

    const options = bookCategory.map(v => {
        return {
            value: v.type,
            label: v.text,
            children: v.books.map(vv => ({
                value: vv.dir,
                label: vv.text
            }))
        }
    })

    return (
        <div className="flex gap-5 pr-5">
            <Cascader options={options} onChange={openBook} style={{ width: '30rem' }} value={[type, dir]} />
        </div>
    )
}

export default Search