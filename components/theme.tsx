'use client'

import {Select, Space} from 'antd'
import {useTheme} from 'next-themes'
import {MoonOutlined, SettingOutlined, SunOutlined} from '@ant-design/icons'

const Options = [
    {label: 'system', value: 'system', icon: <SettingOutlined />},
    {label: 'light', value: 'light', icon: <MoonOutlined />},
    {label: 'dark', value: 'dark', icon: <SunOutlined />},
]

const Theme = () => {
    const {theme, setTheme} = useTheme()

    return (
        <Select
            className="w-[100px] mr-4! max-sm:hidden!"
            options={Options}
            defaultValue={theme}
            onChange={(v) => setTheme(v)}
            optionRender={(option) => (
                <Space>
                    <span role="img" aria-label={option.data.label}>
                        {option.data.icon}
                    </span>
                    <span data-testid="test-theme-options">
                        {option.data.label}
                    </span>
                </Space>
            )}
        />
    )
}

export default Theme
