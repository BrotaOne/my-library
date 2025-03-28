import {Menu} from 'antd'
import {PauseOutlined} from '@ant-design/icons'
import {useCallback, useEffect, useState} from 'react'

interface Props {
    items: Array<{
        num: number
        key: string
        label: string
    }>
    jump: (key: string) => void
}

const Outline = ({items, jump}: Props) => {
    const [visible, setVisible] = useState(false)

    const toggle = useCallback(() => setVisible((v) => !v), [])

    const onClick = (v: {key: string}) => {
        jump(v.key)
        toggle()
    }

    const className = `absolute ${visible ? 'block' : 'hidden'} top-35 h-[calc(100vh-200px)] w-1/2 max-w-70 overflow-auto`

    useEffect(() => {
        const fn = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target?.nodeName !== 'CANVAS') {
                return
            }

            if (visible) {
                toggle()
            } else {
                const {clientX} = e
                const width = window.innerWidth

                if (clientX < (width / 3) * 2 && clientX > width / 3) {
                    toggle()
                }
            }
        }
        document.addEventListener('click', fn)

        return () => document.removeEventListener('click', fn)
    }, [toggle, visible])

    if (items.length === 0) {
        return <></>
    }

    return (
        <div>
            <PauseOutlined
                className="absolute top-30 rotate-90 min-sm:text-4xl min-sm:left-60"
                onClick={toggle}
            />
            <Menu
                mode="inline"
                items={items}
                onClick={onClick}
                className={className}
            />
        </div>
    )
}

export default Outline
