"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface State {
    dir?: string;
    text?: string;
    type?: string;
}

interface CurBooksCxtType { 
    state: State;
    openBook: (p: Required<State>) => void;
    closeBook: () => void;
}

const CurBooksCxt = createContext<CurBooksCxtType>({
    state: {},
    openBook: () => { },
    closeBook: () => { }
});

export const CurBooksCxtProvider = ({ children }: { children: ReactNode }) => {
    const [curBook, setCurBook] = useState<State>({});

    const openBook: CurBooksCxtType['openBook'] = useCallback(
        p => { 
            setCurBook(p)
        }, []
    )

    const closeBook: CurBooksCxtType['closeBook'] = useCallback(
        () => { 
            setCurBook({
                dir: undefined,
                text: undefined,
                type: undefined,
            })
        }, []
    )

    const value = useMemo(() => ({
        state: curBook,
        openBook,
        closeBook
    }), [curBook, openBook, closeBook]);

    return (
        <CurBooksCxt.Provider value={value}>
            {children}
        </CurBooksCxt.Provider>
    )
}

export const useCurBooksCxt = () => useContext(CurBooksCxt);