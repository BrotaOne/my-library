import PDFReader from './pdfReader'
import EpubReader from './epubReader'
import Header from './header'

const ShowBook = async ({params}: {params: Promise<{slug?: string[]}>}) => {
    const {slug = []} = await params
    const [, , dir] = slug

    if (!dir) {
        return <div>还未选择文件</div>
    }

    const fileType = dir.split('.')?.pop()

    if (fileType === 'pdf') return <PDFReader Header={Header} />

    if (fileType === 'epub') return <EpubReader Header={Header} />

    return <div>暂不支持的文件类型</div>
}

export default ShowBook
