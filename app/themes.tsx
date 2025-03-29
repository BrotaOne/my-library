'use client'

import {ConfigProvider, theme as antdTheme} from 'antd'
import {cloneElement, ReactElement, ReactNode, useEffect, useState} from 'react'

export default function ThemeContextProvider({
    children,
}: {
    children: ReactNode
}) {
    const [isDark, setIsDark] = useState<boolean>()

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setIsDark(mediaQuery.matches)

        const handleChange = (event: MediaQueryListEvent) => {
            setIsDark(event.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const algorithm = isDark
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm

    return (
        <ConfigProvider theme={{algorithm}}>
            {cloneElement(children as ReactElement)}
        </ConfigProvider>
    )
}
