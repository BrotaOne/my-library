export default function handleSlug(slugRaw: string[]) {
    const slug = slugRaw.map((v) => decodeURI(v))

    const fileUrl = '/' + slug.join('/')
    const [base, type, fileName] = slug
    const fileNames = fileName?.split('.')
    const fileType = fileNames?.pop()
    const title = fileNames?.join('.') || ''
    const jsonUrl = fileType && fileUrl.replace(fileType, 'json')

    return {
        base,
        type,
        title,
        fileUrl,
        fileType,
        fileName,
        jsonUrl,
    }
}
