"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Select } from "antd";
import { useParams } from "next/navigation";

const PageChange: FC<{ max: number, onChange: (v: number) => void }> = ({ max, onChange: onChangeIn })=> {
    const { slug = [] } = useParams<{ slug?: string[] }>()
    const [, , dir] = slug?.map(v=> decodeURI(v));
    
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

    if (!showJumpPage)
        return <></>
    
    return (
        <Select
            showSearch
            value={pageNo}
            options={options}
            onChange={setPageNo}
            className="w-[200px]"
        />
    )
}

export default PageChange;