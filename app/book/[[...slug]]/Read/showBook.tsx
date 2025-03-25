"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import PDFReader from "./pdfReader";
import { Select } from "antd";
import EpubReader from "./epubReader";
import { useParams, useRouter } from "next/navigation";

const Header: FC<{ max: number, onChange: (v: number) => void }> = ({ max, onChange: onChangeIn }) => {
    const router = useRouter()
    const { slug = [] } = useParams<{ slug: string[] }>()
    const [, , dir] = slug?.map(v=> decodeURI(v));
    const text = dir?.split('.')?.[0]
    const closeBook = () => {
        router.push('/book')
    }
    const fileUrl = '/' +  slug.map(v=> decodeURI(v)).join('/')
    
    const [pageNo, setPageNo] = useState(1);
    const maxRef = useRef(1)

    const options = Array(max).fill(0).map((_, idx) => idx + 1).map(v => ({ value: v, label: v }));
    const showJumpPage = dir && dir?.split('.')?.pop() === 'pdf';
    
    useEffect(
        () => {
            maxRef.current = max
        }, [max]
    )

    const jumpPage = useCallback(
        (diff: 1 | -1) => {
            setPageNo(v => {
                const vv = v + diff;
                if (vv < 1) {
                    return 1
                }
                if (vv > maxRef.current) {
                    return max
                }
                return vv;
            });
        }, [max]
    )

    useEffect(
        () => {
            try {
                onChangeIn(pageNo);
            } catch (e: unknown) {
                console.error(String(e));
            }
        }, [pageNo, onChangeIn]
    )

    useEffect(
        () => {
            if (!showJumpPage) {
                return 
            }
            const changePage = (event: KeyboardEvent) => { 
                const diff = event.code === "ArrowRight"
                    ? 1
                    : event.code === "ArrowLeft"
                        ? -1
                        : 0;
                if (diff === 0) {
                    return
                }

                jumpPage(diff)
            }

            document.addEventListener('keyup', changePage, false)

            return () => {
                document.removeEventListener('keyup', changePage)
            }
        },
        [jumpPage, showJumpPage]
    )

    return (
        <div className="flex justify-center gap-10">
            <div> {text}</div>
            <a href={fileUrl} target="_blank">下载文件</a>
            <div onClick={closeBook}>关闭文件</div>
            {showJumpPage ? (
                <Select
                    showSearch
                    value={pageNo}
                    options={options}
                    onChange={setPageNo}
                    className="w-[200px]"
                />
            ) : <></>}
        </div>
    );
};

const ShowBook = () => {
    // const slug = await params;
    // console.log('slug: ', slug)
    const {slug = []} = useParams()
    // const { state: { text, dir } } = useCurBooksCxt();
    const [, , dir] = slug;
    const text = dir?.split('.')?.[0]
    if (!dir) {
        return <div>还未选择文件</div>
    }

    const fileType = dir.split('.').pop()
console.log('fileType: ', fileType)
    return (
        <div>
            {fileType === 'pdf' ? <PDFReader Header={Header} /> : <></>}
            {fileType === 'epub' ? <EpubReader Header={Header} /> : <></>}
        </div>
    );
};

export default ShowBook;