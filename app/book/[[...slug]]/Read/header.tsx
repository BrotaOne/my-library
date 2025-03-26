"use client"

import { useParams, useRouter } from "next/navigation";
import PageChange from "./pageChange";

const Header = ({ max, onChange: onChangeIn, }: {
    max: number,
    onChange: (v: number) => void,
    // params: Promise<{ slug?: string[] }>
}) => {
    const router = useRouter()
    // const { slug } = await params;

    const { slug = [] } = useParams<{ slug?: string[] }>()
    const [, , dir] = slug?.map(v=> decodeURI(v));
    const text = dir?.split('.')?.[0]
    const closeBook = () => {
        router.push('/book')
    }
    const fileUrl = '/' +  slug.map(v=> decodeURI(v)).join('/')
    
    return (
        <div className="flex justify-center gap-10">
            <div> {text}</div>
            <a href={fileUrl} target="_blank">下载文件</a>
            <div onClick={closeBook}>关闭文件</div>
            <PageChange max={max} onChange={onChangeIn} />
        </div>
    );
};

export default Header;