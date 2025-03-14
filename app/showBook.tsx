"use client";

import { FC, useCallback, useState } from "react";
import { useCurBooksCxt } from "./curBooksCxt";
import PDFReader from "./pdfReader";
import { Select } from "antd";
import EpubReader from "./epubReader";

const Header: FC<{ max: number, onChange: (v: number)=> void }> = ({ max, onChange: onChangeIn }) => {
    const { state: { text, dir, type }, closeBook } = useCurBooksCxt();
    const [pageNo, setPageNo] = useState(1);

    const options = Array(max).fill(0).map((_, idx) => idx + 1).map(v => ({ value: v, label: v }));
    const fileType = dir && dir?.split('.')?.pop()
    
    const onChange = useCallback(
        (v: number) => {
            try {
                onChangeIn(v);
                setPageNo(v);
            } catch (e: unknown) {
                console.error(String(e), v);
            }
        }, [onChangeIn]
    );

    return (
        <div className="flex justify-center gap-10">
            <div> {type}-{text}</div>
            <a href={`${dir}`} target="_blank">下载文件</a>
            <div onClick={closeBook}>关闭文件</div>
            {fileType === 'pdf' ? (
                <Select
                    showSearch
                    value={pageNo}
                    options={options}
                    onChange={onChange}
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