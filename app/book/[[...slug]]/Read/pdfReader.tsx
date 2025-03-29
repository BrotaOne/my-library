'use client'

import * as PDFJS from 'pdfjs-dist'
import {useParams} from 'next/navigation'
import {FC, useEffect, useRef, useState} from 'react'
import Outline from './outline'

PDFJS.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.mjs`

interface Props {
    Header: FC<{
        max: number
        onChange: (v: number) => void
    }>
}

interface OutlineItem<T = Promise<number> | number> {
    num: T
    key: string
    label: string
}

const getOutline = async (pdfDoc: PDFJS.PDFDocumentProxy) => {
    const v = await pdfDoc?.getOutline()

    const line: Array<OutlineItem> = v.map((vv) => {
        const num = pdfDoc?.getPageIndex(vv?.dest?.[0])
        return {
            num,
            key: vv.title,
            label: vv.title,
        }
    })

    line.forEach((v) => {
        if (typeof v.num === 'object' && v.num !== null && v.num?.then) {
            v.num.then((vv) => {
                v.num = vv + 1
            })
        }
    })

    return line as OutlineItem<number>[]
}

const PDFReader: FC<Props> = ({Header}) => {
    const {slug = []} = useParams<{slug?: string[]}>()
    const fileUrl = '/' + slug.map((v) => decodeURI(v)).join('/')

    const pdfContainer = useRef<HTMLCanvasElement>(null)
    const pdfCtx = useRef<CanvasRenderingContext2D | null>(null)
    const pdfDoc = useRef<PDFJS.PDFDocumentProxy>(null)
    const [pdfNumPages, setPdfNumPages] = useState(1)
    const lastBookRef = useRef<string>(undefined)
    const [outline, setOutline] = useState<OutlineItem[]>([])

    // 依次渲染所有页面
    const renderPage = (num: number) => {
        pdfDoc.current?.getPage(num)?.then((page) => {
            const viewport = page.getViewport({scale: 2})
            pdfContainer.current!.width = viewport.width
            pdfContainer.current!.height = viewport.height

            page.render({
                viewport,
                canvasContext: pdfCtx.current!,
            })
            //   .promise.then(() => {
            //     if (num < pdfNumPages) {
            //       renderPage(num + 1)
            //     }
            //   })
        })
    }

    useEffect(() => {
        if (lastBookRef.current && lastBookRef.current === fileUrl) {
            return
        }
        lastBookRef.current = fileUrl
        if (pdfDoc.current) {
            pdfDoc.current.cleanup()
            pdfDoc.current.destroy()
        }
        pdfCtx.current = pdfContainer.current!.getContext('2d')

        PDFJS.getDocument(fileUrl)
            .promise.then((pdfDoc_) => {
                pdfDoc.current = pdfDoc_
                setPdfNumPages(pdfDoc_.numPages)
                renderPage(1)
                return pdfDoc_
            })
            .then((pdfDoc) => {
                getOutline(pdfDoc).then((v) => {
                    setOutline(v)
                })
            })

        return () => {
            if (pdfDoc.current) {
                pdfDoc.current.cleanup()
                pdfDoc.current.destroy()
                pdfDoc.current = null
                lastBookRef.current = undefined
            }
        }
    }, [fileUrl])

    const jump = (key: string) => {
        const target = outline.find((v) => v.key === key)

        if (typeof target?.num === 'number') {
            renderPage(target.num)
            // pdfDoc.current?.getPage(target.num)
        }
    }

    return (
        <div className="w-full">
            <Header max={pdfNumPages} onChange={renderPage} />
            <div
                className={
                    'flex items-center justify-center rounded-lg flex-col w-full'
                }
            >
                <canvas ref={pdfContainer} className="w-full" />
            </div>

            <Outline
                items={outline as Array<OutlineItem<number>>}
                jump={jump}
            />
        </div>
    )
}

export default PDFReader
