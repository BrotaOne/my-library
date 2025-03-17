"use client";

import { FC } from "react";
import { Tooltip } from 'antd';
import { useCurBooksCxt } from "./curBooksCxt";

interface Props {
    dir: string;
    text: string;
    type: string;
}

const SiderBookItem: FC<Props> = ({text, dir, type}) => { 
    const { openBook } = useCurBooksCxt();

    const onClick = () => {
        openBook({ text, dir, type });
    }

    return (
        <Tooltip title={text}>
            <a onClick={onClick}>
                {text}
            </a>
        </Tooltip>
    );
}

export default SiderBookItem;