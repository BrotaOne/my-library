import handleSlug from '@/components/handleSlug'
import {describe, expect, it} from 'vitest'

describe('handleSlug with empty slug', () => {
    it('normal use', () => {
        const slugRaw = ['book', '001', 'test.pdf']
        const {base, type, title, fileUrl, fileType, fileName, jsonUrl} =
            handleSlug(slugRaw)

        expect(base).toBe('book')
        expect(type).toBe('001')
        expect(title).toBe('test')
        expect(fileUrl).toBe('/book/001/test.pdf')
        expect(fileType).toBe('pdf')
        expect(fileName).toBe('test.pdf')
        expect(jsonUrl).toBe('/book/001/test.json')
    })

    it('multi dot', () => {
        const slugRaw = ['book', '001', 'te.st.pdf']
        const {base, type, title, fileUrl, fileType, fileName, jsonUrl} =
            handleSlug(slugRaw)

        expect(base).toBe('book')
        expect(type).toBe('001')
        expect(title).toBe('te.st')
        expect(fileUrl).toBe('/book/001/te.st.pdf')
        expect(fileType).toBe('pdf')
        expect(fileName).toBe('te.st.pdf')
        expect(jsonUrl).toBe('/book/001/te.st.json')
    })

    it('empty slug', () => {
        const slugRaw = ['book', '001', '']
        const {base, type, title, fileUrl, fileType, fileName, jsonUrl} =
            handleSlug(slugRaw)

        expect(base).toBe('book')
        expect(type).toBe('001')
        expect(title).toBe('')
        expect(fileUrl).toBe('/book/001/')
        expect(fileType).toBe('')
        expect(fileName).toBe('')
        expect(jsonUrl).toBe('')
    })
})
