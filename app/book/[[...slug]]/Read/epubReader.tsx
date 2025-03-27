'use client'

import {FC, useState} from 'react'
import {ReactReader} from 'react-reader'
import {useParams} from 'next/navigation'

interface Props {
    Header: FC<{
        max: number
        onChange: (v: number) => void
    }>
}

const EpubReader: FC<Props> = ({Header}) => {
    const {slug = []} = useParams<{slug?: string[]}>()
    const fileUrl = '/' + slug.map((v) => decodeURI(v)).join('/')

    const [location, setLocation] = useState<string | number>(0)
    const pdfNumPages = 100
    const renderPage = () => {}
    return (
        <div style={{height: '100vh'}}>
            <Header max={pdfNumPages} onChange={renderPage} />
            <ReactReader
                // url="https://react-reader.metabits.no/files/alice.epub"
                url={fileUrl!}
                location={location}
                locationChanged={(epubcfi: string) => setLocation(epubcfi)}
            />
        </div>
    )
}

export default EpubReader
