'use client'
import {ConfigProvider, theme as antdTheme} from 'antd'
import {ThemeProvider} from 'next-themes'
import {cloneElement, ReactElement, ReactNode} from 'react'

const AntdProvider = ({children}: {children: ReactNode}) => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            }}
        >
            {cloneElement(children as ReactElement)}
        </ConfigProvider>
    )
}

export default function ThemeContextProvider({
    children,
}: {
    children: ReactNode
}) {
    return (
        <ThemeProvider>
            <AntdProvider>{cloneElement(children as ReactElement)}</AntdProvider>
        </ThemeProvider>
    )
}
