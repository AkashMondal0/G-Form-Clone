import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from '@/app/material'
import { TabProps } from '@/interfaces/interfaces';


interface TabMainProps {
    FormData: TabProps[]
    TabHeaderCss?: string
    TabIndicatorCss?: string
    activeTab: string
    setActiveTab: (value: string) => void
}
const TabMain: React.FC<TabMainProps> = ({
    FormData: data,
    TabHeaderCss,
    TabIndicatorCss,
    activeTab,
    setActiveTab
}) => {

    return (
        <div className='w-full justify-center flex bg-gray-200'>
            <div className='w-[600px] py-4 h-min-screen'>
                <Tabs value={activeTab}>
                    <div className='w-full justify-center flex'>
                        <TabsHeader
                            className={`border-b border-blue-gray-50 bg-transparent p-0 ${TabHeaderCss}`}
                            indicatorProps={{
                                className: `bg-transparent border-b-2 border-blue-500 shadow-none rounded-none ${TabIndicatorCss}`,
                            }}>
                            {data.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() =>{ setActiveTab(value)}}
                                    className={activeTab === value ? "text-blue-500 font-semibold" : "font-semibold"}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </div>
                    <TabsBody>
                        {data.map(({ Body, value }) => (
                            <TabPanel key={value} value={value}>
                                {Body}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    );
}

export default TabMain
