'use client'

// import Link from 'next/link'
import {useParams, useRouter} from 'next/navigation'
import PageChange from './pageChange'
import handleSlug from '@/components/handleSlug'

const Header = ({
    max,
    onChange: onChangeIn,
}: {
    max: number
    onChange: (v: number) => void
}) => {
    const router = useRouter()

    const {slug = []} = useParams<{slug?: string[]}>()
    // const searchParams = useSearchParams()
    // const hasMind = searchParams.get('hasMind')

    const {title, fileUrl} = handleSlug(slug)
    const closeBook = () => {
        router.push('/book')
    }
    return (
        <div className="flex justify-center min-sm:gap-x-10 min-sm:gap-y-1 max-sm:gap-x-2 max-sm:gap-y-1 items-center mb-2 mt-2 flex-wrap">
            <div className="max-sm:hidden">{title}</div>
            <a href={fileUrl} target="_blank">
                下载文件
            </a>
            <div onClick={closeBook}>关闭文件</div>
            {/* {hasMind === '1' ? (
                <Link href={`/book${jsonUrl}?oldFileType=${fileType}`}>
                    思维导图
                </Link>
            ) : (
                <></>
            )} */}
            <PageChange max={max} onChange={onChangeIn} />
        </div>
    )
}

export default Header
