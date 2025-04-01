'use client'

import {type Rendition} from 'epubjs'
import {useTheme} from 'next-themes'
import {useParams} from 'next/navigation'
import {FC, useRef, useState} from 'react'
import {IReactReaderStyle, ReactReader, ReactReaderStyle} from 'react-reader'
import handleSlug from '@/components/handleSlug'

interface Props {
    Header: FC<{
        max: number
        onChange: (v: number) => void
    }>
}

type ITheme = 'light' | 'dark'

function updateTheme(rendition: Rendition, theme: ITheme) {
    const themes = rendition.themes
    switch (theme) {
        case 'dark': {
            themes.override('color', '#fff')
            themes.override('background', '#000')
            break
        }
        case 'light': {
            themes.override('color', '#000')
            themes.override('background', '#fff')
            break
        }
    }
}

const lightReaderTheme: IReactReaderStyle = {
    ...ReactReaderStyle,
    readerArea: {
        ...ReactReaderStyle.readerArea,
        transition: undefined,
    },
}

const darkReaderTheme: IReactReaderStyle = {
    ...ReactReaderStyle,
    arrow: {
        ...ReactReaderStyle.arrow,
        color: 'white',
    },
    arrowHover: {
        ...ReactReaderStyle.arrowHover,
        color: '#ccc',
    },
    readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: '#000',
        transition: undefined,
    },
    titleArea: {
        ...ReactReaderStyle.titleArea,
        color: '#ccc',
    },
    tocArea: {
        ...ReactReaderStyle.tocArea,
        background: '#111',
    },
    tocButtonExpanded: {
        ...ReactReaderStyle.tocButtonExpanded,
        background: '#222',
    },
    tocButtonBar: {
        ...ReactReaderStyle.tocButtonBar,
        background: '#fff',
    },
    tocButton: {
        ...ReactReaderStyle.tocButton,
        color: 'white',
    },
}

const EpubReader: FC<Props> = ({Header}) => {
    const {slug = []} = useParams<{slug?: string[]}>()
    const {title, fileUrl} = handleSlug(slug)

    const [location, setLocation] = useState<string | number>(0)
    const pdfNumPages = 100
    const renderPage = () => {}

    const rendition = useRef<Rendition | undefined>(undefined)
    const {resolvedTheme} = useTheme()

    return (
        <div style={{height: '100vh'}}>
            <Header max={pdfNumPages} onChange={renderPage} />
            <ReactReader
                // url="https://react-reader.metabits.no/files/alice.epub"
                title={title}
                url={fileUrl!}
                location={location}
                locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                readerStyles={
                    resolvedTheme === 'dark'
                        ? darkReaderTheme
                        : lightReaderTheme
                }
                getRendition={(_rendition) => {
                    updateTheme(_rendition, resolvedTheme as ITheme)
                    rendition.current = _rendition
                }}
            />
        </div>
    )
}

export default EpubReader
