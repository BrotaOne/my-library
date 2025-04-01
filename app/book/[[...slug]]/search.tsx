'use client'

import {FC} from 'react'
import {Cascader} from 'antd'
import {useParams, useRouter} from 'next/navigation'
import handleSlug from '@/components/handleSlug'

type BookCategory = Array<{
    type: string
    text: string
    books: Array<{
        text: string
        dir: string
        hasMind: string
    }>
}>

type OptionType = {
    value: string
    label: string
    hasMind: string
}

const Search: FC<{bookCategory: BookCategory}> = ({bookCategory}) => {
    const router = useRouter()
    const openBook = (value: string[], item: OptionType[]) => {
        const hasMind = !!item?.[1].hasMind
        const dir = value[1]
        if (dir) router.push(`/book/${dir}?hasMind=${hasMind}`)
    }

    const {slug = []} = useParams<{slug?: string[]}>()
    const {type, fileName} = handleSlug(slug)

    const options = bookCategory.map((v) => {
        return {
            value: v.type,
            label: v.text,
            hasMind: '0',
            children: v.books.map((vv) => ({
                value: vv.dir,
                label: vv.text,
                hasMind: vv.hasMind,
            })),
        }
    })

    return (
        <Cascader<OptionType>
            options={options}
            onChange={openBook}
            className="max-w-3/5 min-sm:hidden! mr-2!"
            value={[type, fileName]}
            popupClassName="max-w-4/5"
        />
    )
}

export default Search
