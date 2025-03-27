import {FC} from 'react'
import {Tooltip} from 'antd'
import Link from 'next/link'

interface Props {
    dir: string
    text: string
}

const SiderBookItem: FC<Props> = ({text, dir}) => {
    return (
        <Tooltip title={text}>
            <Link href={`/book${dir}`}>{text}</Link>
        </Tooltip>
    )
}

export default SiderBookItem
