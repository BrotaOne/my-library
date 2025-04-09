import {expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'
import SiderBookItem from '@/app/book/[[...slug]]/siderBookItem'

it('SiderBookItem', () => {
    render(<SiderBookItem text="测试书" dir="test/dir" hasMind="0" />)
    expect(screen.getByRole('link', {name: '测试书'})).toBeDefined()
})
