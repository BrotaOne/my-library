import {render, screen, fireEvent, within} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import Theme from '@/components/theme'

// Mock next-themes
const setThemeMock = vi.fn()
const defaultTheme = 'dark'

beforeEach(() => {
    vi.mock('next-themes', () => ({
        useTheme: vi.fn(() => ({
            theme: defaultTheme,
            setTheme: setThemeMock,
        })),
    }))
})

describe('Theme Component', () => {
    it('renders the Select component with correct options', async () => {
        const {container} = render(<Theme />)
        expect(screen.getByText(defaultTheme)).toBeDefined()
        const selectElement = within(container).getByRole('combobox')

        // 俩种方法都可以
        fireEvent.mouseDown(selectElement)
        // fireEvent.mouseDown(container.querySelector('.ant-select-selector')!)

        expect(screen.getAllByTestId('test-theme-options').length).toBe(3)
    })

    it('calls setTheme when an option is selected', async () => {
        const {container} = render(<Theme />)

        // Simulate selecting an option
        const selectElement = within(container).getByRole('combobox')
        fireEvent.mouseDown(selectElement) // 打开下拉菜单
        // const optionElement = await screen.findByDisplayValue('light'); // 找到选项
        const optionElement = screen.getAllByTestId('test-theme-options')[0] // 找到选项
        fireEvent.click(optionElement) // 点击选项

        // Check if setTheme is called with the correct value
        // await waitFor(() => {
        expect(setThemeMock).toHaveBeenCalledWith(optionElement.innerHTML)
        //   });
    })
})
