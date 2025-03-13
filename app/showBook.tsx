"use client";

import { FC } from "react";
import { useCurBooksCxt } from "./curBooksCxt";
import PDFReader from "./pdfReader";
import { Select } from "antd";
import EpubReader from "./epubReader";

const Header: FC<{ max: number, onChange: (v: number)=> void }> = ({ max, onChange }) => {
    const { state: { text, dir, type }, closeBook } = useCurBooksCxt();

    const options = Array(max).fill(0).map((_, idx) => idx + 1).map(v=> ({value: v, label: v}));
    
    return (
        <div className="flex justify-center gap-10">
            <div> {type}-{text}</div>
            <a href={`/${dir}`}>下载文件</a>
            <div onClick={closeBook}>关闭文件</div>
            <Select
                options={options}
                showSearch
                onChange={onChange}
                className="w-[200px]"
            />
        </div>
    );
};

const ShowBook = () => {
    const { state: { text, type } } = useCurBooksCxt();

    if (!text) {
        return <div>还未选择文件</div>
    }

    return (
        <div>
            {type === 'pdf' ? <PDFReader Header={Header} /> : <></>}
            {type === 'epub' ? <EpubReader /> : <></>}
        </div>
    );
};

export default ShowBook;