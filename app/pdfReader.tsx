"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useCurBooksCxt } from "./curBooksCxt";
import * as PDFJS from 'pdfjs-dist'

PDFJS.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.mjs`

interface Props {
    Header: FC<{
        max: number;
        onChange: (v: number) => void;
    }>
}

const PDFReader: FC<Props> = ({Header}) => {
    const { state: { dir: fileUrl } } = useCurBooksCxt();

    const pdfContainer = useRef<HTMLCanvasElement>(null)
    const pdfCtx = useRef<CanvasRenderingContext2D | null>(null)
    const pdfDoc = useRef<PDFJS.PDFDocumentProxy>(null)
    const [pdfNumPages, setPdfNumPages] = useState(1)
    const lastBookRef = useRef<string>(undefined)
  
    // 依次渲染所有页面
    const renderPage = (num: number) => {
        pdfDoc.current!.getPage(num).then(page => {
            const viewport = page.getViewport({ scale: 2 })
            pdfContainer.current!.width = viewport.width
            pdfContainer.current!.height = viewport.height
  
            page
                .render({
                    viewport,
                    canvasContext: pdfCtx.current!
                })
            //   .promise.then(() => {
            //     if (num < pdfNumPages.current) {
            //       renderPage(num + 1)
            //     }
            //   })
        })
    }

    useEffect(() => {
        if (lastBookRef.current && lastBookRef.current === fileUrl) {
            return
        }
        lastBookRef.current = fileUrl;
        if (pdfDoc.current) {
            pdfDoc.current.cleanup()
            pdfDoc.current.destroy();
        }
        pdfCtx.current = pdfContainer.current!.getContext('2d')
  
        PDFJS.getDocument(fileUrl).promise.then(pdfDoc_ => {
            pdfDoc.current = pdfDoc_
            setPdfNumPages(pdfDoc_.numPages)
            renderPage(1)
        })
        
        return () => {
            if (pdfDoc.current) {
                pdfDoc.current.cleanup()
                pdfDoc.current.destroy();
                pdfDoc.current = null
                lastBookRef.current = undefined
            }
        }
    }, [fileUrl])
  
    return (
        <div className="w-full">
            <Header max={pdfNumPages} onChange={renderPage} />
            <div className={'flex items-center justify-center rounded-lg flex-col w-full'}>
                <canvas ref={pdfContainer} className="w-full" />
            </div>
            
        </div>
    )
};

export default PDFReader;