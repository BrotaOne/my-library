'use client'

import {useTheme} from 'next-themes'
import {ConfigProvider, theme as antdTheme} from 'antd'
import {cloneElement, ReactElement, ReactNode} from 'react'

export default function ThemeContextProvider({
    children,
}: {
    children: ReactNode
}) {
    const {resolvedTheme} = useTheme()
    const algorithm =
        resolvedTheme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm

    return (
        <ConfigProvider theme={{algorithm}}>
            {cloneElement(children as ReactElement)}
        </ConfigProvider>
    )
}
