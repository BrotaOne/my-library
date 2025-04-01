import {Button} from 'antd'
import Theme from '@/components/theme'
import Link from 'next/link'

export default async function Home() {
    return (
        <div className="flex max-w-screen max-h-screen flex-col">
            <header className="max-w-full flex-shrink-0 h-[60px] border-b border-b-gray-300 flex items-center pl-5 justify-between">
                <Link href="/"> Brota 的书架</Link>
                <Theme />
            </header>
            <div className="flex min-sm:m-20 min-sm:gap-20 max-sm:m-10 max-sm:gap-10">
                <Button>
                    <Link href="/book">看书</Link>
                </Button>
            </div>
        </div>
    )
}
