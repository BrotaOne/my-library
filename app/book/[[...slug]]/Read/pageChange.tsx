'use client'

import {useEffect, useRef, useState} from 'react'
import {Select} from 'antd'
import {useParams} from 'next/navigation'

interface Props {
    max: number
    onChange: (v: number) => void
}

const useListenPreNext = (skip: boolean, jump: (v: number) => void) => {
    useEffect(() => {
        if (!skip) {
            return
        }

        const changePage = (event: KeyboardEvent) => {
            const diff =
                event.code === 'ArrowRight'
                    ? 1
                    : event.code === 'ArrowLeft'
                      ? -1
                      : 0
            if (diff === 0) {
                return
            }

            jump(diff)
        }

        document.addEventListener('keyup', changePage, false)

        return () => {
            document.removeEventListener('keyup', changePage)
        }
    }, [jump, skip])

    useEffect(() => {
        if (!skip) {
            return
        }
        const fn = (e: PointerEvent) => {
            const target = e.target as HTMLElement
            if (target?.nodeName !== 'CANVAS') {
                return
            }
            const {clientX} = e
            const width = window.innerWidth

            if (clientX > (width / 3) * 2) {
                jump(1)
            } else if (clientX < width / 3) {
                jump(-1)
            }
        }

        document.addEventListener('click', fn)

        return () => document.removeEventListener('click', fn)
    }, [jump, skip])
}

const PageChange = ({max, onChange: onChangeIn}: Props) => {
    const {slug = []} = useParams<{slug?: string[]}>()
    const [, , dir] = slug?.map((v) => decodeURI(v))

    const [pageNo, setPageNo] = useState(1)
    const maxRef = useRef(1)

    const options = Array(max)
        .fill(0)
        .map((_, idx) => idx + 1)
        .map((v) => ({value: v, label: v}))
    const showJumpPage = dir && dir?.split('.')?.pop() === 'pdf'

    useEffect(() => {
        maxRef.current = max
    }, [max])

    const onChange = (v: number) => {
        if (v > maxRef.current || v < 1) {
            return
        }

        try {
            onChangeIn(v)
            setPageNo(v)
        } catch (e: unknown) {
            console.error(String(e))
        }
    }

    useListenPreNext(!!showJumpPage, (diff) => onChange(pageNo + diff))

    if (!showJumpPage) {
        return <></>
    }

    return (
        <Select
            showSearch
            value={pageNo}
            options={options}
            onChange={onChange}
            className="w-[200px]"
        />
    )
}

export default PageChange
