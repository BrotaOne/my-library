"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useCurBooksCxt } from "./curBooksCxt";
import PDFReader from "./pdfReader";
import { Select } from "antd";
import EpubReader from "./epubReader";

const Header: FC<{ max: number, onChange: (v: number)=> void }> = ({ max, onChange: onChangeIn }) => {
    const { state: { text, dir, type }, closeBook } = useCurBooksCxt();
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
            <div> {type}-{text}</div>
            <a href={`${dir}`} target="_blank">下载文件</a>
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
    const { state: { text, dir } } = useCurBooksCxt();

    if (!text || !dir) {
        return <div>还未选择文件</div>
    }

    const fileType = dir.split('.').pop()

    return (
        <div>
            {fileType === 'pdf' ? <PDFReader Header={Header} /> : <></>}
            {fileType === 'epub' ? <EpubReader Header={Header} /> : <></>}
        </div>
    );
};

export default ShowBook;