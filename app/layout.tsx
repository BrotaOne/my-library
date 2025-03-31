import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {AntdRegistry} from '@ant-design/nextjs-registry'
import './globals.css'
import ThemeContextProvider from './themes'
import {ThemeProvider} from 'next-themes'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'A online library',
    description: 'A online library just for fun',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider enableColorScheme>
                    <ThemeContextProvider>
                        <AntdRegistry>{children}</AntdRegistry>
                    </ThemeContextProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
