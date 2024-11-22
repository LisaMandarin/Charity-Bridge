import { Avatar, Pagination, Space, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { needList } from "../../data/fake-need"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

const { Title } = Typography
export function HomeNeed() {
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ itemsPerPage, setItemsPerPage ] = useState(3)
    const startIndex = (currentPage -1) * itemsPerPage
    const currentItems = needList.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div className="flex flex-col justify-between h-full ">
            <Title level={2} className="text-center pt-4">Help Needed</Title>
            <Space size="large" direction="vertical" className="text-xs flex-grow">
                {currentItems.map((need, i) => (
                    <div key={i}>
                        <div className="flex flex-row justify-between items-center">
                            <Space>
                                <Avatar icon={<UserOutlined />}/>
                                <a href={`mailto:${need.email}`}>{need.requestBy}</a>
                            </Space>
                            <p>
                                <Icon icon="ion:location-outline" width="16" height="16" className="inline"/>
                                {need.location}
                            </p>
                        </div>
                        <p>{need.description}</p>
                    </div>
                ))}
            </Space>
            <Pagination 
                simple={{readOnly: true}}
                defaultCurrent={1}
                total={needList.length}
                pageSize={3}
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                align="center"
            />
        </div>
    )
}