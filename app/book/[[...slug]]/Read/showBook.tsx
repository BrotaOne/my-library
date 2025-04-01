import PDFReader from './pdfReader'
import EpubReader from './epubReader'
import Header from './header'
import handleSlug from '@/components/handleSlug'
import Mind from './mind'

const ShowBook = async ({params}: {params: Promise<{slug?: string[]}>}) => {
    const {slug = []} = await params

    const {fileType} = handleSlug(slug)

    if (!fileType) {
        return <div>还未选择文件</div>
    }

    if (fileType === 'pdf') return <PDFReader Header={Header} />

    if (fileType === 'epub') return <EpubReader Header={Header} />

    // 思维导图还有组件问题，@xyflow/react 可能会显示错误，乱连线，@ant-design/graphs可能不支持react19，报错
    if (fileType === 'json') return <Mind />

    return <div>暂不支持的文件类型</div>
}

export default ShowBook
