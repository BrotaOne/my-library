'use client'

import {FC} from 'react'
import {Cascader} from 'antd'
import {useParams, useRouter} from 'next/navigation'

type BookCategory = Array<{
    type: string
    text: string
    books: Array<{
        text: string
        dir: string
    }>
}>

const Search: FC<{bookCategory: BookCategory}> = ({bookCategory}) => {
    const router = useRouter()
    const openBook = (value: string[]) => {
        const dir = value[1]
        if (dir) router.push(`/book/${dir}`)
    }

    const {slug = []} = useParams<{slug?: string[]}>()
    const [, type, dir] = slug?.map((v) => decodeURI(v))

    const options = bookCategory.map((v) => {
        return {
            value: v.type,
            label: v.text,
            children: v.books.map((vv) => ({
                value: vv.dir,
                label: vv.text,
            })),
        }
    })

    return (
        <Cascader
            options={options}
            onChange={openBook}
            className="max-w-3/5 min-sm:hidden! mr-2!"
            value={[type, dir]}
            popupClassName="max-w-4/5"
        />
    )
}

export default Search
