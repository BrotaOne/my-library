"use client";

import { FC } from "react";
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
        <a onClick={onClick}>
            {text}
        </a>
    )
}

export default SiderBookItem;