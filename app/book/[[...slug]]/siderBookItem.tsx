import {FC} from 'react'
import {Tooltip} from 'antd'
import Link from 'next/link'

interface Props {
    dir: string
    text: string
    hasMind: string
}

const SiderBookItem: FC<Props> = ({text, dir, hasMind = '0'}) => {
    return (
        <Tooltip title={text}>
            <Link href={`/book${dir}?hasMind=${hasMind}`}>{text}</Link>
        </Tooltip>
    )
}

export default SiderBookItem
