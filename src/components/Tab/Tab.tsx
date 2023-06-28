import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from '@/app/material'
import { TabProps } from '@/interfaces/interfaces';


interface TabComProps {
    FormData: TabProps[]
}
const TabCom: React.FC<TabComProps> = ({
    FormData: data
}) => {
    const [activeTab, setActiveTab] = React.useState(data[0].value);

    return (
      <div className='w-full justify-center flex bg-gray-200'>
        <div className='w-max-[650px] md:w-[500px] py-4'>
         <Tabs value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                    className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                }}
            >
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-blue-500" : ""}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
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

export default TabCom
